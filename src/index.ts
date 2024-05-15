import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./routes/router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use(Router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Add 2 numbers
 * @param a 
 * @param b 
 * @returns the sum of number
 */
function sum(a: number, b: number) {
	return a + b;
}

console.log(sum(2, 2));