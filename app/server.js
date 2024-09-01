import Fastify from 'fastify';
import { SplitFactory } from '@splitsoftware/splitio';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const fastify = Fastify({
    logger: true
});

// Retrieve the API key and feature flag ID from environment variables
const apiKey = process.env.SPLIT_API_KEY;
const featureFlagId = process.env.FEATURE_FLAG_ID;

// Initialize Split SDK with the API key and feature flag ID
const factory = SplitFactory({
    core: {
        authorizationKey: apiKey, // API key for Split
        key: 'test2' // This can be another environment variable if you want to parameterize it
    },
    startup: {
        readyTimeout: 1.5 // Time to wait for the SDK to be ready
    }
});

const SplitIOClient = factory.client();

let keyUp = 'undefined';

// Wait until the SDK is ready
SplitIOClient.on(SplitIOClient.Event.SDK_READY, () => {
    console.log('Split SDK is ready');
});

// List of client IDs
const clientIds = ['franco', 'juan', 'pedro', 'julio', 'maria', 'laura', 'luis']; 

// Declare a route
fastify.get('/', async function handler(request, reply) {
    // Select a random client ID from the list
    const idClient = clientIds[Math.floor(Math.random() * clientIds.length)];
    // Get the treatment for the selected client ID and feature flag ID
    const treatment = SplitIOClient.getTreatment(idClient, featureFlagId);

    // Set the response based on the treatment value
    if (treatment === 'ubuntu') {
        keyUp = 'ubuntu';
    } else if (treatment === 'debian') {
        keyUp = 'debian';
    } else if (treatment === 'arch') {
        keyUp = 'arch';
    } else if (treatment === 'kali') {
        keyUp = 'kali';
    } else {
        keyUp = 'control';
    }

    // Return the treatment and client ID as JSON
    return { "Up": keyUp, "idCliente": idClient };
});

// Start the server
try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
