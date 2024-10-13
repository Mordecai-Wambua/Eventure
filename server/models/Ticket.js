import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  attendee: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  event: {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    eventTitle: { type: String, required: true },
    eventOrganizer: { type: String, required: true },
  },
  bookedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
