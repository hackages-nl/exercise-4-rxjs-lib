import { Observable } from "./observable";
import { IObserver, ISubscription } from "../types";

describe("Observable", () => {
  function producer(observer: IObserver): ISubscription {
    return { unsubscribe() {} };
  }

  it("should be a class or a function", () => {
    expect(typeof Observable).toEqual("function");
  });

  describe("constructor", () => {
    it("should take one argument", () => {
      // given
      const actual = new Observable(producer);
      expect(Observable.length).toEqual(1);
      expect(actual instanceof Observable).toEqual(true);
    });
  });
  describe("subscribe function", () => {
    let observable: Observable;
    beforeEach(() => {
      observable = new Observable(producer);
    });
    it("should be a function", () => {
      expect(typeof observable.subscribe).toEqual("function");
    });

    it("should take one argument", () => {
      expect(observable.subscribe.length).toEqual(1);
    });
    it("should be called with an observer", () => {
      // Given
      const observer = { next() {}, error() {}, complete() {} };
      const spyObservable = jest.spyOn(observable, "subscribe");
      // When
      observable.subscribe(observer);
      expect(spyObservable).toHaveBeenCalledWith(observer);
    });
    it("should return a subscription", () => {
      // Given
      const observer = { next() {}, error() {}, complete() {} };

      // When
      const subscription = observable.subscribe(observer);

      // Then
      expect(typeof subscription.unsubscribe).toEqual("function");
      expect(subscription.unsubscribe.length).toEqual(0);
    });

    it("should call the producer", () => {
      // Given
      const observer = { next() {}, error() {}, complete() {} };
      const producerSpy = jest.spyOn(observable, "producer");

      // When
      observable.subscribe(observer);

      // Then
      expect(producerSpy).toHaveBeenCalled();
      expect(producerSpy).toHaveBeenCalledWith(observer);
    });
  });
});
