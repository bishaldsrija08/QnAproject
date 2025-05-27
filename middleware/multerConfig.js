const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './storage')
    },
    filenme: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + file.originalname
        cb(null, uniqueSuffix)
    }
})

module.exports = {
    multer,
    storage
}