import { getTimestamp } from "../service/getTimestamp.js";
import { client } from "../../config/redisClient.js";
import { config } from "../../config/config.js";
import fs from "node:fs";
import LimitReachedError from "../error/limiReachedError.js";
export const generateID = async (req, res) => {
  const now = getTimestamp();
  const serverID = `${config.datacenterId}${config.machineId}`;
  const key = `counter:${serverID}`;
  const lua = config.lua;
  const newCounter = await client.EVALSHA(lua.sha, {
    keys: [key],
  });
  if (newCounter == -1)
    throw new LimitReachedError("Too many requests, try again later.");

  const id = `${0}${now}${serverID}${newCounter}`;
  fs.appendFileSync(config.__dirname + "/data.txt", id + "\n", (err) => {
    if (err) {
      console.error(err);
    }
  });
  res.json(id);
};
