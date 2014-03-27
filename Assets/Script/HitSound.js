
var fallSound1 : AudioClip;
var fallSound2 : AudioClip;
var fallSound3 : AudioClip;
var fallSound4 : AudioClip;
var hitSound1 : AudioClip;
var hitSound2 : AudioClip;
var hitSound3 : AudioClip;
var hitSound4 : AudioClip;
private var ifPlayedFall : boolean = false;
private var ifPlayedHit : boolean = false;

function Start () {

}

function Update () {
	//GetComponent(Camera).depth = 1;
}

function PlayHit () {
	if (!ifPlayedHit){
	var chooseHitSound : int = Random.Range(0,4);
	if (chooseHitSound==0) audio.clip = hitSound1;
	if (chooseHitSound==1) audio.clip = hitSound2;
	if (chooseHitSound==2) audio.clip = hitSound3;
	if (chooseHitSound==3) audio.clip = hitSound4;
	ifPlayedHit = true;
	audio.Play();
	}
}

function PlayFall () {
	if (!ifPlayedFall){
	var chooseFallSound : int = Random.Range(0,4);
	if (chooseFallSound==0) audio.clip = fallSound1;
	if (chooseFallSound==1) audio.clip = fallSound2;
	if (chooseFallSound==2) audio.clip = fallSound3;
	if (chooseFallSound==3) audio.clip = fallSound4;
	ifPlayedFall = true;
	audio.Play();
	}
}