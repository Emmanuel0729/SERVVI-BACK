const express = require('express');
const router = express.Router();

const mysqlConnection = require('../conexion');

router.get('/servicios', (req,res)=>{
    mysqlConnection.query('select * from servicio',( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/misServicios/:id', (req,res)=>{
    const {id}=req.params
    console.log(id)
    mysqlConnection.query('select tipoServicio from servicio inner join servicio_has_persona on idServicio= servicio_idServicio inner join persona on idPersona = Persona_idPersona where idPersona=?',[id],( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


router.post('/misServicios/save', (req,res)=>{

    const {servicio_idServicio, Persona_idPersona} = req.body

    mysqlConnection.query('insert into servicio_has_prestador(servicio_idServicio, Persona_idPersona) values(?,?)',[servicio_idServicio, Persona_idPersona],( err, rows, fields)=>{
        if(!err){
            res.json({mesanje:"success"});
        }else{
            console.log(err);
        }
    });
});

router.delete('/misServicios/delete/:id', (req,res)=>{
    const {id}=req.params
    const {idServicio} = req.body
    console.log(id);
    console.log(idServicio);
    mysqlConnection.query('delete from servicio_has_persona where servicio_idServicio=? and Persona_idPersona=?',[idServicio, id],( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


module.exports=router;