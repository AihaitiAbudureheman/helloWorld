const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
  first_name: String,
});

module.exports = mongoose.model("Student", StudentSchema);
