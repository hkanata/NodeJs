var express = require('express');
var router = express.Router();

var modelsPeoples     = require("../models/peoples");
var modelsTypes_users = require("../models/types_users");
var modelsUsers       = require("../models/users");

router.get('/formRegister', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');
    
    modelsTypes_users.find().exec(function (err, aData) {
        res.render('formRegisterPeople', { title: "Cadastro de Pessoas", fullurl: url, typeUsers: aData});
    });
    //res.send(">> " +req.app.meunome);
});

router.get('/list', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');

    modelsUsers.find().populate('people_id').populate('type_user_id').exec(function (err, aData) {
        
        res.render('listPeople', { title: "Cadastro de Pessoas", fullurl: url, peoples: aData});
    });
});

router.post('/peopleSave', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');

    var name      = req.body.name;
    var email     = req.body.email;
    var password  = req.body.password;
    var type_user = req.body.type_user;
    
    if( req.body._id == null ) {
    
        modelsPeoples.findOne({}, {}, { sort: { '_id' : -1 } }, function(err, aData) {

            var last_id;;
            if( aData !== null ) {
                last_id = aData._id + 1;
            } else {
                last_id = 1;
            }

            var p = new Peoples({_id: last_id, name: name, email: email});
            p.save(function (err) {
                if( !err ) {


                    modelsUsers.findOne({}, {}, { sort: { '_id' : -1 } }, function(err, iData) {
                        var lastUser_id;;
                        if( iData !== null ) {
                            lastUser_id = iData._id + 1;
                        } else {
                            lastUser_id = 1;
                        }
                        var currentUser = new Users({ _id: lastUser_id, password: password, people_id: p, type_user_id: type_user });

                        currentUser.save(function (err) {
                            if( !err ) {
                                modelsTypes_users.find().exec(function (err, aData) {
                                    res.render('formRegisterPeople', { title: "Cadastro de Pessoas", fullurl: url, typeUsers: aData});
                                });
                            } else {
                                res.send("1: ERRO: " + err);
                            }
                        });
                    });

                } else {
                    res.send("2: ERRO: " + err);
                }
            });


        });
    } else {
        var id = req.body._id;
        var update = {name: name, email: email};
        
        modelsPeoples.findOneAndUpdate({_id:id}, update, function (err, eData) {
            modelsUsers.find().populate('people_id').populate('type_user_id').exec(function (err, aData) {
                res.render('listPeople', { title: "Cadastro de Pessoas", fullurl: url, peoples: aData});
            });
        });
    }

    
    /*
    var p = new Peoples({_id: getNextSequence("userid"), name: name, email: email});
    p.save(function (err) {
        res.send(">> " +err);
    });*/
});

router.get('/formUpdate/:id', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');

    var idg = [];
    var tmp = [];
    modelsTypes_users.find().exec(function (err, bData) {
        tmp.push(bData);
        
    });
    
    idg = [{"todos": tmp}];
    
    modelsPeoples.findOne({_id: req.params.id}, function(err, aData) {
        idg.push(aData);
        
        modelsUsers.findOne({_id: aData._id}, function(err, cData) {
            idg.push(cData);
            modelsTypes_users.findOne({_id: cData._id}, function(err, dData) {
                idg.push(dData);
            });
        });
        //console.log(idg[0].todos[0][1]._id);
        //console.log(idg);
        res.render('formRegisterUpdatePeople', { title: "Update Usuarios", fullurl: url, peoples: idg });
    });
    
    
});

router.get('/confirmDelete/:id', function (req, res) {
    var url = req.protocol + '://' + req.get('Host');

    modelsPeoples.findByIdAndRemove({_id: req.params.id}, function(err) {
        modelsUsers.findByIdAndRemove({people_id: req.params.id}, function(err) {
            modelsUsers.find().populate('people_id').populate('type_user_id').exec(function (err, aData) {
                res.render('listPeople', { title: "Cadastro de Pessoas", fullurl: url, peoples: aData});
            });
        });
    });
});
    


module.exports = router;
