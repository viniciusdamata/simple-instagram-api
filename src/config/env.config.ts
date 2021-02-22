import { config } from "dotenv";

config({
  path: ((): string => {
    switch (process.env.NODE_ENV) {
      case "dev":
        return ".env.development";
      case "prod":
        return ".env.production";
      default:
        return "";
    }
  })(),
});

