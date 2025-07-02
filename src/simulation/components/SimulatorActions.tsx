import { ScanFace, Speech } from "lucide-react";
import { MdEventNote, MdExitToApp, MdSick } from "react-icons/md";
import { SimulatorActionButton } from "./SimulatorActionButton";
import { SimulatorButton } from "./SimulatorButton";
import { useSimulationStore } from "@/store/simulation-store";
import { simulationService } from "@/services/simulation-service";
import { EventList } from "./EventList";

export function SimulatorActions() {
  const { simulation, setLastReaction, setLastSymptom, addEvent } =
    useSimulationStore();

  if (!simulation) return null;

  const getTalkById = (id: string) => {
    return simulation.talks.find((talk) => talk.id === id);
  };
  const getReactionById = (id: string) => {
    return simulation.reactions.find((reaction) => reaction.id === id);
  };
  const getSymptomById = (id: string) => {
    return simulation.symptoms.find((symptom) => symptom.id === id);
  };

  const handlePressTalk = async (talk_id: string) => {
    await simulationService.sendTalk(talk_id);
    const talk = getTalkById(talk_id);
    if (talk) {
      setLastReaction(talk.description);
      addEvent({
        id: talk.id,
        type: "talk",
        description: talk.description,
        timestamp: new Date().toISOString(),
      });
    }
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
    <div className="flex justify-between">
      <div className="flex gap-8">
        <SimulatorActionButton
          icon={<Speech />}
          label="Falas"
          data={simulation.talks}
          onPress={handlePressTalk}
        />
        <SimulatorActionButton
          icon={<ScanFace />}
          label="Reações"
          data={simulation.reactions}
          onPress={handlePressReaction}
        />
        <SimulatorActionButton
          icon={<MdSick size={24} />}
          label="Sintomas"
          data={simulation.symptoms}
          onPress={handlePressSymptom}
        />
      </div>

      <div className="flex gap-8">
        {/* <SimulatorActionButton
          icon={<History />}
          label="Histórico"
          onPress={() => null}
        /> */}
        <SimulatorActionButton
          icon={<MdEventNote size={24} />}
          label="Eventos"
          onPress={() => null}
        >
          <EventList />
        </SimulatorActionButton>
      </div>

      <div className="flex gap-8">
        <SimulatorButton icon={<MdExitToApp size={24} />} label="Sair" />
      </div>
    </div>
  );
}
