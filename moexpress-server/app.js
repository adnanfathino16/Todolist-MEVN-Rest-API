const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
// dipelukan jika saat kita mengupload file, beberapa data yang dikirimkan dalam form
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const db = require("./app/models/");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Database connected!`);
  })
  .catch((err) => {
    console.log(`Cannot connect to the database!`, err);
    // tidak akan menjalankan proses selanjutnya jika db tidak terhubung
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "welcome to adnan rest api",
  });
});

require("./app/routes/post.route")(app);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
