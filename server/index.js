const http = require('http');
const express = require('express');
const cors = require('cors');
const connectToDB = require('./db');


const app = express();
const server = http.createServer(app);

connectToDB();

app.use(cors());
app.use(express.json());

app.use('/api/user', require('./routes/user'));
app.use('/api/database', require('./routes/database'));

app.get('/', (req, res) => {
    res.send('Zutan is running!');
})

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})