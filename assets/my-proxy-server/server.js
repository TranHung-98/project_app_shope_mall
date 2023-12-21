// server.js
const express = require('express');
const cors = require('cors'); // Add this line
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/user', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/TranHung-98/product_json/main/user.json');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
