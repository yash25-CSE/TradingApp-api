const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
require('dotenv').config();

let serviceAccount;

try {
    const jsonString = process.env.SERVICE_ACCOUNT_JSON;

    if (!jsonString) {
        throw new Error('SERVICE_ACCOUNT_JSON not found in environment variables.');
    }

    serviceAccount = JSON.parse(jsonString);
} catch (err) {
    console.error("Failed to parse service account key:", err.message);
    process.exit(1);
}

initializeApp({
    credential: cert(serviceAccount),
    projectId: serviceAccount.project_id,
});

const db = getFirestore();
module.exports = db;
