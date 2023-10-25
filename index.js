// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


app.get("/json", function(req, res)  {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function(req, res)  {

  /*get date input value*/
  var date = req.params.date;
  
  /*check it can be parsed as javascript date object*/
  var check = new Date(date);

  /*case for empty string input*/
  if (!date)  {
    check = Date.now()
    check = parseInt(check);
    check = new Date(check);
  }

  /*if input is a unix value*/
  if (check == "Invalid Date") {
    date = parseInt(date);
    check = new Date(date);
  }

  if (check != "Invalid Date") {

  /*turn response into unix*/
  var response = new Date(check).getTime();
  console.log(response, 'resonse', check, 'check')

  /*prepare strings to construct utc value*/
    var year = check.getFullYear();
    var month = check.getMonth();
    var day = check.getUTCDate();
    var hours = check.getUTCHours();
    console.log(hours, 'jours')
    var minutes = check.getMinutes();
    var seconds = check.getSeconds();

  /*construct utc value*/
    var utc_value = new Date(Date.UTC(year, month, day, hours, minutes, seconds)).toUTCString();

  /*return json object*/
    res.json({ unix: response, utc: utc_value});

    } else {
    /*not a date object*/
    res.json({ error : "Invalid Date" })
  }


});


app.get("/views/json", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

console.log('Hello World!')



