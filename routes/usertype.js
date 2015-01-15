var express = require('express');
var router = express.Router();

var modelsTypes_users = require("../models/types_users");


/* GET users listing. */
router.get('/manualRegister', function (req, res) {

    var typesUsers = new TypesUsers({
        _id: 3,
        name: "UsuarioNormal"
    });

    typesUsers.save(function (err) {
        res.send("Salvou");
    });
});


router.get('/formRegister', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');
    res.render('formRegisterTypeUser', { title: "Cadastro de Tipos", fullurl: url });
});


router.post('/usertypeSave', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');

    
    var name      = req.body.name;
    
    if( req.body._id == null ) {
        modelsTypes_users.findOne({}, {}, { sort: { '_id' : -1 } }, function(err, aData) {
            var last_id;;
            if( aData !== null ) {
                last_id = aData._id + 1;
            } else {
                last_id = 1;
            }
            var obj = new TypesUsers({_id: last_id, name: name});

            obj.save(function (err) {

                modelsTypes_users.find().exec(function (err, aData) {
                    res.render('listTypes', { title: "Lista de Tipos", fullurl: url, typesUsers: aData});
                });
            });
        });
    }else{
        var id = req.body._id;
        var update = {name: name};
        modelsTypes_users.findOneAndUpdate({_id:id}, update, function (err, eData) {
            modelsTypes_users.find().exec(function (err, aData) {
                res.render('listTypes', { title: "Lista de Tipos", fullurl: url, typesUsers: aData});
            });
        });
        
    }

    
    
    

    
     
});

router.get('/list', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');

    modelsTypes_users.find().exec(function (err, aData) {
        res.render('listTypes', { title: "Lista de Tipos", fullurl: url, typesUsers: aData});
    });
});

router.get('/formUpdate/:id', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');

    modelsTypes_users.findOne({_id: req.params.id}, function(err, aData) {
        res.render('formRegisterUpdateTypeUser', { title: "Cadastro de Tipos", fullurl: url, usersTypes: aData });
    });
    
    
});

router.get('/confirmDelete/:id', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');

    modelsTypes_users.findByIdAndRemove({_id: req.params.id}, function(err) {
        
        modelsTypes_users.find().exec(function (err, aData) {
            res.render('listTypes', { title: "Lista de Tipos", fullurl: url, typesUsers: aData});
        });
    });
});
    
    



module.exports = router;
