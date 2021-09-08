import { IObserver } from "../types";
import { fromEvent } from "./fromEvent";
import { interval } from "./interval";
import { Observable } from "./observable";
import { switchTo } from "./switchTo";
describe("SwitchTo operator", () => {
  it("should be a function", () => {
    expect(typeof switchTo).toEqual("function");
  });

  it("should take 2 arguments", () => {
    expect(switchTo.length).toEqual(2);
  });

  it("should return a new Observable", () => {
    // Given
    const event$ = fromEvent(document.head, "click");
    const interval$ = interval(1000);

    // When
    const actual = switchTo(event$, interval$);

    // Then
    expect(actual).toBeDefined();
    expect(actual instanceof Observable).toBe(true);
  });

  it("should emit value from the second argument when the first argument emits", (done) => {
    // Given
    const head = document.head;
    const event$ = fromEvent(head, "click");
    const interval$ = interval(1000);

    // Then
    const observer: Partial<IObserver> = {
      next(value: number) {
        expect(value).toBeDefined();
        expect(typeof value).toBe("number");
        done();
      },
    };

    // When
    switchTo(event$, interval$).subscribe(observer);
    head.click();
  });

  it("should stop emitting data when the subscribe function is called", (done) => {
    // Given
    const head = document.head;
    const event$ = fromEvent(head, "click");
    const interval$ = interval(1000);
    const actual: number[] = [];
    const expected: number[] = [0, 1, 2];

    // Then
    const observer: Partial<IObserver> = {
      next(value: number) {
        actual.push(value);
      },
      complete() {
        expect(actual).toEqual(expected);
        done();
      },
    };

    // When
    const subscription = switchTo(event$, interval$).subscribe(observer);
    head.click();

    setTimeout(() => {
      subscription.unsubscribe();
    }, 4000);
  });
});
