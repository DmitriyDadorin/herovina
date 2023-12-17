const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = 3000;

// Подключение к MongoDB
mongoose.connect("mongodb://localhost:27017/employment_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const employmentDataSchema = new mongoose.Schema({
  name: String,
  dish: String,
  id: String,
  time: String,
});
const EmploymentData = mongoose.model("EmploymentData", employmentDataSchema);

app.use(bodyParser.json());

// Сервис для получения всех данных
app.get("/employment_data/all", async (req, res) => {
  try {
    const data = await EmploymentData.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Сервис для создания новых данных
app.post("/employment_data/create", async (req, res) => {
  try {
    const { name, dish, id, time } = req.body;
    const newData = new EmploymentData({ name, dish, id, time });
    await newData.save();
    res.status(201).json({ message: "Data created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Подключение промежуточного ПО для обслуживания статических файлов
app.use(express.static(path.join(__dirname, "dist")));

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
