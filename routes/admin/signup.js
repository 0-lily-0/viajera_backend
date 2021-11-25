var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/signup', {
    layout: 'admin/layout'
  });
});

router.post('/', async (req, res, next) => {
    var data = await usuariosModel.existeUsuario(req.body.usuario);
    var existeusuario;
console.log(data);
    if (data != undefined){
        existeusuario = true; //puede ser que el usuario exista o que el catch arrojó error, pero al usuario le informo que ya existe el usuario
    } else {
        existeusuario = false;
    }

  try {
    switch(true) {
        case (req.body.usuario == "" || req.body.password == "" || req.body.password2 == ""):
            res.render('admin/signup', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son obligatorios.'
              }); 
          break;
        case (req.body.password != req.body.password2):
            res.render('admin/signup', {
                layout: 'admin/layout',
                error: true,
                message: 'Las contraseñas no coinciden.'
              }); 
          break;          
        case existeusuario:
            res.render('admin/signup', {
                layout: 'admin/layout',
                error: true,
                message: 'El usuario que está intentando dar de alta ya existe.'
              }); 
          break;
        default:
            await usuariosModel.insertUsuario(req.body.usuario, req.body.password); 
            req.flash("messages", "El usuario fue dado de alta correctamente. A continuación, podrá loguearse:");                            
            res.redirect('/admin/login'); 
      }      

  } catch (error) {
    console.log(error)
    res.render('admin/signup', {
      layout: 'admin/layout',
      error: true,
      message: 'No se dio de alta el usuario'
    })    
  }
  
});

module.exports = router;