#pragma strict

private var flashTimer : float = 0;
private var ifFlash : boolean = false;

function Start () {
	GetComponent(Camera).backgroundColor = Color.black;
}

function Update () {
	if (ifFlash){
		if (flashTimer > 0.2) {
		GetComponent(Camera).backgroundColor = Color.black;
		ifFlash = false;
		}
		else if (flashTimer < 0.1) {
		GetComponent(Camera).backgroundColor = Color.Lerp (Color.black, Color.red, 3.33*flashTimer);
		flashTimer += Time.deltaTime;
		}
		else if (flashTimer > 0.1) {
		GetComponent(Camera).backgroundColor = Color.Lerp (Color.black, Color.red, (2-3.33*flashTimer));
		flashTimer += Time.deltaTime;
		}
	}
}

function Flash () {
	ifFlash = true;
	GetComponent(Camera).depth = 1;
}