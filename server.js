import express from "express";
import morgan from "morgan";
import { conectMongo } from "./src/config/mongoDBConfig.js";
import cors from 'cors';
import userRouter from './src/routers/userRouter.js'

const app = express();

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
  /*********     Codes to run in development environment only    *************/
  app.use(morgan("dev"));
}
conectMongo();

/**********    MiddleWares       ******************/

app.use(express.json());
app.use(cors())

/*************** Routers and endpoints ***********************/
app.use('/api/users', userRouter)

app.get('/', (req, res, next) => {
  res.json({
    message: 'server running healthy'
  })
})

app.use('*', (req, res, next) => {
  const err = new Error('404 Not Found')
  err.status = 404;
  next(err)
})

/*********    Global Error Handler   ***********/

app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status || 500);
  res.json({
    status: 'error',
    message: error.message,
  })
})

/*********    run the server   ***********/

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Server is running`);
});