const mysql =require('mysql')
const connection =mysql.createConnection({
    host:'localhost',
    database:'signup',
    user:'root',
    password:''
})
connection.connect((err)=>{
    if(!err){
        console.log("connection on base de donnes est reussite")
    }
    else{
        console.log("pas connecter a base de donnes")
    }
})
module.exports=connection