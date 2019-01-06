//********* variables *********
var body=document.getElementsByTagName("body")[0];
var pencil=document.getElementById("pencil");
var eraser=document.getElementById("eraser");
var line=document.getElementById("line");
var rect=document.getElementById("rect");
var circ=document.getElementById("circ");
var clear=document.getElementById("clear");
var canvas=document.getElementById("canvas");
canvas.width=innerWidth-50;
canvas.height=innerHeight-50;
var ctx=canvas.getContext("2d");
var status;var img;
var ax,by;

//********* Event Listeners  *********
pencil.addEventListener("click",draw);
eraser.addEventListener("click",erase);
line.addEventListener("click",lineDraw);
rect.addEventListener("click",rectDraw);
circ.addEventListener("click",circDraw);
clear.addEventListener("click",clearAll);
//******** Removing Event Listeners ********
function removeEvents(){
	canvas.removeEventListener("mousedown",drawDown);
	canvas.removeEventListener("mousemove",drawMove);
	canvas.removeEventListener("mouseup",drawUp);
	canvas.removeEventListener("mousedown",eraserDown);
	canvas.removeEventListener("mousemove",eraserMove);
	canvas.removeEventListener("mouseup",eraserUp);
	canvas.removeEventListener("mousedown",lineDown);
	canvas.removeEventListener("mousemove",lineMove);
	canvas.removeEventListener("mouseup",lineUp);
	canvas.removeEventListener("mousedown",rectDown);
	canvas.removeEventListener("mousemove",rectMove);
	canvas.removeEventListener("mouseup",rectUp);
	canvas.removeEventListener("mousedown",circDown);
	canvas.removeEventListener("mousemove",circMove);
	canvas.removeEventListener("mouseup",circUp);
	
}

//********* functions  ***********

//********* function draw  *********

function draw(){
	removeEvents();
	canvas.addEventListener("mousedown",drawDown);
	canvas.addEventListener("mousemove",drawMove);
	canvas.addEventListener("mouseup",drawUp);
}
function drawDown(event){
	status=true;
	ctx.beginPath();
	ctx.moveTo(event.clientX-canvas.getBoundingClientRect().left,event.clientY-canvas.getBoundingClientRect().top);
}

function drawMove(event){
	if(status==='true'){
		ctx.lineTo(event.clientX-canvas.getBoundingClientRect().left,event.clientY-canvas.getBoundingClientRect().top);
		ctx.stroke();
	}
}

function drawUp(event){
	status=false;
}

//********* function eraser *********

function erase(){
	removeEvents();
	canvas.addEventListener("mousedown",eraserDown);
	canvas.addEventListener("mousemove",eraserMove);
	canvas.addEventListener("mouseup",eraserUp);
}

function eraserDown(event){
	ctx.beginPath();
	img=ctx.getImageData(0,0,canvas.width,canvas.height);
	ctx.putImageData(img,0,0);
	status=true;
}
function eraserMove(event){
	if(status=="true"){
		var x=event.clientX-canvas.getBoundingClientRect().left;
		var y=event.clientY-canvas.getBoundingClientRect().top;
		ctx.beginPath();
		ctx.fillStyle="white";
		ctx.arc(x,y,4,0,Math.PI*2,false);
		ctx.fill();
	}
}
function eraserUp(){
	status=false;
}

//********* functions for line *********

function lineDraw(){
	removeEvents();
	canvas.addEventListener("mousedown",lineDown);
	canvas.addEventListener("mousemove",lineMove);
	canvas.addEventListener("mouseup",lineUp);
}
function lineDown(event){
	status=true;
	ax=event.clientX-canvas.getBoundingClientRect().left;
	by=event.clientY-canvas.getBoundingClientRect().top;
	img=ctx.getImageData(0,0,canvas.width,canvas.height);
}
function lineMove(event){
	if(status=="true"){
		x=event.clientX-canvas.getBoundingClientRect().left;
		y=event.clientY-canvas.getBoundingClientRect().top;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(img,0,0);
		ctx.beginPath();
		ctx.moveTo(ax,by);
		ctx.lineTo(x,y);
		ctx.stroke();
	}
}
function lineUp(event){
	status=false;
}


//******* functions for rect *********

function rectDraw(){
	removeEvents();
	canvas.addEventListener("mousedown",rectDown);
	canvas.addEventListener("mousemove",rectMove);
	canvas.addEventListener("mouseup",rectUp);
}
function rectDown(event){
	status=true;
	ax=event.clientX-canvas.getBoundingClientRect().left;
	by=event.clientY-canvas.getBoundingClientRect().top;
	img=ctx.getImageData(0,0,canvas.width,canvas.height);
}
function rectMove(event){
	if(status=="true"){
		x=event.clientX-canvas.getBoundingClientRect().left;
		y=event.clientY-canvas.getBoundingClientRect().top;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(img,0,0);
		ctx.beginPath();
		ctx.strokeRect(ax,by,x-ax,y-by);
	}
}
function rectUp(event){
	status=false;
}

//******** function for circ *********

function circDraw(){
	removeEvents();
	canvas.addEventListener("mousedown",circDown);
	canvas.addEventListener("mousemove",circMove);
	canvas.addEventListener("mouseup",circUp);
}
function circDown(event){
	status=true;
	ax=event.clientX-canvas.getBoundingClientRect().left;
	by=event.clientY-canvas.getBoundingClientRect().top;
	img=ctx.getImageData(0,0,canvas.width,canvas.height);
}
function circMove(event){
	if(status=="true"){
		x=event.clientX-canvas.getBoundingClientRect().left;
		y=event.clientY-canvas.getBoundingClientRect().top;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(img,0,0);
		ctx.beginPath();
		if(x>ax){
			radius=x-ax;
		}
		else{
			radius=ax-x;
		}
		ctx.arc(ax,by,radius,0,Math.PI*2);
		ctx.stroke();
	}
}
function circUp(event){
	status=false;
}

//********* function to clear All the drawing ********
function clearAll(){
	ctx.beginPath();
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

var a=document.createElement("a");
a.textContent="download";
a.href=canvas.toDataURL();
a.download=true;;
body.appendChild(a);
a.onclick=()=>{
	a.href=canvas.toDataURL();
}