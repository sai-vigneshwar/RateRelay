const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies"


const dropdowns=document.querySelectorAll(".dropdown select")
const button=document.querySelector("button")
const from=document.querySelector(".from select")
const to=document.querySelector(".to select")
const msg=document.querySelector(".msg");
for(let select of dropdowns){
for(let curr in countryList){
    let newOption=document.createElement("option")
    newOption.innerText=curr;
    newOption.value=curr;
    select.append(newOption);
    if(select.name==='from'&&curr==='USD'){
        newOption.selected="selected";
    }
     if(select.name==='to'&&curr==='INR'){
        newOption.selected="selected";
    }
}
     select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
     })
}

const updateFlag=(ele)=>{
   let currencycode=ele.value;
   let countryflag=countryList[currencycode];
   console.log(countryflag);
   let newSrc=`https://flagsapi.com/${countryflag}/flat/64.png`;
   let img=ele.parentElement.querySelector('img');
   img.src=newSrc;
}
button.addEventListener("click",async (event)=>{
   event.preventDefault();
   let amount=document.querySelector("input");
   if(amount.value==""||amount.value<0){
    amount.value=1;
   }
   const url=`${BASE_URL}/${from.value.toLowerCase()}.json`;
   const response=await fetch(url);
   const userformat=await response.json();
   //console.log(userformat);
   const fromcurrency=userformat[from.value.toLowerCase()];
   const exchangerate=fromcurrency[to.value.toLowerCase()]
//    console.log(exchangerate);
//    console.log(amount.value);
   let finalValueExchange=(amount.value)*exchangerate;
   msg.innerText=`${amount.value}${from.value}=${finalValueExchange}${to.value}`;

})