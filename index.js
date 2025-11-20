import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ====== AI SETUP ======
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ====== TEST GET ROUTE ======
app.get("/", (req, res) => {
res.send("Backend is running!");
});

// ====== CHATBOT POST ROUTE ======
app.post("/api/chat", async (req, res) => {
try {
const { message } = req.body;
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const result = await model.generateContent(message);
res.json({ reply: result.response.text() });
} catch (error) {
res.status(500).json({ error: error.message });
}
});

// ====== START SERVER ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
