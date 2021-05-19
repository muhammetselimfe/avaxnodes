const mongoose = require('mongoose');

const notifierStatsSchema = new mongoose.Schema({
  _id: String,
  users: Number,
  total: Number,
},
{
  _id: false,
  timestamps: true
});

const NotifierStats = mongoose.models.NotifierStats || mongoose.model('NotifierStats', notifierStatsSchema)

module.exports = NotifierStats
