console.log("yes");


const I=document.querySelector("input");
const but=document.querySelector("button");
const p1=document.querySelectorAll("p");

but.addEventListener("click",()=>{
    var lac=I.value;
    console.log(lac);
    p1[0].textContent="Loading...";
    const url="http://localhost:3000/weather?adress="+lac;
    fetch(url).then((res)=>{
           res.json().then((data)=>{
           if(data.error)
           {
               p1[0].textContent="";
               p1[1].textContent="error occured";
               I.value="";
           }
           else{
              p1[0].textContent=data.lacation;
              p1[1].textContent=data.forecast;
              I.value="";
       }
     })
 })
})

