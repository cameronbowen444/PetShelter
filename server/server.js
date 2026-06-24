const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./config/mongoose.config');
require('./routes/pet.routes')(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}!`);
});