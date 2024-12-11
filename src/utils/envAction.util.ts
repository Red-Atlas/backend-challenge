import args from "./args.util";

(() => {
  if (args.env == "development" || args.env == "test") {
    require("./loadEnv.util");
  }
})();
