"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
///const cors = require('cors');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     optionsSuccessStatus: 200
// }));
const prisma = new client_1.PrismaClient();
let port = process.env.PORT;
if (port == null || port == undefined) {
    port = 3000;
}
app.listen(port, () => {
    console.log(`Start on port 3000.`);
});
app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/public/index.html');
    res.send('Hello World!');
});
//スコア一覧取得
app.get('/score', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //スコア取得(降順)
    const scores = yield prisma.score_ranking.findMany({
        orderBy: {
            score: "desc",
        },
    });
    if (scores.length <= 0) {
        return res.json({});
    }
    return res.json(scores);
}));
//スコア新規作成
app.post('/score', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const score = req.body.score;
    const result = yield prisma.score_ranking.create({
        data: {
            score: score,
        },
    });
    return res.json(result);
}));
