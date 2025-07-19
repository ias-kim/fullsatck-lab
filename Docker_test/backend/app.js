import express from 'express';
import dotenv from 'dotenv';
import authRouter from './src/routes/authRoute.js';
import session from 'express-session';

dotenv.config();
const app = express();

app.use(
  session({
    secret: process.env.GOOGLE_SECRET, // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
  }),
);

// authRoute
app.use(express.json());
app.use('/api/auth', authRouter);

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
