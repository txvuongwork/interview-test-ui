import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { RefObject } from "react";
import { useEventListener } from "usehooks-ts";
import { format } from "date-fns";
import { DATE_FORMATS } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatWithDateFns(
  date: Date,
  type: string = DATE_FORMATS.DEFAULT
) {
  return format(date, type);
}

type EventType =
  | "mousedown"
  | "mouseup"
  | "touchstart"
  | "touchend"
  | "focusin"
  | "focusout";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | RefObject<T | null>[],
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = "mousedown",
  eventListenerOptions: AddEventListenerOptions = {}
): void {
  useEventListener(
    eventType,
    (event) => {
      const target = event.target as Node;

      // Do nothing if the target is not connected element with document
      if (!target || !target.isConnected) {
        return;
      }

      const isOutside = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r?.current))
            .every((r) => r.current && !r.current.contains(target))
        : ref?.current && !ref?.current?.contains(target);

      if (isOutside) {
        handler(event);
      }
    },
    undefined,
    eventListenerOptions
  );
}
