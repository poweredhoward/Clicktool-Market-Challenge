//Starting with sequelize
const router = require("express").Router();
var db = require("../models");

//Create item
router.post("/api/item", function(req, res){
    // console.log("egg");
    db.Item.create({
        name: req.body.itemname,
        description:  req.body.itemdescription,
        price:  req.body.itemprice
    }).then(function(item){
        res.json(item);
    })
});

//Read single item
router.get("/api/:item", function(req, res){
    db.Item.findOne({
        where: {
            name:req.params.item
        }
    }).then(function(item){
        res.json(item);
    })
});

//Get all items in database
router.get("/api/all/items", function(req, res){
    db.Item.findAll()
    .then(function(items){
        console.log(items);
        res.json(items);
    })
})

//Update/edit existing item
router.put("/api/:item", function(req, res){
    db.Item.update({
        price: req.body.newprice
    }, {
        where:{
            name: req.params.item
        }
    }).then(function(itemid){
        console.log("Updated item:" + itemid);
        db.Item.findOne({
            where: {
                id: itemid
            }
        })
        .then(function(updatedItem){
            res.json(updatedItem);
        })
    })
});

router.delete("/api/:item", function(req, res){
    db.Item.destroy({
        where: {
            name: req.params.item
        }
    }).then(function(deletedItem){
        res.json(deletedItem);
    })
})





module.exports = router;