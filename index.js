let optioncont=document.querySelector('.options-cont');
let toolcont=document.querySelector('.tool-cont');
let penciltoolcont=document.querySelector('.pencil-tool-cont');
let erasetoolcont=document.querySelector('.eraser-tool-cont');
let pencil=document.querySelector('.pencil');
let eraser=document.querySelector('.Eraser');
let stickynote=document.querySelector(".StickyNote");
let upload=document.querySelector(".Upload");
let flag=true;
let pencilflag=false;
let eraserflag=false;

optioncont.addEventListener("click",(e)=>{
    let iconselement=optioncont.children[0];
    flag=!flag;
    console.log("yhb");
    if(flag)
    {
        iconselement.classList.remove("fa-bars");
        iconselement.classList.add("fa-xmark");
        toolcont.style.display="none ";

        penciltoolcont.style.display='none';
        erasetoolcont.style.display='none';
    }
    else
    {
        iconselement.classList.remove("fa-xmark");
        iconselement.classList.add("fa-bars");
        toolcont.style.display="flex";
    }
});

pencil.addEventListener("click",(e)=>{
    pencilflag=!pencilflag;
    if(pencilflag)
    {
        penciltoolcont.style.display="block";
    }
    else{
        penciltoolcont.style.display="none";
    }
});
eraser.addEventListener("click",(e)=>
{
    eraserflag=!eraserflag;
    if(eraserflag)
    {
        erasetoolcont.style.display="flex";
    }
    else{
        erasetoolcont.style.display="none";
    }
});
upload.addEventListener("click",(e)=>{
    let input=document.createElement("input");
    input.setAttribute("type","file");
    input.click();
    input.addEventListener("change",(e)=>{
        
    });
});
stickynote.addEventListener("click",(e)=>
{
    let stickynote=document.createElement("div");
    stickynote.setAttribute("class","sticky-cont");
    stickynote.innerHTML=`
    <div class="header-cont">
      <div class="minimize"></div>
      <div class="remove"></div>
    </div>
    <div class="note-cont">
      <textarea ></textarea>
    </div>`;
  document.body.appendChild(stickynote);
  let minimize=document.querySelector(".minimize");
  let remove=document.querySelector(".remove");
  noteaction(minimize,remove,stickynote);
  stickynote.onmousedown = function(event) {

    dragAndDrop(stickynote,event)
  };
  
  stickynote.ondragstart = function() {
    return false;
  };

});

function noteaction(minimize,remove,stickynote)
{
    remove.addEventListener("click",(e)=>{
        stickynote.remove();
    });
    minimize.addEventListener("click",(e)=>{
        let notecont=stickynote.querySelector('.note-cont');
        let display=getComputedStyle(notecont).getPropertyValue("display");
        if(display==="none")
        {
            notecont.style.display="block";
        }
        else{
            notecont.style.display="none";
        }
    });
}


function dragAndDrop(element,event)
{
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;
  
    element.style.position = 'absolute';
    element.style.zIndex = 1000;
    moveAt(event.pageX, event.pageY);
  
    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }
  
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
  
    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);
  
    // drop the ball, remove unneeded handlers
    element.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
}