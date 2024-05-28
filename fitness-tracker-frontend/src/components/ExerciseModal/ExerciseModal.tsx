import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AddButton from "src/components/AddButton";

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
import { useAddExercise } from "src/hooks";

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
  name: string;
  muscleGroup: string;
  description: string;
  file: any;
};

const FILE_SIZE = 100 * 1024; // 100KB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const schema = yup.object().shape({
  name: yup.string().required("Exercise name is required"),
  muscleGroup: yup.string().required("Muscle group is required"),
  description: yup.string().required("Description is required"),
  file: yup
    .mixed()
    .test(
      "fileSize",
      "File too large",
      (value) => value && (value as File).size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes((value as File).type)
    )
    .required("Image is required"),
});

const ExerciseModal = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ExerciseFormData>({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [selectedFile, setSelectedFile] = useState(""); // to display the name of the file when uploaded

  const addExercise = useAddExercise();

  // to handle opening and closing of the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    register("muscleGroup"); // because the select component needs to be mounted before registering
  }, [register]);

  const handleMuscleGroupChange = (event: any) => {
    setMuscleGroup(event.target.value as string);
    setValue("muscleGroup", event.target.value as string); // update the value in the form
  };

  useEffect(() => {
    // to register the file input and muscle group select
    register("muscleGroup");
    register("file");
  }, [register]);

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile.name);
      setFile(selectedFile); // set the file in the local state
      setValue("file", selectedFile); // update the form value
    }
  };

  const [file, setFile] = useState(null); // new state for the file

  const onSubmit = (data: ExerciseFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("muscleGroup", data.muscleGroup);
    formData.append("description", data.description);

    if (file) {
      formData.append("file", file); // append the file from the local state
    }

    addExercise.mutate(formData);
    handleClose();
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
            Add new exercise{" "}
          </Typography>
          <TextField
            label='Exercise Name'
            fullWidth
            margin='normal'
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel>Muscle Group</InputLabel>
            <Select
              label='Muscle Group'
              value={muscleGroup}
              onChange={handleMuscleGroupChange}
              error={!!errors.muscleGroup}
            >
              {Object.values(MuscleGroups).map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
            <Typography
              sx={{ color: "#d43333", fontSize: "12px", pl: 1.5, pt: 0.5 }}
            >
              {errors.muscleGroup &&
              typeof errors.muscleGroup.message === "string"
                ? errors.muscleGroup.message
                : " "}
            </Typography>
          </FormControl>
          <TextField
            label='Description'
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
              style={{
                opacity: 0,
                position: "absolute",
                zIndex: -1,
                overflow: "hidden",
              }}
              accept='image/*'
              name='file'
              onChange={handleFileChange}
            />
          </Button>
          <Typography
            sx={{ color: "#d43333", fontSize: "12px", pl: 1.5, pt: 0.5 }}
          >
            {errors.file && typeof errors.file.message === "string"
              ? errors.file.message
              : " "}
          </Typography>
          {selectedFile && (
            <Typography sx={{ color: "text.secondary" }}>
              {selectedFile}
            </Typography>
          )}{" "}
          {/* display the name of the file when uploaded */}
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

export default ExerciseModal;
