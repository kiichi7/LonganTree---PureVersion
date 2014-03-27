/// This script moves the character controller forward 
/// and sideways based on the arrow keys.
/// It also jumps when pressing space.
/// Make sure to attach a character controller to the same game object.
/// It is recommended that you make only one call to Move or SimpleMove per frame.    

//这个文件不仅仅是控制运动的, 还包括调控一切运动产生的相应的声音 包括BosydSounds.js,FootSounds.js,NoseSound.js

var initialSpeed : float = 0.0;
private var speed : float = 0;
var jumpSpeed : float = 4.0;
var gravity : float = 10.0;
var runnerFeet : GameObject;
var runnerBody : GameObject;
var theEye : GameObject;
private var timing : float = 0;
private var lastJump : float = 0;
private var ifRunning : boolean = false;
private var ifMoveFar : boolean =false;
private var isGroundedBefore : boolean = true;
private var moveDirection : Vector3 = Vector3.zero;
private var ifStoping : boolean = false;
private var theTime : float = 0;
private var initialHeight : float = 2.09;

function Start () {
	transform.RotateAround (Vector3.zero, Vector3.up, Random.Range(0,360));
}

function Update() {

	timing += Time.deltaTime;
	
    var theController : CharacterController = GetComponent(CharacterController);
    var foot : FootSound = runnerFeet.GetComponent(FootSound);
    var body : BodySound = runnerBody.GetComponent(BodySound);
	var eye : HeadMove = theEye.GetComponent(HeadMove);    
    
    theTime += Time.deltaTime;
    if (transform.position.y < initialHeight) {
    	moveDirection = Vector3(Input.GetAxis("Horizontal")*0.5, 0, 1);
   		ifRunning = (Input.GetAxis("Vertical")>0); 
    
    	if ((!isGroundedBefore)&&(theTime-lastJump>0.5)) { 
    		foot.PlayJumpDown();
    		lastJump = timing;
    		}
    	else foot.PlayStep();  //PlayStep 里面左右移动
    	isGroundedBefore = true;
        // We are grounded, so recalculate
        // move direction directly from axes

        moveDirection = transform.TransformDirection(moveDirection);
        
        //Speed Up
    if (ifRunning){
    	if (speed<1.5) speed = 1.5;
    	else if (speed<10) speed *= (1+Time.deltaTime/30);
    		 else speed += Time.deltaTime/3;
     	}
    else speed -= Time.deltaTime*2;
    	
    	
    if (Input.GetAxis("Vertical")<0) speed -= Time.deltaTime*5;	
        
		//if collision
    if (theController.collisionFlags & CollisionFlags.Sides){
    	speed *= 0.8;
    	body.PlayPassBy();
    	HitMoveBack();
        }
        
		
    if (speed<initialSpeed) speed = initialSpeed;
        //Debug.Log(speed);
        moveDirection *= speed;
        moveDirection.y = 0;
        //Debug.Log(moveDirection);

    if ((Input.GetButton ("Jump"))&&(theTime-lastJump>0.5)&&(speed<8)){
            moveDirection.y = jumpSpeed;
        } 
    }
    
    else {
    	if (isGroundedBefore) foot.PlayJumpUp();
    	isGroundedBefore = false;	
    }

    // Apply gravity
    moveDirection.y -= gravity * Time.deltaTime;

	eye.jumpDownBuffer();
    // Move the controller
    theController.Move(moveDirection * Time.deltaTime); 

}

function getIfRunning () {
	return(ifRunning);
}

function getSpeed () {
	return(speed);
}

function MoveLeft () {
	moveDirection.x -= 0.2/speed;
}

function MoveRight () {
	moveDirection.x += 0.2/speed;
}

function MoveForward () {
	moveDirection.z -= 0.1/speed;
}

function MoveBack () {
	moveDirection.z += 0.1/speed;
}

function HitMoveBack () {
	moveDirection.z += 1*Time.deltaTime;
}
