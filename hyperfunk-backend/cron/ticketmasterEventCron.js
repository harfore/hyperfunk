const cron = require('node-cron');
const { fetchTicketmasterEvents, saveEventsToDB } = require('../services/eventService');
const db = require('../config/database');

const DMA_IDS = [123, 456, 789];

// schedule the job to run every 10 hours
cron.schedule('0 */10 * * *', async () => {
    console.log('Running scheduled event fetch...');

    try {
        for (const dmaId of DMA_IDS) {
            const events = await fetchTicketmasterEvents(dmaId);
            await saveEventsToDB(events);
            console.log(`Updated events for DMA ${dmaId}`);
        }
        await db.query('UPDATE event_metadata SET last_updated = NOW()');
        console.log('Event database updated successfully.');
    } catch (error) {
        console.error('Error in event cron job:', error);
    }
});

console.log('Cron job for events is set up and running.');
