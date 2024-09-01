import Fastify from 'fastify'
import { SplitFactory } from '@splitsoftware/splitio';
import crypto from 'crypto';

const fastify = Fastify({
    logger: true
});

const factory = SplitFactory({
    core: {
        authorizationKey: '8o5mn3ni3es2qvj435aeoen3glsjv0v6h59d',
        key: 'test2'
    },
    startup: {
        readyTimeout: 1.5 // 1.5 sec
    }
});

const SplitIOClient = factory.client();

let keyUp = 'undefined';

// Espera a que el SDK esté listo
SplitIOClient.on(SplitIOClient.Event.SDK_READY, () => {
    console.log('Split SDK is ready');
});

// Lista de IDs
const clientIds = ['franco', 'juan', 'pedro', 'julio', 'maria', 'laura', 'luis']; 

// Declara una ruta
fastify.get('/', async function handler(request, reply) {
    // Selecciona un ID aleatorio de la lista
    const idClient = clientIds[Math.floor(Math.random() * clientIds.length)];
    const treatment = SplitIOClient.getTreatment(idClient, 'test2');

    if (treatment == 'ubuntu'){
        keyUp = 'ubuntu';
    } else if (treatment == 'debian') {
        keyUp = 'debian';
    } else if (treatment == 'arch') {
        keyUp = 'arch';
    } else if (treatment == 'kali') {
        keyUp = 'kali';
    }
    else {
        keyUp = 'control';
    }

    return { "Up": keyUp, "idCliente": idClient };
});

// Declara una ruta
// fastify.get('/', async function handler(request, reply) {
//     const idClient = crypto.randomUUID();
//     const treatment = SplitIOClient.getTreatment(idClient, 'test1');

//     if (treatment == 'on') {
//         keyUp = 'on';
//     } else if (treatment == 'off') {
//         keyUp = 'off';
//     } else {
//         keyUp = 'control';
//     }

//     return { "Up": keyUp, "idCliente": idClient };
// });

// Ejecuta el servidor
try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
