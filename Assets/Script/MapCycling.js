#pragma strict

var runner : GameObject;
private var eastWesternDistance : float = 0;
private var southNorthDistance : float = 0;
private var theDistance : float = 0;
private var isFar : boolean = false;

function Update () {
	if (runner.transform.position.x>100) {
		runner.transform.position.x-=200;
		eastWesternDistance += 200;
		}
	else if(runner.transform.position.x<-100) {
		runner.transform.position.x+=200;
		eastWesternDistance -= 200;
		}
	if (runner.transform.position.z>100) {
		runner.transform.position.z-=200;
		southNorthDistance += 200;
		}
	else if(runner.transform.position.z<-100) {
		runner.transform.position.z+=200;
		southNorthDistance -= 200;
		}
	theDistance = Mathf.Abs(Mathf.Sqrt(((runner.transform.position.x+eastWesternDistance)*(runner.transform.position.x+eastWesternDistance))+((runner.transform.position.z+southNorthDistance)*(runner.transform.position.z+southNorthDistance))));
	//Debug.Log(theDistance);
}

function GetDistance () {
	return(theDistance);
}