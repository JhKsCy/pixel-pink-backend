const express = require('express') 
const router = express.Router()
const { uploadFile, getFileById, getAllFiles, deleteFileById } = require('./../controllers/file.controller')
const { upload } = require('./../middlewares/upload')
const { validateToken } = require('./../middlewares/validateToken')

router.post('/upload-file', validateToken, upload.single('file'), uploadFile)
router.get('/file-by-id/:id', validateToken,  getFileById)
router.get('/all-files', validateToken, getAllFiles)
router.delete('/delete-file/:id', validateToken, deleteFileById)

module.exports = router