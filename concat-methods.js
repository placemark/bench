const b = require("benny");
const fs = require("fs");

b.suite(
  "Concat methods",
  b.add(".concat", () => {
    const a = Array.from({ length: 10000 }, (_x, i) => i);
    const b = Array.from({ length: 10000 }, (_x, i) => i * 3);

    return () => {
      a.concat(b);
    };
  }),
  b.add("spread", () => {
    const a = Array.from({ length: 10000 }, (_x, i) => i);
    const b = Array.from({ length: 10000 }, (_x, i) => i * 3);

    return () => {
      [...a, ...b];
    };
  }),
  b.add("push", () => {
    const a = Array.from({ length: 10000 }, (_x, i) => i);
    const b = Array.from({ length: 10000 }, (_x, i) => i * 3);

    return () => {
      let res = [];
      for (let item of a) {
        res.push(item);
      }
      for (let item of b) {
        res.push(item);
      }
    };
  }),
  b.add("push for", () => {
    const a = Array.from({ length: 10000 }, (_x, i) => i);
    const b = Array.from({ length: 10000 }, (_x, i) => i * 3);

    return () => {
      let res = [];
      for (let i = 0; i < a.length; i++) {
        res.push(a[i]);
      }
      for (let i = 0; i < b.length; i++) {
        res.push(b[i]);
      }
    };
  }),
  b.cycle(),
  b.complete()
);
