// code from https://openprocessing.org/user/246594?view=sketches 

let video;
let poseNet;
let pose;
let skeleton;

function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO)
	background(200);
	video.hide()
	poseNet = ml5.poseNet(video, modelReady)
	poseNet.on('pose', gotPoses)
}

function modelReady() {
	console.log("model ready")
}

function gotPoses(poses) {
	if (poses.length > 0) {
		pose = poses[0].pose
		skeleton =  poses[0].skeleton
	}
}


function draw() {
	image(video, 0, 0)

	filter(THRESHOLD)

	noStroke()

	if (pose) {
		stroke(0, 240, 255)
		ellipse(pose.nose.x, pose.nose.y, 30)

		ellipse(pose.rightWrist.x, pose.rightWrist.y, 30)
		ellipse(pose.leftWrist.x, pose.leftWrist.y, 30)
		
		stroke(0, 240, 255)
		line(pose.nose.x, pose.nose.y,pose.rightWrist.x, pose.rightWrist.y)
		line(pose.nose.x, pose.nose.y,pose.leftWrist.x, pose.leftWrist.y)
		line(pose.rightWrist.x, pose.rightWrist.y,pose.leftWrist.x, pose.leftWrist.y)
		
		for (let i = 0; i < pose.keypoints.length; i++) {
			let x = pose.keypoints[i].position.x;
			let y = pose.keypoints[i].position.y;
			ellipse(x,y,16,16)
		}
		
		for (let i =0 ; i< skeleton.length; i++) {
			let a = skeleton[i][0];
			let b = skeleton[i][1];
			line(a.position.x, a.position.y, b.position.x, b.position.y)
		}
	}

}