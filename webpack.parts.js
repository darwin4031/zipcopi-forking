const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "~config": path.resolve(__dirname, "config"),
      "~context": path.resolve(__dirname, "context"),
      "~components": path.resolve(__dirname, "components"),
      "~hooks": path.resolve(__dirname, "hooks"),
      "~utils": path.resolve(__dirname, "utils"),
      "~styles": path.resolve(__dirname, "styles"),
    },
  },
};
