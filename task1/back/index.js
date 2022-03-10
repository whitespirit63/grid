import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import swaggerUI from 'swagger-ui-express';
import specs from './swagger.js';

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/', router);

app.listen(5000, () => {
    console.log('Server started');
});

export default app;
