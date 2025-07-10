import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type TimerProps = {
  onStopTimer?: (time: string) => void;
  isFinished?: boolean;
};

export function Timer({ onStopTimer, isFinished }: TimerProps) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    if (isFinished) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (onStopTimer) {
        onStopTimer(formatTime(secondsElapsed));
      }
    }
  }, [isFinished, secondsElapsed, onStopTimer]);

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <div
      style={{ textAlign: "center", fontFamily: "Arial" }}
      className="flex gap-2"
    >
      <h2>{formatTime(secondsElapsed)}</h2>
      <button onClick={toggleRunning}>
        {isRunning ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
}
