import express from "express";
import { PrismaClient } from '@prisma/client';
import crypto from "crypto";

const app: express.Express = express();
///const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     optionsSuccessStatus: 200
// }));

const prisma = new PrismaClient();

let port = process.env.PORT;
if (port == null || port == undefined){
    port = 3000;
}
app.listen(port, () => {
    console.log(`Start on port 3000.`);
});

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/index.html');
    res.send('Hello World!');
})

//スコア一覧取得
app.get('/score', async (req, res) => {

    //スコア取得(降順)
    const scores = await prisma.score_ranking.findMany({
        orderBy: {
            score: "asc",
        },
    });

    if (scores.length <= 0){
        return res.json({});
    }

    return res.json(scores);
});

//スコア新規作成
app.post('/score', async (req, res) => {
    const score = req.body.score;

    const result = await prisma.score_ranking.create({
        data: {
            score: score,
        },
    });

    return res.json(result);
} );