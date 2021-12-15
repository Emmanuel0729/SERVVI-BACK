const express = require('express');
const router = express.Router();

const mysqlConnection = require('../conexion');

router.post('/usuario/create',(req, res)=>{
    const {email, telefono, username, password, rol_idRol, token} = req.body;
    mysqlConnection.query('INSERT INTO persona (email, telefono, username, password, rol_idRol, token) VALUES (?,?,?,?,?,?)',[email, telefono, username, password, rol_idRol,token],( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/usuario/createProvider',(req, res)=>{
    const {email, telefono, username, password, vehiculo, token} = req.body;
    mysqlConnection.query('CALL insert_provider(?,?,?,?,?,?)',[email, telefono, username, password, vehiculo,token],( err, rows, fields)=>{
        rows.forEach(element => {
            res.json(element[0]);
          });
    });
});

router.put('/usuario/update/:id',(req, res)=>{
    const {email, telefono, username, password, rol_idRol} = req.body;
    const {idPersona} = req.params;
    console.log(nombre);
    mysqlConnection.query('update persona set email=?, telefono=?, username=?, password=? where idPersona=? ',[email, telefono, username, password, idPersona],( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.delete('/usuario/delete/:id',(req, res)=>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('delete from persona where idPersona=? ',[id],( err, rows, fields)=>{
        if(!err){
            res.json({mensaje:'success'});
        }else{
            console.log(err);
        }
    });
});

router.get('/usuario/tecnico/:id',(req, res)=>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('select username, email, vehiculo, token from prestador_servicio where idPrestador_servicio = ?',[id],( err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.get('/usuario/cliente/:id',(req, res)=>{
    const {id} = req.params;
    console.log(id);
    mysqlConnection.query('select * from persona where idPersona = ?',[id],( err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


module.exports=router;