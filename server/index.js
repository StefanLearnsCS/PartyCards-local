require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const passport = require('./middleware/passport');
const session = require('express-session');

app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'importantsecret',
    resave: false,
    saveUninitialized: true
  }));
  
app.use(passport.initialize());
app.use(passport.session());

const db = require('./models')

// Routers
const postRouter = require('./routes/Posts');
const cardRouter = require('./routes/Cards');
const commentRouter = require('./routes/Comments');
const userRouter = require('./routes/Users');
const likesRouter = require('./routes/Likes');
const contactRouter = require('./routes/Contact');


app.use("/posts", postRouter);
app.use("/cards", cardRouter);
app.use("/comments", commentRouter);
app.use("/auth", userRouter);
app.use("/likes", likesRouter);
app.use("/contact", contactRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});


