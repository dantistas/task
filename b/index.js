const express = require('express')
const  cors = require('cors');
const app = express()
app.use(cors());
app.use(express.static('build')); // build <<----
app.use(express.json());
const port = 3001
const data = require('./data/CVE.json');

app.get('/data', (req, res) => {
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})