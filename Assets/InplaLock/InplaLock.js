
private var timer : float = 0;
//private var haveOpen : boolean = false;

function Start () {
	guiTexture.color.a = 0;
	Screen.showCursor = false;
}

function Update () {

	timer += Time.deltaTime;
	if (timer<2) guiTexture.color.a += Time.deltaTime/2;
	if (timer>4) guiTexture.color.a -= Time.deltaTime/2;
	if (timer>6) Application.LoadLevel("LonganTree");
	//if ((Input.anyKey)&&(!haveOpen)) {
	//Application.OpenURL("http://inpla.net");
	//haveOpen = true;
	//}
}
