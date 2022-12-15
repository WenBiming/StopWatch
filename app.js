

const INITIAL = 0, RUN = 1, STOP = 2;
var clock = {
    hour: 0,
    minute: 0,
    second: 0,
    state: INITIAL,
    stopTime: 0, // in millsecond
    stopPoint: 0,
    hasStopPoint: false,
}
var currTime = new Date().getTime(), startTime = new Date().getTime();

function displyBtn() {
    if (clock.state == INITIAL) {
        startBtn.style.display = "block";
        stopBtn.style.display = "none";
        resetBtn.style.display = "none";
        resumeBtn.style.display = "none";
    }
    if (clock.state == RUN) {
        startBtn.style.display = "none";
        stopBtn.style.display = "block";
        resetBtn.style.display = "block";
        resumeBtn.style.display = "none";
    }
    if (clock.state == STOP) {
        startBtn.style.display = "none";
        stopBtn.style.display = "none";
        resetBtn.style.display = "block";
        resumeBtn.style.display = "block";
    }
}
function start() {
    if (clock.state == INITIAL) {
        clock.state = RUN;
        displyBtn();
    }

}

function stop() {
    if (clock.state == RUN) {
        clock.state = STOP;
        displyBtn();
    }

}

function resume() {
    if (clock.state == STOP) {
        clock.state = RUN;
        clock.stopTime += Date.now() - clock.stopPoint;
        clock.hasStopPoint = false;
        displyBtn();
    }

}

function reset() {
    if (clock.state == STOP || clock.state == RUN) {
        clock.state = INITIAL;
        displyBtn();
    }

}

function format(t) {
    t = Math.round(t);
    console.log(t);
    let hour = Math.floor(t / 3600);
    t %= 3600;
    let minute = Math.floor(t / 60);
    t %= 60;
    let second = t;
    return [hour, minute, second]
}

var startBtn = document.getElementById("start"),
    stopBtn = document.getElementById("stop"),
    resetBtn = document.getElementById("reset"),
    resumeBtn = document.getElementById("resume");

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
resumeBtn.addEventListener("click", resume);

displyBtn();
setInterval(() =>{
    currTime = Date.now();
    if (clock.state == INITIAL) {
        clock = {
            hour: 0,
            minute: 0,
            second: 0,
            state: INITIAL,
            stopTime: 0, // in millsecond
            stopPoint: 0,
            hasStopPoint: false,
        }
        startTime = Date.now();
    }

    if (clock.state == RUN) {
        [clock.hour, clock.minute, clock.second] = format((currTime - startTime - clock.stopTime) / 1000);
    }

    if (clock.state == STOP) {
        if (!clock.hasStopPoint)
            clock.stopPoint = currTime, clock.hasStopPoint = true;
    }

    document.querySelector(".time").innerHTML = clock.hour + " : " + clock.minute + " : " + clock.second;
}, 1000)