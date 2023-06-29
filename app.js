const express = require('express')
const https = require("https")
const bodyParser = require("body-parser")
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{

    const q= req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+q+"&APPID=56b35e23e3cdcda98355d21335e97768&units=metric"
    const https = require('node:https');


    https.get(url, (respond) => {
    console.log('statusCode:', respond.statusCode);
    console.log('headers:', respond.headers);

    respond.on('data', (d) => {
        process.stdout.write(d);
        const datas = JSON.parse(d)
        console.clear()
        console.log(datas)
        const iconImageurl= "https://openweathermap.org/img/wn/"+datas.weather[0].icon+"@2x.png"
        res.write("<p>The weather is currently "+datas.weather[0].description+"</p>")
        const msg = "In "+datas.name+", "+datas.sys.country+", the temperature is "+ datas.main.temp+" degree"
        res.write(`<h1>${msg}</h1>`)
        res.write("<img src=\""+iconImageurl+"\">")
        res.send()
       
    });

    }).on('error', (e) => {
        const a = JSON.parse(e)
    console.error(a);
    });
        
    })




app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})