import {IObserver, ISubscription} from "../types";
import {Observable} from "./observable";

export function fromEvent(
  el: HTMLElement,
  eventName: "click" | "change" | "error" | "input"
) {
  const fromEventProducer = (observer: Partial<IObserver>): ISubscription => {
    try {
      el.addEventListener(eventName, observer.next);
    } catch {
      observer.error("You should provide a valid html element");
      observer.complete();
    }
    return {
      unsubscribe: () => {
        observer.complete();
      },
    };
  };
  return new Observable(fromEventProducer);
}
