
function Timer($timer, seconds, callback){
    this.$timer = $timer;
    this.duration=seconds*1000;
    this.callback = callback || function(){};
    this.updateHTML();
}

Timer.prototype.$timer = null;

Timer.prototype.sTime = 0;
Timer.prototype.cTime = 0;
Timer.prototype.duration = 0;

Timer.prototype.tickLength=50;

Timer.prototype.isRunning = false;

Timer.prototype.interval = null;

Timer.prototype.start = function(t){
    this.updateTime(t);
    this.initiate();
};

Timer.prototype.tick = function(){
    this.cTime+=this.tickLength;
    this.updateHTML();
};

Timer.prototype.updateTime = function(t){
    this.sTime= t.start;
    this.cTime= t.current;
    this.duration = t.duration*1000;
    this.updateHTML();
};

Timer.prototype.initiate = function(){
    this.isRunning=true;
    var that = this;
    this.interval = setInterval(function(){
        if((that.sTime+that.duration)-that.cTime<0){
            that.callback();
            that.stop();
        }
        that.tick();
    },that.tickLength);
};

Timer.prototype.updateHTML = function(){
    this.$timer.html(formatTime((this.sTime+this.duration)-this.cTime));
};

Timer.prototype.stop = function(){
    this.isRunning=false;
    clearInterval(this.interval);
};

function formatTime(time){
    var ms = time % 1000;
    time = Math.floor(time/1000);
    var s = time % 60;
    time = Math.floor(time/60);
    var m = time;
    return"<h1 style='display: inline;'>"+pad2(m)+":</h1>" +
        "<h2 style='display: inline;'>"+pad2(s)+".</h2>" +
        "<h3 style='display: inline;'>"+pad3(ms)+"</h3>";
}

function timeToJson(time){
    var json = {};
    json.milliseconds = time % 1000;
    time = Math.floor(time/1000);
    json.seconds = time % 60;
    time = Math.floor(time/60);
    json.minutes = time % 60;
    json.hours = Math.floor(time/60);
    return json;
}

function timeToText(time){
    var json = timeToJson(time);
    return json.hours+":"+json.minutes+":"+json.seconds+"."+json.milliseconds;
}

function pad2(n){
    if(n<10){
        return "0"+n;
    }
    return n;
}

function pad3(n){
    if(n>=100){
        return n;
    }if(n>=10){
        return "0"+n;
    }
    return "00"+n;
}