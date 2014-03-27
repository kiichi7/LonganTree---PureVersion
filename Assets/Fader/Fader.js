
private var timer : float = 0;
private var isShow : boolean = false;
private var isHide : boolean = false;


function Start () {
	guiTexture.color.a = 1;
}


function Update () {
	timer += Time.deltaTime;
	Debug.Log(guiTexture.color.a);
	if (isShow) guiTexture.color.a += Time.deltaTime/2;
	if (isHide) guiTexture.color.a -= Time.deltaTime/2;
}

function OnGUI () {

}

function Show () {
	isShow = true;
	isHide = false;
}

function Hide () {
	isShow = false;
	isHide = true;
}