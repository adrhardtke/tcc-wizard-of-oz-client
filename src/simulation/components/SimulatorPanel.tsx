import { Timer } from "@/components/Timer";
import { Separator } from "@/components/ui/separator";
import { useSimulationStore } from "@/store/simulation-store";

type SimulatorPanelProps = {
  onStopTimer?: (time: string) => void;
  isFinished?: boolean;
};

export function SimulatorPanel({
  onStopTimer,
  isFinished,
}: SimulatorPanelProps) {
  const { simulation, lastSymptom, lastReaction } = useSimulationStore();

  return (
    <div className="w-[280px] border rounded-md flex flex-col bg-gray-800 gap-4 p-4 absolute top-10 z-10">
      <div>
        <div className="flex items-center gap-2 justify-between mb-2 text-green-400">
          <h1 className="text-sm text-white">Tempo de Sessão</h1>
          <Timer onStopTimer={onStopTimer} isFinished={isFinished} />
        </div>
        <Separator />
      </div>
      <div>
        <div className="flex flex-col gap-2 justify-between">
          <h1 className="text-sm text-white">Médico</h1>
          <p className="font-medium text-white">{simulation?.medical.name}</p>
        </div>
        <Separator className="my-2" />
      </div>
      <div>
        <div className="flex flex-col gap-2 justify-between">
          <h1 className="text-sm text-white">Cenário Atual</h1>
          <p className="font-medium text-white">{simulation?.scenery.title}</p>
        </div>
        <Separator className="my-2" />
      </div>

      <div>
        <div className="flex flex-col gap-2 justify-between">
          <h1 className="text-sm text-white">Histórico</h1>
          <p className="font-medium text-white">
            {simulation?.historical.title}
          </p>
        </div>
        <Separator className="my-2" />
      </div>

      <div>
        <div className="flex flex-col gap-2 justify-between text-red-400">
          <h1 className="text-sm text-white">Última reação</h1>
          <p className="font-medium">{lastReaction}</p>
        </div>
        <Separator className="my-2" />
      </div>

      <div>
        <div className="flex flex-col gap-2 justify-between text-red-400">
          <h1 className="text-sm text-white">Último sintoma</h1>
          <p className="font-medium">{lastSymptom}</p>
        </div>
        <Separator className="my-2" />
      </div>
    </div>
  );
}
