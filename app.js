/*
commnet here

1.getlog - offset coordinate
    function onmousemove(evnet)
    이 function은 마우스의 출현을 감지해 해당 offset coordinate를 얻어낸다.
    offset coordinate를 log로 확인하고자 한다면 console.log(x,y) or console.log(event)사용.

2.canvas - context...
    canvas는 html 명령어로, 지정한 size안의 pixel에 접근할 수 있는 context를 갖고있다.
    const get2d = canvas.getContext('2d'); 2d 이외에도 많은 종류의 context가 있음.

3.stroke
    beginPath() -> moveTo(x,y) -> lineTo(x,y) -> stroke()
    
        beginPath
        !painting 상태에서만 진입할 수 있다는 것은, startPainting이 실행되지 않은
        모든 시점에서 통과할 수 있다는 뜻이다. 우리가 canvas 위에 마우스를 올리면,
        function onmousemove가 수집한 offsetX,Y를 기반으로 path가 생성된다.

        moveTo
        그렇게 생성된 path가 계속 가만히 있다면 사용할 수가 없다. 그렇기 때문에 !painting인 동안
        생성된 x,y 기반의 path를 offset coordinate로 옮긴다.

        lineTo
        beginPath가 실행된 상태에서 painting = ture가 되면 lineTo(x,y)가 실행된다. 이 함수는
        현재 sub-path의 마지막 점을 특정 좌표로 연결한다. 즉, beginpath로 생성된 !connceted path의
        start point A(offset coordinate x,y)에서 painting = ture인 동안 계속 실행되며 좌표를 연결한다.

        stroke
        위의 모든 과정을 거쳐도 stroke가 없다면 우리는 그 결과를 눈으로 확인할 수 없다. stroke는
        현재 stroke style로 현재 sub-path를 채운다. 이 과정을 거쳐야만 시각적 데이터가 생성된다.
*/


const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const LWrange = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onmousemove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
        /*현재 sub-path의 마지막 점을 특정 좌표와 연결한다.*/
    }
}

function HandleColor(event)
{
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function HandleRange(evnet)
{
    const StrokeWidth = event.target.value;
    ctx.lineWidth = StrokeWidth;
}

function HandleMode()
{
    if(filling == true)
    {
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function HandleCanvasClick()
{
    if(filling)
    {
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }else{
        
    }
}

if(canvas)
{
    canvas.addEventListener("mousemove", onmousemove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", HandleCanvasClick);
}

Array.from(colors).forEach(color => color.addEventListener("click",HandleColor));

if(LWrange)
{
    LWrange.addEventListener("input", HandleRange);
}

if(mode)
{
    mode.addEventListener("click", HandleMode);
}