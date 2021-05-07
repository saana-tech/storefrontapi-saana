import moment from "moment";

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
};
