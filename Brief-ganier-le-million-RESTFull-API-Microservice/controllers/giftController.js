const Gift = require('../models/giftModel')
const formidable = require('formidable');
const fs = require("fs")
const lodash = require("lodash")

exports.createGift = (req, res) => {
  let form = new formidable.IncomingForm();

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
      if(err){
          return res.status(400).json({
              error: "Image could nor update"
          })
      }

      let gift = new Gift(fields);

      if(files.photo){

        if(files.photo.size > Math.pow(10, 6)){
            return res.status(400).json({
                error: "Image should be less than 1Mo in size !"
            })
        }
          gift.photo.data = fs.readFileSync(files.photo.path)
          gift.photo.contentType = files.photo.type
      }


      gift.save((err, gift) => {
          if(err){
              return res.status(400).json({
                  error: err.message
              })
          }

          res.json({
              gift
          })
      })
  })

}


exports.giftById = (req, res, next, id) => {
    Gift.findById(id)
    .exec((err, gift) => {
        if(err || !gift){
            return res.status(400).json({
                error: "Product not found"
            })
        }

        req.gift = gift
        next()
    })
}



exports.allProducts = (req, res) => {
    Gift.find()
           .select("-photo") //not show url photo in query uri
           .exec((err, gifts) => {
               if(err){
                   return res.status(404).json({
                       error: "Gifts not found"
                   })
               } 
               res.json({
                   gifts
               })
           })
}


// get photo from data base
exports.photoGift = (req, res) => {
    const {contentType, data} = req.gift.photo

    if(data) {
        res.set("Content-Type" , contentType)
        
        return res.send(data)
    }
}