export function millisecondsToStr(milliseconds: number): string {
  let temp = milliseconds;

  const seconds = (temp % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const minutes = Math.floor((temp %= 3600) / 60);

  if (minutes) {
    return (
      minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      ":" +
      seconds
    );
  }
  return "00" + ":" + seconds;
}
