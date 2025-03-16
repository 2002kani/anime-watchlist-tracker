import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// App und Middleware einrichten
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mit MongoDB Atlas verbinden
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB verbunden"))
    .catch((err) => console.error("MongoDB Verbindungsfehler:", err));

// Schema und Modell erstellen
const cardSchema = new mongoose.Schema({
    mal_id: { type: Number, required: true },
    title: { type: String, required: true },
    img_url: { type: String, required: true },
    synopsis: { type: String, required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
});
const Card = mongoose.model("Card", cardSchema);

// Routen
app.get("/cards", async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: "Fehler beim Abrufen der Karten" });
    }
});

app.post("/savedCards", async (req, res) => {
    const { mal_id, title, img_url, synopsis, rank, score } = req.body;
    try {
        const newCard = new Card({ mal_id, title, img_url, synopsis, rank, score });
        await newCard.save();
        res.status(201).json(newCard);
    } catch (err) {
        console.log("Server-Fehler: ", err);
        res.status(400).json({ message: "Fehler beim Speichern der Karte" });
    }
});

app.delete("/savedCards/:mal_id", async (req, res) => {
    const { mal_id } = req.params;
    try {
        const result = await Card.findOneAndDelete({ mal_id: Number(mal_id) });

        if(!result){
            return res.status(404).json({ message: "Karte nicht gefunden" });
        }

        res.status(200).send({ message: "Karte erfolgreich gelöscht" });
    } catch (err) {
        console.error("Fehler beim Löschen: ", err);
        res.status(500).json({ message: "Fehler beim Löschen der Karte" });
    }
});

// Server starten
const PORT = 5002;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));