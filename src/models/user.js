const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    trim: true
  },
  contact: {
    type: String,
  },
  hash_password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default:'user'
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String,
  }
}, { timestamps: true });

// userSchema.virtual('password')
//   .set(function (password) {
//     this.hash_password = bcrypt.hashSync(password, 10)
//   });

userSchema.virtual('fullname')
  .get(function() {
    return `${this.firstName} ${this.lastName}`
  });

userSchema.methods = {
  authenticate: async function(password) {
    return await bcrypt.compare(password,this.hash_password)
  } 
}

module.exports = mongoose.model('User', userSchema);