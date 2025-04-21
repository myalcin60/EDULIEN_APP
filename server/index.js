 const express = require("express");    // express framwork modul import edildi
 const cors = require("cors");         // bir web sayfasının başka bir domain'den gelen verilere erişmesine izin veren bir mekanizmadır. 

 require("dotenv").config();           // .env dosyasındaki çevre değişkenlerini kullanabilmek için bu modül yükleniyor

 const db = require("./config/db");   // Veritabanı bağlantısını ekledik veritabaninin yolunu belirledik
 const app = express();               // Burada, express() fonksiyonu ile bir Express uygulaması başlatılıyor ve app değişkenine atanıyor

 // Middleware
 app.use(cors());
 app.use(express.json());

 // Routes
 app.get("/api", (req, res) => {
   res.json({ message: "Edulien App API" });
 });

 // GET kullanicilari getirir
 // 🔸 Yeni test route (isteğe bağlı)
 app.get("/api/users", (req, res) => {
   db.query("SELECT * FROM user", (err, results) => {
     if (err) {
       return res.status(500).json({ error: "Veri alınamadı", details: err });
     }
     res.json(results);
   });
 });

// 🔸 Kullanıcı kayıt (POST /api/users)
app.post("/api/users", (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Eksik bilgi var." });
  }

  const sql = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
  const values = [role, email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Kayıt hatası:", err);
      return res.status(500).json({ message: "Veritabanı hatası" });
    }

    res.status(201).json({ message: "Kayıt başarılı", userId: result.insertId });
  });
});

 
 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });



















