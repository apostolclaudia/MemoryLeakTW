import express, { Request, Response } from "express";
import router from "./routes";
import bodyParser from "body-parser";
import { authenticateToken } from "./utils/jwt";
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

app.use("/api", authenticateToken, router);
