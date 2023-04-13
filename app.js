const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { dirname } = require("path");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

// ---------------------------------------------------

app.get("/", function(req,res) {
    res.sendFile( __dirname + "/index.html");
 });



app.post("/",function(req,res){

    // console.log(req.body.cityName);

    const position = req.body.cityName ;
    const apikey = "bacba1d2962f6d0978c4d9665ab6b2e1" ;
    const unit = "metric" ;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + position+ "&appid=" + apikey + "&units=" + unit;

    https.get(url,function(response){
        console.log(response.statusCode );

        response.on('data',function(data){
            // console.log(data);

            const weatherData = JSON.parse(data);
            console.log(weatherData);

            /*   
            const object = {  
                name: "zhiyu",
                favouroteFood: "Ramen"
            }
            // JSON.stringify()  ：表示使用JSON方法将3D衣柜打包成一个字符串
            console.log(JSON.stringify(object));
            */

            const temp = weatherData.main.temp;
            console.log(temp);
            // weather[0].description  是通过 copy path 得到的
            const description = weatherData.weather[0].description;
            console.log(description);

            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently " + description + ".</p>");
            res.write("<h1>The temperature in "+ position + "is " + temp + " degrees Celcius.</h1>");
            res.write("<img src="+ imageURL +">");
          // 在一个app. 里只能有一个res.send（）
            res.send();
});
            
        });

    // console.log("post request recieved");

});


// ============ 放最后 ================================
app.listen(3000,function(){
    console.log("Server is running on port 3000.");
});
  