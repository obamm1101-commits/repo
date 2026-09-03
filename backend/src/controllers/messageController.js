const messageModel = require("../models/messageModel");

const getMessages = (req, res) => {
  messageModel.getAllMessages((err, results) => {
    if (err) {
      console.error("Get messages error:", err);

      return res.status(500).json({
        success: false,
        message: "Gagal mengambil pesan",
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

const createMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Semua field wajib diisi",
    });
  }

  messageModel.createMessage(
    { name, email, message },
    (err, result) => {
      if (err) {
        console.error("Create message error:", err);

        return res.status(500).json({
          success: false,
          message: "Gagal menyimpan pesan",
        });
      }

      res.status(201).json({
        success: true,
        message: "Pesan berhasil dikirim",
        data: {
          id: result.insertId,
          name,
          email,
          message,
        },
      });
    }
  );
};

module.exports = {
  getMessages,
  createMessage,
};