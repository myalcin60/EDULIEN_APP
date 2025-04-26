 const express = require("express");    // express framwork modul import edildi
 const cors = require("cors");         // bir web sayfasının başka bir domain'den gelen verilere erişmesine izin veren bir mekanizmadır. 

 require("dotenv").config();           // .env dosyasındaki çevre değişkenlerini kullanabilmek için bu modül yükleniyor

 const db = require("./config/db");   // Veritabanı bağlantısını ekledik veritabaninin yolunu belirledik
 
                                      // Veritabanında user tablosu yoksa oluştur
const createUserTable = `
CREATE TABLE IF NOT EXISTS user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
)
`;

db.query(createUserTable, (err, result) => {
  if (err) {
    console.error("User tablosu oluşturulamadı:", err);
  } else {
    console.log("User tablosu hazır! ✅");
  }
});

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
  const {firstName,lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ message: "Eksik bilgi var." });
  }

  const sql = "INSERT INTO user (firstName,lastName, email, password,role) VALUES (?, ?, ?, ?, ?)";
  const values = [firstName,lastName, email, password, role];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Kayıt hatası:", err);
      return res.status(500).json({ message: "Veritabanı hatası" });
    }

    res.status(201).json({ message: "Kayıt başarılı", userId: result.insertId });
  });
});

 


 // Login endpoint
// Yeni login endpointi
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required!!" });
  }

  // Veritabanında kullanıcıyı arıyoruz
  db.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Server error", details: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "There is no such user!" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Password is wrong!" });
    }

    // Başarılı giriş
    res.json({ message: "Login successful!", user });
  });
});

// EN SONDA server başlatılıyor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


















