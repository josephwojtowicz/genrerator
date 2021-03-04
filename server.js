const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT  = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//connect mongo
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MONGODB CONNECTED!!!");
})

//routing
const genresRouter = require('./routes/genres');

app.use('/genres', genresRouter);

app.listen(PORT, function() {
    console.log(`now listening on PORT ${PORT}`)
});