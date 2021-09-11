const containerRetazos = document.querySelector('.colcha');
let containerRetazosRect =  containerRetazos.getBoundingClientRect();
let containerControls =  document.querySelector('.container__controls')
const pathArea = "assets/img/retazos_area/retazo_"
const pathFeedBack = "assets/img/retazos_feedback/retazo_"
const pathAud = "assets/audios/"
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



for( let i =0;i<64; i++){
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

        filaRetazos(0,0,0,4,0)
       filaRetazos(0,4,5,12,0)
        filaRetazos(5,12,13,20,0)
        filaRetazos(15,18,21,22,retazos[14].getRight());
        filaRetazos(13,15,23,24,0);
       filaRetazos(21,22,25,26,retazos[24].getRight());
        filaRetazos(18,20,27,29,retazos[26].getRight());
        filaRetazos(23,29,30,37,0);
        filaRetazos(28,29,36,36,retazos[35].getRight());
        filaRetazos(30,37,38,46,0);
        filaRetazos(35,36,44,45,retazos[43].getRight());
         filaRetazos(38,45,47,57,0);
        filaRetazos(47,56,57,61,0);
        filaRetazos(54,55,62,63, retazos[61].getRight());


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
function filaRetazos(startRef,endRef,start,end,positionStart) {
    end = end+1;
    if(start !==0){
    for(let i=start;i<end;i++){
        let j=i+1;
        const retazo = retazos[i];
        const retazoAfter = retazos[j];
        const retazoRef= retazos[startRef];
        retazos[i].setNextUp(startRef);
        retazos[startRef].setNextDown(i);
        i===start?retazo.setLeft(positionStart):0;
        retazo.setTop(retazoRef.getBottom());
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
    }


    ordenar();

    window.addEventListener("resize", ()=>{
        containerRetazosRect =  containerRetazos.getBoundingClientRect();
        if(window.innerWidth>720){
            containerControls.style.height=colchaOriginal.getBoundingClientRect().height+'px';
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




    fixMovementUpDown();

}




function fixMovementUpDown(){
    fixNextUpDownElement(17,retazos[17].getNextUp(),22);
    fixNextUpDownElement(52,42,61);
    fixNextUpDownElement(53,43,62);
    fixNextUpDownElement(54,44,63);
    fixNextUpDownElement(44,36,54);
    fixNextUpDownElement(45,43,56);
    var j =0;
    for (var i = 57; i<64 ;i++){

        if(j<=4){
            fixNextUpDownElement(j,i,retazos[j].getNextDown());

        }
        j++;

        if(j>4){
            j=4;
        }
        fixNextUpDownElement(i,retazos[i].getNextUp(),j);
    }
}





