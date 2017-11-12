var mongojs = require('mongojs');
const express = require('express');
const router = express.Router();

var db = mongojs('mongodb://admin:admin@brunoynov-shard-00-00-sndon.mongodb.net:27017,brunoynov-shard-00-01-sndon.mongodb.net:27017,brunoynov-shard-00-02-sndon.mongodb.net:27017/bank?ssl=true&replicaSet=BrunoYnov-shard-0&authSource=admin', ['bank']);

//afficher tous les transferts
router.get('/', (req, res, next)=>
{
    db.bank.find({"id_debiteur":{$ne:null}},function(err, mouvements)
    {
        if(err)
            console.log('error to find : '+err);

        res.json(mouvements);
    })
});

//afficher un transfert
router.get('/:id', function(req, res, next){
    db.bank.findOne({_id: mongojs.ObjectId(req.params.id)}, 
        function(err, mouvement){
            if(err){
                res.send(err);
            }
            res.json(mouvement);
    });
});

//supprimer un mouvement
router.delete('/:id', function(req, res, next){
    db.bank.remove({_id: mongojs.ObjectId(req.params.id)},
        function(err, mouvement){
            if(err){
                res.send(err);
            }
            res.json(mouvement);
    });
});

// creer un mouvement
router.post('/',(req, res, next)=>
{
    let mouvement = req.body;
    if(!mouvement){
        res.status(400);
        res.json({
            "error": "Il est nécessaire d'avoir un virement pour virer de l'argent."
        });
    } else {
        db.bank.save(mouvement, function (err, mouvement) {
            if(err){
                res.send(err);
            }
            res.json(mouvement)
        });
    }
});



// transfert account to another
// router.put('/mouvement/:id_debiteur/:id_crediteur/:montant', 
//     function(req, res, next){
//         const mouvement = req.body;
//         const updClient = {};

//         db.bank.update({_id: mongojs.ObjectId(req.params.id)}, updClient, {}, function(err, mouvement){
//             if(err){
//                 res.send(err);
//             }
//             res.json(mouvement);
//         });
// });
module.exports = router;