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
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_passport_1 = __importDefault(require("koa-passport")); // Import passport for authentication
const articles_1 = require("./routes/articles");
const special_1 = require("./routes/special"); // Import the new "special" routes
const app = new koa_1.default();
const router = new koa_router_1.default();
// Welcome API Endpoint
const welcomeAPI = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = { message: "Welcome to the blog API!" };
    yield next();
});
router.get('/api/v1', welcomeAPI);
// Middleware for logging, JSON parsing, and body parsing
app.use((0, koa_logger_1.default)());
app.use((0, koa_json_1.default)());
app.use((0, koa_bodyparser_1.default)());
// Middleware for authentication
app.use(koa_passport_1.default.initialize());
// Use routes (articles and special)
app.use(articles_1.router.routes()).use(articles_1.router.allowedMethods());
app.use(special_1.router.routes()).use(special_1.router.allowedMethods());
// Global error handling
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
        console.log(ctx.status);
        if (ctx.status === 404) {
            ctx.body = { err: "Resource not found" };
        }
    }
    catch (err) {
        console.error(err); // Log the error for debugging
        ctx.status = err.status || 500; // Default to internal server error if no status
        ctx.body = { err: err.message || "An unexpected error occurred" };
    }
}));
// Start the server
const PORT = 10888;
app.listen(PORT, () => {
    console.log(`Koa Started on Port ${PORT}`);
});
