"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState, useRef } from "react";

type SimulatorPressableButtonProps = {
  children?: React.ReactNode;
  className?: string;
  onPress: () => void;
  withAnimation?: boolean;
};

export function SimulatorPressableButton({
  children,
  className,
  onPress,
  withAnimation = false,
}: SimulatorPressableButtonProps) {
  if (withAnimation) {
    return (
      <SimulatorActionButtonWithAnimation
        onPress={onPress}
        className={className}
      >
        {children}
      </SimulatorActionButtonWithAnimation>
    );
  }

  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const holdDuration = 1000; // 1 segundos para completar

  const startHold = () => {
    setHolding(true);
    const startTime = Date.now();

    const update = () => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / holdDuration) * 100, 100);
      setProgress(percentage);

      if (percentage < 100) {
        timeoutRef.current = setTimeout(update, 16);
      } else {
        handleConfirm();
      }
    };

    update();
  };

  const cancelHold = () => {
    setHolding(false);
    setProgress(0);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleConfirm = () => {
    console.log("Ação confirmada!");
    onPress();
    setTimeout(() => {
      setProgress(0);
      setHolding(false);
    }, 1000); // Simula um atraso de 1 segundo para a ação ser confirmada
  };

  return (
    <div className="relative">
      <Button
        className={["w-full relative overflow-hidden", className].join(" ")}
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onMouseLeave={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        variant={"outline"}
      >
        <motion.div
          className="absolute left-0 top-0 h-full bg-green-500 z-0 w-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
        <span className="relative z-10 w-full">
          {progress >= 100 ? (
            <div className="flex items-center justify-center w-max">
              <Check />
              <p className="invisible">ação executada</p>
            </div>
          ) : (
            children
          )}
        </span>
      </Button>
    </div>
  );
}

const SimulatorActionButtonWithAnimation = ({
  onPress,
  className,
  children,
}: SimulatorPressableButtonProps) => {
  const [showButton, setShowButton] = useState(true);
  const handlePress = () => {
    onPress();
    setShowButton(false);
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 500, rotate: 10 }} // anima para a direita e com leve rotação
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full"
        >
          <SimulatorPressableButton onPress={handlePress} className={className}>
            {children}
          </SimulatorPressableButton>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
