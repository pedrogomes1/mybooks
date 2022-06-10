import { useEffect, useState } from "react";

const TIME_IN_MILLISECONDS_TO_DEFAULT_DELAY = 500;

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value),
      delay || TIME_IN_MILLISECONDS_TO_DEFAULT_DELAY
    );

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
