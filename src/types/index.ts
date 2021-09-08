export interface IObserver<T = any> {
  next(value: T): any;
  error(error: any): any;
  complete(): any;
}

export interface ISubscription {
  unsubscribe(): void;
}

export interface IProducer {
  (observer: Partial<IObserver>): ISubscription;
}
