export type SimulatorButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

export function SimulatorButton({
  label,
  icon,
  onClick = () => {},
}: SimulatorButtonProps) {
  return (
    <div
      className="flex flex-col gap-1 items-center text-background cursor-pointer"
      onClick={onClick}
    >
      <div className="rounded rounded-full p-4 bg-primary w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-white">{label}</span>
    </div>
  );
}
