export function debounce(cb: () => void, ms: number): (...rest: any[]) => void {
  let timeout: number;
  return (...rest) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(cb, ms, ...rest);
  };
}

export function setIndex<T>(array: T[], idx: number, value: T): T[] {
  return array.map((thisValue, thisIdx) =>
    thisIdx === idx ? value : thisValue,
  );
}
