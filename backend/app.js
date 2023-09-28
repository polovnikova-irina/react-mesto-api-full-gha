const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const { errors } = require('celebrate');
const morgan = require('morgan');
const handleError = require('./middlewares/handleError');
require('dotenv').config();
const cors = require('cors');


const { PORT = 4000, DB_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", require("./routes/index"));

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик
app.use(handleError);

app.listen(PORT);
