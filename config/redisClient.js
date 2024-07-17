import { createClient } from "redis";

export const client = createClient({
  socket: {
    host: process.env.REDIS_URI || "172.18.0.3",
    port: process.env.REDIS_PORT || 6379,
  },
});

client.on("error", (err) => console.log(err));
if (!client.isOpen) {
  client.connect();
}
