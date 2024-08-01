const BASE_URL =
  "https://latest.currency-api.pages.dev/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let toCurr=document.querySelector(".To select");
let fromCurr=document.querySelector(".From select");
let msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let newOpt = document.createElement("option");
        newOpt.innerText=currCode;
        newOpt.value=currCode;
        select.append(newOpt);

        if(currCode==="USD" && select.name==="from")
        {
            newOpt.selected="select";
        }
        else if(currCode==="PKR" && select.name==="to")
        {
            newOpt.selected="select";
        }
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

function updateFlag(element){

   let countryCode=countryList[element.value];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src=newSrc;
}

const updateExchangeRate = async () => {

    let amount= document.querySelector(".amount input");
    let  amtVal=amount.value;
    
    if(amtVal==="" || amtVal<0)
    {
        amtVal=1;
        amount.value="1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let exRate=rate*amtVal;

    msg.innerText=`${amtVal} ${fromCurr.value} = ${exRate} ${toCurr.value}`;
}

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
  });