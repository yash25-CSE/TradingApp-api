const db = require('../config/firebaseConfig');
const { getMessaging } = require('firebase-admin/messaging');

const sendNotification = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Missing required fields: title or description' });
    }

    try {
        // Fetch all tokens from the `fcmtoken` collection
        const tokensSnapshot = await db.collection('fcmtoken').get();
        const tokens = tokensSnapshot.docs.map(doc => ({
            id: doc.id, // Document ID
            token: doc.data().token, // FCM token
        })).filter(entry => entry.token);

        if (tokens.length === 0) {
            return res.status(404).json({ error: 'No FCM tokens found.' });
        }

        // Construct the FCM message
        const message = { notification: { title, body: description } };

        // Send notifications and track results
        const responses = await Promise.allSettled(tokens.map(entry =>
            getMessaging().send({ ...message, token: entry.token }).then(() => ({ success: true, id: entry.id })).catch(() => ({ success: false, id: entry.id }))
        ));

        // Process responses
        const successCount = responses.filter(r => r.value && r.value.success).length;
        const errorEntries = responses.filter(r => r.value && !r.value.success);

        // Delete documents for tokens that failed
        const deletePromises = errorEntries.map(async (entry) => {
            try {
                await db.collection('fcmtoken').doc(entry.value.id).delete();
                console.log(`Deleted token document: ${entry.value.id}`);
            } catch (deleteError) {
                console.error(`Error deleting token document (${entry.value.id}):`, deleteError.message);
            }
        });

        await Promise.all(deletePromises);

        res.json({
            success: true,
            total: tokens.length,
            successCount,
            errorCount: errorEntries.length,
            message: `${errorEntries.length} invalid tokens were removed from the database.`,
        });
    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    sendNotification,
};
