import { db, port } from "./config/config";
import app from "./app";
import Logger from "./core/Logger";

app
  .listen(port, () => {
    Logger.info(`server running on port : ${port}`);
  })
  .on("error", (e) => Logger.error(e));
