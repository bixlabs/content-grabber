const router = require('koa-router')();

async function list(ctx) {
  ctx.body = await ctx.model.Page.find();
}

async function create(ctx) {
  const data = ctx.request.body || {};
  try {
    ctx.body = await ctx.model.Page.create(data);
  } catch(e) {
    ctx.throw(400, e);
  }
}

router
  .get('/pages', list)
  .post('/pages', create);

module.exports = router.routes();