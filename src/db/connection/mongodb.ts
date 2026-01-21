import mongoose, { MongooseError } from "mongoose"



export default async function connectDB() {
  const dburi = process.env.MONGODB_URI!
  if (!dburi) {
    throw new Error("MOngodb URI is undefined")
  }

  if(mongoose.connections[0].readyState === 1) {
    console.log("db, already connected")
    return
  }

  try {
    await mongoose.connect(dburi)
    console.log("DB connected");
    
  } catch (error: unknown) {
    if (error instanceof MongooseError){
      console.log({MongodbError: MongooseError});
      
    }
    console.log({error})
  }
}

const client = async () => {
  await connectDB();
  if (!mongoose.connection.db) {
    throw new Error('MongoDB Db instance not available');
  }
  return mongoose.connection.db;
}

export {connectDB, client}