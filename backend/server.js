const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// App und Middleware einrichten
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mit MongoDB Atlas verbinden
const mongoURI = process.env;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB verbunden"))
    .catch((err) => console.error("MongoDB Verbindungsfehler:", err));

// Schema und Modell erstellen
const cardSchema = new mongoose.Schema({
    titel: { type: String, required: true },
    img_url: { type: string, required: true },
    synopsis: { type: String, required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
});
const Card = mongoose.model("Idee", cardSchema);

// Routen
app.get("/cards", async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: "Fehler beim Abrufen der Karten" });
    }
});

app.post("/cards", async (req, res) => {
    const { titel, beschreibung } = req.body;
    try {
        const newCard = new Card({ titel, beschreibung });
        await newCard.save();
        res.status(201).json(neueIdee);
    } catch (err) {
        res.status(400).json({ message: "Fehler beim Speichern der Karte" });
    }
});

app.delete("/cards/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Card.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: "Fehler beim Löschen der Karte" });
    }
});

// Server starten
const PORT = 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));