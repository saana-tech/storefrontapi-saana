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
};
