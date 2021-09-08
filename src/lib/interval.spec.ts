import { IObserver } from "../types";
import { interval } from "./interval";

describe("interval:", () => {
  it("should emit the sequence of values at 200-miliseconds interval", (done) => {
    const source$ = interval(200);
    let result: number[] = [];
    const actual = [0, 1, 2];

    const observer: Partial<IObserver> = {
      next: (val: number) => {
        result = [...result, val];
      },
    };

    const { unsubscribe } = source$.subscribe(observer);

    setTimeout(() => {
      unsubscribe();
      expect(actual).toEqual(result);
      done();
    }, 700);
  });

  it("should complete after unsubscribe", (done) => {
    const source$ = interval(200);
    let result: number[] = [];
    const actual = [0, 1, 2, 3];

    const observer: IObserver = {
      next: (val: number) => {
        result = [...result, val];
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    };

    const complete = jest.spyOn(observer, "complete");
    const { unsubscribe } = source$.subscribe(observer);

    setTimeout(() => {
      unsubscribe();
      expect(actual).toEqual(result);
      expect(complete).toHaveBeenCalled();
      done();
    }, 900);
  });
});
