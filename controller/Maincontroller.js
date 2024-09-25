const Musicmodel = require('../models/Musicmodel');

const main = {

  getAllSongs: (req, res) => {
    Musicmodel.getAllSongs((err, songs) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.render('index', { songs });
      }
    });
  },

  getSong: (req, res) => {
    const songId = req.params.id;
    Musicmodel.getSongById(songId, (err, song) => {
        if (err || !song) {
            res.status(500).send(err || 'Song not found');
        } else {
            console.log(song);
            res.render('song', { song });
        }
    });
},

  addSong: (req, res) => {
    try {
      const newSong = {
        title: req.body.title,
        artist: req.body.artist,
        lyrics: req.body.lyrics,
        image: req.files.imageFile ? req.files.imageFile[0].filename : '',
        music: req.files.musicFile ? req.files.musicFile[0].filename : ''
      };

      Musicmodel.addSong(newSong, (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.redirect('/');
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  editSong: (req, res) => {
    try {
      const songId = req.params.id;
      const updatedSong = {
        title: req.body.title,
        artist: req.body.artist,
        lyrics: req.body.lyrics,
        image: req.files.imageFile ? req.files.imageFile[0].filename : req.body.oldImage,
        music: req.files.musicFile ? req.files.musicFile[0].filename : req.body.oldMusic
      };

      Musicmodel.updateSong(songId, updatedSong, (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.redirect('/');
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  deleteSong: (req, res) => {
    const songId = req.params.id;
    Musicmodel.deleteSong(songId, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.redirect('/');
      }
    });
  },

  getEditSong: (req, res) => {
    const songId = req.params.id;
    Musicmodel.getSongById(songId, (err, song) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.render('edit', { song });
      }
    });
  }
};

module.exports = main;
