import { useEffect, useState } from "react";
import { SimulatorActions } from "../components/SimulatorActions";
import { SimulatorPanel } from "../components/SimulatorPanel";
import { Loader2 } from "lucide-react";
import { simulationService } from "@/services/simulation-service";
import { useSimulationStore } from "@/store/simulation-store";
import { AvatarViewer } from "@/components/Avatar/Avatar";
import { talkService } from "@/services/talk-service";
import { FinishModal } from "../components/FinishModal";
import { SimulatorTalks } from "../components/SimulatorTalks";
import { useTalkStore } from "@/store/talk-store";

export default function Simulator() {
  const [isLoading, setIsLoading] = useState(true);
  const { addSimulation } = useSimulationStore();
  const { setPositive, setNegative, setQuestion, setGeneric } = useTalkStore();
  const [openFinishModal, setOpenFinishModal] = useState(false);
  const [timer, setTimer] = useState("");

  useEffect(() => {
    simulationService
      .find("simulation-id-1")
      .then((data) => {
        addSimulation(data);
      })
      .finally(() => {
        setIsLoading(false);
      });

    talkService
      .getPositiveTalks()
      .then((data) => {
        setPositive(data);
      })
      .finally(() => {
        setIsLoading(false);
      });

    talkService
      .getNegativeTalks()
      .then((data) => {
        setNegative(data);
      })
      .finally(() => {
        setIsLoading(false);
      });

    talkService
      .getQuestionTalks()
      .then((data) => {
        setQuestion(data);
      })
      .finally(() => {
        setIsLoading(false);
      });

    talkService
      .getGenericTalks()
      .then((data) => {
        setGeneric(data);
      })
      .finally(() => {
        setIsLoading(false);
      });

      const addCSS = (css: string) => document.head.appendChild(document.createElement("style")).innerHTML=css;

      // Usage: 
      addCSS("body{ overflow:hidden; }")

      return () => {
       addCSS("body{ overflow:auto; }")
      }
  }, []);

  const handleFinishSimulation = async () => {
    setOpenFinishModal(true);
  };

  const handleStopTimer = (time: string) => {
    console.log(time);
    setTimer(time);
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="max-w-screen h-screen bg-gray-900">
      {openFinishModal && <FinishModal open={openFinishModal} timer={timer} />}
      <div className="p-8">
        <SimulatorPanel
          onStopTimer={handleStopTimer}
          isFinished={openFinishModal}
        />
      </div>
      <div className="absolute top-0 right-0">
        <div className="p-8">
          <SimulatorTalks />
        </div>
      </div>

      <div className="absolute top-[15%] left-[50%] -translate-x-[50%] w-[800px] h-[900px] flex items-center justify-center">
        <AvatarViewer />
      </div>
      <div className="absolute bottom-8 w-full p-8">
        <SimulatorActions onFinish={handleFinishSimulation} />
      </div>
    </div>
  );
}
