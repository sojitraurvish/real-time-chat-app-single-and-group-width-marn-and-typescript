import {Request,Response,NextFunction} from "express"

export const notFound=(req:Request,res:Response,next:NextFunction)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`)
    res.status(404);
    next(error)
}

export const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    const statusCode = (req.statusCode===200 || !req.statusCode) ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(err)
    res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}