const express = require('express') 
const router = express.Router()
const { uploadFile, getFileById, getAllFiles, deleteFileById } = require('./../controllers/file.controller')
const { upload } = require('./../middlewares/upload')

router.post('/upload-file', upload.single('file'), uploadFile)
router.get('/file-by-id/:id', getFileById)
router.get('/all-files', getAllFiles)
router.delete('/delete-file/:id', deleteFileById)

module.exports = router