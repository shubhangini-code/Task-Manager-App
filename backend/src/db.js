// import mongoose from "mongoose";
// import "dotenv/config";

// const db = () => {
//   console.log("MONGODB_URI =", process.env.MONGODB_URI);

//   mongoose
//     .connect(process.env.MONGODB_URI)
//     .then(() => console.log("MongoDB connected successfully"))
//     .catch((error) => {
//       console.log("Failed to connect to Mongodb", error);
//     });
// };
// export default db;
import mongoose from "mongoose";
import "dotenv/config";

const db = () => {
  console.log("MONGODB_URI =", process.env.MONGODB_URI);

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
      console.log("Database:", mongoose.connection.name);
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB", error);
    });
};

export default db;
