var DateTime = luxon.DateTime;

function toSeconds(hours, minutes, seconds = 0) {
    let totalSeconds = 0;
    totalSeconds += (hours * (60 * 60));
    totalSeconds += (minutes * 60);
    totalSeconds += seconds;
    return totalSeconds;
}

const ClassSchedule = [
	toSeconds(7, 55),
	toSeconds(8, 5),
	toSeconds(8, 45),
	toSeconds(8, 50),
	toSeconds(9, 30),
	toSeconds(9, 35),
	toSeconds(10, 15),
	toSeconds(10, 20),
	toSeconds(11, 0),
	toSeconds(11, 5),
	toSeconds(11, 45),
	toSeconds(11, 50),
	toSeconds(12, 30),
	toSeconds(14, 15),
	toSeconds(15, 0)
];
const ClassNames = [
    "Announcements & 5SEL",
	"1st period",
	"Break 1",
	"2nd period",
	"Break 2",
	"3rd/4th period",
	"Break 3",
	"6th/7th period",
	"Break 4",
	"8th period",
	"break 5",
	"9th period",
	"Lunch, Break, Homework",
	"Office hours & asyncronous learning"
];
function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}
function FindPeriod(Seconds) {
    let length = ClassSchedule.length;
	if (ClassSchedule[0] > Seconds)
	{
		//If its out of bounds
		return 999;
	}
	else if (ClassSchedule[length - 1] < Seconds) {
		return 1000;
	}

	//else if (ClassSchedule[15] > Seconds && ClassSchedule[16] < Seconds) {
	//  return 16;
	//}
	for (var i = 0; i < ClassSchedule.length-1; i++)
	{
		if (Seconds >= ClassSchedule[i] && Seconds < ClassSchedule[i + 1])
		{
			return i;
		}
	}

	return 999;
}
var lastperiod = "";

function updateThing() {
    let local = DateTime.local().setZone("America/Chicago");
    let Period;
    let ActualName;
    let UpNext;
    let SecondsRemaining;
    let LongString = false;
    let periodIndex = FindPeriod(toSeconds(local.hour, local.minute, local.second));

    if (periodIndex === 999 || periodIndex === 1000 || local.weekday === 7 ||
        local.weekday === 0)
    {
        Period = "After School";
        UpNext = ClassNames[0];
        LongString = true;
        ActualName = "";
        if (local.weekday === 6 && periodIndex == 1000)
        {
            SecondsRemaining = toSeconds(72, 0) - toSeconds(local.hour, local.minute, local.second) +
                ClassSchedule[0];
            Period = "Weekend!";
        }
        else if (local.weekday === 7)
        {
            SecondsRemaining = toSeconds(48, 0) - toSeconds(local.hour, local.minute, local.second) +
                ClassSchedule[0];
            Period = "Weekend";
        }
        else if (local.weekday === 0)
        {
            SecondsRemaining = toSeconds(24, 0) - toSeconds(local.hour, local.minute, local.second) +
                ClassSchedule[0];
            Period = "Weekend!";
        }
        else if (periodIndex === 1000)
        {
            SecondsRemaining = toSeconds(24, 0) - toSeconds(local.hour, local.minute, local.second) +
                ClassSchedule[0];
            //Serial.println(SecondsRemaining);
        }
        else
        {
            SecondsRemaining = ClassSchedule[0] - toSeconds(local.hour, local.minute, local.second);
        }
    }
    else
    {
        Period = ClassNames[periodIndex];
        //ActualName = MyClassNames[periodIndex];
        if (periodIndex === 16)
        {
            //UpNext = ClassNames[0];
            //Period = ClassNames[periodIndex - 1];
            SecondsRemaining = toSeconds(24, 0) - toSeconds(local.hour, local.minute, local.second) +
                ClassSchedule[0];
        }
        else
        {
            //UpNext = ClassNames[periodIndex + 1];
            SecondsRemaining = ClassSchedule[periodIndex + 1] -
                toSeconds(local.hour, local.minute, local.second);
        }
    }
    let mins = Math.floor((SecondsRemaining % 3600) / 60);
    let secs = (SecondsRemaining % 3600) % 60;
    let actualHours = Math.floor(SecondsRemaining / 3600);
    if(lastperiod != "" && Period != lastperiod) {
        if($('#mute').prop('checked') == true){ //Backwards I know.
            sound.play() //Play sound
        }
            
    }
    lastperiod = Period;
    if (Period.startsWith("Break")) {
        document.getElementById("Timer").innerHTML = `Ends in: ${zeroPad(mins,2)}:${zeroPad(secs, 2)}`;
        document.title = `${Period} | ${mins}:${zeroPad(secs, 2)}`
    }
    else if (Period == "After School" || Period == "Weekend") {
        document.getElementById("Timer").innerHTML = `School starts in: ${zeroPad(actualHours,2)}:${zeroPad(mins,2)}:${zeroPad(secs, 2)}`;
        document.title = `${Period} | ${actualHours}:${zeroPad(mins,2)}:${zeroPad(secs, 2)}`
    }
    else {
        document.getElementById("Timer").innerHTML = `Ends in: ${zeroPad(mins,2)}:${zeroPad(secs, 2)}`;
        document.title = `${Period} | ${mins}:${zeroPad(secs, 2)}`
    }
    document.getElementById("period").innerHTML = `${Period}`;
    setTimeout(()=>{updateThing();},local.plus({second: 1, millisecond: -local.millisecond}).diffNow().milliseconds)
}
const sound = new Howl({
    src: ['/sounds/tone2.ulaw.wav'],
    volume: 0.25
});


updateThing();
