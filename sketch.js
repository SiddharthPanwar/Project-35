//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImg1,happyDog;
var foodObj,feed,addFood,fedTime,lastFed;


function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	var canvas = createCanvas(500,500);
  dog = createSprite(250,250,20,20);
  dog.addImage(dogImg1);
  dog.scale = 0.13;
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("Feed MR.Sk8TeR");
  feed.position(660,75);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(780,75);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  textSize(15);
  fill("blue");
  stroke("black");
  strokeWeight(4);
  text("NOTE: Press UP_ARROW to Feed MR.Sk8TeR Milk",75,70);
  text("Food Remaining : "+foodS,170,130);
  fill(255,255,255);
  textSize(15);
  if (lastFed>=12) {
    text("Last Feed : " +lastFed%12 + "PM",320,40);
  } else if (lastFed==0){
    text("Last Feed : 12 AM",320,10);
  }
  else{
    text("Last Feed : " + lastFed + "AM",320,10);
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
   if (x<=0) {
     x=0;
   } else {
     x=x-1;
   }
  database.ref('/').update({
    Food:x
  })

}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    fedTime:hour()
  })
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food : foodS
  })
}


