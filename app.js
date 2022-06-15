// const user = require("./controllers/user")
//  user.addUser("marwa", 37, "marwa@gmail.com")
// // user.readAll()
// // user.singleUser("99hn349cl4b2f9e")
// // user.editUser("99hn349cl4b2nf9e", {name:"a", age:"c"})

// const yargs=require("yargs")
// const { type } = require("os")

// yargs.command({
//     command:"readAll",
//     command:"singleUser",
//     handler:function(){
//         user.singleUser('1gr6cg9r4l4b5id2n')
//         },
//     handler:function(){
//     user.readAll()
//     }
// })
// yargs.command({
//     command:"singleUser",
//     handler:function(){
//         user.singleUser('1gr6cg9r4l4b5id2n')
//      }
// })
// yargs.command({
//     command:"addUser",
//     builder:{
//         name:{
//             type:String,
//             // demandOption:true
//         },
//         email:{},
//         age:{
//             type:Number,
//             min:21
//         }
//     },
//     handler: function(argv){
//         user.addUser(argv.name, argv.age, argv.email)
//     }
// })

// yargs.command({
//     command:"editUser",
//     builder:{
//         id:{
//             type:String,
//             // demandOption:true
//         },
//         name:{},
//         email:{},
//         age:{
//             type:Number,
//             min:21
//         }
//     },
//     handler: function(argv){
//         const newData={};
//         user.editUser(argv.id,newData)
//     }
// })
// yargs.argv;

const https=require("https");
const url="https://jsonplaceholder.typicode.com/users";

const req=https.request(url,(res)=>{
    let allData=[]
    res.on("data",(mydata)=>{
     allData+=mydata.toString();
    })
    res.on("end",()=>{
       console.log(JSON.parse(allData))
       })
})
req.on("error",err=>console.log(`error${err}`));
req.end();

