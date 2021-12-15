const express = require('express');
const router = express.Router();

const mysqlConnection = require('../conexion');

router.post('/orden/save', (req,res)=>{
    const {servicio_idServicio, status_idstatus,horoInicio, horaFin, dia, latitud, longitud, cliente_idPersona, servidor_idPersona} = req.body;
    console.log(servicio_idServicio, status_idstatus,horoInicio, horaFin, dia, latitud, longitud, cliente_idPersona, servidor_idPersona);
    mysqlConnection.query('CALL insert_orden(?,?,?,?,?,?)',[servicio_idServicio, status_idstatus, dia, latitud, longitud, cliente_idPersona], ( err, rows, fields)=>{
        rows.forEach(element => {
            res.json(element[0]);
          });
    });
});

router.get('/orden/historial/:id', (req, res)=>{
    const {id}=req.params
    mysqlConnection.query('SELECT idOrden, status, dia, tipoServicio, servidor_idPersona, username FROM orden inner join servicio on servicio_idServicio = idServicio inner join status on status_idstatus = idstatus inner join prestador_servicio on servidor_idPersona = idPrestador_servicio where cliente_idPersona =  ?',[id], ( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
})


router.get('/orden/get/:id', (req,res)=>{
    const {id}=req.params
    console.log(id)
    mysqlConnection.query('select * from orden inner join servicio on orden.servicio_idServicio = servicio.idServicio left join servicio_has_persona on servicio.idServicio = servicio_has_persona.servicio_idServicio where servicio_has_persona.Persona_idPersona =?',[id],( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


router.put('/orden/asignar', (req,res)=>{
    const {idOrden, servidor_idPersona} = req.body;

    mysqlConnection.query('UPDATE servis.orden SET servidor_idPersona = ? WHERE (`idOrden` = ?)',[servidor_idPersona, idOrden], ( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/orden/espera/:id', (req,res)=>{
    const {id}=req.params
    console.log(id)
    mysqlConnection.query('select * from orden where idOrden =?',[id],( err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});


router.get('/orden/trayecto/:id', (req,res)=>{
    const {id}=req.params
    console.log(id)
    mysqlConnection.query('select * from trajecto where orden_idOrden = ? order by idtrajecto desc  limit 1',[id],( err, rows, fields)=>{
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.put('/orden/cancelar/:id', (req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('UPDATE orden SET status_idstatus = 1 WHERE idOrden = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json({mesanje:"success"})
        }else{
            console.log(err);
        }
    })
});

router.get('/orden/aceptarOrden/:id', (req, res)=>{
    const {id}=req.params
    mysqlConnection.query('Select idOrden, latitud, longitud, dia, imagenServicio, tipoServicio, cliente_idPersona from prestador_servicio as p inner join servicio_has_prestador as sp on p.idPrestador_servicio = sp.Persona_idPersona inner join servicio as s on s.idServicio = sp.servicio_idServicio inner join orden as o on o.servicio_idServicio = s.idServicio WHERE p.idPrestador_servicio = ? and status_idstatus=3 and servidor_idPersona = 3',[id], ( err, rows, fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/orden/statusCancelada/:id', (req,res)=>{
    const {id} = req.params;
    mysqlConnection.query('select * from orden where idOrden = ?', [id], (err, rows, fields)=>{
        if(!err){
            res.json(rows[0])
        }else{
            console.log(err);
        }
    })
});

router.put('/orden/iniciar', (req,res)=>{

    const {idOrden,horaInicio} = req.body;
    console.log(idOrden, horaInicio)
    mysqlConnection.query('UPDATE orden SET horaInicio = ? WHERE idOrden = ?', [horaInicio,idOrden], (err, rows, fields)=>{
        if(!err){
            res.json({mesanje:"success"})
        }else{
            console.log(err);
        }
    })
});

router.put('/orden/terminar', (req,res)=>{
    const {idOrden,horaFin} = req.body; 
    mysqlConnection.query('UPDATE orden SET horaFin = ?, status_idstatus=2 WHERE idOrden = ?', [horaFin, idOrden], (err, rows, fields)=>{
        if(!err){
            res.json({mesanje:"success"})
        }else{
            console.log(err);
        }
    })
});

router.post('/orden/save/ubicacion', (req,res)=>{

    const {latitud, longitud, hora, orden_idOrden, status_idStatus} = req.body

    mysqlConnection.query('INSERT INTO `servis`.`trajecto` (latitud, longitud, hora, orden_idOrden, status_idStatus) VALUES (?,?,?,?,?)',[latitud, longitud, hora, orden_idOrden,status_idStatus],( err, rows, fields)=>{
        if(!err){
            res.json({mesanje:"success"});
        }else{
            console.log(err);
        }
    });
});


module.exports=router;