const request=require("request");

const geocode=(adress,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(adress)+".json?access_token=pk.eyJ1IjoidmluYXlha3BoMTIzIiwiYSI6ImNrNGh4dXlkejBsYTMzbG56MGpxejE3YncifQ.n47iT8Q8-QhIZpzo_qx8cQ&limit=1";

    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("ERROR",undefined);
        }
        else if(body.features.length===0){
            callback("INVALID REQUEST.");
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}





module.exports={
    geocode
}