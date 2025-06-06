import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  active: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Record', RecordSchema);
