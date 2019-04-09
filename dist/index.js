"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const router_1 = __importDefault(require("./routes/router"));
const server = server_1.default.instance;
// Bodyparser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Cors
server.app.use(cors_1.default({
    origin: true,
    credentials: true
}));
// Las rutas
server.app.use("/colas", router_1.default);
// Start the app
server.start(() => {
    console.log("LA aplicacion esta lista");
});
