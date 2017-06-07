const Koa = require('koa');
const body = require('koa-body')();

const db = require('./../db');
const model = require('./../model');

const page = require('./../controller/page');

const app = new Koa();

app.use(body);

app.context.model = model;
app.context.db = db;

app.use(async function(ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(page);

module.exports = app;