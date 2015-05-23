var io = require('socket.io')(5000);
// id -> json

var seconds_to_wait = 5;
var users = {};


var kingvotes= 0, peasvotes= 0;
var kingid, peasid;

var starttime;
var gamegoing=false;

function geIDrFromName(name){
    var keys = Object.keys(users);
    for(var i = 0; i<keys.length; i++){
        var cuser = users[keys[i]];
        //console.log(cuser);
        if(cuser["name"]==name){
            return keys[i];
        }
    }
    return null;
}

io.on("connection", function(socket){
    console.log(socket.id);
    socket.on("connect name", function (name) {
        if(geIDrFromName(name)==null){
            users[socket.id]= {name:name};
            socket.emit("name success");
        }else{
            socket.emit("name taken");
        }
    });
    socket.on("disconnect", function(){
        console.log("dis "+socket.id);
        if(users[socket.id]!=null){
            delete users[socket.id];
        }
    });
    socket.on("vote king", function(){
        if(gamegoing) {
            if (waitedTime(socket.id)){
                users[socket.id]["lastvotetime"] = Date.now();
                kingvotes++;
                updateUI();
            }else{
                socket.emit("need wait", Date.now()-users[socket.id]["lastvotetime"]);
            }
        }
    });
    socket.on("vote peas", function(){
        if(gamegoing) {
            if (waitedTime(socket.id)){
                users[socket.id]["lastvotetime"] = Date.now();
                peasvotes++;
                updateUI();
            }else{
                socket.emit("need wait", Date.now()-users[socket.id]["lastvotetime"]);
            }
        }
    });
    socket.on("start game", function () {
        if(!gamegoing){
            gamegoing=true;
            starttime=Date.now();
            kingvotes=0;
            peasvotes=0;
            updateUI();
        }
    });

});

function waitedTime(sid){
    var lastvotetime = users[sid]["lastvotetime"];
    var curtime = Date.now();
    if(lastvotetime==null){
        return true;
    }
    if((curtime-lastvotetime)/1000<=seconds_to_wait){
        return true;
    }

    return false;
}

function updateUI(){
    io.emit("update ui", getGameState());
}

function getGameState(){
    return {
        "peasvotes": peasvotes,
        "kingvotes": kingvotes,
        "time": starttime
    };
}

