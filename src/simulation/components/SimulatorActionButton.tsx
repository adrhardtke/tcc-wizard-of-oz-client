import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SimulatorButton, type SimulatorButtonProps } from "./SimulatorButton";

type SimulatorActionButtonProps = SimulatorButtonProps & {
  children?: React.ReactNode;
};

export function SimulatorActionButton({
  label,
  icon,
  variant = "default",
  color = "primary",
  children,
}: SimulatorActionButtonProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <SimulatorButton
          label={label}
          icon={icon}
          variant={variant}
          color={color}
        />
      </PopoverTrigger>
      <PopoverContent className={children ? "w-auto" : "w-90"}>
        {children}
      </PopoverContent>
    </Popover>
  );
}
