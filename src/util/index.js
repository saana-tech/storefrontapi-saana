import moment from "moment";

const formatMoment = (time) => {
  const regexp = /\d\d:\d\d(:\d\d)?/;
  if (regexp.test(time)) {
    const units = time.split(":");
    return +units[0] * 3600 + +units[1] * 60 + (+units[2] || 0);
  }
  return null;
};

export default {
  formatCOP: (number) => {
    let num = Number(number);
    let p = num.toFixed(2).split(".");
    return (
      "$" +
      p[0]
        .split("")
        .reverse()
        .reduce(function (acc, num, i) {
          return num === "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
        }, "")
    );
  },

  dateFormat: (date) => {
    if (!date) {
      return null;
    }
    let newDateFormat = moment(date).format("L");
    return newDateFormat;
  },
  capitalize: (text = "") => {
    let capitalizeText = "";
    if (typeof text === "string") {
      capitalizeText = text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return capitalizeText;
    } else {
      return text;
    }
  },
  create_number: () => {
    let date = new Date().getTime();
    const numberSort = "xxx".replace(/[xy]/g, function () {
      const r = (date + Math.random() * 9) % 9 | 0;
      date = Math.floor(date / 9);
      return r;
    });
    return numberSort;
  },

  openWebTab: (link) => {
    window.open(link, "_blank");
  },
  generateSchedule: (openingTime, closeTime) => {
    let a = formatMoment(openingTime);
    let c = formatMoment(closeTime);

    return function (hora) {
      const h = formatMoment(hora);

      if (a > c) {
        return h >= a || h <= c;
      }

      return h >= a && h <= c;
    };
  },

  resetString: (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },
  genereID: () => {
    let date = new Date().getTime();
    const uuid = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  },
  genereIdMin: () => {
    let date = new Date().getTime();
    const uuid = "xxxxxx".replace(/[xy]/g, function (c) {
      const r = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  },
  get_fileExtension: (filename) => {
    return filename.split(".").pop();
  },
  validateEmail: (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
};
