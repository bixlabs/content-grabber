const bluebird = require('bluebird');
const mongoose = require('mongoose');

const databaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/content_grabber';

mongoose.connect(databaseUrl, {promiseLibrary: bluebird});