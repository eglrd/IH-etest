var img;
var factor=1;

function preload() {
  img = loadImage("stubbassets/test.jpg");
}

function setup() {
    createCanvas(640, 480);
    background(0);
}


function draw() {
  background(0);
  imageMode(CENTER);
  translate(width/2, height/2);

  if(mouseIsPressed){
    factor=factor+0.1;
    image(img, 0, 0, 75*factor, 100*factor);
  } else {
    image(img, 0, 0, 75*factor, 100*factor);
  }


}

function mousePressed(){
  factor=factor+0.1;
  image(img, 0, 0, 75*factor, 100*factor);
 }
