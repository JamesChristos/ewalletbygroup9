const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ouksereiraksa:Raksa99887766@clustertracker.cvrfutf.mongodb.net/')
.then(() => {
  console.log('Successfully Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});