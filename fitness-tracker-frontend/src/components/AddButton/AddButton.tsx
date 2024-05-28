import { MouseEvent } from "react";

import { IconButton, SxProps } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type AddButtonProps = {
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

const AddButton = ({
  color = "success",
  size,
  handleClick,
  sx,
}: AddButtonProps) => {
  return (
    <IconButton aria-label='add' size={size} onClick={handleClick}>
      <AddCircleIcon color={color} sx={{ ...sx }} />
    </IconButton>
  );
};

export default AddButton;
