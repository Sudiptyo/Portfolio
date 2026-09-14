import { configureSync, getConsoleSink, getLogger } from "@logtape/logtape";

configureSync({
  sinks: {
    console: getConsoleSink({
      nonBlocking: true,
    }),
  },

  loggers: [
    {
      category: ["portfolio"],
      lowestLevel: import.meta.env.DEV ? "debug" : "info",
      sinks: ["console"],
    },
  ],
});

export const logger = getLogger(["portfolio"]);
export const apiLogger = getLogger(["portfolio", "api"]);
export const authLogger = getLogger(["portfolio", "auth"]);
export const uiLogger = getLogger(["portfolio", "ui"]);
