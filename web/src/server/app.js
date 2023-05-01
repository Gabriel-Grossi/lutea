import express from 'express';
import cors from 'cors'
import routes from './routes';

const app = express();

app.use(cors())
app.use(routes);
app.use(express.json());

export default app