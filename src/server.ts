import express from 'express';

const app = express();

app.listen(3000, () => {
  console.log('Listening on PORT 3000');
});

export const server = app;
