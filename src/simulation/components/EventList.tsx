import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSimulationStore } from "@/store/simulation-store";
import { getHours, getMinutes, getSeconds } from "date-fns";

export function EventList() {
  const { events } = useSimulationStore();

  const getEventTypeLabel = (type: "talk" | "reaction" | "symptom") => {
    switch (type) {
      case "talk":
        return "Fala";
      case "reaction":
        return "Reação";
      case "symptom":
        return "Sintoma";
      default:
        return "Desconhecido";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = getHours(date).toString().padStart(2, "0");
    const minutes = getMinutes(date).toString().padStart(2, "0");
    const seconds = getSeconds(date).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Table>
      <TableCaption>Lista de eventos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Evento</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event, index) => (
          <TableRow key={`event-${index}-${event.id}`}>
            <TableCell className="font-medium">{event.description}</TableCell>
            <TableCell>Executado</TableCell>
            <TableCell>{getEventTypeLabel(event.type)}</TableCell>
            <TableCell className="text-right">
              {formatTimestamp(event.timestamp)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
