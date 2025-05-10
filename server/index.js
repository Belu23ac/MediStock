import express from 'express';
import usersRouter from './routes/users.js';
import ordersRouter from './routes/orders.js';

const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.get('/', (_req, res) => res.send('OK'));
app.listen(process.env.PORT || 3000, () =>
  console.log('API listening on http://localhost:3000')
);
