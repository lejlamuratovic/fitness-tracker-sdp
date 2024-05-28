import { useState, useEffect } from "react";
import { Box, IconButton, Fade } from "@mui/material";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  message: string;
  alertKey: string;
};

const SuccessAlert = ({ message, alertKey }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);

    const timeoutId = setTimeout(() => {
      setOpen(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [alertKey]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ position: "absolute", top: 20, right: 20, zIndex: 5 }}>
      <Fade in={open}>
        <Alert
          severity='success'
          variant='filled'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleClose}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          sx={{
            width: "300px",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {message}
        </Alert>
      </Fade>
    </Box>
  );
};

export default SuccessAlert;
