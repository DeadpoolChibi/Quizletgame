let score = 0
let lives = 3
let inp
let pause 
let togglepause = false
let enemy = []
let spaceimg
let radius = 90
let add = 0
let speed = 2
var vocab = []

function preload(){
  spaceimg = loadImage('assets/space.jpg')
}

function setup() {
  createCanvas(500, 600)
  noStroke()
  getWords()
  angleMode(DEGREES)
  pause = createButton("||")
  pause.mousePressed(togglePause)
  pause.position(10, 20)
  inp = createInput()
  inp.position(width-150, height-40)
  inp.size(140)
  inp.input(myInputEvent)
  enemy.push(new Enemy())
  frameRate(speed)
}

function drawField(){
  image(spaceimg,0,0)
  fill(255)
  push()
  textSize(20)
  textAlign(LEFT,BOTTOM)
  text("lives:"+lives,10,height-20)
  textAlign(RIGHT,TOP)
  text("score:"+score,width-10,20)
  pop()
  push()
  rectMode(CENTER)
  translate(width/2,height-20-25)
  rotate(radius)
  rect(0,0,75,25)
  pop()
  ellipseMode(CORNER)
  ellipse(width/2-25,height-20-50,50,50)
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].checkspot()
    enemy[i].show()
  }
}

function draw() {
  if(lives==0){
    push()
    drawField()
    background(50,50)
    textAlign(CENTER,CENTER)
    textSize(40)
    text("GAME OVER", width/2, height/2)
    textSize(20)
    text("Type 'Restart' to play again", width/2, height/2+50)
    pop()
  }else{
    if(togglepause===false){
      drawField()
      for (let i = 0; i < enemy.length; i++) {
        enemy[i].move(i)
      }
      inp.show()
      difficulty()
    }else if(togglepause===true){
      textAlign(CENTER,CENTER)
      push()
      drawField()
      background(50,50)
      fill(255)
      textSize(40)
      text("Paused",width/2,height/2)
      pop()
      inp.hide()
    }
  }
}

function getWords(){
  vocab.push(new Vocab("Elephant","Elefant"))
  vocab.push(new Vocab("Chair","Stuhl"))
  vocab.push(new Vocab("Dog","Hund"))
  vocab.push(new Vocab("Car","Auto"))
}

function difficulty(){
  if(add>0){
    enemy.push(new Enemy())
    add = add - 1
  }
}

function keyTyped(){
  if(keyCode==13){
    togglePause()
  }
}

function myInputEvent(){
  for (let i = 0; i < enemy.length; i++) {
    if(this.value()==enemy[i].word2){
      inp.value('')
      radius = atan((height-20-25-(enemy[i].y+enemy[i].w/2))/(width/2-(enemy[i].x+enemy[i].w/2)))
      enemy.pop()
      score = score + 50
      enemy.push(new Enemy())
    }
  }
  if(lives==0 && mouseIsPressed){
    location.reload(true)
  }
}

function togglePause(){
  togglepause = !togglepause
}

class Enemy{
  constructor(){
    this.w = width * 0.12
    this.x = random(0,width-this.w)
    this.y = 100
    this.idx = round(random(0,vocab.length),0)
    this.word = vocab[this.idx].word
    this.word2 = vocab[this.idx].word2
  }
  checkspot(){
    for (let i = 0; i < enemy.length; i++) {
      if(enemy[i].x<this.x&&this.x<enemy[i].x+enemy[i].w && 
         ((enemy[i].y<this.y&&this.y<enemy[i].y+enemy[i].w)||enemy[i].y==this.y)){
        this.x = random(0,width-this.w)
      }
      if(enemy[i].word==this.word&&this.x!=enemy[i].x){
        this.idx = round(random(0,vocab.length),0)
        this.word = vocab[this.idx].word
        this.word2 = vocab[this.idx].word2
      }
    }
  }
  show(){
    ellipseMode(CORNER)
    ellipse(this.x,this.y,this.w,this.w)
    textAlign(CENTER,TOP)
    textSize(width*0.05)
    text(this.word,this.x+this.w/2,this.y+this.w+5)
  }
  move(i){
    this.y=this.y + 5
    if(this.y+this.w>height-20-50){
      enemy.pop()
      lives = lives - 1
      add = add + 1
    }
  }
}

class Vocab{
  constructor(a, b){
    this.word = a
    this.word2 = b
  }
}