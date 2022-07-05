const log = console.log;

// Populating input textarea
const contract_ta = document.getElementById("contractText");
const text = 
`雇用者:　花と緑有限会社
被雇用者:　鳩飼ササミ
時給:　三千円`

contract_ta.value = text;


// Define a reusable singleton XHR for every page load
const xhr = new XMLHttpRequest();
xhr.responseType = 'json';

// Call a function when the state changes.
xhr.onreadystatechange = function() { 

  // On ‘success’, change view
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    // Update #summarized view here
    const summarized = document.getElementById('summarized');
    log(JSON.parse(xhr.response));
    summarized.textContent = xhr.response;
    alert('要約をご覧ください');
  }  
}

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('input');

  // XHRHttpRequest.send() on submit
  form.addEventListener('submit', function(e){
    e.preventDefault();  

    xhr.open("POST", this.getAttribute('action'));

    var obj = Object.fromEntries(new FormData(this)); 

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(obj));
  })
})




