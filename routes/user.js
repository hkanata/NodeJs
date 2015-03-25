var express = require('express');
var router = express.Router();

var modelsPeoples = require("../models/peoples");
var modelsUsers = require("../models/users");
var modelsTypes_users = require("../models/types_users");

var bosta;

/* GET users listing. */
router.get('/', function (req, res) {

    //var p1 = new Peoples({_id: 1, name: 'Musashi', email: "hkanata@gmail.com"});
    //var p2 = new Users({password: 1, people_id: p1});
    //res.send('>>> ' + p2);

    var msg = "";

    var p1 = new Peoples({_id: 20, name: 'Musashi', email: "hkanata@gmail.com"});
    p1.save(function (err) {

        msg += "[ 1:" + err + "]";

        var typesUsers = new TypesUsers({
            _id: 21,
            name: "Administrador"
        });

        typesUsers.save(function (err) {
            msg += "[ 2:" + err + "]";
            var users = new Users({
                _id: 22,
                password: "senha123",
                people_id: p1._id,
                type_user_id: typesUsers._id
            });

            users.save(function (err) {
                msg += "[ 3:" + err + "]";
                res.send('>>> ' + msg);
            });
        });
    });

    /*users.find(function(err, userx){
     res.send(err + " MU: " + userx);
     });*/
    //res.send('respond with a resource');
});

router.get('/listar', function (req, res) {

    /*
     modelsUsers.find()
     .populate("people_id")
     .populate("type_user_id")
     .exec(function (err, storys) {
     res.send("aa: " + storys);
     });
     */
    /*
    modelsPeoples.find().exec(function (err, storys) {
        //res.send("aa: " + storys);
        var p_id = storys[0]._id;

        var ret = chamando(p_id);

        res.send("aa: " + ret);

    });*/
    
    

        res.send("axxxa: " + chamando(1));
    
    
});

function chamando(id) {

    var aux;
    modelsUsers.findOne({people_id: 1}).exec(function (err, storys) {
        //res.send("aa: " + storys);
       aux = storys;
		return aux;
    });
    
}




module.exports = router;
