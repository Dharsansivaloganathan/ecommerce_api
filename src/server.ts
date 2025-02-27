import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import sequelize from "./config/database";
import routes from "./routes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api", routes);

setupSwagger(app);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("Database connection error:", err));

export default app;