require("dotenv").config();

const express = require("express");
const cors = require("cors");

const heroRoute = require("./routes/heroRoute");
const projectRoute = require("./routes/projectRoute");
const messageRoute = require("./routes/messageRoute");
const skillRoute = require("./routes/skillRoute");
const certificateRoute = require("./routes/certificateRoute");
const testimonialRoute = require("./routes/testimonialRoute");
const dashboardRoute = require("./routes/dashboardRoute");

require("./config/db");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Selamat Datang di Backend Portfolio",
  });
});

app.use("/api/hero", heroRoute);
app.use("/api/projects", projectRoute);
app.use("/api/messages", messageRoute);
app.use("/api/skills", skillRoute);
app.use("/api/certificates", certificateRoute);
app.use("/api/testimonials", testimonialRoute);
app.use("/api/dashboard", dashboardRoute);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});