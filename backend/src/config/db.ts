import mongoose from "mongoose"

const connectDb=async()=>{
        if(!process.env.MONGO_URI){
            console.log(`Mongo Url is not defined`.red);
            return;
        }

        try {
            const con=await mongoose.connect(process.env.MONGO_URI,{
                // useUnifiedTropology:true,
                // useNewUrlParser:true,
                // useCreateIndex:true
            }) 

            console.log(`MongoDB Connected : ${con.connection.host}`.cyan.underline);
            
        } catch (error:any) {
            console.error(`Error: ${error.message}`.red)
            process.exit(1)
        }
    
}

export default connectDb