import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  bookedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
