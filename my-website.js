

let inputBtn = document.getElementById("input-btn");

const inputEl = document.getElementById("input-el");

let myLeads = ["www.awesomelead.com", "www.epiclead.com", "www.greatlead.com"];

let outputEl = document.getElementById("output-el");

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value);
  renderLeads();
  console.log(myLeads);
  inputEl.value = "";
  
})

function renderLeads() {
  let output = " ";
  myLeads.forEach((item)=>{
   
  output += "<li>" + item + "</li>"
  });
  outputEl.innerHTML = output;
  
}

