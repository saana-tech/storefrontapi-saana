import moment from "moment";
import "moment/locale/es";
moment().locale("es");

export const generateSchedule = (openingTime, closeTime) => {
  let a = formatMoment(openingTime);
  let c = formatMoment(closeTime);

  return function (hora) {
    const h = formatMoment(hora);

    if (a > c) {
      return h >= a || h <= c;
    }

    return h >= a && h <= c;
  };
};
const formatMoment = (time) => {
  const regexp = /\d\d:\d\d(:\d\d)?/;
  if (regexp.test(time)) {
    const units = time.split(":");
    return +units[0] * 3600 + +units[1] * 60 + (+units[2] || 0);
  }
  return null;
};
//let openHour = generateSchedule('09:00', '02:00');
//openHour('24:00');
