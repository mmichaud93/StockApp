import * as dotenv from "dotenv";
import { Api } from "./Api";

// we will keep all of our environemtn variables in the .env and use dotenv to load them into node process.env
dotenv.config();

// start the server
new Api().start();
