const yargs = require('yargs')


const http=require("http");
const url="http://jsonplaceholder.typicode.com/users";
const getData=(url)=>{
    const req=http.request(url,(res)=>{
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

}





yargs.command({
    command:"getData",
    builder:{
        url:{
            type:String,
            // demandOption:true
        }   
    },
    handler: function(argv){
        getData(url);
    }
})
yargs.argv;

