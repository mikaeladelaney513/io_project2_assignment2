let video;
let poseNet;
let nosex;
let nosey;
let learx;
let leary;
let rearx;
let reary;


function setup() {
	createCanvas(640,480);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function gotPoses(poses) {
  console.log(poses);
	nosex = poses[0].pose.keypoints[0].position.x;
	nosey = poses[0].pose.keypoints[0].position.y;
	
	learx = poses[0].pose.keypoints[3].position.x;
	leary = poses[0].pose.keypoints[3].position.y;
	
	rearx = poses[0].pose.keypoints[4].position.x;
	reary = poses[0].pose.keypoints[4].position.y;
}

function draw() {
	background(255,100,35);
	image(video,0,0);
	fill(235, 35, 255);
	noStroke();
	ellipse(nosex,nosey,50);
  fill(52, 35, 255);
	noStroke();
	ellipse(learx,leary,50);
  fill(35, 255, 232);
	noStroke();
	ellipse(rearx,reary,50);
}