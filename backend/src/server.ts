import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import express from "express";
import helmet from "helmet";
import { Server } from "http";
import morgan from "morgan";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { postgres } from "../ormconfig";
import routes from "./routes";

const corsOptions: CorsOptions = {
  origin:
    process.env.NODE_ENV === "production" ? /.*campusimpact\.org.sg.*/ : "*",
};

export class ApiServer {
  public connection: Connection | null = null;

  public server: Server | null = null;

  async initialize(port: number = 3001): Promise<void> {
    this.connection = await createConnection(postgres);

    const app = express();
    app.use(bodyParser.json({ limit: "20mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
    app.use(cors(corsOptions));
    app.use(helmet());
    if (process.env.NODE_ENV !== "test") {
      console.log(`Express server has started on port ${port}.`);
      app.use(morgan("dev"));
    }
    app.use("/", routes);

    this.server = app.listen(port);
    this.server.timeout = 1200000;
  }

  async close(): Promise<void> {
    this.connection && (await this.connection.close());
    this.server && this.server.close();
  }
}

export default ApiServer;
