const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const cors = require('cors');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use('/api', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export app for testing



