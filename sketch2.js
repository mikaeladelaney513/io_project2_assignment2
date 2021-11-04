// code from https://openprocessing.org/user/144882?view=sketches

let video, poseNet, pose;
let paintbrushes = [];

function setup() {
	createCanvas(640, 480);
	
	video = createCapture(VIDEO);
	video.size(640, 480);
  video.hide();
	
  poseNet = ml5.poseNet(video, modelLoaded); 
  poseNet.on('pose', gotPoses);
	poseNet.flipHorizontal = true; 
	
	paintbrushes[0] = new RainbowBrush(7, 70, "left");
	paintbrushes[1] = new RainbowBrush(7, 70, "right");
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
		//console.log(pose);
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
	tint(255, 10);
	image(video, -width, 0);
	tint(255, 255);
	
	if (pose) {
		for (let i = 0; i < paintbrushes.length; i++) {
			let repeat = random(3);
			for (let j = 0; j < repeat; j++) {		// multiple dots per frame
			paintbrushes[i].move();
			paintbrushes[i].show();
			}
		}
	}
}

class RainbowBrush {
	constructor(rmin, rmax, hand) {
		this.x = 0;
		this.y = 0;
		this.rmin = rmin;		// min radius for paint splatter
		this.rmax = rmax;		// maximum ""
		this.hand = hand;		// instructions for attaching the paintbrush to a PoseNet hand: "left", "right", or "none"
	}

	move() {		
		if (this.hand == "left") {
			this.x =  pose.leftWrist.x + random(-100, 100);		// the +random() spreads out the paint splatter
			this.y =  pose.leftWrist.y + random(-80, 80);			// rectangular spread looks more natural than within a square, so y range is smaller
		} else if (this.hand == "right") {
			this.x =  pose.rightWrist.x + random(-100, 100);
			this.y =  pose.rightWrist.y + random(-80, 80);
			
		} 
		// else if (this.hand == "none") {
		// 	this.x =  mouseX + random(-100, 100);
		// 	this.y =  mouseY + random(-80, 80);
		// }
	}

	show() {
		noStroke();
		
		// R will change as you move horizontally, G will change as you move vertically, and B is based on the radius
		fill(this.x/3, this.y/2 - 90, this.rmax * random(0.8, 1.4) );
		
		// draws one drop of paint, per frame
		ellipse(this.x, this.y, random(this.rmin, this.rmax) );
	}
	
}