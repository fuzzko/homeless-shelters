// biome-ignore lint/suspicious/noExplicitAny: passing to setTimeout
export function debounce(cb: () => void, ms: number): (...rest: any[]) => void {
  let timeout: Timer;
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

export function log(
  // biome-ignore lint/suspicious/noExplicitAny: this is a log function
  text: any | any[],
  func: "log" | "warn" | "error" = "log",
): void {
  shelter.util.log(`[${shelter.plugin.id}] ${text}`, func);
}
