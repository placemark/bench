const b = require("benny");
const fs = require("fs");

function indentString(string, count = 1, options = {}) {
  const { indent = " ", includeEmptyLines = false } = options;

  if (typeof string !== "string") {
    throw new TypeError(
      `Expected \`input\` to be a \`string\`, got \`${typeof string}\``
    );
  }

  if (typeof count !== "number") {
    throw new TypeError(
      `Expected \`count\` to be a \`number\`, got \`${typeof count}\``
    );
  }

  if (count < 0) {
    throw new RangeError(
      `Expected \`count\` to be at least 0, got \`${count}\``
    );
  }

  if (typeof indent !== "string") {
    throw new TypeError(
      `Expected \`options.indent\` to be a \`string\`, got \`${typeof indent}\``
    );
  }

  if (count === 0) {
    return string;
  }

  const regex = includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;

  return string.replace(regex, indent.repeat(count));
}

function incrementalNoIndent(obj) {
  let str = `{
  "type": "FeatureCollection",
  "features": [`;

  for (let i = 0; i < obj.features.length; i++) {
    if (i < obj.features.length - 1) str += ",\n";
    str += JSON.stringify(obj.features[i], null, 2);
  }

  return (
    str +
    `  ]
}`
  );
}

function incrementalSingleIndent(obj) {
  let str = `{
  "type": "FeatureCollection",
  "features": [`;
  let features = "";

  for (let i = 0; i < obj.features.length; i++) {
    if (i > 0) str += ",\n";
    features += JSON.stringify(obj.features[i], null, 2);
  }

  return (
    str +
    indentString(features) +
    `  ]
}`
  );
}

function incremental(obj) {
  let str = `{
  "type": "FeatureCollection",
  "features": [`;

  for (let i = 0; i < obj.features.length; i++) {
    if (i < obj.features.length - 1) str += ",\n";
    str += indentString(JSON.stringify(obj.features[i], null, 2), 2);
  }

  return (
    str +
    `  ]
}`
  );
}

b.suite(
  "JSON partial stringify",
  b.add("Single JSON pass", () => {
    const gj = JSON.parse(fs.readFileSync("./example.geojson"));

    return () => {
      JSON.stringify(gj);
    };
  }),
  b.add("Incremental", () => {
    const gj = JSON.parse(fs.readFileSync("./example.geojson"));

    return () => {
      incremental(gj);
    };
  }),
  b.add("Incremental no indent", () => {
    const gj = JSON.parse(fs.readFileSync("./example.geojson"));

    return () => {
      incrementalNoIndent(gj);
    };
  }),
  b.add("Incremental single indent", () => {
    const gj = JSON.parse(fs.readFileSync("./example.geojson"));

    return () => {
      incrementalSingleIndent(gj);
    };
  }),
  b.add("Stringify single feature", () => {
    const gj = JSON.parse(fs.readFileSync("./example.geojson"));

    return () => {
      indentString(JSON.stringify(gj.features[2]));
    };
  }),
  b.cycle(),
  b.complete()
);
