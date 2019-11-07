const express = require("express");
const app = express();
const router = require("express").Router();
const debug = require("./debug");
const env = require("./env");
const service = require("./services");
const mysql = require('mysql');

const connection = mysql.createConnection({
     host     : 'mysql2',
     port     : '3306',
     user     : 'user',
     password : 'pass',
     database : "hw8"
});



router.get('/hw8', async (req, res, next)=>{
     var i = [];

     let args = "";

     if(req.query.club){
          args += ' club = ? AND'
          i.push(req.query.club+'');
     }
     if(req.query.pos){
          args +=' POS = ? AND'
          i.push(req.query.pos+'');
     }
     if(req.query.max_assists){
          args +=' max_assists = ? AND'
          i.push(req.query.max_assists+'');
     }
     if(req.query.player){
          args +=' max_assists = ? AND'
          i.push(req.query.player+'');
     }
     if(req.query.avg_assists){
          args +=' avg_assists = ? AND'
          i.push(req.query.avg_assists+'');
     }
     args = args.substring(0,args.length-3)
     //res.send(args)
     //res.send(args)
     connection.query('SELECT * FROM assists WHERE ' + args, i , function (error, results, fields) {
          res.send( results)
     });

});

module.exports = router
