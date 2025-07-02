export type SimulatorButtonProps = {
  label: string;
  icon: React.ReactNode;
};

export function SimulatorButton({ label, icon }: SimulatorButtonProps) {
  return (
    <div className="flex flex-col gap-1 items-center text-background cursor-pointer">
      <div className="rounded rounded-full p-4 bg-primary w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <span className="text-white">{label}</span>
    </div>
  );
}
