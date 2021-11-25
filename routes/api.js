var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/novedades', async function(req, res, next) {
    var novedades = await novedadesModel.getNovedades();
  
     novedades = novedades.map(novedad => {
      if (novedad.img_id) {
        const imagen = cloudinary.url(novedad.img_id, {
          width: 960,
          height: 200,
          crop: 'fill'
        });
        return{
          ...novedad,
          imagen
        }
      } else {
          return{
            ...novedad,
            imagen: ''
          }
       }
    }); 
  
    res.json(novedades);
  });

  router.post('/contacto', async (req, res) => {
    const mail = {
      to: 'lilyarce.mestorino@gmail.com',
      subject: 'Contacto web Viajera',
      html: `${req.body.nombre} ${req.body.apellido} se contactó a través de la web y quiere más información a este correo: ${req.body.email} <br> Además, hizo el siguiente comentario: ${req.body.comentario}`
    }

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
  });

  await transport.sendMail(mail)

  res.status(201).json({
    error: false,
    message: 'Mensaje enviado'
  });
});

  module.exports = router;