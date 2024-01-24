let tHead = document.getElementById('thead')
let tBody = document.getElementById('tbody')
let createForm = document.getElementById('createForm')
let readCars = document.getElementById('readCars')
let readParts = document.getElementById('readParts')
let loadingPara = document.getElementById('loadingPara')

let urlParameter = ''

/*
  Fetching data from the server
  Fetch gets data as json and calls function that prints it inside DOM 
*/
async function getData(){
  var rawData = await fetch(urlParameter)
  var jsonData = await rawData.json()
  printDataInsideTable(jsonData)
}

//Buttons on frontend that prints data
readCars.addEventListener('click', () => {
  loadingPara.innerHTML = 'Loading...'
  urlParameter = '/cars'
  getData()
})

readParts.addEventListener('click', () => {
  loadingPara.innerHTML = 'Loading...'
  urlParameter = '/parts'
  getData()
})

/*
  Function for inputing data
  Creates an object from inputed values, converts object to JSON and sends it with post req 
*/
async function sendDataToDB(createForm){
  var obj = {}
  const data = new FormData(createForm)
  data.forEach(function(value,key){
    obj[key] = value
  })
  var json = JSON.stringify(obj);
  fetch('/cars',{
    method : 'post',
    headers : {
      'Content-Type': 'application/json'
    },
    body : json
  }).then(() => {
      location.reload()
      window.onload = alert('Data sent')
  }).catch((console.error(error)))
}

//Submit button inside form that calls function for inputting data
createForm.addEventListener('submit',async(e) => {
  e.preventDefault()
  sendDataToDB(createForm)
})

/*
  Delete request
  Function takes id of element that is saved inside button id tag
  Sends post req 
*/

function deleteFromDB(buttonID){  
  fetch('/cars/delete',{
    method : 'post',
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify( {buttonID} ),
  }).then(() => {
    getData()
    window.onload = alert('Data deleted')
  }).catch((e) => {
    console.log(e)
  })
}

function editDataFromDB(buttonID){

}

/* 
  Functions used for dynamicly printing data inside DOM
  Loops through array of objects and creates table headers from keys, 
  with 2 extra ones for delete and edit btn

  Then populates table body with data and adds buttons for deleting/editing data 
*/

function printTableHeader(data){
  loadingPara.innerHTML = ''
  tHead.innerHTML = ''
  tBody.innerHTML = ''
  let tableRow = document.createElement('tr')
  for(key in data[0]){
      if(key !== 'createdAt' && key !== 'updatedAt' && key !== '__v'){
          let tH = document.createElement('th')
          tH.innerHTML = key
          tableRow.appendChild(tH)
      }
  }
  let deleteBtnHeader = document.createElement('th')
  deleteBtnHeader.innerHTML = 'Delete'
  let editBtnHeader = document.createElement('th')
  editBtnHeader.innerHTML = 'Edit'
  tableRow.appendChild(deleteBtnHeader)
  tableRow.appendChild(editBtnHeader)
  tHead.appendChild(tableRow)
}

function printDataInsideTable(data){
  printTableHeader(data)
  for(i in data){
    let tr = document.createElement('tr')
    for(key in data[i]){
      if(key !== 'createdAt' && key !== 'updatedAt' && key !== '__v'){
          let td = document.createElement('td')
          td.innerHTML = data[i][key]
          tr.appendChild(td)
      }
    }
    let deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'Delete'
    deleteBtn.classList = 'btn btn-danger'
    deleteBtn.id = data[i]['_id']
    deleteBtn.addEventListener('click',() => {
      deleteFromDB(deleteBtn.id)
    })
    let editBtn = document.createElement('button')
    editBtn.innerHTML = 'Edit'
    editBtn.classList = 'btn btn-warning'
    editBtn.id = data[i]['_id']
    editBtn.addEventListener('click',() => {
      
    })
    let td = document.createElement('td')
    td.appendChild(deleteBtn)
    tr.appendChild(td)
    let tDE = document.createElement('td')
    tDE.appendChild(editBtn)
    tr.appendChild(tDE)
    tBody.appendChild(tr)
  }
}
