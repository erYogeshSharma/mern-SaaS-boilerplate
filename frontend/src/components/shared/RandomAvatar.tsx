import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { Avatar } from "@mui/material";

const RandomAvatar = ({ size = 50, name }: { name: string; size?: number }) => {
  const avatar = useMemo(() => {
    return createAvatar(adventurer, {
      seed: name,
      backgroundType: ["gradientLinear"],
      backgroundColor: ["ffdfbf", "d1d4f9", "c0aede"],
    }).toDataUri();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Avatar style={{ height: size, width: size }} src={avatar} />;
};

export default RandomAvatar;
