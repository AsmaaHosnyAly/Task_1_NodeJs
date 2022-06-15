const addForm = document.querySelector("#addForm");
const contentWrap= document.querySelector("#contentWrap")
const taskHeads = ["taskTitle", "age","name","phone"]
const userData=document.querySelector("#userData");
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
// add (create)
if(addForm){
    addForm.addEventListener("submit", function(e){
        e.preventDefault()
        // console.log(this)
        // console.log("test")
        // const task = {
        //     taskTitle: addForm.elements['taskTitle'].value,
        //     taskContent: addForm.elements.taskContent.value
        // }
        const task = { status: false, id: Date.now() }
        taskHeads.forEach( h => task[h] = addForm.elements[h].value )
        const allTasks = readFromStorage("tasks")
        allTasks.push(task)
        writeDataToStorage("tasks", allTasks)
        
        addForm.reset()
        window.location.href = "index.html"
    })    
}
const createMyOwnElement = (parent, ele, text, classes) =>{
    const myEle = document.createElement(ele)
    if(text) myEle.textContent = text
    if(classes) myEle.classList=classes
    parent.appendChild(myEle)
    return myEle
}

// show all (read all)
// if(contentWrap){
//     const allData = readFromStorage('tasks')
    // allData.forEach((task, i)=>{
    // // contentWrap.innerHTML+=`<tr>
    // //     <td>${task.id}</td>
    // //     <td>${task.taskTitle}</td>
    // //     <td>
    // //         <a href="#" class="btn btn-primary mx-3" id="${i}">Show</a>
    // //         <a href="#" class="btn btn-warning mx-3">Edit</a>
    // //         <a href="#" class="btn btn-danger mx-3">Delete</a>
    // //     </td>
    // // </tr>`
    // const tr = document.createElement("tr")
    // contentWrap.appendChild(tr)
    // let td = document.createElement("td")
    // tr.appendChild(td)
    // td.textContent = task.id
    // td = document.createElement("td")
    // tr.appendChild(td)
    // td.textContent = task.taskTitle
    // td = document.createElement("td")
    // tr.appendChild(td)
    // const showBtn = document.createElement("button")
    // showBtn.textContent = "show"
    // showBtn.classList="btn btn-primary mx-3"
    // td.appendChild(showBtn)
    // showBtn.addEventListener("click", function(e){
    //     window.alert(`${i}`)
    // })
    // const editBtn = document.createElement("button")
    // editBtn.textContent = "Edit"
    // editBtn.classList="btn btn-warning mx-3"
    // td.appendChild(editBtn)
    // const delBtn = document.createElement("button")
    // delBtn.textContent = "Delete"
    // delBtn.classList="btn btn-danger mx-3"
    // td.appendChild(delBtn)
    // })
const showAll = (allData) =>{
    contentWrap.innerHTML=""
    if(allData.length==0){
        const tr = createMyOwnElement(contentWrap, "tr", null, "alert alert-danger")
        const td = createMyOwnElement(tr, "td", "No Data Yet", "alert alert-danger")
        td.setAttribute("colspan", "3")
    }
    allData.forEach((task, i)=>{
        const tr = createMyOwnElement(contentWrap, "tr", null, null)
        createMyOwnElement(tr, "td", task.id, null)
        createMyOwnElement(tr, "td", task.name, null)
        createMyOwnElement(tr, "td", task.phone, null)
        const td = createMyOwnElement(tr, "td", null, null)
        
        const td1 = createMyOwnElement(tr, "td", null, null)
        const statusBtn = createMyOwnElement(td1, "button", "Active","btn btn-success mx-3")
        const showBtn = createMyOwnElement(td, "button", "show","btn btn-primary mx-3")
        const editBtn = createMyOwnElement(td, "button", "Edit","btn btn-warning mx-3")
        const delBtn = createMyOwnElement(td, "button", "Delete","btn btn-danger mx-3")
        // showBtn.addEventListener("click", function(e){
        //     window.alert(`${i}`)
        //    console.log(task.id);
        // }) 
        showBtn.addEventListener("click", function(e){
            localStorage.setItem("single",i);
            window.location.href = "showSingle.html"
        }) 
        editBtn.addEventListener("click", (e)=> editSingle(i))   
        delBtn.addEventListener("click", (e)=>{
            allData.splice(i, 1)
            writeDataToStorage("tasks",allData)
            showAll(allData)
        })  
        
        console.log(task.status)
        statusBtn.addEventListener("click", (e)=>{ 
        if(!task.status){
            statusBtn.classList="btn btn-danger";
            statusBtn.textContent="Inactive"
            task.status=true;
            writeDataToStorage("tasks",allData)
        }
        else
       {
        statusBtn.classList="btn btn-success";
        statusBtn.textContent="Active";
        task.status=false;
        writeDataToStorage("tasks",allData)

    
       }
           
        })   
    })
}
if(contentWrap){
    const allData = readFromStorage('tasks')    
    showAll(allData)
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


// const isEven=(number,callback)=>{
//   if(number%2==0) callback("Even number","true");
//   else return callback("odd number","false");
// }


// const myPromise=(val)=>{
//     return new Promise((resolve,rejected)=>{
//     setTimeout((console.log(data)),1200)
//     })
// }
// myPromise(data).then((data)=>console.log(data)).catch((error)=>console.log(error));
