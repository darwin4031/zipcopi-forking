import { useEffect, useState } from "react";
import { useRef } from "react";

/**
 * Timer Component
 * @param {Object} props
 * @param {String} props.className
 * @param {Number} props.duration duration in seconds
 * @param {Function} props.onTimeout callback function
 */
const Timer = ({ className, duration, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(duration);
  const timerIntervalRef = useRef();
  const convertTo2Digit = (number) => (number < 10 ? `0${number}` : number);

  const destroyTimerInterval = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  };

  useEffect(() => {
    if (!timerIntervalRef.current) {
      timerIntervalRef.current = setInterval(() => {
        let newRemainingTime = remainingTime - 1;

        if (newRemainingTime >= 0) {
          setRemainingTime(newRemainingTime);
        } else {
          destroyTimerInterval();
          if (typeof onTimeout === "function") onTimeout();
        }
      }, 1000);
    }

    return () => destroyTimerInterval();
  }, [timerIntervalRef, remainingTime]);

  const remainingHour = Math.floor(remainingTime / 3600);
  const remainingMinute = Math.floor((remainingTime - remainingHour * 3600) / 60);
  const remainingSecond = remainingTime - remainingHour * 3600 - remainingMinute * 60;
  const remainingHourTxt = convertTo2Digit(remainingHour);
  const remainingMinTxt = convertTo2Digit(remainingMinute);
  const remainingSecTxt = convertTo2Digit(remainingSecond);

  return (
    <div className={className}>
      <span>{`${remainingHourTxt}:${remainingMinTxt}:${remainingSecTxt}`}</span>
    </div>
  );
};

export default Timer;
