import { MouseEvent } from "react";

import { IconButton, SxProps } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

type DeleteButtonProps = {
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "action"
    | "error"
    | "disabled"
    | "success";
  size?: "small" | "medium" | "large";
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  sx?: SxProps;
};

const DeleteButton = ({
  color = "error",
  size,
  handleClick,
  sx,
}: DeleteButtonProps) => {
  return (
    <IconButton aria-label='Delete' size={size} onClick={handleClick}>
      <RemoveCircleIcon color={color} sx={{ ...sx }} />
    </IconButton>
  );
};

export default DeleteButton;
