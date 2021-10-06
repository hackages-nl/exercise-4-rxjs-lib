import {IObserver, ISubscription} from "../types";

export class Observable {
  constructor(
    public producer: (observer: Partial<IObserver>) => ISubscription
  ) {}

  subscribe(observer: Partial<IObserver>): ISubscription {
    this.producer(observer);
    return {
      unsubscribe() {},
    };
  }
}
