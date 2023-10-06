require('dotenv').config(); //для загрузки переменных окружения из файла .env
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet"); //для обеспечения безопасности
const rateLimit = require("express-rate-limit"); //ограничивает количество запросов, поступающих на  сервер
const bodyParser = require("body-parser");
const { errors } = require('celebrate');
const morgan = require('morgan'); //логирования HTTP-запросов и ответов, детализированный журнал всех запросов
const cors = require('cors');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001, DB_URL = "mongodb://127.0.0.1:27017/mestodb" } = process.env;

const app = express();

app.use(cors());

app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.use(limiter);

app.use("/", require("./routes/index"));

app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик
app.use(handleError);

app.listen(PORT);
