import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';

import authRouter from './routes/auth.router.js';
import noticeRouter from './routes/notice.router.js';
import dashboardRouter from './routes/dashboard.router.js';
import path from 'path';
import { fileURLToPath } from 'url';

// __filename, __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //
app.use(cookieParser());
app.use(
  session({
    secret: process.env.GOOGLE_SECRET, // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
  }),
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejs.__express);

// authRoute
app.use('/api/auth', authRouter);
app.use('/api/notice', noticeRouter);
app.use('/api/dashboard', dashboardRouter);

// default route
app.get('/', (req, res) => {
  res.send(`<a href='/api/auth'>구글 로그인</a>`);
});

if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `Server running at http://localhost:${process.env.PORT || 3000}`,
    );
  });
}

export default app;
