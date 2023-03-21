import { Icon, IconProps } from "@primer/octicons-react";

type IconWrapper = (icon: Icon) => Icon;

export const makePaddedIcon: IconWrapper = (Icon) => {
  return (props: IconProps) => (
    <div className="icon-padded">
      <Icon {...props} />
    </div>
  );
};
