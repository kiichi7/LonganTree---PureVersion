#pragma strict
//头的上下运动模拟人走路时的起伏联系走路 见FootSound.js

var theRunner : GameObject;
private var upAndDownOffset : float = 0;
private var jumpDownBufferTime : float = 0;
@HideInInspector
var ifJumpDown : boolean = false;

function Start () {
}

function Update () {

}

function MoveUp () {
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	upAndDownOffset += Time.deltaTime*0.3;
	if (upAndDownOffset>0.05) upAndDownOffset = 0.05;
	transform.position.y = runner.transform.position.y + upAndDownOffset;
}

function MoveDown () {
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	upAndDownOffset -= Time.deltaTime*0.3;
	if (upAndDownOffset<-0.05) upAndDownOffset = -0.05;
	transform.position.y = runner.transform.position.y + upAndDownOffset;
}

function MoveBack () {
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	if (upAndDownOffset>0)  MoveDown();
	if (upAndDownOffset<0)  MoveUp();
}

function jumpDownBuffer () {
	var runner : RunnerMove = theRunner.GetComponent(RunnerMove);
	if (ifJumpDown){
		jumpDownBufferTime += Time.deltaTime;
		if (jumpDownBufferTime<0.2) 
			transform.position.y = runner.transform.position.y + upAndDownOffset - Time.deltaTime;
		else transform.position.y = runner.transform.position.y + upAndDownOffset + Time.deltaTime;
		if (jumpDownBufferTime>0.4) ifJumpDown = false;
	}
}