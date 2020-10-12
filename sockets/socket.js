const Bands = require('../models/bands');
const Band = require('../models/band');

const {io} = require('../index');
const bands = new Bands();

console.log('init server ...');

// añadir bandas
bands.addBand( new Band('Queen') );
bands.addBand( new Band('Black Sabat') );
bands.addBand( new Band('Red Hot Chilli Peppers') );
bands.addBand( new Band('Los Tres') );
bands.addBand( new Band('Radio Head') );
bands.addBand( new Band('Dream theater') );

console.log(bands);

// Mensajes de sockets
io.on('connection', client => {

    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('vote-band', (payload) => {

        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands());

    });

    client.on('add-band', (payload) => {

        const newBand = new Band(payload.name);
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands());

    });

    client.on('delete-band', (payload) => {

        bands.deleteBands( payload.id );
        io.emit('active-bands', bands.getBands());

    });

    client.on('disconnect', () => { console.log('cliente desconectado'); });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('emitir-mensaje', (payload) => {

        var n = new Bands

        console.log(payload);
        // emite  el mensaje  a todos los clientes conectados
        // io.emit('nuevo-mensaje', payload);

        // emite a todos los clientes conectados menos al quien lo emite
        client.broadcast.emit('nuevo-mensaje', payload);
    });

});