/**
 * caution: this implementation doesn't follow good practises in Reactive Programming.
 * In this first version, we focus on implementing simple observables.
 * As we progress in this learning, we will use established rules and good practises in
 * Reactive Programming.
 */

/**
 * caution: this implementation doesn't follow good practises in Reactive Programming.
 * In this first version, we focus on implementing simple observables.
 * As we progress in this learning, we will use established rules and good practises in
 * Reactive Programming.
 */
// import {btnStart$, btnCancel$, timerDisplay, millisecondsToStr} from "./utils";
// import {interval} from "rxjs";
// import {mapTo} from "rxjs/operators";
// import {switchTo} from "./lib/switchTo";
// import {ISubscription} from "./types";

// let subscription = null;
// const interval$ = interval(1000).pipe(mapTo(10));

// btnStart$.subscribe({
//   next() {
//     subscription = interval$.subscribe(counter => {
//       timerDisplay.textContent = millisecondsToStr(counter);
//     });
//   },
//   complete() {
//     console.log("completed");
//   },
// });

// btnCancel$.subscribe({
//   next() {
//     subscription.unsubscribe();
//   },
// });

import {interval} from "./lib/interval";
import {Observable} from "./lib/observable";
// import {switchTo} from "./lib/switchTo";
import {IObserver, ISubscription} from "./types";
import {btnStart$, btnCancel$, timerDisplay, millisecondsToStr} from "./utils";

function switchTo(obs1$: Observable, obs2$: Observable) {
  return {
    subscribe: (observer: Partial<IObserver>): ISubscription => {
      // obs1$.subscribe(data => observer.next(data));
      let sub2;
      const observer1 = {
        next() {
          sub2 = obs2$.subscribe({
            next(data) {
              observer.next(data);
            },
          });
        },
      };
      const sub1 = obs1$.subscribe(observer1);

      return {
        unsubscribe() {
          sub1.unsubscribe();
          sub2.unsubscribe();
          observer.complete();
        },
      };
    },
  };
}

const observer = {
  next(period) {
    timerDisplay.textContent = millisecondsToStr(period);
  },
  complete() {
    console.log("completed");
  },
};

let subscription: ISubscription = switchTo(btnStart$, interval(1000)).subscribe(
  observer
);

btnCancel$.subscribe({
  next() {
    subscription.unsubscribe();
  },
});
