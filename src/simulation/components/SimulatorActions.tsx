import { ScanFace } from "lucide-react";
import { MdEventNote, MdExitToApp, MdSick } from "react-icons/md";
import { SimulatorActionButton } from "./SimulatorActionButton";
import { SimulatorButton } from "./SimulatorButton";
import { useSimulationStore } from "@/store/simulation-store";
import { simulationService } from "@/services/simulation-service";
import { EventList } from "./EventList";
import { SimulatorPressableButton } from "./SimulatorPressableButton";

export function SimulatorActions({ onFinish }: { onFinish: () => void }) {
  const {
    simulation,
    setLastReaction,
    setLastSymptom,
    addEvent,
  } = useSimulationStore();

  if (!simulation) return null;

  const getReactionById = (id: string) => {
    return simulation.reactions.find((reaction) => reaction.id === id);
  };
  const getSymptomById = (id: string) => {
    return simulation.symptoms.find((symptom) => symptom.id === id);
  };

  const handlePressReaction = async (reaction_id: string) => {
    await simulationService.sendReaction(reaction_id);
    const reaction = getReactionById(reaction_id);
    if (reaction) {
      setLastReaction(reaction.description);
      addEvent({
        id: reaction.id,
        type: "reaction",
        description: reaction.description,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handlePressSymptom = async (symptom_id: string) => {
    await simulationService.sendSymptom(symptom_id);
    const symptom = getSymptomById(symptom_id);
    if (symptom) {
      setLastSymptom(symptom.description);
      addEvent({
        id: symptom.id,
        type: "symptom",
        description: symptom.description,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="flex justify-between z-20">
      <div className="flex gap-8">
        <SimulatorActionButton icon={<MdEventNote size={24} />} label="Eventos">
          <EventList />
        </SimulatorActionButton>
      </div>

      <div className="flex gap-8">
        {/* <SimulatorActionButton icon={<Speech />} label="Falas Genéricas">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">
                Falas Genéricas - Menu de Opções
              </h4>
            </div>
            <div className="space-y-2 w-full">
              {genericTalks &&
                genericTalks.map((actionData) => (
                  <SimulatorPressableButton
                    key={actionData.id}
                    onPress={() => handlePressGenericTalk(actionData.id)}
                  >
                    {actionData.title}
                  </SimulatorPressableButton>
                ))}
            </div>
          </div>
        </SimulatorActionButton>
        <SimulatorActionButton icon={<Speech />} label="Falas Específicas">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">
                Falas - Menu de Opções
              </h4>
            </div>
            <div className="space-y-2 w-full">
              {simulation.talks &&
                simulation.talks.map((actionData) => (
                  <SimulatorPressableButton
                    key={actionData.id}
                    onPress={() => handlePressTalk(actionData.id)}
                  >
                    {actionData.title}
                  </SimulatorPressableButton>
                ))}
            </div>
          </div>
        </SimulatorActionButton> */}
        <SimulatorActionButton icon={<ScanFace />} label="Reações">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">
                Reações - Menu de Opções
              </h4>
            </div>
            <div className="space-y-2 w-full">
              {simulation.reactions &&
                simulation.reactions.map((actionData) => (
                  <SimulatorPressableButton
                    key={actionData.id}
                    onPress={() => handlePressReaction(actionData.id)}
                  >
                    {actionData.title}
                  </SimulatorPressableButton>
                ))}
            </div>
          </div>
        </SimulatorActionButton>
        <SimulatorActionButton icon={<MdSick size={24} />} label="Sintomas">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">
                Sintomas - Menu de Opções
              </h4>
            </div>
            <div className="space-y-2 w-full">
              {simulation.symptoms &&
                simulation.symptoms.map((actionData) => (
                  <SimulatorPressableButton
                    key={actionData.id}
                    onPress={() => handlePressSymptom(actionData.id)}
                  >
                    {actionData.title}
                  </SimulatorPressableButton>
                ))}
            </div>
          </div>
        </SimulatorActionButton>
      </div>

      <div className="flex gap-8">
        <SimulatorButton
          icon={<MdExitToApp size={24} />}
          label="Sair"
          onClick={onFinish}
        />
      </div>
    </div>
  );
}
