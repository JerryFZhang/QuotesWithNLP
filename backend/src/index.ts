import express from "express";
import * as data from "../../db/quotes.json";

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(data);
})

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Example app listening at http://localhost:${port}`)
})
