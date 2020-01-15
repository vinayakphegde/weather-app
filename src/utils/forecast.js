const request=require("request");



const forecast=(long,lat,callback)=>{
    const url="https://api.darksky.net/forecast/5591a9c042a6fd5f219ddecf3c57ac49/"+encodeURIComponent(long)+","+encodeURIComponent(lat);
    request({url:url,json:true},(err,{body})=>{
        if(err){
            callback("ERROR",undefined);
        }
        else if(body.error){
            callback("INVALID",undefined);
        }
        else{
            callback(undefined,{
                temp:body.currently.temperature,
                prob:body.currently.precipProbability
            })
        }
    })
}





module.exports={
    forecast
}