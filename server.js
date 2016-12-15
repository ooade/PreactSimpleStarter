import express from 'express';
import path from 'path';

const app = express();

const PORT = process.env.PORT || 8080;

app.use('/', express.static(__dirname + '/build'));

app.disable('x-powered-by');

app.listen(PORT, err => {
  if (err) throw err;

  console.log("App is listening on", PORT);
});
