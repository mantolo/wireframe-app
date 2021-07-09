import db from "../persistence/index.mjs";

export default async (req, res) => {
    res.send(await db.getAllPlans());
};
