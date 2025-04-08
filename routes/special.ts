import Router, { RouterContext } from "koa-router";
import { basicAuth } from '../controllers/auth';

const router = new Router({ prefix: '/api/v1' });

// Public route - no authentication needed
router.get('/', async (ctx: RouterContext) => {
  ctx.body = { 
    message: 'Public API endpoint - no authentication required' 
  };
});

// Protected route - requires Basic Auth
router.get('/private', basicAuth, async (ctx: RouterContext) => {
  ctx.body = { 
    message: 'Protected API endpoint',
    user: ctx.state.user // Contains the authenticated user info
  };
});

export { router };