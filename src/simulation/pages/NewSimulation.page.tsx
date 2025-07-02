import { SimulationStepStatus } from "@/components/SimulationStepStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  MedicalHistoryMock,
  MedicalMock,
  MedicalSceneryMock,
} from "@/mocks/simulation-config.mock";
import { useSimulationConfigStore } from "@/store/simulation-config.store";
import { ChevronLeft, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";
import { AddMedicalModal } from "../components/AddMedicalModal";

export default function NewSimulation() {
  const {
    medical,
    addMedical,
    medicalHistory,
    medicalScenery,
    addMedicalScenery,
    addMedicalHistory,
  } = useSimulationConfigStore();

  const handleAddMedical = (value: string) => {
    const selectedMedical = MedicalMock.find((item) => item.id === value);
    if (selectedMedical) {
      addMedical({
        id: selectedMedical.id,
        name: selectedMedical.name,
      });
    }
  };

  const handleAddMedicalScenery = (value: string) => {
    const selectedMedicalScenery = MedicalSceneryMock.find(
      (item) => item.id === value
    );
    if (selectedMedicalScenery) {
      addMedicalScenery({
        id: selectedMedicalScenery.id,
        title: selectedMedicalScenery.title,
        list: selectedMedicalScenery.list,
      });
    }
  };

  const handleAddMedicalHistory = (value: string) => {
    const selectedMedicalHistory = MedicalHistoryMock.find(
      (item) => item.id === value
    );
    if (selectedMedicalHistory) {
      addMedicalHistory({
        id: selectedMedicalHistory.id,
        title: selectedMedicalHistory.title,
        list: selectedMedicalHistory.list,
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div>
        <Link
          to={"/"}
          className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-primary w-fit"
        >
          <ChevronLeft id="back" />
          <Label htmlFor="back" className="cursor-pointer">
            Voltar
          </Label>
        </Link>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <Clipboard size={18} />
          <h3 className="text-md font-medium">Detalhes da consulta</h3>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="text-xl font-medium">
            Seleção do médico para a simulação
          </h3>
          <p className="text-muted-foreground">
            Escolha o aluno que atuará como médico nesta sessão clínica.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex">
              <p className="w-[180px] text-muted-foreground">
                Aluno selecionado:
              </p>
              <span>{medical ? medical.name : "-"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Select onValueChange={handleAddMedical} defaultValue={medical?.id}>
              <SelectTrigger className="w-full mt-2 flex-1">
                <SelectValue placeholder="Alunos" />
              </SelectTrigger>
              <SelectContent>
                {MedicalMock.map((medicalItem) => (
                  <SelectItem key={medicalItem.id} value={medicalItem.id}>
                    {medicalItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">ou</span>
            <AddMedicalModal />
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="text-xl font-medium">Cenário clínico</h3>
          <div className="flex flex-col gap-2 mt-4 mb-2">
            <div className="flex">
              <p className="w-[180px] text-muted-foreground">Cenário:</p>
              <span>{medicalScenery ? medicalScenery.title : "-"}</span>
            </div>
            {medicalScenery &&
              medicalScenery.list.map((item) => (
                <div className="flex" key={item.id}>
                  <p className="w-[180px] text-muted-foreground">
                    {item.title}
                  </p>
                  <span>{item?.description}</span>
                </div>
              ))}
          </div>
          <Select
            onValueChange={handleAddMedicalScenery}
            defaultValue={medicalScenery?.id}
          >
            <SelectTrigger className="w-full mt-2 flex-1">
              <SelectValue placeholder="Cenário clínico" />
            </SelectTrigger>
            <SelectContent>
              {MedicalSceneryMock.map((medicalScenery) => (
                <SelectItem key={medicalScenery.id} value={medicalScenery.id}>
                  {medicalScenery.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="text-xl font-medium">Histórico médico</h3>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex">
              <p className="w-[180px] text-muted-foreground">Histórico:</p>
              <span>{medicalHistory ? medicalHistory.title : "-"}</span>
            </div>
            <div className="flex">
              <p className="w-[180px] text-muted-foreground">Descrição:</p>
              <span>
                {medicalHistory && medicalHistory.list.length > 0
                  ? medicalHistory.list
                      .map((history) => history.title)
                      .join(", ")
                  : "-"}
              </span>
            </div>
          </div>
          <Select
            onValueChange={handleAddMedicalHistory}
            defaultValue={medicalHistory?.id}
          >
            <SelectTrigger className="w-full mt-2 flex-1">
              <SelectValue placeholder="Histórico" />
            </SelectTrigger>
            <SelectContent>
              {MedicalHistoryMock.map((medicalHistory) => (
                <SelectItem key={medicalHistory.id} value={medicalHistory.id}>
                  {medicalHistory.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full">
        <Card className="w-full">
          <CardContent className="flex flex-col gap-4">
            <SimulationStepStatus />
            <Link to={"/simulacao/simulation-id-1"} className="w-full">
              <Button
                className="w-full"
                disabled={!medical || !medicalHistory || !medicalScenery}
              >
                Iniciar simulação
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
