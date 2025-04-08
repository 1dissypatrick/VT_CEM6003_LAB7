import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import passport from "koa-passport"; // Import passport for authentication
import { router as articles } from "./routes/articles";
import { router as specialRouter } from "./routes/special"; // Import the new "special" routes

const app: Koa = new Koa();
const router: Router = new Router();

// Welcome API Endpoint
const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = { message: "Welcome to the blog API!" };
  await next();
};
router.get('/api/v1', welcomeAPI);

// Middleware for logging, JSON parsing, and body parsing
app.use(logger());
app.use(json());
app.use(bodyParser());

// Middleware for authentication
app.use(passport.initialize());

// Use routes (articles and special)
app.use(articles.routes()).use(articles.allowedMethods());
app.use(specialRouter.routes()).use(specialRouter.allowedMethods());

// Global error handling
app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next();
    console.log(ctx.status);
    if (ctx.status === 404) {
      ctx.body = { err: "Resource not found" };
    }
  } catch (err: any) {
    console.error(err); // Log the error for debugging
    ctx.status = err.status || 500; // Default to internal server error if no status
    ctx.body = { err: err.message || "An unexpected error occurred" };
  }
});

// Start the server
const PORT = 10888;
app.listen(PORT, () => {
  console.log(`Koa Started on Port ${PORT}`);
});
