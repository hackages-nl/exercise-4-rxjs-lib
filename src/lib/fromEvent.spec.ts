import { fromEvent } from "./fromEvent";

describe("fromEvent", () => {
  it("should emit an event when clicked and complete on unsubscribe", (done) => {
    // Given the source$
    const source$ = fromEvent(document.head, "click");

    // Then
    const subscription = source$.subscribe({
      next(event: any) {
        expect(event).toBeTruthy();
        expect(event instanceof Event).toBe(true);
      },
      complete() {
        done();
      },
    });

    // When
    document.head.click();
    subscription.unsubscribe();
  });

  it("should emit an error when it receives the wrong argument then complete", () => {
    // Given the source$
    let hit = false;

    // When
    const source$ = fromEvent({} as any, "click");

    // Then
    source$.subscribe({
      error(err: any) {
        expect(err).toBeTruthy();
        expect(typeof err).toEqual("string");
        expect(err).toEqual("You should provide a valid html element");
      },
      complete() {
        hit = true;
      },
    });

    expect(hit).toBe(true);
  });
});
