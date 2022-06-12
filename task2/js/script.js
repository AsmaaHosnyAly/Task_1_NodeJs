const addForm = document.querySelector("#addForm");
const contentWrap= document.querySelector("#contentWrap")
const userData=document.querySelector("#userData");
const userAApiData=document.querySelector("#userAApiData");
const editForm=document.querySelector("#editForm");
// read from storage //union operator ||
const readFromStorage = (key,dataType="") =>{
    let data,myData;
    myData=localStorage.getItem(key);
    if(dataType=="string") return myData
    try{
         data = JSON.parse(myData || [] )
        if(!Array.isArray(data)) throw new Error("is not array")
    }
    catch(e){
        // console.log(e)
        data = []
    }
    return data
}
// write to storage
const writeDataToStorage = (key, value) =>{
    try{
        localStorage.setItem(key, JSON.stringify(value))
    }
    catch(e){
        localStorage.setItem(key, "[]")
    }
}

const createMyOwnElement = (parent, ele, text, classes) =>{
    const myEle = document.createElement(ele)
    if(text) myEle.textContent = text
    if(classes) myEle.classList=classes
    parent.appendChild(myEle)
    return myEle
}

if(userData){
    const index=readFromStorage('single',"string");
    const allData= readFromStorage("tasks");
    try{
        const user = allData[index]
        createMyOwnElement(userData, "div", user.id,null)
        createMyOwnElement(userData, "h5", user.name,null)
        createMyOwnElement(userData, "h4",user.phone,null)    
    }
    catch(e){
        createMyOwnElement(userData, "div", "no user with this id", "alert alert-danger")
    }
}

// show single (read single)
const showSingle=()=>{
    addForm.addEventListener("submit", function(e){
        e.preventDefault()
        const task = { status: false, id: Date.now() }
        taskHeads.forEach( h => task[h] = addForm.elements[h].value )
       console.log(taskHeads);  
    })   

}
const editSingle = (i)=>{
    localStorage.setItem("edit", i)
    window.location.href="edit.html"
}
// edit (update)
if(editForm){
    const index = readFromStorage('edit', "string")
    const allData = readFromStorage("tasks")
    const task = allData[index]
    console.log(task)
    taskHeads.forEach( h => editForm.elements[h].value = task[h] )
    editForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        taskHeads.forEach( h =>  allData[index][h]=editForm.elements[h].value )
        writeDataToStorage("tasks",allData)
        editForm.reset()
        window.location.href="index.html"
        
    })
}


function apiData(cb){
    const data = fetch('https://jsonplaceholder.typicode.com/users')
    data
    .then(res=> {
        jsonData = res.json()
        jsonData
        .then(result=> cb(result))
        .catch(ee=> cb(ee))
    })
    .catch(e=> cb(e))
}
// delete (delete)
const delElementFromArray = (storageKey,allData, i)=>{
    allData.splice(i, 1)
    writeDataToStorage(storageKey,allData);
    tr.remove();
    // showApiData();
}


const showApiData=()=>{
    userAApiData.innerHTML=""
    apiData(res=> 
    res.forEach((ele,i)=>{
     
    //     if(ele.length==0){
    //     const tr = createMyOwnElement(userAApiData, "tr", null, "alert alert-danger")
    //     const td = createMyOwnElement(tr, "td", "No Data Yet", "alert alert-danger")
    //     td.setAttribute("colspan", "6")
    //     }

        const tr = createMyOwnElement(userAApiData, "tr", null, null)
        createMyOwnElement(tr, "td", ele.id, null)
        createMyOwnElement(tr, "td",ele.name, null)
        createMyOwnElement(tr, "td", ele.phone, null)
        createMyOwnElement(tr, "td", ele.username, null)
        createMyOwnElement(tr, "td", ele.email, null)
        const td = createMyOwnElement(tr, "td", null, null)
        
        const td1 = createMyOwnElement(tr, "td", null, null)
        const statusBtn = createMyOwnElement(td1, "button", "Active","btn btn-success mx-3")
        const showBtn = createMyOwnElement(td, "button", "show","btn btn-primary mx-3")
        const editBtn = createMyOwnElement(td, "button", "Edit","btn btn-warning mx-3")
        const delBtn = createMyOwnElement(td, "button", "Delete","btn btn-danger mx-3")
        
        showBtn.addEventListener("click", (e)=> showSingle(i)) 
        editBtn.addEventListener("click", (e)=> editSingle(i))   
        delBtn.addEventListener("click", (e)=> tr.remove())  
        //  writeDataToStorage("allData", res)
         
    }))}


if(userAApiData){
//  const allData = readFromStorage('allData')    
    showApiData();
}




