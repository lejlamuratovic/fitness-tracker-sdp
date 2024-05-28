import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Container,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { MuscleGroups } from "src/utils/enums";
import { useUpdateExercise } from "src/hooks";
import { Exercise } from "src/utils/types";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export type ExerciseFormData = {
  id?: string;
  name: string;
  muscleGroup: string;
  description: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Exercise name is required"),
  muscleGroup: yup.string().required("Muscle group is required"),
  description: yup.string().required("Description is required"),
});

type Props = {
  exercise: Exercise;
  open: boolean;
  onClose: () => void;
};

const EditExerciseModal = ({ exercise, open, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    resolver: yupResolver(schema),
  });

  const [selectedFile, setSelectedFile] = useState("");
  const updateExercise = useUpdateExercise();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    register("muscleGroup");
  }, [register]);

  const handleMuscleGroupChange = (event: any) => {
    setValue("muscleGroup", event.target.value as string);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const [file, setFile] = useState(null);

  const onSubmit = (data: ExerciseFormData) => {
    const formData = new FormData();
    formData.append("id", exercise.id);
    formData.append("name", data.name);
    formData.append("muscleGroup", data.muscleGroup);
    formData.append("description", data.description);

    // append the file only if it exists
    if (file) {
      formData.append("file", file);
    }

    updateExercise.mutate({ id: exercise.id, formData: formData });
    handleClose();
  };

  return (
    <Container maxWidth='xs'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='exercise-modal-title'
      >
        <Box sx={modalStyle} component='form' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h5' color='text.secondary' textAlign='center'>
            {" "}
            Edit Exercise{" "}
          </Typography>
          <TextField
            label='Exercise Name'
            defaultValue={exercise.name}
            fullWidth
            margin='normal'
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel>Muscle Group</InputLabel>
            <Select
              defaultValue={exercise.muscleGroup}
              label='Muscle Group'
              {...register("muscleGroup")}
              onChange={handleMuscleGroupChange}
              error={!!errors.muscleGroup}
            >
              {Object.values(MuscleGroups).map((group) => (
                <MenuItem
                  key={group}
                  value={group}
                  defaultValue={exercise.muscleGroup}
                >
                  {group}
                </MenuItem>
              ))}
            </Select>
            {errors.muscleGroup && <p>{errors.muscleGroup.message}</p>}
          </FormControl>
          <TextField
            label='Description'
            defaultValue={exercise.description}
            fullWidth
            margin='normal'
            multiline
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
          <Button
            component='label'
            style={{ marginTop: "10px", color: "#72A1BF" }}
            variant='outlined'
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              type='file'
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
              accept='image/*'
              name='file'
              onChange={handleFileChange}
            />
          </Button>
          {selectedFile && (
            <Typography sx={{ color: "text.secondary" }}>
              {selectedFile}
            </Typography>
          )}

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

export default EditExerciseModal;
