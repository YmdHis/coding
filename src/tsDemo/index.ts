import { Countdown, CountdownEventName, fillZero } from './countdown';

let timeDisplay: string = '';
function doSometing() {
  const countdown = new Countdown(Date.now() + 60 * 60 * 1000, 10);
  countdown.on(CountdownEventName.RUNNING, (remainTimeData) => {
      const { hours, minutes, seconds, count} = remainTimeData;
      timeDisplay = [hours, minutes, seconds, count].map(fillZero).join(':');
  });
}

doSometing()