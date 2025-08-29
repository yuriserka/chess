import { useEffect, useState } from "react";

type Props = {
  isRunning: boolean;
  initialTime: number;
  lastMoveTimestamp: number;
  className?: string;
  onTimeOver?: () => void;
};

export function Clock({
  isRunning,
  initialTime,
  lastMoveTimestamp,
  className,
  onTimeOver,
}: Props) {
  const remainingTime = initialTime - (Date.now() - lastMoveTimestamp) / 1000;
  const [time, setTime] = useState(remainingTime);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((time) => Math.max(time - 1, 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (time <= 0) {
      onTimeOver?.();
    }
  }, [time, onTimeOver]);

  return (
    <div
      className={`text-2xl font-bold bg-gray-300 rounded-md p-2 text-red-500 ${className}`}
    >
      {String(Math.floor(time / 60)).padStart(2, "0")}:{" "}
      {String(Math.floor(time % 60)).padStart(2, "0")}
    </div>
  );
}
