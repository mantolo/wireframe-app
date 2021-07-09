import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import uuid from "uuid/v4.js";
import db from "./persistence/index.mjs";
import { addSampleData } from "./persistence/mysql.mjs";
import getAllPlans from "./routes/get-all-plans.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'));

app.get("/api/get-all-plans", getAllPlans);
app.get("/api/set-test-data", async (req, res) => {
    // generate some data
    const data = [
        [ uuid(), "Premium", "Plan A", 1, 1, 1, 748, 0 ],
        [ uuid(), "Standard", "Plan B", 1, 1, 0, 388, 0 ],
        [ uuid(), "Standard", "Plan C", 1, 0, 0, 0, 0 ],
    ];

    await addSampleData(data);

    res.send(`added ${data.length} test item to db`);
});

db.init()
.then(
    () => {
        app.listen(3000, () => console.log('Listening on port 3000'));
    },
    (err) => {
        console.error(err);
        process.exit(1);
    }
);

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon