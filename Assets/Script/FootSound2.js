#pragma strict
//这个由FootSound.js控制

var theRunner : GameObject;

function Update () {

}

var stepSound1 : AudioClip;
var stepSound2 : AudioClip;
var stepSound3 : AudioClip;
var stepSound4 : AudioClip;

public function PlayStep(chooseStepSound : int){
	if (chooseStepSound==0) audio.clip = stepSound1;
	if (chooseStepSound==1) audio.clip = stepSound2;
	if (chooseStepSound==2) audio.clip = stepSound3;
	if (chooseStepSound==3) audio.clip = stepSound4;
	PlaySound();
}

public function PlaySound(){
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	audio.volume=0.8-0.04*(runner.getSpeed()-runner.initialSpeed);
	if (audio.volume<0.1) audio.volume=0.2;
	audio.pitch=0.8+0.06*(runner.getSpeed()-runner.initialSpeed);
	if (audio.pitch>1.5) audio.pitch=1.5;
	audio.Play();
}
