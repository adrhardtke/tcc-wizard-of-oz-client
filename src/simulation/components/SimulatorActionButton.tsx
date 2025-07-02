import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SimulatorButton, type SimulatorButtonProps } from "./SimulatorButton";
import { SimulatorPressableButton } from "./SimulatorPressableButton";
import type { SimulationActionButtonType } from "@/types";

type SimulatorActionButtonProps = SimulatorButtonProps & {
  data?: SimulationActionButtonType[];
  onPress: (id: string) => void;
};

export function SimulatorActionButton({
  label,
  icon,
  data,
  onPress,
}: SimulatorActionButtonProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <SimulatorButton label={label} icon={icon} />
      </PopoverTrigger>
      <PopoverContent className="w-90">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">
              {label} - Menu de Opções
            </h4>
          </div>
          <div className="space-y-2 w-full">
            {data &&
              data.map((actionData) => (
                <SimulatorPressableButton
                  key={actionData.id}
                  onPress={() => onPress(actionData.id)}
                >
                  {actionData.title}
                </SimulatorPressableButton>
              ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
