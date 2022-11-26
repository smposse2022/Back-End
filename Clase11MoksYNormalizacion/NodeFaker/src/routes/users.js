import express from "express";
import { UserMock } from "../Moks/userMoks.js";
const userRouter = express.Router();

const userApi = new UserMock();

// ?cant=20     - Query param
userRouter.post("/generar-usuarios", (req, res) => {
  const { cant } = req.query;
  let result = userApi.populate(parseInt(cant));
  res.send(result);
});

userRouter.get("/", (req, res) => {
  let users = userApi.getAll();
  res.send(users);
});

export { userRouter };
