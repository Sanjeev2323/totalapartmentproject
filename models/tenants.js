const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  role: {
    type: String
},
apId:{type:String}
});

module.exports = mongoose.model("tenants", tenantSchema);