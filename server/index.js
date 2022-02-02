import express from 'express';
import cors from 'cors';
import router from './routes/jwtAuth.js';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.use('/auth', () => {
  console.log('test');
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
});
