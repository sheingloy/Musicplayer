const db = require('../config/db');

module.exports = {
  getAllSongs: (callback) => {
    const query = "SELECT * FROM mymusics";
    db.execute(query, (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },
  addSong: (data, callback) => {
    const query = "INSERT INTO mymusics (title, artist, lyrics, image, music) VALUES (?, ?, ?, ?, ?)";
    db.execute(query, [data.title, data.artist, data.lyrics, data.image, data.music], callback);
  },



  deleteSong: (id, callback) => {
    const query = "DELETE FROM mymusics WHERE id = ?";
    db.execute(query, [id], callback);
  },


  
  getSongById: (id, callback) => {
    const query = "SELECT * FROM mymusics WHERE id = ?";
    db.execute(query, [id], (err, results) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, results[0]);
      }
    });
  },
  updateSong: (id, data, callback) => {
    const query = "UPDATE mymusics SET title = ?, artist = ?, lyrics = ?, image = ?, music = ? WHERE id = ?";
    db.execute(query, [data.title, data.artist, data.lyrics, data.image, data.music, id], callback);
  }
};