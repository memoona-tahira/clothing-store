

import  mongoose  from ('mongoose');

const sizeSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true
  },
  forKids: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Size', sizeSchema);
