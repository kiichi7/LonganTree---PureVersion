
var theRunner : GameObject;
var theHit : GameObject;
private var ifWarning : boolean = true;
private var ifWipe : boolean = true;
private var isFar : boolean = true;
private var isVeryFar : boolean = true;
private var isFree : boolean = true;
private var isVeryFree : boolean = true;
private var isMorning : boolean = true;
private var showTimer : float = 0;
private var wipeTimer : float = 0;

function Start () {

}

function Update () {
	var nature : NaturePower = GetComponent(NaturePower);
	if (nature.ifWipe) wipeTimer += Time.deltaTime;
	if ((nature.isMorning)&&(isMorning)) Morning();
	else if ((nature.isVeryFree)&&(isVeryFree)) VeryFree();
	else if ((nature.isFree)&&(isFree)) Free();
	else if ((nature.isVeryFar)&&(isVeryFar)) VeryFar();
	else if ((nature.isFar)&&(isFar)) Far();
	else if ((nature.ifWipe)&&(ifWipe)) Wipe();
	else if ((nature.ifWarning)&&(ifWarning)) Warning();
	
}

function Warning () {
	var hitter : HitterSound = GetComponent(HitterSound);
	hitter.PlaySlowSound();
	showTimer += Time.deltaTime;
	if (showTimer > 3) {
	ifWarning = false;
	showTimer = 0;
	}
}

function Wipe () {
	var hitter : HitterSound = GetComponent(HitterSound);
	hitter.PlayFastSound();
	if (wipeTimer > 3.1){
		theRunner.GetComponent(RunnerMove).enabled = false;
		theRunner.GetComponent(MouseLook).enabled = false;
		theHit.GetComponent(HitFlash).Flash();
		if (wipeTimer > 9) Application.LoadLevel("LonganTree");
	}
}

function Far () {

}

function VeryFar () {

}

function Free () {

}

function VeryFree () {

}

function Morning () {
	Application.Quit();
}