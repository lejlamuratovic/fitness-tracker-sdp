import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import Modal from "@mui/material/Modal";

import { useAddRoutine } from "src/hooks";
import { Routine } from "src/utils/types";
import { RootState } from "src/store";

import AddButton from "src/components/AddButton";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export type RoutineFormData = {
  name: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Routine name is required"),
});

const AddRoutineModal = () => {
  const [open, setOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false); // default to true, meaning private by default

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoutineFormData>({
    resolver: yupResolver(schema),
  });

  const addRoutine = useAddRoutine();

  const userId = useSelector((state: RootState) => state.auth.userId);

  if (!userId) {
    return null;
  }

  // to handle opening and closing of the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data: RoutineFormData) => {
    let routine: Routine = {
      name: data.name,
      userId: userId,
      creationDate: new Date().toISOString(),
      isPrivate: !isPrivate,
    };

    addRoutine.mutate({ routine });
    handleClose();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(event.target.checked);
  };

  return (
    <Container maxWidth='xs'>
      <AddButton handleClick={handleOpen} sx={{ fontSize: "55px" }}></AddButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='exercise-modal-title'
      >
        <Box sx={modalStyle} component='form' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h5' color='text.secondary' textAlign='center'>
            {" "}
            Add new routine{" "}
          </Typography>
          <TextField
            label='Routine Name'
            fullWidth
            margin='normal'
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPrivate}
                  onChange={handleCheckboxChange}
                  size='small'
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Share to community?
                  <Tooltip title='Sharing your routine makes it visible to others.'>
                    <IconButton size='small'>
                      <InfoOutlined fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
              sx={{ color: "text.secondary" }}
            />
          </FormGroup>
          <Button
            type='submit'
            size='large'
            style={{ marginTop: "30px", backgroundColor: "#72A1BF" }}
            fullWidth
            variant='contained'
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default AddRoutineModal;
