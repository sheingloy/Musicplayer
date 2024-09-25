const express = require('express');
const multer = require('multer');
const router = express.Router();
const main = require('../controller/Maincontroller.js');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get('/', main.getAllSongs);
router.get('/song/:id', main.getSong);
router.post('/add', upload.fields([{ name: 'musicFile' }, { name: 'imageFile' }]), main.addSong);
router.get('/edit/:id', main.getEditSong);
router.post('/edit/:id', upload.fields([{ name: 'musicFile' }, { name: 'imageFile' }]), main.editSong);


router.post('/delete/:id', main.deleteSong);

module.exports = router;
