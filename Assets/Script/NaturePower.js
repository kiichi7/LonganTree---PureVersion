#pragma strict

var theRunner : GameObject;
var theBirdsSinging : GameObject;
private var maxSpeed : float = 0;
private var timer : float = 0;
private var listeningTimer : float = 0;
private var runningTimer : float = 0;
private var warningTime : float = 0;

@HideInInspector
var ifWipe : boolean = false;
@HideInInspector
var isFree : boolean = false;
@HideInInspector
var isVeryFree : boolean = false;
@HideInInspector
var ifWarning : boolean = false;
@HideInInspector
var isFar : boolean = false;
@HideInInspector
var isVeryFar : boolean = false;
@HideInInspector
var isMorning : boolean = false;

function Start () {
}

function Update () {
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	var birds : AudioSource = theBirdsSinging.GetComponent(AudioSource);
	timer += Time.deltaTime;
	maxSpeed = Mathf.Max(maxSpeed,runner.getSpeed());
	
	if (runner.getSpeed()>1.51) {
		listeningTimer = 0;
		runningTimer += Time.deltaTime;
	}
	else {
		if (birds.volume > 0.5) listeningTimer += Time.deltaTime;
		runningTimer = 0;
	}
	//Debug.Log(Time.time + "/" + maxSpeed);
	//给与警告或者清除
	if ((!isFar)&&(!isVeryFar)&&(!isFree)) {
		if ((timer>30)&&(timer<45)&&(maxSpeed<(2+(timer-30)/15))&&(listeningTimer<0.15*timer)) {
			ifWipe = true;
			ifWarning = false;
			}
		if ((timer>45)&&(maxSpeed<((timer/34.6-1.3)*(timer/34.6-1.3)+3))&&(listeningTimer<0.15*timer)) {
			if (warningTime > 0.2*timer) {
				ifWipe = true;
				ifWarning = false;
				}
			else ifWarning = true;
			warningTime += Time.deltaTime;	
		}			
	}
	//给与自由
	if ((!ifWipe)&&(!isFar)&&(!isVeryFar)) {
		if (listeningTimer>180) isVeryFree = true;
		else if (listeningTimer>60) isFree = true;
	}
	//给与统御
	if ((!ifWipe)&&(!isFree)) { 
		if (GetComponent(MapCycling).GetDistance() > 600) isVeryFar = true;
		else if (GetComponent(MapCycling).GetDistance() > 300) isFar = true;	
	}
	//到达早晨
	if (timer > 1500) isMorning = true;
}



