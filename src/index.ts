/**
 * caution: this implementation doesn't follow good practises in Reactive Programming.
 * In this first version, we focus on implementing simple observables.
 * As we progress in this learning, we will use established rules and good practises in
 * Reactive Programming.
 */
import {btnStart$, btnCancel$, timerDisplay, millisecondsToStr} from "./utils";
import "hackjam-banner";

let counter = 0,
  id: NodeJS.Timeout = null;

btnStart$.subscribe({
  next() {
    id = setInterval(() => {
      timerDisplay.textContent = millisecondsToStr(counter++);
    }, 1000);
  },
  complete() {
    console.log("completed");
  },
});

btnCancel$.subscribe({
  next() {
    clearInterval(id);
  },
});
