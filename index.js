const canvas=document.querySelector('canvas'); // selecting our canvas element 

canvas.width=innerWidth    // 
canvas.height=innerHeight


const context=canvas.getContext('2d');   // canvas context is our canvas api that allows us
                                        // to draw on the canvas to actully get art work on our canvas

// creating a player class which has certain propeties like size, color, position 

class Player{          // in order to create properties we need and specify them to our class we need  constructor
constructor(x,y,radius,color){          //constructor is called each time you intiate a new version of the player of the class 
    this.x=x
    this.y=y
    this.radius=radius
    this.color=color     //when we pass the arguments it forms an instance of class with these properties
}
//draw function inside the class to reflect these properties o screen

draw(){
    context.beginPath();
   const ans= context.arc(this.x,this.y,this.radius,0,Math.PI*2,false); // creates circles
   context.fillStyle=this.color;  // for color
    context.fill();
}              
}
class Projectile{
    constructor(x,y,radius,color,velocity){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
    }
    draw(){
        context.beginPath();
       const ans= context.arc(this.x,this.y,this.radius,0,Math.PI*2,false); // creates circles
       context.fillStyle=this.color;  // for color
        context.fill();
    }    
    update(){
        this.draw(); // combining two functions together in class 
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
    }
}


class Enemy{
    constructor(x,y,radius,color,velocity){
        this.x=x
        this.y=y
        this.radius=radius
        this.color=color
        this.velocity=velocity
    }
    draw(){
        context.beginPath();
       const ans= context.arc(this.x,this.y,this.radius,0,Math.PI*2,false); // creates circles
       context.fillStyle=this.color;  // for color
        context.fill();
    }    
    update(){
        this.draw(); // combining two functions together in class 
        this.x=this.x+this.velocity.x
        this.y=this.y+this.velocity.y
    }
}



const x=canvas.width/2 // to get center of the page
const y=canvas.height/2 

const player= new Player(x,y,30,'red'); // creating an object
// player.draw();    // we need to add this animate function cause to get particle effect we clear the screen with each click so it also gets removed



// const projectile= new Projectile(      // creating a moving object for our projectile
//     canvas.width/2,
//     canvas.height/2,
//     5,
//     'black',
//     {x:1,y:1}
//     ); // the x,y coordinates are in the from where our projectile starts

                                                    // we need to genrate multiple projectile with each click that goes inside our array which
                                                    //then furhter get projected using forEach function in our animate function
const projectiles=[]    // array for holding each instance of click for each projectile 

const enemies=[]

function spwanEnemies(){
setInterval(()=>{

    const radius=Math.random() * (30-6)+6      // here the range is 30 - 6 using Math.random in this specific way
    let x,y
if(Math.random()<0.5){                              //creating randomness for enemies 
 x=Math.random()<0.5? 0-radius : canvas.width +radius
 y=Math.random()*canvas.height
}else{
    x=Math.random()*canvas.width
    y=Math.random()<0.5? 0-radius : canvas.height +radius
}
const color='blue'
const angle=Math.atan2(canvas.height/2-y,canvas.width/2-x)  // here we are subtracting the border form the middle to project our enemies towrads the center

const velocity={              
    x: Math.cos(angle),    
    y: Math.sin(angle)
}  

enemies.push(new Enemy(x,y,radius,color,velocity))
},1000)  // creating enemies with an interval of 1sec
}

function animate(){
    requestAnimationFrame(animate)   // this funtions creates a loop it infinitly calls the animate function 
                                    // it will keep calling the update funtion for us   

   context.clearRect(0,0,canvas.width,canvas.height)  // while looping through the loop it clears the screen to get that particle effect
   player.draw();
    projectiles.forEach(projectile=>{  // this function will go through each projectile inside our array 
        projectile.update();           
    })

    enemies.forEach((enemy,index)=>{ // this funciton will go through each enemy inside our enemies array
                                    // here index will give us particular index of the enemy object inside the enemies array 

        enemy.update();
        projectiles.forEach((projectile,projectileIndex)=>{
            const distance=Math.hypot(projectile.x-enemy.x,projectile.y-enemy.y) // calcultes the distance between projetile and distance 
                                                            // with every frame we do this to eleminate the enemy

            if(distance - enemy.radius - projectile.radius < 1){ // we cancel there raduis so that whenever it touches the circumference it becomes less than 1
               
               setTimeout(()=>{ // to remove the flash effect its having every time we remove somthing from array
                // what it does is it wait for the very next frame to start removing form the array

                enemies.splice(index,1) // removes that particular index when the projectile touches the enemy removing 
                                       // 1 signifies to remove one element from the array enemy
                projectiles.splice(projectileIndex,1)
               },0) 
            }                                               
        })
    })   
}


window.addEventListener('click',(event)=>{  // click is the input which is listen from window using event listner(window is by default)
                                            // event object receives the value of all coordinates or we can say the details of our click
// console.log(event.clientX) ;             //here we can get all the values our event holds and get exact x,y coordinates of our click

//const projectile= new Projectile(event.clientX,event.clientY,5,'black',null); // whereever we click will create a projectile dot
   

// To calculate the velocity using the coordinates
const angle=Math.atan2(event.clientY-canvas.height/2,event.clientX-canvas.width/2)  // it helps us to calculte the angle for the triangle
                                                                                    // in radians (0-360)= 0-6.28 radian
const velocity={              
    x: Math.cos(angle),    
    y: Math.sin(angle)
}                       

projectiles.push(new Projectile(
    canvas.width/2,
    canvas.height/2,
    5,
    'black',
    velocity
))

})

animate();
spwanEnemies();

console.log("hi");



