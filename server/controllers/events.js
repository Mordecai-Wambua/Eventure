import nodemailer from 'nodemailer';
import Event from '../models/Event.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';

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

    const organizerId = req.user.id;
    const organizer = await User.findById(organizerId);

    const newEvent = new Event({
      title,
      description,
      date,
      venue,
      organizer: { organizerName: organizer.name, organizerId: organizer._id },
      maxAttendees,
    });

    await newEvent.save();

    res
      .status(201)
      .json({ message: 'Event registered successfully', event: newEvent });
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
    if (!title && !description && !date && !venue && !maxAttendees) {
      return res
        .status(400)
        .json({ message: 'At least one fields is required!' });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (venue) event.venue = venue;
    if (maxAttendees) event.maxAttendees = maxAttendees;

    await event.save();

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

// Book an event
export async function bookEvent(req, res) {
  const eventId = req.params.id;
  const { name, email } = req.body;
  console.log('Booking event for email:', email);
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.maxAttendees === event.attendeesCount) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Existing ticket check
    const existingTicket = await Ticket.findOne({
      'attendee.email': email,
      'event.eventId': eventId,
    });

    if (existingTicket) {
      return res
        .status(400)
        .json({ message: 'You have already booked this event.' });
    }

    const organizer = await User.findById(event.organizer.organizerId);
    // create a new ticket
    const ticket = new Ticket({
      attendee: { name, email },
      event: {
        eventId: event._id,
        eventOrganizer: organizer.name,
        eventTitle: event.title,
      },
    });
    await ticket.save();
    emailConfirmation(email, ticket, event);

    event.attendeesCount += 1;
    await event.save();

    res.status(200).json({ message: 'Event booked successfully', ticket });
  } catch (error) {
    console.error('Book Event Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Get event attendees
export async function getEventAttendees(req, res) {
  const eventId = req.params.id;

  try {
    const tickets = await Ticket.find({ 'event.eventId': eventId }).select(
      '-__v'
    );

    if (!tickets) {
      return res.status(404).json({ message: 'No tickets found' });
    }

    res.status(200).json(tickets);
  } catch (error) {
    console.error('Get Event Attendees Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Ticket confirmation email
export async function emailConfirmation(email, ticket, event) {
  // Configure the transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Message to be sent
  const message = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Ticket Details',
    text: `Event: ${ticket.event.eventTitle}\nOrganizer: ${ticket.event.eventOrganizer}\nName: ${ticket.attendee.name}\nEmail: ${ticket.attendee.email}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; color: #333;">
      <div style="text-align: center; padding: 10px;">
        <h1 style="font-size: 24px; color: #2a9df4;">${ticket.event.eventTitle}</h1>
        <p style="font-size: 16px; color: #555;">Organized by: ${ticket.event.eventOrganizer}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="font-size: 20px; color: #2a9df4;">Attendee Information</h2>
        <p style="font-size: 16px;"><strong>Name:</strong> ${ticket.attendee.name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${ticket.attendee.email}</p>
      </div>

      <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="font-size: 20px; color: #2a9df4;">Event Information</h2>
        <p style="font-size: 16px;"><strong>Name:</strong> ${event.title}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${event.description}</p>
        <p style="font-size: 16px;"><strong>Venue:</strong> ${event.venue}</p>
        <p style="font-size: 16px;"><strong>Date:</strong> ${event.date}</p>
      </div>
      
      <div style="margin-top: 20px; font-size: 14px; color: #777; text-align: center;">
        <p>If you have any questions, feel free to <a href="mailto:support@modekk.tech" style="color: #2a9df4;">contact us</a>.</p>
        <p>&copy; 2024 Eventure, All rights reserved.</p>
      </div>
    </div>
  `,
  };

  // Send the email
  try {
    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
}
