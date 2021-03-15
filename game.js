const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dog = new Image(30, 30);
let cat = new Image(30, 30);
let bone = new Image(30, 30);
let boom = new Image(40, 40);
let boss = new Image(120, 120);
let boomSound = new Audio();

dog.src = "./img/corgi.png";
cat.src = "./img/cat.png";
bone.src = "./img/bone.png";
boom.src = "./img/boom.png";
boss.src = "./img/boss1.png";
boomSound.src = './sound/1.mp3';


let width = 700;
let height =  500;
let scoreCount = 0;

let catArray = [];
let bonesArray = [];
let bossArray = [{x:0, y:250}];
let delItArray = [];
let newCatArray = [];
let newBonesArrat = [];

let bossLives = 7;
let x;
let y;
let interval;
let catX;
let catY;
let bossX;
let bossY;
let lastX;
let lastY;


function initDog(){
    x = 580;
    y = 200;
    dog.onload = function () {
        ctx.drawImage(dog, x, y, 30, 30);
      };
      ctx.drawImage(dog, x, y, 30, 30);
  }
  
initDog();


function gameLoop() {
    max = 40;
    min = 0;
    bossX = 120;
    bossY = 0;
    catX = 0;
    catY = (Math.floor(Math.random() * (max - min)) + min) * 20; // Math.floor(Math.random() * (max - min + 1) + min);
   
      cat.onload = function () {
        ctx.drawImage(cat, catX, catY, 30, 30);
      };
      catArray.push({x: catX, y: catY})
      catArray = catArray.map(catPosition=>{
        return {x: catPosition.x + 30, y: catPosition.y}
      })
      catArray = catArray.filter(cat =>{
          return ! (cat.x > 600)
      });
      bonesArray = bonesArray.map(bonePosition=>{
        return {x: bonePosition.x - 30, y: bonePosition.y}
      })
      bonesArray = bonesArray.filter(bone =>{
          return ! (bone.x < 0);
        });

        
       
      clearBoard();
      destroyCat();
      drawCats();
      drawCorgiInNewPosition();      
      drawBones();
      initBoss();
      endGame();
  }

function drawCats(){
    catArray.forEach(cat=>{
        drawCat(cat.x, cat.y)
    });
}
function catInterval() {    
    if(!interval)
    interval = setInterval(gameLoop, 500);
}  
catInterval();

function moveCat(x){
    console.log(x)
   return x+30;
}

  function moveDog(key) {
    if (key == 'ArrowUp') {
        // Up
        y = y - 15;
    }
    else if (key == 'ArrowDown') {
        // Down
        y = y + 15;
    }    
}
function clearBoard (){
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear html5 canvas
}

function drawCorgiInNewPosition(){
    ctx.drawImage(dog, x, y, 30, 30);
}

function drawCat(x,y){
    ctx.drawImage(cat, x, y, 30, 30);
}
function turn() {
    window.addEventListener("keydown", (e) => {
      lastY = y;
      var key = e.key;
      moveDog(key);
      if(key === " ") { 
        let boneX = x;
        let boneY = lastY;
        bonesArray.push({x: boneX, y: boneY});
    }
      clearBoard();
      drawBones()
      drawCorgiInNewPosition();
      drawCats();
      initBoss();
    });
  }
  turn();

  function drawBone(x,y){
    bone.onload = function () {
    ctx.drawImage(bone, x, y, 30, 30);
    };
    ctx.drawImage(bone, x, y, 30, 30)
    }
function drawBones(){
  bonesArray.forEach(bone=>{
      drawBone(bone.x, bone.y)
  });
}
/*
  function shootBone(){
    window.addEventListener("space", (e) => {
      drawBones();      
    });
 }
  shootBone();*/

  function eqArray(delEl){
    let acceptValue = true;
    
    delItArray.forEach(e=>{
      if(Math.abs(e.x - delEl.x) < 30 && Math.abs(e.y - delEl.y) < 30 )
      acceptValue = false;
    
    boomSound.play();
    
    })
    return acceptValue;       
  }

  function destroyCat() {    

     for(let i = 0; i < catArray.length; i++){
      for(let j = 0; j < bonesArray.length; j++){    
      if (      
      Math.abs(catArray[i].x - bonesArray[j].x)  < 30 &&
      Math.abs(catArray[i].y - bonesArray[j].y) < 30) {      
      delItArray.push({x: catArray[i].x, y: catArray[i].y});
      ctx.drawImage(boom, catArray[i].x, catArray[i].y, 40, 40);
      scoreCount += 10;
      document.getElementById("score").innerHTML = scoreCount;
      //catArray.splice[i, 1];          
      }     
    }
  }
  newCatArray = catArray.filter(eqArray);
  newBonesArray = bonesArray.filter(eqArray);
  catArray = [...newCatArray];
  bonesArray = [...newBonesArray];
  delItArray = [];
  
  
}

function initBoss(){  
  // bossArray.push()
  if(scoreCount>=50 && bossLives > 0){
    console.log(bossArray[0].x,bossArray[0].y)
    ctx.drawImage(boss, bossArray[0].x, bossArray[0].y, 120, 120);
    bossArray = bossArray.map(bossPosition=>{
      return {x: bossPosition.x + 10, y: bossPosition.y}
    })
    destroyBoss();
  }
}

function eqArrayBoss(delEl){
  let acceptValue = true;
  
  delItArray.forEach(e=>{
    if(Math.abs(e.x - delEl.x) < 120 && Math.abs(e.y - delEl.y) < 120 )
    acceptValue = false;
  
  boomSound.play();
  
  })
  return acceptValue;       
}
function destroyBoss() {    

  for(let i = 0; i < bossArray.length; i++){
   for(let j = 0; j < bonesArray.length; j++){    
   if (      
   Math.abs(bossArray[i].x - bonesArray[j].x)  < 120 &&
   Math.abs(bossArray[i].y - bonesArray[j].y) < 120) {      
   delItArray.push({x: bossArray[i].x, y: bossArray[i].y});
   ctx.drawImage(boom, bossArray[i].x, bossArray[i].y, 40, 40);
   scoreCount += 10;
   bossLives -= 1;
   document.getElementById("score").innerHTML = scoreCount;
   //catArray.splice[i, 1];          
   }     
 }
}

newBonesArray = bonesArray.filter(eqArrayBoss);
bonesArray = [...newBonesArray];



}

  function endGame() {
    for(let a = 0; a < catArray.length; a++){
    if (     
      Math.abs(catArray[a].x - x)  < 30 &&
      Math.abs(catArray[a].y - y) < 30
    ) {
      document.getElementById("end").style.display = "inline";
      window.clearInterval(interval);
    }}
    if(bossLives === 0){
      document.getElementById("win").style.display = "inline";
      window.clearInterval(interval);
      
    }console.log(bossLives);

  }
 