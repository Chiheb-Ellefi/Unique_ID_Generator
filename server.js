import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/generateIDs.js";
import { config } from "./config/config.js";
import fs from "node:fs";
import { client } from "./config/redisClient.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import "express-async-errors";
dotenv.config();

const app = express();
app.use(cors());
app.use("/", router);
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);
config.__dirname = __dirname;
let lua = {
    script: fs.readFileSync(__dirname + "/src/script/script.lua", "utf8"),
    sha: null,
};
const start = async() => {
    app.listen(port, async() => {
        try {
            client.scriptLoad(lua.script).then((sha) => {
                lua.sha = sha;
                config.lua = lua;
                console.log(`Script loaded ${lua.sha}`);
                console.log(`Server listening on port ${port}`);
            });
        } catch (error) {
            console.log(error);
        }
    });
};
start();