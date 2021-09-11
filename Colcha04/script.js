const containerRetazos = document.querySelector('.colcha');
let containerRetazosRect =  containerRetazos.getBoundingClientRect();
let containerControls =  document.querySelector('.container__controls')
const pathArea = "assets/img/retazos_area/retazo_"
const pathFeedBack = "assets/img/retazos_feedback/retazo_"
const pathAud = "assets/audios/retazo_"
const pathRetazos = "assets/img/retazos/retazo_"
let audio = document.querySelector('audio');
let retazos = []
let retazoSelected = 0;
let colchaFeedBack = document.querySelector('.colcha__feedback');
let colchaOriginal = document.querySelector('.colcha__original');
let colchaFeedBackClicked = document.querySelector('.colcha__feedback-clicked');
let visorImg= document.querySelector('.visor__img');
let idRetazo= document.querySelector('.id-retazo');
let textNoAudio = document.querySelector('.no-audio');



for( let i =0;i<37; i++){
    retazos.push(new Retazo(containerRetazos,pathArea+i+'.png','',i,pathFeedBack+i+'.png',pathRetazos+i+'.png',pathAud+i+'.mp3'));

}




function pageLoaded(){
    init()
    moveRetazoSelection(Math.floor(Math.random() * (+retazos.length-1 - +0) + +0));
};


function ordenar() {
    try {
        for(let retazo of retazos){
            retazo.responsive();
        }
        filaRetazos(0,0,0,2)
        filaRetazos(0,2,3,6)
        filaRetazos(3,4,7,11)
        filaRetazos(6,6,11,11,retazos[5].getRight())
        filaRetazos(7,11,12,19)
        filaRetazos(9,10,15,16, retazos[8].getRight())
        filaRetazos(12,14,20,21)
        filaRetazos(15,17,22,24,  retazos[21].getRight())
        filaRetazos(20,24,25,26)
        filaRetazos(22,24,27,28,retazos[21].getRight() )
        filaRetazos(18,18,29,29,retazos[28].getRight() )
        filaRetazos(25,26,30,32)
        filaRetazos(28,29,33,34,retazos[26].getRight() )
        filaRetazos(31,31,35,35,retazos[30].getRight() )
        filaRetazos(35,35,36,36,retazos[30].getRight() )


        // filaRetazos(4,4,10,10)
       /* filaRetazos(2,2,6,6,retazos[1].getRight())
        filaRetazos(0,1,7,9)
        filaRetazos(7,9,10,15)
        filaRetazos(10,15,16,21)
        filaRetazos(8,8,22,22,retazos[1].getRight()-retazos[1].getRight()/7,retazos[7].getBottom()-retazos[7].getBottom()/5)*/






    }catch (e) {

    }
}

/*A algunos elementos la referencia de arriba y abajo no se le agregan
correctamente y con este método les agrego las referencias*/
function fixNextUpDownElement(i,nextIndexUp,nextIndexDown) {
    retazos[i].setNextDown(nextIndexDown);
    retazos[i].setNextUp(nextIndexUp);

}




// startRef y endRef son los indices las referencias que están en el bloque anterior (arriba)
// start y end son los ínidices del elemento que se posicionará (inicio y fin)
// positionStart es desde donde comienza el primer retazo
function filaRetazos(startRef,endRef,start,end,positionStartX=0,positionStartY=0) {
    end = end+1;
    if(start !==0){
    for(let i=start;i<end;i++){
        let j=i+1;
        const retazo = retazos[i];
        const retazoAfter = retazos[j];
        const retazoRef= retazos[startRef];
        retazos[i].setNextUp(startRef);
        retazos[startRef].setNextDown(i);
        i===start?retazo.setLeft(positionStartX):0;
        i===start?retazo.setTop(positionStartY):0;
        if(positionStartY===0){
            retazo.setTop(retazoRef.getBottom());
        }
        retazoAfter.setLeft(retazo.getRight());
        if(startRef<endRef){

            startRef++;
        }
    }}else{
        for(let i=start;i<end;i++){
            retazos[i].setNextUp(i);
            retazos[startRef].setNextDown(i+end);
            const retazo = retazos[i];
            const retazoAfter = retazos[i+1];
            retazoAfter.setTop(0);
            retazoAfter.setLeft(retazo.getRight());
        }
    }
}





function moveController(direction) {
    try {
    switch (direction){
        case 'up':{
            moveRetazoSelection(retazos[retazoSelected].getNextUp());
            break;
        }
        case 'rigth':{
            moveRetazoSelection(+retazoSelected+ +1);
            break;
        }
        case 'left':{
            moveRetazoSelection(retazoSelected-1);
            break;
        }
        case 'down':{
            moveRetazoSelection(retazos[retazoSelected].getNextDown());
            break;
        }

    }} catch (e) {
        retazoSelected = 0;
    }

}

//Aquí se hace la selección del retazo
function moveRetazoSelection(value) {
        try {
            retazoSelected=value;
        } catch (e) {
            retazoSelected = 0;
        }
    colchaFeedBackClicked.setAttribute("src", retazos[retazoSelected].getFeedBack());
    visorImg.setAttribute("src", retazos[retazoSelected].getRetazo());
    idRetazo.innerHTML=1 + parseInt(retazoSelected);

    audio.src=retazos[retazoSelected].getAudio();

}



audio.addEventListener("loadeddata",function () {
    textNoAudio.style.display = "none";
    audio.style.display = "inherit"

})

audio.addEventListener("error",function () {
    textNoAudio.style.display = "flex";
    audio.style.display = "none"
})



function init() {
    for(let retazo of retazos){
        retazo.init();
    }
    if(window.innerWidth>720){
        containerControls.style.height=colchaOriginal.getBoundingClientRect().height+'px';
        containerRetazos.style.marginTop = -colchaOriginal.getBoundingClientRect().height+'px';
    }


    ordenar();

    window.addEventListener("resize", ()=>{
        containerRetazosRect =  containerRetazos.getBoundingClientRect();
        if(window.innerWidth>720){
            containerControls.style.height=colchaOriginal.getBoundingClientRect().height+'px';
            containerRetazos.style.marginTop = -colchaOriginal.getBoundingClientRect().height+'px';
        }else{
            containerControls.style.height='auto';
        }




        ordenar();

    });

    window.addEventListener('click', (event)=>{
        let id= event.target.id;
        if(id){
            moveRetazoSelection(id);
            //console.log(id,retazos[id].getNextUp(),retazos[id].getNextDown(),)
           // console.log(id)
        }
    })

    window.addEventListener('mouseover', (event)=>{
        let id= event.target.id;
        if(id){
            colchaFeedBack.setAttribute("src", retazos[id].getFeedBack());
        }

    });

    containerRetazos.addEventListener('mouseout', (event)=>{
        colchaFeedBack.setAttribute("src", '');
    });

    visorImg.addEventListener("load", function() {
        if(visorImg.offsetWidth>= visorImg.offsetHeight){
            visorImg.style.width='100%'
            visorImg.style.height='auto';
        }
        if(visorImg.offsetWidth< visorImg.offsetHeight){
            visorImg.style.height='100%'
            visorImg.style.width='auto'
        }

    })






}









