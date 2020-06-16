/*
commnet here

1.getlog - offset coordinate

    function onmousemove(evnet)
    : 이 function은 마우스의 출현을 감지해 해당 offset coordinate를 얻어낸다.
    offset coordinate를 log로 확인하고자 한다면 console.log(x,y) or console.log(event)사용.

2.canvas - context...
    canvas는 html 명령어로, 지정한 size안의 pixel에 접근할 수 있는 context를 갖고있다.
    const get2d = canvas.getContext('2d'); 2d 이외에도 많은 종류의 context가 있음.

*/


const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting() {
    painting = false;
}

function onmousemove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
}

function onmousedown(event)
{
    painting = true;

}

function onmouseup(event)
{
    stopPainting();
}

if(canvas)
{
    canvas.addEventListener("mousemove", onmousemove);
    canvas.addEventListener("mousedown", onmousedown);
    canvas.addEventListener("mouseup", onmouseup);
    canvas.addEventListener("mouseleave", stopPainting);
}