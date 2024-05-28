import { MouseEvent } from "react";

import { IconButton, SxProps } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

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
  color = "primary",
  size,
  handleClick,
  sx,
}: AddButtonProps) => {
  return (
    <IconButton aria-label='add' size={size} onClick={handleClick}>
      <EditOutlinedIcon color={color} sx={{ ...sx }} />
    </IconButton>
  );
};

export default AddButton;
