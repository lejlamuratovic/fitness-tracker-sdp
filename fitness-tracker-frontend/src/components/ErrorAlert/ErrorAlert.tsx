import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";

type Props = {
  message: string;
};

const ErrorAlert = ({ message }: Props) => {
  return (
    <Box sx={{}}>
      <Alert
        severity='error'
        variant='filled'
        sx={{
          width: "300px",
          position: "absolute",
          top: "50px",
          right: "50px",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
