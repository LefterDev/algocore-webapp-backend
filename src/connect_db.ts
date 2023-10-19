import { connect } from "mongoose";

export = () => {
    connect(process.env.MONGO_URI as string, (
        {
            appName: "Algocore-Backend"
        }
    )).then(() => console.log("Database connected successfully"));
}