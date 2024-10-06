import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  maxAttendees: { type: Number, required: true },
  attendessCount: { type: Number, default: 0 },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
