const fs = require('fs')
const multer = require('multer')

// create folder
// notes
const noteUploadsPath = () => {
    let path = "./public/uploads/notes/"
    if(!fs.existsSync(path)){
        fs.mkdirSync(path,{recursive: true})
    }
    return path
}

// storages
// images storage
const imagesStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        return cb(null,noteUploadsPath())
    },
    filename: (req,file,cb) => {
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

// images upload
const imagesUpload = multer({storage: imagesStorage})

// exports
module.exports = {
    imagesUpload,
}