const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  _id: String,
  totalNodes: Number,
  totalTransactions: Number,
  totalProviders: Number,
  totalDelegations: Number,
  totalBlocks: Number,
  totalParticipation: Number,
},
{
  _id: false,
  timestamps: true
});

const Stats = mongoose.models.Peer || mongoose.model('Stats', statsSchema)

module.exports = Stats
