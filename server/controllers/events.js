import Event from '../models/Event.js';

export async function getEvents(req, res) {
  try {
    const events = await Event.find().select('-__v');

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
export async function updateEvent(req, res) {
  const { title, description, date, venue, maxAttendees } = req.body;
  const eventId = req.params.id;

  try {
    // Validate inputs
    if ((!title, !description, !date, !venue, !maxAttendees)) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const organizer = req.user.id;

    const updatedEvent = {
      title,
      description,
      date,
      venue,
      organizer,
      maxAttendees,
    };

    await Event.findByIdAndUpdate(eventId, updatedEvent);

    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error('Update Event Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Delete an event
export async function deleteEvent(req, res) {
  const eventId = req.params.id;

  try {
    await Event.findByIdAndDelete(eventId);

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete Event Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
