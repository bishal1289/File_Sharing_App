const router = require('express').Router();
const bcrypt = require("bcrypt");
const File = require("../models/file")
const multer = require("multer");

const upload = multer({dest:"Upload"})


router.get("/", (req, res) => {
    res.render("index");
})

router.post("/upload", upload.single("file"), async (req, res) => { 
    
    const fileData = {
        path: req.file.path,
        originalName:req.file.originalname
    }
    if (req.body.password != null && req.body.password !== "") {
        fileData.password = bcrypt.hashSync(req.body.password,10);
    }
    const file = await File.create(fileData);
    res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
})

router.get("/file/:id", handleDownload);
router.post("/file/:id", handleDownload);

async function handleDownload(req, res) { 
const file = await File.findById(req.params.id)
    if (file.password != null) {
        if (req.body.password == null) { 
            res.render("password")
            return;
        }
        if (!(await bcrypt.compare(req.body.password, file.password))) {
            res.render("password", { error:true })
            return;
        }
        
    }
    file.downloadCount++;
    await file.save();
    res.download(file.path, file.originalName);
}


module.exports = router;