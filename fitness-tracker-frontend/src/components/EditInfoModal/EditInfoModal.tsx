import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import {
  Modal,
  Box,
  IconButton,
  InputAdornment,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useUpdateUser, useUpdateUserPassword } from "src/hooks";
import { User } from "src/utils/types";

interface EditInfoModalProps {
  open: boolean;
  handleClose: () => void;
  user: User;
  setUser: any;
  onSuccess: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export type UserInfoData = {
  firstName: string;
  lastName: string;
  oldPassword?: string | null;
  newPassword?: string | null;
};

const schema = yup
  .object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    oldPassword: yup.string().nullable(),
    newPassword: yup
      .string()
      .nullable()
      .test(
        "newPassword-conditional-validation",
        "Password must be at least 8 characters",
        function (value) {
          const { oldPassword } = this.parent;
          if (oldPassword && oldPassword.length > 0 && value) {
            return value.length >= 8;
          }
          return true;
        }
      ),
  })
  .required();

const EditInfoModal = ({
  open,
  handleClose,
  user,
  setUser,
  onSuccess,
}: EditInfoModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      oldPassword: "",
      newPassword: "",
    },
  });

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const updateUserMutation = useUpdateUser();
  const updateUserPassword = useUpdateUserPassword();

  const onSubmit = (formData: UserInfoData) => {
    const updatedUser = { ...user, ...formData };

    const updateUserInfo = () => {
      updateUserMutation.mutate(
        { id: user.id, user: updatedUser },
        {
          onSuccess: () => {
            setUser(updatedUser);
            onSuccess();
            handleClose();
          },
        }
      );
    };

    if (formData.oldPassword && formData.newPassword) {
      const password = {
        newPassword: formData.newPassword,
        oldPassword: formData.oldPassword,
      };
      updateUserPassword.mutate(
        { id: user.id, password: password },
        {
          onSuccess: () => {
            updateUserInfo();
            resetPasswordFields();
          },
          onError: (error: any) => {
            setPasswordError(error?.response?.data || "An error occurred");
          },
        }
      );
    } else {
      updateUserInfo();
    }
  };

  const resetPasswordFields = () => {
    setOldPassword("");
    setNewPassword("");
    setPasswordError("");
  };

  // reset the password fields when the modal is closed
  useEffect(() => {
    if (!open) {
      resetPasswordFields();
    }
  }, [open]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component='form' onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant='h6'
          component='h2'
          color='text.secondary'
          sx={{ mb: 2 }}
        >
          Edit Personal Information
        </Typography>

        <TextField
          margin='dense'
          fullWidth
          label='First Name'
          value={firstName}
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message : ""}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          margin='dense'
          fullWidth
          label='Last Name'
          value={lastName}
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ""}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Typography
          variant='body2'
          sx={{
            cursor: "pointer",
            color: "#72A1BF",
            mt: 2,
            textTransform: "uppercase",
          }}
          onClick={() => setShowPasswordFields(!showPasswordFields)}
        >
          Change Password
        </Typography>

        {passwordError && (
          <Typography color='error' sx={{ mt: 2, pl: 1.5, fontSize: "12px" }}>
            {passwordError}
          </Typography>
        )}

        {showPasswordFields && (
          <>
            <TextField
              margin='dense'
              fullWidth
              label='Old Password'
              type='password'
              value={oldPassword}
              {...register("oldPassword")}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword ? errors.oldPassword.message : ""}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              margin='dense'
              fullWidth
              label='New Password'
              type={showPassword ? "password" : "text"}
              {...register("newPassword")}
              error={!!errors.newPassword}
              helperText={errors.newPassword ? errors.newPassword.message : ""}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}

        <Button
          variant='contained'
          sx={{ float: "right", mt: 2 }}
          type='submit'
          color='success'
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

export default EditInfoModal;
