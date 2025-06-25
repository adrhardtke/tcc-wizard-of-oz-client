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
import { ChevronLeft, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";

export default function NewSimulation() {
  return (
    <div className="flex flex-col gap-8">
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
          <div className="flex items-center gap-2 mt-4">
            <Select>
              <SelectTrigger className="w-full mt-2 flex-1">
                <SelectValue placeholder="Alunos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Joao Silva</SelectItem>
                <SelectItem value="dark">Maria Souza</SelectItem>
                <SelectItem value="system">John Doe</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">ou</span>
            <Button variant={"link"}>Cadastro novo aluno</Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="text-xl font-medium">Cenário clínico</h3>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex">
              <p className="w-[180px] text-muted-foreground">Cenário:</p>
              <span>Paciente com apendicite</span>
            </div>
            <div className="flex">
              <p className="w-[180px] text-muted-foreground">
                Sintomas iniciais:
              </p>
              <span>Dor abdominal intensa, febre moderada.</span>
            </div>
            <Button variant={"link"} className="w-fit pl-0">
              ver mais
            </Button>
          </div>
          <Select>
            <SelectTrigger className="w-full mt-2 flex-1">
              <SelectValue placeholder="Cenário clínico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Paciente com apendicite</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="text-xl font-medium">Histórico médico</h3>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex">
              <p className="w-[180px] text-muted-foreground">Histórico:</p>
              <span>Sem comorbidades conhecidas</span>
            </div>
          </div>
          <Select>
            <SelectTrigger className="w-full mt-2 flex-1">
              <SelectValue placeholder="Histórico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Sem comorbidades conhecidas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-full">
        <Card className="w-full">
          <CardContent className="flex flex-col gap-4">
            <SimulationStepStatus />
            <Button className="w-full">Salvar e iniciar simulação</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
