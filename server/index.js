const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require('./models')

// Routers
const postRouter = require('./routes/Posts');
const cardRouter = require('./routes/Cards');
const commentRouter = require('./routes/Comments');
const userRouter = require('./routes/Users');

app.use("/posts", postRouter);
app.use("/cards", cardRouter);
app.use("/comments", commentRouter);
app.use("/auth", userRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});


