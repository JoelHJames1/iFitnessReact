const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'web-build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});