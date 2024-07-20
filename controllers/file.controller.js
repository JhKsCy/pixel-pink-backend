const File = require ('./../models/File')
const csvToJson = require('csvtojson')

const uploadFile = async(req, res) => {
    const file = req.file
    const fileName = req.file.originalname
    try{
        if(!file) return res.status(400).json({
            ok: false,
            msg: 'File is mandatory'
        })
        const jsonArray = await csvToJson()
            .fromString(file.buffer.toString('utf-8'))
        
        const dbFile = await File.findOne({ name: fileName })
        if(dbFile) return res.status(400).json({
            ok: false,
            msg: `${fileName} has already been created`
        })
        const dbFileToSave = new File({
            name: fileName,
            data: jsonArray
        })
        await dbFileToSave.save()

        return res.status(201).json({
            ok: true,
            msg: `${fileName} created`
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}

const getFileById = async(req, res) => {
    const id = req.params.id
    try{
        const file = await File.findById({ _id: id });
        if(file){
            return res.status(200).json({
                ok: true,
                msg: file
            })
        }
        return res.status(404).json({
            ok: false,
            msg: 'File not found'
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}

const getAllFiles = async(req, res) => {
    try {
        const files = await File.find().select('_id name')
        return res.status(200).json({
            ok: true,
            msg: 'Users found',
            files: files
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}

const deleteFileById = async(req, res) => {
        const {id} = req.params;
    try{
        const file = await File.findByIdAndDelete(id);
        if (file) return res.status(200).json({
            ok: true,
            msg: 'File deleted successfully'
        })

        return res.status(404).json({
            ok: false,
            msg: 'File not found by id'
        })
    } catch(error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Please contact our support'
        })
    }
}

module.exports = { uploadFile, getFileById, getAllFiles, deleteFileById }