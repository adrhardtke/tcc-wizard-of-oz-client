export type SimulatorButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "small";
  color?: "primary" | "success" | "danger" | "warning";
};

export function SimulatorButton({
  label,
  icon,
  onClick = () => {},
  variant = "default",
  color = "primary",
}: SimulatorButtonProps) {
  const getSize = () => {
    if (variant === "small") {
      return "w-10 h-10 p-2";
    }
    return "w-16 h-16 p-4";
  };

  const getColors = () => {
    switch (color) {
      case "primary":
        return "bg-primary hover:bg-primary";
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "danger":
        return "bg-red-500 hover:bg-red-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-primary hover:bg-primary";
    }
  };

  const getTextSize = () => {
    if (variant === "small") {
      return "text-sm";
    }
    return "text-base";
  };

  return (
    <div
      className="flex flex-col gap-1 items-center text-background cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`rounded rounded-full ${getSize()} ${getColors()} flex items-center justify-center`}
      >
        {icon}
      </div>
      <span className={["text-white", getTextSize()].join(" ")}>{label}</span>
    </div>
  );
}
