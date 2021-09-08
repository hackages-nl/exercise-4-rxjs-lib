import {fromEvent} from "../lib/fromEvent";

const btnStart = document.getElementById("btnStart");
// transform the start button into an observable
export const btnStart$ = fromEvent(btnStart, "click");

// Display the timer
export const timerDisplay = document.querySelector(".timer-content > h1");

const btnCancel = document.getElementById("btnCancel");

// transform the cancel button into an observable
export const btnCancel$ = fromEvent(btnCancel, "click");

const btnPause = document.getElementById("btnPause");
export const btnPause$ = fromEvent(btnPause, "click");
