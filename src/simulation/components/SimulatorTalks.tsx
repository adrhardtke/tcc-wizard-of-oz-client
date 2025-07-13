import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimulatorPressableButton } from "./SimulatorPressableButton";
import { SimulatorActionButton } from "./SimulatorActionButton";
import { SlLike, SlQuestion, SlDislike, SlOptions } from "react-icons/sl";
import { useTalkStore } from "@/store/talk-store";
import { simulationService } from "@/services/simulation-service";
import { useSimulationStore } from "@/store/simulation-store";
import { useState } from "react";
import { talkService } from "@/services/talk-service";
import { Loader2 } from "lucide-react";
import type { TalkType } from "@/types";

export function SimulatorTalks() {
  const {
    positive,
    negative,
    generic,
    question,
    currentTalks,
    setCurrentTalks,
  } = useTalkStore();
  const { setLastReaction, addEvent, simulation } = useSimulationStore();
  const [started, setStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getLatest = async (talk_id: string) => {
    await talkService
      .getLatestTalks(talk_id)
      .then((data) => {
        setCurrentTalks(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getTalkById = (id: string) => {
    let talks: TalkType[] = [
      ...positive,
      ...negative,
      ...generic,
      ...currentTalks,
      ...question,
    ];
    if (simulation?.talks.length) {
      talks = [...talks, ...simulation.talks];
    }
    return talks.find((talk) => talk.id === id);
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

  const handlePressTalkStart = async (talk_id: string) => {
    await handlePressTalk(talk_id);
    await getLatest(talk_id);
    setStarted(true);
  };

  const handlePressTalkLatest = async (talk_id: string) => {
    await handlePressTalk(talk_id);

    await getLatest(talk_id);
  };

  return (
    <div>
      <Card className="w-[450px] overflow-hidden">
        <CardHeader>
          <CardTitle>Fale com o médico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 w-full">
            {isLoading && (
              <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-foreground" />
              </div>
            )}
            {!started && !isLoading ? (
              simulation?.talks.map((actionData) => (
                <SimulatorPressableButton
                  key={actionData.id}
                  onPress={() => handlePressTalkStart(actionData.id)}
                  withAnimation
                >
                  {actionData.title}
                </SimulatorPressableButton>
              ))
            ) : currentTalks.length > 0 ? (
              currentTalks.map((actionData) => (
                <SimulatorPressableButton
                  key={actionData.id}
                  onPress={() => handlePressTalkLatest(actionData.id)}
                  withAnimation
                >
                  {actionData.title}
                </SimulatorPressableButton>
              ))
            ) : (
              <span>Você já expos todos seus sintomas ao médico</span>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="w-full justify-between mt-4 flex flex-row gap-4">
        <SimulatorActionButton
          icon={<SlLike />}
          label="Concordar"
          variant="small"
          color="success"
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Concordar</h4>
            </div>
            <div className="space-y-2 w-full">
              {positive &&
                positive.map((actionData) => (
                  <SimulatorPressableButton
                    key={actionData.id}
                    onPress={() => handlePressTalk(actionData.id)}
                  >
                    {actionData.title}
                  </SimulatorPressableButton>
                ))}
            </div>
          </div>
        </SimulatorActionButton>
        <SimulatorActionButton
          icon={<SlDislike />}
          label="Discordar"
          variant="small"
          color="danger"
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Discordar</h4>
            </div>
            <div className="space-y-2 w-full">
              {negative &&
                negative.map((actionData) => (
                  <SimulatorPressableButton
                    key={actionData.id}
                    onPress={() => handlePressTalk(actionData.id)}
                  >
                    {actionData.title}
                  </SimulatorPressableButton>
                ))}
            </div>
          </div>
        </SimulatorActionButton>
        <SimulatorActionButton
          icon={<SlQuestion />}
          label="Em Dúvida"
          variant="small"
          color="warning"
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Dúvida</h4>
            </div>
            <div className="space-y-2 w-full">
              {question &&
                question.map((actionData) => (
                  <SimulatorPressableButton
                    key={actionData.id}
                    onPress={() => handlePressTalk(actionData.id)}
                  >
                    {actionData.title}
                  </SimulatorPressableButton>
                ))}
            </div>
          </div>
        </SimulatorActionButton>
        <SimulatorActionButton
          icon={<SlOptions />}
          label="Outros"
          variant="small"
          color="primary"
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-medium">Outros</h4>
            </div>
            <div className="space-y-2 w-full">
              {generic &&
                generic.map((actionData) => (
                  <SimulatorPressableButton
                    key={actionData.id}
                    onPress={() => handlePressTalk(actionData.id)}
                  >
                    {actionData.title}
                  </SimulatorPressableButton>
                ))}
            </div>
          </div>
        </SimulatorActionButton>
      </div>
    </div>
  );
}
