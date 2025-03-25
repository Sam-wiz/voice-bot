import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { OpenAI } from "openai";
import { config, userContext } from "./config";
import { logger } from "./logger";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on("user_question", async (question: string) => {
    try {
      logger.info(`User asked: ${question}`);

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: userContext },
          { role: "user", content: question },
        ],
      });

      const botReply = response.choices[0].message.content || "I'm not sure how to answer that.";
      logger.info(`Bot response: ${botReply}`);

      socket.emit("bot_response", botReply);
    } catch (error) {
      logger.error(`Error: ${error}`);
      socket.emit("error", { message: "Processing failed" });
    }
  });

  socket.on("disconnect", () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

server.listen(config.PORT, () => logger.info(`Server running on port ${config.PORT}`));
