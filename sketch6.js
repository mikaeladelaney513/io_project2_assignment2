
// draw a stick figure from the PoseNet outputs
// schien@mail.ncku.edu.tw, 2020.09.23

let video;
let poseNet;
let aPose;
let aSkeleton;

// callbacks for PoseNet
function modelLoaded() {
	console.log("postNet ready");
}

function getPoses(poses) {
	//console.log(poses);
	if (poses.length > 0) {
		aPose = poses[0].pose;
		aSkeleton = poses[0].skeleton;
	}
}

function setup() {
	createCanvas(640, 480);
	background(100);
	video = createCapture(VIDEO);
	video.hide();
	// loading PostNet pre-trained model
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on("pose", getPoses);
}

function draw() {
	//image(video, 0, 0);
	// do not show the video
	//background(100);
	
	// setup the drawing pen
	stroke(255, 255, 255, 10);
	strokeWeight(3);
	
	if (aPose) {	// if a pose has been detected
		// draw the head of the stick figure
		// take the noze position as the center
		// and the distance between ears as the diameter
		let k = aPose.keypoints;
		let nose = k[0].position;
		let leftEar = k[3].position;
		let rightEar = k[4].position;
		let faced = dist(leftEar.x, leftEar.y, rightEar.x, rightEar.y);
		// draw the face
		noFill();
		ellipse(nose.x, nose.y, faced, faced);

		// draw the skeleton
		for (let i = 0; i < aSkeleton.length; i++) {
			let a = aSkeleton[i][0];
			let b = aSkeleton[i][1];
			line(a.position.x, a.position.y, b.position.x, b.position.y);
		}
	}
}