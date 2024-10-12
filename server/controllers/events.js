import Event from '../models/Event.js';

export async function getEvents(req, res) {
  try {
    const events = await Event.find();

    res.status(200).json(events);
  } catch (error) {
    console.error('Get Events Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createEvent(req, res) {
  const { title, description, date, venue, maxAttendees } = req.body;

  try {
    // Validate inputs
    if ((!title, !description, !date, !venue, !maxAttendees)) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const organizer = req.user.id;

    const newEvent = new Event({
      title,
      description,
      date,
      venue,
      organizer,
      maxAttendees,
    });

    await newEvent.save();

    res.status(201).json({ message: 'Event registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Update an event
