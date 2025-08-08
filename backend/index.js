const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = './data/results.json';

app.use(cors());
app.use(bodyParser.json());

if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([
    {"roll":"101","name":"Alice","marks":{"math":85,"science":90,"english":78}},
    {"roll":"102","name":"Bob","marks":{"math":72,"science":65,"english":80}},
    {"roll":"103","name":"Charlie","marks":{"math":95,"science":88,"english":92}}
  ], null, 2));
}

function readResults(){ return JSON.parse(fs.readFileSync(DATA_FILE)); }
function writeResults(data){ fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); }

app.get('/api/results', (req, res) => { res.json(readResults()); });

app.get('/api/results/:roll', (req, res) => {
  const roll = req.params.roll;
  const student = readResults().find(s => s.roll === roll);
  if (!student) return res.status(404).json({ error: 'Result not found' });
  res.json(student);
});

app.post('/api/results', (req, res) => {
  const payload = req.body;
  if (!payload || !payload.roll || !payload.name || !payload.marks) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const data = readResults();
  if (data.find(s => s.roll === payload.roll)) {
    return res.status(409).json({ error: 'Roll already exists' });
  }
  data.push(payload);
  writeResults(data);
  res.status(201).json({ message: 'Result added' });
});

app.get('/health', (req, res) => res.send('OK'));

app.listen(PORT, () => console.log(`Student backend running on port ${PORT}`));
