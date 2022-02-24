import { collections } from './connect';
const socket_io = require("socket.io")

let watcher = collections.Hospital?.watch();

let io  = socket_io(`ws://localhost:${process.env.PORT}`);
watcher.addListener("change" , (change)=>{
    console.log(change); // You could parse out the needed info and send only that data. 
    if (change.operationType === "update"){
        let numberOfAvailableRooms = change.updateDescription?.updatedFields;
        io.emit('change', numberOfAvailableRooms);
    }
});
io.on('connection', function () {
    console.log('new user connected');
});

export default io;