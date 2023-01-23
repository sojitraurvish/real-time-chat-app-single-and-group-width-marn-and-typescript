import mongoose from "mongoose";

const connectDB=async()=>{
    if(!process.env.MONGO_URI){
        console.log("Error : MONGO_URI define into env file or not able to read it".red);
        return;
    }

    try {
        const con=await mongoose.connect(process.env.MONGO_URI,{
            // useUnifiedTropology:true,
                // useNewUrlParser:true,
                // useCreateIndex:true
        })

        console.log(`MongoDB Connected : ${con.connection.host}`.cyan.underline)
    } catch (error:any) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }   
}

export default connectDB