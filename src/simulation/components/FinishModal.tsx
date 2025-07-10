import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSimulationStore } from "@/store/simulation-store";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FinishModalProps = {
  open: boolean;
  timer: string;
};

export function FinishModal({ open, timer }: FinishModalProps) {
  const { simulation } = useSimulationStore();
  const nav = useNavigate();

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Resumo do Desempenho</DialogTitle>
        </DialogHeader>
        <Trophy size={64} className="mx-auto my-4 text-yellow-500" />
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="">Aluno</Label>
            <Separator className="flex-1" />
            <Label htmlFor="">{simulation?.medical.name}</Label>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="">Cenário</Label>
            <Separator className="flex-1" />
            <Label htmlFor="">{simulation?.scenery?.title}</Label>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="">Duração</Label>
            <Separator className="flex-1" />
            <Label htmlFor="">{timer}</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => nav("/")} className="w-full">
            Concluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
