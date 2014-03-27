#pragma strict
//呼吸与脚步即运动一致 见FootSound.js
//速度判断则与运动有关 见RunnerMove.js

var theRunner : GameObject;
var runnerFeet : GameObject;
var breathInspiratory1 : AudioClip;
var breathInspiratory2 : AudioClip;
var breathInspiratory3 : AudioClip;
var breathExpiratory1 : AudioClip;
var breathExpiratory2 : AudioClip;
var breathExpiratory3 : AudioClip;
private var isInspiratory : boolean = true;
private var lastChoose : int;

function Start () {
}

function Update () {

}

function PlayBreath() {
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	var chooseBreathSound : int = Random.Range(0,3);
	if (chooseBreathSound==lastChoose) chooseBreathSound = (chooseBreathSound+1)%3;
	lastChoose = chooseBreathSound;
	if (isInspiratory) {
	if (chooseBreathSound==0) audio.clip = breathInspiratory1;
	if (chooseBreathSound==1) audio.clip = breathInspiratory2;
	if (chooseBreathSound==2) audio.clip = breathInspiratory2;
	}
	else {
	if (chooseBreathSound==0) audio.clip = breathExpiratory1;
	if (chooseBreathSound==1) audio.clip = breathExpiratory2;
	if (chooseBreathSound==2) audio.clip = breathExpiratory3;
	}
	audio.volume=-0.2+0.04*(runner.getSpeed()-runner.initialSpeed);
	if (audio.volume>1) audio.volume=1;
	audio.pitch=0.6+0.04*(runner.getSpeed()-runner.initialSpeed);
	if (audio.pitch>1) audio.pitch=1;
	isInspiratory = !isInspiratory;
	audio.Play();
}


