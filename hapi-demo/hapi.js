'use strict';

const Hapi = require('hapi');
const Joi = require('joi');

// create  a server with a host 
const server = Hapi.server({
    host: 'localhost',
    port: 8000
});

// add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {

        return 'Hello World!';
    }
});

server.route({
    method: 'POST',
    path: '/shift',
    consfig:{
        validate:{
            payload:{
                start: Joi.date().required(),
                end: Joi.date().required()
            },
            failAction:(request, h,error) =>{
                throw error;
            }
        }
    },
    handler: (request, h)=> {
        return request.payload;
    }
});
// start the server
async function start(){
    try{
        await server.start();
    }
    catch (err){
        console.log(err);
        process.exit(1);
    }

    
    console.log('Server running on %s', server.info.uri);

};
start()
