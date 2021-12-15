const express = require('express');
const router = express.Router();

const mysqlConnection = require('../conexion');

router.get('/test', (req,res)=>{
    mysqlConnection.query('select * from persona',( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/login',(req, res)=>{
    const {email, password} = req.body;
    mysqlConnection.query('select * from persona where email= ? and password = ?',[email, password],( err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/loginSP',(req, res)=>{
    const {email, password} = req.body;
    mysqlConnection.query('select * from prestador_servicio where email= ? and password = ?',[email, password],( err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

module.exports=router;