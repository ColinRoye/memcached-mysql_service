const debug = require("./src/debug");
const express = require('express')
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
var cors = require('cors');
var apicache = require('apicache')
var cache = apicache.middleware
const app = express()
const args = process.argv;
var port = 3000

app.use(cache('5 minutes'))

console.log("test")
const csvfn = 'assists.csv'
const dbnm  = 'hw8'
const tblnm = 'assists';
const fs = require('fs');
const mysql = require('mysql');
const csv = require('csv-parser');
//
let myData = [];

fs.createReadStream('assists.csv')
  .pipe(csv())
  .on('data', (row) => {
   // console.log(row);
     myData.push(row)
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
//
const connection = mysql.createConnection({
     host     : 'mysql2',
     port     : '3306',
     user     : 'user',
     password : 'pass',
     database : dbnm
});


connection.connect((error) => {
	if (error) {
		console.error(error);
	} else {
          console.log("connected")
          //console.log([myData[0].Player, myData[0].Club, myData[0].POS, myData[0].GP, myData[0].GS, myData[0].A, myData[0].GWA, myData[0].HmA, myData[0].RdA, myData[0].min])
          for(let i = 0; i < myData.length; i++){
               var query = connection.query('INSERT INTO assists SET ?', myData[i], function (error, results, fields) {
                    //console.log(results);
               });
          }
     }
});

connection.query('SELECT * FROM assists', function (error, results, fields) {
     console.log(results)
});

});

//optional port setting
// if(args.includes("-p")){
//      port = args[args.indexOf("-p")+1];
// }
//
app.use(bodyParser());


app.use(cookieParser());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// require('./src/schema');
app.use(require('./src/routes'));




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
