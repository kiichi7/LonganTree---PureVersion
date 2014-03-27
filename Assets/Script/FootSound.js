#pragma strict
//脚步声包括走路和跳起都由运动调控 见RunnerMove.j
//同时脚步调用呼吸的声音 见NoseSound.js

var theRunner : GameObject;
var theNose : GameObject;
var theEye : GameObject;
var theFoot2 : GameObject;

private var canPlay : boolean = false;
private var lastPlay : float = 0;
private var lastPlayStep : float = 0;
private var lastChoose : int;
private var isLeft : boolean = false;

function Update () {
lastPlay += Time.deltaTime;
canPlay = (lastPlay > 0.34);
}

var stepSound1 : AudioClip;
var stepSound2 : AudioClip;
var stepSound3 : AudioClip;
var stepSound4 : AudioClip;
var stepSound5 : AudioClip;
var stepSound6 : AudioClip;
var stepSound7 : AudioClip;
var stepSound8 : AudioClip;

public function PlayStep(){
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	var nose : NoseSound = theNose.GetComponent(NoseSound);
	var eye : HeadMove = theEye.GetComponent(HeadMove);
	var foot2 : FootSound2 = theFoot2.GetComponent(FootSound2);
    if ((runner.getSpeed()>0)&&((Time.time-lastPlayStep)>(3/runner.getSpeed()))&&canPlay){
    lastPlayStep = Time.time;
	var chooseStepSound : int = Random.Range(0,4);
	if (chooseStepSound==lastChoose) chooseStepSound = (chooseStepSound+1)%4;
	lastChoose = chooseStepSound;
	
	if (!isLeft) foot2.PlayStep(chooseStepSound);
	else {
		if (chooseStepSound==0) audio.clip = stepSound1;
		if (chooseStepSound==1) audio.clip = stepSound2;
		if (chooseStepSound==2) audio.clip = stepSound3;
		if (chooseStepSound==3) audio.clip = stepSound4;
		PlaySound();
	}
	
	nose.PlayBreath();
	isLeft = !isLeft;
	lastPlay = 0;
	}
	
	if((runner.getSpeed()>0.5)&&((Time.time-lastPlayStep)<(1.5/runner.getSpeed()))) {
		eye.MoveUp();
		runner.MoveBack();
		if (isLeft) runner.MoveLeft();
		else runner.MoveRight();
	}
	if((runner.getSpeed()>0.5)&&((Time.time-lastPlayStep)>(1.5/runner.getSpeed()))) {
		eye.MoveDown();
		runner.MoveForward();
	}	
	if(runner.getSpeed()<0.5) eye.MoveBack();
}

public function PlayJumpUp(){
	if(canPlay){
	var chooseJumpUpSound : int = Random.Range(4,6);
	if (chooseJumpUpSound==4) audio.clip = stepSound5;
	if (chooseJumpUpSound==5) audio.clip = stepSound6;
	PlaySound();
	}
}

public function PlayJumpDown(){
	var eye : HeadMove = theEye.GetComponent(HeadMove);
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	var chooseJumpDownSound : int = Random.Range(6,8);
	if (chooseJumpDownSound==6) audio.clip = stepSound7;
	if (chooseJumpDownSound==7) audio.clip = stepSound8;
	PlaySound();
	eye.ifJumpDown = true;
	lastPlayStep = Time.time;
}

public function PlaySound(){
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	audio.volume=0.8-0.04*(runner.getSpeed()-runner.initialSpeed);
	if (audio.volume<0.1) audio.volume=0.2;
	audio.pitch=0.8+0.06*(runner.getSpeed()-runner.initialSpeed);
	if (audio.pitch>1.5) audio.pitch=1.5;
	audio.Play();
}
