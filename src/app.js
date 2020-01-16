const path=require("path");
const express=require("express");
const request=require("request");
const forecast=require("./utils/forecast.js");
const geocode=require("./utils/geocode.js");
const app=express();
const hbs=require("hbs");

const port=process.env.port || 3000;

//defining paths for Express configuration
const publicDir=path.join(__dirname,"../public");
const viewDir=path.join(__dirname,"../templetes/views");
const partialsDir=path.join(__dirname,"../templetes/partials")

//setup static directory to serve
app.use(express.static(publicDir));

//set up handlebar engine and views engine
app.set("view engine","hbs");
app.set("views",viewDir);
hbs.registerPartials(partialsDir);
app.get("",(error,res)=>{
    res.render("home")
})

app.get("/weather",(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error:"Sorry you have to give some adress"
        })
    }
    const adress=req.query.adress;
    geocode.geocode(adress,(error,{longitude,latitude,location}={} )=>{
        if(error){
            return res.send({
                error:"error occured in process"
            })
        }
        forecast.forecast(longitude,latitude,(error,{temp,prob})=>{
            if(error){
                return res.send({
                    error:"error occured"
                })
            }
            res.send({
                forecast:"the temperature is "+temp+" and has "+prob+"% of raining",
                location,
                adress:req.query.adress
            })
            
        })
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"about us",
        name:"Vinayak"
    });
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"vinayak"
    });
})

app.get("/help/*",(req,res)=>{
    res.render("help",{
        title:"Help page not found",
        name:"vinayak"
    });
})

app.get("*",(req,res)=>{
    res.send("404 pages");
})


app.listen(port,()=>{
    console.log("Server started");
})