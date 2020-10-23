const canvas=document.querySelector("canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var c=canvas.getContext("2d");
var circles=[];
var colorArray=["#2C3E50","#E74C3C","#ECF0F1","#3498DB","#2980B9"];
var maxradius=40;
var mouse={
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove",function(event){
    mouse.x=event.x;
    mouse.y=event.y;
    //console.log(mouse);
})
window.addEventListener("resize",function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
function Circle(x,y,dx,dy,radius)
{
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.minRadius=radius;
    this.color=colorArray[Math.floor(Math.random()*colorArray.length)];
    this.draw= function()
    {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle=this.color;
        c.fill();
    }
    this.update= function()
    {
        
        if(this.x> innerWidth-radius || this.x < radius)
        {
            this.dx*=(-1);
        }
        if(this.y> innerHeight- radius || this.y< radius)
        {
            this.dy*=(-1);
        }
        this.x+=(this.dx);
        this.y+=(this.dy);

        //interactivity
        var val=Math.abs(mouse.x - this.x);
        var val1=Math.abs(mouse.y-this.y)
        if(val < 50 && val1<50){
            this.radius++;
            this.radius=Math.min(this.radius,maxradius);
        }
        else if(this.radius > this.minRadius){
            this.radius--;
        }
         this.draw();
    }
}

function init()
{
    circles=[];
    for(let i=0;i<500;i++)
    {
        var radius=Math.floor(Math.random()*5) + 1;
        var x=Math.floor(Math.random()*(innerWidth-2*radius)) + radius;
        var y=Math.floor(Math.random()*(innerHeight-2*radius)) + radius;
        var dx=Math.floor(Math.random()*5)-2;
        var dy=Math.floor(Math.random()*5)-2;
        circles.push(new Circle(x,y,dx,dy,radius));
    }
}
function animate()
{

    c.clearRect(0,0,innerWidth,innerHeight);
    requestAnimationFrame(animate);
    for(let i=0;i<circles.length;i++)
    {
        circles[i].update();
    }
}
init();
animate();

