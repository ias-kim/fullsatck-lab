const cookieSession = require('cookie-session');
const express = require('express');
const app = express();
const passport = require('passport');
const path = require('path');
const { default: mongoose } = require('mongoose');
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require('./middlewares/auth.js');
const User = require('./models/users.model.js');

const cookieEncryptionKey = 'supersecret-key';

app.use(
  cookieSession({
    name: 'cookie-session-name',
    keys: [cookieEncryptionKey],
  }),
);

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // form 파싱 후 해석

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);
mongoose
  .connect(
    `mongodb+srv://abcqkdnxm:qwer1234@cluster0.nwynvnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  )
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((err) => {
    console.log(err, 'mongodb disconnected');
  });

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index');
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) return res.json({ msg: info });

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  })(req, res, next);
});

app.get('/signup', checkNotAuthenticated, (req, res) => {
  res.render('signup');
});

app.post('/signup', async (req, res) => {
  // User 객체를 생성
  const user = new User(req.body);
  // user 콜렉션에 유저를 저장
  try {
    await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
