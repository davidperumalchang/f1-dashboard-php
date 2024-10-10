const db = require('../database/db');

// Retrieve event schedule
exports.getEventSchedule = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM f1_app.event_schedule ORDER BY event_date DESC');
        const eventSchedule = result.rows;

        const formattedEventSchedule = eventSchedule.map(event => ({
            ...event,
            event_date: new Date(event.event_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }));

        res.json({ success: true, eventSchedule: formattedEventSchedule });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving event schedule.' });
        console.log(error);
    }
};

// Add new event to schedule
exports.addEvent = async (req, res) => {
    const { eventName, eventDate, circuitName, location, country } = req.body;
    try {
        await db.query(
            'INSERT INTO f1_app.event_schedule (event_name, event_date, circuit_name, location, country) VALUES ($1, $2, $3, $4, $5)',
            [eventName, eventDate, circuitName, location, country]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding event to schedule.' });
    }
};
