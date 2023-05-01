const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
  id: {
    type: ObjectId
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  relatedTo: {
    type: String,
    required: false
  },
  accessLevel: {
    type: String,
    required: true
  }
});

UserSchema.methods.authenticate = function(password) {
  return this.password === password;
}

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;