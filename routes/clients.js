var mongojs = require('mongojs');
const express = require('express');
const router = express.Router();

var db = mongojs('mongodb://admin:admin@brunoynov-shard-00-00-sndon.mongodb.net:27017,brunoynov-shard-00-01-sndon.mongodb.net:27017,brunoynov-shard-00-02-sndon.mongodb.net:27017/bank?ssl=true&replicaSet=BrunoYnov-shard-0&authSource=admin', ['bank']);

//afficher tous les clients
router.get('/', (req, res, next)=>
{
    db.bank.find({"username":{$ne:null}}, function(err, clients)
    {
        if(err)
            console.log('error to find : '+err);

        res.json(clients);
    })
});

// router.get('/mouvements/:id', function(req, res, next){
//     console.log(JSON.stringify(mongojs.ObjectId(req.params.id)))
//     db.bank.find({$or:[{
//         id_debiteur: JSON.stringify(mongojs.ObjectId(req.params.id))
//     },{
//         id_crediteur: JSON.stringify(mongojs.ObjectId(req.params.id))
//     }]},
//         function(err, mouvements){
//             if(err){
//                 res.send(err);
//             }
//             res.json(mouvements);
//         }
//     )
// });

// afficher les mouvements d'un cleint 
router.get('/mouvements/:id', function(req, res, next){
    db.bank.find({$or:[
        {"id_debiteur": req.params.id },
        {"id_crediteur": req.params.id }
    ]}, 
    function(err, clients)
    {
        if(err)
            console.log('error to find : '+err);
        res.json(clients);
    })
});

//creer un compte client
router.post('/',(req, res, next)=>
{
    let client = req.body;
    if(!client.nom || !client.prenom || !client.username || !client.password){
        res.status(400);
        res.json({
            "error": "Il est nécessaire d'avoir un prénom, navré."
        });
    } else {
        db.bank.save(client, function (err, client) {
            if(err){
                res.send(err);
            }
            res.json(client)
        });
    }
});


// afficher un client 
router.get('/:id', function(req, res, next){
    db.bank.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, client){
        if(err){
            res.send(err);
        }
        res.json(client);
    });
});


 
//supprimer un compte client
router.delete('/:id', function(req, res, next){
    db.bank.remove({_id: mongojs.ObjectId(req.params.id)},function(err, client){
        if(err){
            res.send(err);
        }
        res.json(client);
    });
});

//mise à jour d'un compte client
router.put('/:id', function(req, res, next){
    var client = req.body;
    var updClient = {
        nom: client.nom,
        prenom: client.prenom,
        solde: client.solde,
        username: client.username,
        password: client.password

    };
    
    if(!updClient){
        res.status(400);
        res.json({
            "error":"Router : J'ai besoin d'un nouveau client ici :("
        });
    } else {
        db.bank.update({_id: mongojs.ObjectId(req.params.id)},updClient, function(err, client){
        if(err){
            res.send(err);
        }
        res.json(client);
    });
    }
});
module.exports = router;