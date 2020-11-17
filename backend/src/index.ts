import express from "express";
import * as data from "../../db/quotes.json";
import bodyParser from 'body-parser';
import * as _ from "lodash";
// import natural, { DamerauLevenshteinDistance } from 'natural';
import SW from 'stopword';
// import * as aposToLexForm from 'apos-to-lex-form';

const app = express()
const port = 3000

app.use(bodyParser.json());

// Get all quotes
app.get('/', (req, res) => {
  res.send('Server is up');
})

// Get all quotes
app.get('/quotes', (req, res) => {
  // @ts-ignore
  data.default.forEach((item: any) => {
    console.log(item.en);
    convert(item.en);
  })
  // @ts-ignore
  res.send(data.default);
});

app.get('/reco', (req, res) => {

});

// Add a quote
app.post('/quotes', (req, res) => {
  // code to add a new article...
  res.json(_.find(data, req.body));
});

// Modify a quote, req.body.rating is passed in
app.put('/quotes/:id', (req, res) => {
  if (!!req.body.rating) {
    if (req.body.rating.isInteger() && req.body.rating >= 0 || req.body.rating <= 5) {
      res.json(_.find(data, req.body));
    } else {
      // wrong format
    }
  }
  res.json(req.body);
});

// Delete a quote
app.delete('/quotes/:id', (req, res) => {
  const { id } = req.params;
  res.json({ deleted: id });
});


app.post('/s-analyzer', (req, res) => {
  // res.status(200).json({convert(req.body)});
});


app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`Example app listening at http://localhost:${port}`)
});

export function convert(data: string) {
  // // const { review } = data;
  // // const lexedReview = aposToLexForm(review);
  // // const casedReview = lexedReview.toLowerCase();
  // // console.log(review);
  // const alphaOnlyReview = data.toLowerCase().replace(/[^a-zA-Z\s]+/g, '');
  // // console.log(alphaOnlyReview);
  // const { WordTokenizer } = natural;
  // const tokenizer = new WordTokenizer();
  // const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);
  // const filteredReview = SW.removeStopwords(tokenizedReview);
  // console.log(tokenizedReview);
  // console.log(filteredReview); 
  // const { SentimentAnalyzer, PorterStemmer } = natural;
  // const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  // // console.log(analyzer);
  // const analysis = analyzer.getSentiment(filteredReview);
  // console.log(analysis);
  var Sentiment = require('sentiment');
  var sentiment = new Sentiment();
  var result = sentiment.analyze(data);
  console.log(result);
  console.log(SW.removeStopwords(result.tokens));

}