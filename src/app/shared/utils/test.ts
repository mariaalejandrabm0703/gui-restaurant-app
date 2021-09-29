export const setTextEvent = (identifier: string, text: string) => ({
  persist: () => {
    // This is intentional
  },
  target: {
    name: identifier,
    value: text,
  },
});