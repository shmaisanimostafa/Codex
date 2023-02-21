//SECTION - Import
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

//SECTION - Middlewares
const openai = new OpenAIApi(configuration);
app.use(cors());
app.use(express.json());

//SECTION - Routing
app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello from CodeX" });
});
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.4,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({ bot: response.data.choices[0].text });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

//SECTION - Server Listning
app.listen(5000, () =>
  console.log("Server is running on port http://localhost:5000")
);
