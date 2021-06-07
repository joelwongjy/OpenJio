import { Router } from "express";
import auth from "./auth";
import users from "./users";
import jios from "./jios";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", users);
routes.use("/jios", jios);

export default routes;
