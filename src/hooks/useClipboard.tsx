import { useState, useCallback, useEffect } from "react";

/**
 * Custom React hook for managing clipboard state.
 * @param initialValue - The initial value to be stored in the clipboard.
 * @returns A tuple containing the current value and a setter function.
 */
function useClipboard(
  initialValue: string
): [string, (value: string | ((val: string) => string)) => Promise<void>] {
  const [clipboardValue, setClipboardValue] = useState<string>(initialValue);

  // Reads the clipboard content and updates the state
  const readClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard) {
        const text = await navigator.clipboard.readText();
        setClipboardValue(text);
      } else {
        console.error("Clipboard API not supported");
      }
    } catch (error) {
      console.error("Failed to read clipboard contents:", error);
    }
  }, []);

  // Sets a new value in the clipboard and updates the state
  const setClipboard = useCallback(
    async (value: string | ((val: string) => string)) => {
      const valueToStore =
        typeof value === "function" ? value(clipboardValue) : value;

      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(valueToStore);
          setClipboardValue(valueToStore);
        } else {
          console.error("Clipboard API not supported");
        }
      } catch (error) {
        console.error("Failed to write to clipboard:", error);
      }
    },
    [clipboardValue]
  );

  useEffect(() => {
    readClipboard();
  }, [readClipboard]);

  return [clipboardValue, setClipboard];
}

export { useClipboard };
