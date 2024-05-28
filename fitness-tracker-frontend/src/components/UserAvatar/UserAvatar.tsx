import Avatar from "@mui/material/Avatar";
import { SxProps } from "@mui/system";

type AvatarProps = {
  firstName: string;
  lastName: string;
  size?: string;
  fontSize?: string;
  sx?: SxProps;
};

const UserAvatar = ({
  firstName,
  lastName,
  size = "34px",
  fontSize = "20px",
  sx,
}: AvatarProps) => {
  const stringAvatar = (name: string) => {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  };

  const avatarProps = stringAvatar(`${firstName} ${lastName}`);

  return (
    <Avatar
      {...avatarProps}
      sx={{ width: size, height: size, fontSize: fontSize, ...sx }}
    />
  );
};

export default UserAvatar;
