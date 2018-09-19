//Starting with sequelize
const router = require("express").Router();
var db = require("../models");
var multer = require("multer");
var fs = require("fs");
const requestIp = require('request-ip');


var upload = multer({ dest: "images/" })


router.post("/api/click/:itemId", (req, res) =>{
    console.log("inside click info post");
    var itemId = req.params.itemId;
    const ip = req.clientIp;
    // console.log(req.body);

    //Browser can show os and version as well
    db.Click.create({
        ip: ip,
        browser: req.body.browser.name,
        os: req.body.browser.os,
        ItemId: itemId
    }).then(click =>{
        // res.send(click);
        db.Click.findAndCountAll({
            where: {
                itemId: req.params.itemId
            }
        }).then(countAndRows =>{
            res.send(countAndRows);
        })
    })

})

//Create Item, save uploaded image in images folder
router.post("/api/upload/image", upload.single("file"), (req, res) =>{
    // console.log("###################"+req.productname);
    // console.log(req);
    console.log("inside post");
    var extension = "." + req.file.originalname.split(".")[1];

    //File was saved automatically without an extension. Add extension
    fs.rename("images/" + req.file.filename, "images/" + req.file.filename+extension, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });

    db.Item.create({
        name: req.body.itemname,
        description:  req.body.itemdescription,
        price:  req.body.itemprice,
        image: req.file.filename+extension
    }).then(function(item){
        res.json(item);
    })

});

//Read single item
router.get("/api/:item", function(req, res){
    // console.log("Client ip is: " + req.clientIp);
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