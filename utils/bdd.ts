import mongoose from "mongoose";

export async function connexionBdd() {
    await mongoose.connect(
        `mongodb://${process.env.BDD_SERVER}:${process.env.BDD_PORT}/${process.env.BDD_NAME}`
    );
    console.log("Mongodb connexion OK");
}
