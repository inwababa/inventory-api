import express, { Application } from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import bodyParser from 'body-parser'
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import warehouseRoutes from './routes/warehouseRoutes';
import stockRoutes from './routes/stockRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Application = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', warehouseRoutes);
app.use('/api', stockRoutes);

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server started on http://localhost:3000');
  });
});
