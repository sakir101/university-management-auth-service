import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser';


const app: Application = express()


app.use(cors())
app.use(cookieParser())


//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api/v1/', routes);



// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//     throw new Error("Testing error logger")
// })


//global error handler
app.use(globalErrorHandler)

//handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [{
            path: req.originalUrl,
            message: "Api not found"
        }]
    })
    next();
})



export default app;
