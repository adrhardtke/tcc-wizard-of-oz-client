import { useEffect, useState } from "react";
import { SimulatorActions } from "../components/SimulatorActions";
import { SimulatorPanel } from "../components/SimulatorPanel";
import { Loader2 } from "lucide-react";
import { simulationService } from "@/services/simulation-service";
import { useSimulationStore } from "@/store/simulation-store";
import { AvatarViewer } from "@/components/Avatar/Avatar";

export default function Simulator() {
  const [isLoading, setIsLoading] = useState(true);
  const { addSimulation } = useSimulationStore();

  useEffect(() => {
    simulationService
      .find("simulation-id-1")
      .then((data) => {
        addSimulation(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-foreground" />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-gray-900">
      <div className="p-8">
        <SimulatorPanel />
      </div>
      <div className="absolute top-[15%] left-[50%] -translate-x-[50%] w-[800px] h-[900px] flex items-center justify-center">
        <AvatarViewer />
      </div>
      <div className="absolute bottom-8 w-full p-8">
        <SimulatorActions />
      </div>
    </div>
  );
}
