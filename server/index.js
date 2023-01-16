const net = require('net');
const config = require('../config')
const express = require('express')
const EventEmitter = require('events');

const app = express()
const emitter = new EventEmitter();

var commandmodev
var cmdcontentv
var argv
var argv2
var ss 

var express_connection = async function(req,commandmode,cmdcontent){
    if(commandmode&&cmdcontent){
        if (commandmode == "execute_command"){
            // socket.write(JSON.stringify({command: "execute_command",content: cmdcontent}));
            commandmodev = commandmode
            cmdcontentv = cmdcontent
            if(req.query.arg){
                argv = req.query.arg
             //   console.log("1")
            }else{
                argv = null
             //   console.log("1n")
            }
            if(req.query.arg2 && req.query.arg){
                argv2 = req.query.arg2
             //  console.log("2")
            }else{
                argv2 = null
             //   console.log("2n")
            }
            emitter.emit('express');
        }
    }else{
        return "err"
    }
}

const server = net.createServer(async (socket) => {
  console.log('bot connected');
  socket.on('data', (data) => {
    
    console.log(`received: ${data.toString()}`);

  });
  socket.on('end', () => {
    console.log('client disconnected');
  });

  emitter.on('express', () => {
    // console.log(JSON.stringify({command: commandmodev,content: cmdcontentv}))
    if (!argv==null && !argv2==null){
      //  console.log("3c")
        socket.write(JSON.stringify({command: commandmodev,content: cmdcontentv,arg:argv, arg2: argv2}))
    }else if(!argv== null){
       // console.log("1c")
        socket.write(JSON.stringify({command: commandmodev,content: cmdcontentv,arg:argv}))
    }else{
       // console.log("1c")
       socket.write(JSON.stringify({command: commandmodev,content: cmdcontentv,arg:argv, arg2: argv2}))
    }
    
  });


});

app.get('/execute',function(req,res){
    cmdcontent = req.query.content
    commandmode = req.query.mode
    if(commandmode&&cmdcontent){
        if (commandmode == "execute_command"){
            express_connection(req,commandmode,cmdcontent)
        }
    }else{
        res.write(JSON.stringify({error: true, message: "Queries not specified."}))
    }
    res.end('')
})


server.listen(config.server.port, () => {
  console.log(config.name+' is working perfectly.');
  app.listen(config.botmaster,()=>{
    console.log("botmaster api on")
  })
});