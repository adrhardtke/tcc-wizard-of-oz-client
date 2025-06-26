import { useSimulationConfigStore } from "@/store/simulation-config.store";
import { Checkbox } from "./ui/checkbox";

export function SimulationStepStatus() {
  const { medical, medicalScenery, medicalHistory } =
    useSimulationConfigStore();
  return (
    <ul className="flex flex-col gap-1">
      <li className="flex items-center gap-2">
        <Checkbox
          checked={!!medical}
          disabled={!medical}
          className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
        />
        <span>Escolha o médico</span>
      </li>
      <li className="flex items-center gap-2">
        <Checkbox
          checked={!!medicalScenery}
          disabled={!medicalScenery}
          className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
        />
        <span>Selecione o cenário clínico</span>
      </li>
      <li className="flex items-center gap-2">
        <Checkbox
          checked={!!medicalHistory}
          disabled={!medicalHistory}
          className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
        />
        <span>Defina o histórico médico</span>
      </li>
    </ul>
  );
}
