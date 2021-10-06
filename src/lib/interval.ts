import {IObserver, ISubscription} from "../types";
import {Observable} from "./observable";

export function interval(period: number) {
  let count = 0;
  function intervalProducer(observer: Partial<IObserver>): ISubscription {
    const id = setInterval(() => observer.next(count++), period);
    return {
      unsubscribe() {
        clearInterval(id);
        observer.complete();
      },
    };
  }

  return new Observable(intervalProducer);
}
