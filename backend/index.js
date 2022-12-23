const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require ('mysql2');
const app = express();

app.use(cors());
app.use(bodyparser.json());

// database connection

const db =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sampledb',
    port:3306,
});

// check database connection

db.connect(err=>{
    if(err) {console.log(err, 'dberr');}
    console.log('database connected');
})


// get all data

app.get('/user',(req,res)=>{
    
    let qr ='select * from user';

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,('errs'))
        }
        if(result.length>0){
            res.send({
                message:"all user data",
                data:result
            });
        }
    })
})

// get single data
 
app.get('/user/:id',(req,res)=>{

    let gID = req.params.id;

    let qr =`select * from user where id = ${gID}`;

    db.query(qr,(err,result)=>{
         
        if(err) {console.log(err);}

        if(result.length > 0)
        {
            res.send({
                message:'single data',
                data:result
            });
        }
        else
        {
            res.send({
                message:'data not found'
            })
        }
    })

});

// create a data

app.post('/user',(req,res)=>{
    
    console.log(req.body,'createData');

    let categoryid = req.body.CategoryId;
    let categoryname = req.body.CategoryName;
    let productid = req.body.ProductId;
    let productname = req.body.ProductName;

    let qr = `insert into user(CategoryId,CategoryName,ProductId,ProductName) values('${categoryid}','${categoryname}','${productid}','${productname}')`;

    db.query(qr,(err,result)=>{

        if(err) {console.log(err,);}

        console.log(result,'result')
        res.send({
            message:'data inserted'
        })
    })
});

// update the single data
app.put('/user/:id',(req,res)=>{
    let gID = req.params.id;
    let categoryid = req.body.CategoryId;
    let categoryname = req.body.CategoryName;
    let productid = req.body.ProductId;
    let productname = req.body.ProductName;

let qr = `update user set CategoryId='${categoryid}',CategoryName='${categoryname}',ProductId='${productid}', ProductName='${productname}'
            where id=${gID} `;
db.query(qr,(err,result)=>{

    if(err){console.log(err);}

    res.send({
        message:'data updated'
    });
});
});


// Delete data

app.delete('/user/:id', (req,res)=>{

    let qID = req.params.id;

    let qr = `delete from user where id = '${qID}'`;
        db.query(qr,(err,result)=>{
            if (err) {console.log(err)}

            res.send({
                message: 'record deleted successfully..'
            });
        });


});

app.listen(3000,()=>{
    console.log("server running..!!")
})