
var theHit : GameObject;

var slowSound1 : AudioClip;
var slowSound2 : AudioClip;
var fastSound1 : AudioClip;
var fastSound2 : AudioClip;
private var ifPlayedSlow : boolean = false;
private var ifPlayedFast : boolean = false;
private var playedFastTimer : float = 0;

function Start () {

}

function Update () {
	if (ifPlayedFast) playedFastTimer += Time.deltaTime;
}

function PlaySlowSound () {
	if (!ifPlayedSlow){
	var chooseSlowSound : int = Random.Range(0,2);
	if (chooseSlowSound==0) audio.clip = slowSound1;
	if (chooseSlowSound==1) audio.clip = slowSound2;
	ifPlayedSlow = true;
	audio.Play();
	}
}

function StopSlowSound () {
	audio.Stop();
}

function PlayFastSound () {
	var hit : HitSound = theHit.GetComponent(HitSound);
	if (!ifPlayedFast){
	var chooseFastSound : int = Random.Range(0,2);
	if (chooseFastSound==0) audio.clip = fastSound1;
	if (chooseFastSound==1) audio.clip = fastSound2;
	ifPlayedFast = true;
	audio.Play();
	}
	else{
	if (playedFastTimer > 3) hit.PlayHit();
	if (playedFastTimer > 4) hit.PlayFall();
	}
}