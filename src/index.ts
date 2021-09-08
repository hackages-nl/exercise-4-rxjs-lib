/**
 * caution: this implementation doesn't follow good practises in Reactive Programming.
 * In this first version, we focus on implementing simple observables.
 * As we progress in this learning, we will use established rules and good practises in
 * Reactive Programming.
 */
 import { interval } from "./lib/interval";
 import { switchTo } from "./lib/switchTo";
 import { ISubscription } from "./types";
 import {
   btnStart$,
   btnCancel$,
   timerDisplay,
   millisecondsToStr,
 } from "./utils";
 import "hackjam-banner";
 
 let subscription: ISubscription = switchTo(btnStart$, interval(1000)).subscribe(
   {
     next(period) {
       timerDisplay.textContent = millisecondsToStr(period);
     },
     complete() {
       console.log("completed");
     },
   }
 );
 
 btnCancel$.subscribe({
   next() {
     subscription.unsubscribe();
   },
 });
 