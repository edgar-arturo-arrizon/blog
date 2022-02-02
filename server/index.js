import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './routes/jwtAuth.js';

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/auth', router);

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
});
