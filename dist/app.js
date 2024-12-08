"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const global_ErrorHandler_1 = __importDefault(require("./app/middlewares/global.ErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
console.log(app);
// application routes
app.use('/api/v1', routes_1.router);
const test = (req, res) => {
    const a = 10;
    res.send(a);
};
app.use('/', test);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Error-handling middleware
app.use(global_ErrorHandler_1.default);
// not found
app.use(notFound_1.default);
exports.default = app;
