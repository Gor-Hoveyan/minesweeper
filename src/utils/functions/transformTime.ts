export default function transformTime(time: number): string {
  let minutes: number | string = Math.floor(time / 60);
  let seconds: number | string = time % 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
}
