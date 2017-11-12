var mongojs = require('mongojs');
const express = require('express');
const router = express.Router();

var db = mongojs('mongodb://admin:admin@brunoynov-shard-00-00-sndon.mongodb.net:27017,brunoynov-shard-00-01-sndon.mongodb.net:27017,brunoynov-shard-00-02-sndon.mongodb.net:27017/bank?ssl=true&replicaSet=BrunoYnov-shard-0&authSource=admin', ['bank']);

module.exports = router;