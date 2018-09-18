//Starting with sequelize
const router = require("express").Router();
var db = require("../models");
var multer = require("multer");
var fs = require("fs");

var upload = multer({ dest: "images/" })
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/images')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname))
//     }
//   })
  
// var upload = multer({ storage: storage })


//Create Item, save uploaded image in images folder
router.post("/api/upload/image", upload.single("file"), (req, res) =>{
    // console.log("###################"+req.productname);
    console.log(req);
    console.log("inside post");
    var extension = "." + req.file.originalname.split(".")[1];

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

})

// //Create item
// router.post("/api/item", function(req, res){
//     // console.log("egg");
//     db.Item.create({
//         name: req.body.itemname,
//         description:  req.body.itemdescription,
//         price:  req.body.itemprice
//     }).then(function(item){
//         res.json(item);
//     })
// });

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