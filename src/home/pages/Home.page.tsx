import { SimulationStepStatus } from "@/components/SimulationStepStatus";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSimulationConfigStore } from "@/store/simulation-config.store";
import { Link } from "react-router-dom";

export default function Home() {
  const { medical, medicalScenery, medicalHistory } =
    useSimulationConfigStore();

  const buttonText =
    !medical && !medicalScenery && !medicalHistory
      ? "Configurar simulação"
      : "Iniciar simulação";

  return (
    <div className="flex flex-col gap-8 max-w-3xls">
      <div>
        <h1 className="text-2xl font-medium">Olá professor</h1>
        <p className="text-muted-foreground max-w-2xl">
          Estamos empolgados para começar sua próxima simulação. Nosso guia
          rápido vai te ajudar a configurar um cenário clínico e iniciar o
          atendimento com o aluno médico.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-medium">Guia Rápido</h2>
        <p className="text-muted-foreground max-w-2xl">
          Vamos te guiar pelos três passos essenciais para iniciar uma
          simulação:
        </p>
      </div>

      <SimulationStepStatus />
      <Link to={"/nova-simulacao"} className="w-full">
        <Button className="w-full">{buttonText}</Button>
      </Link>
      <Separator />

      {/* <div>
        <Drawer open={false}>
          <DrawerContent className="w-full h-[900px]">
            <TalkFlow />
          </DrawerContent>
        </Drawer>
      </div> */}

      {/* <div>
        <div className="flex items-center gap-2 mb-4">
          <History size={18} />
          <h3 className="text-md font-medium">Histórico de Simulações</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Médico</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Cenário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Joao Silva</TableCell>
              <TableCell>25/04/2025</TableCell>
              <TableCell>Hipoglicemia</TableCell>
              <TableCell>Conluído</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div> */}
    </div>
  );
}
