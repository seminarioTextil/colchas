class Retazo {
    constructor(parent, img, autor, id,feedBack,retazo, audio) {

        this.id=id;



/*
        this.node = document.createElement("figure");
        this.node.className="figure-retazo";


        let image = document.createElement("img");
        image.setAttribute("src", img);
        image.setAttribute("alt", autor);
        image.className="retazo";

        this.node.appendChild(image)

        parent.appendChild(this.node);
*/

this.audio=audio;
        this.feedBack=feedBack;
        this.retazo=retazo;
        this.node = document.createElement("img");
        this.node.setAttribute("src", img);
        this.node.setAttribute("alt", autor);
        this.node.className="retazo";
        this.node.id=id;
this.nextDown=0;
this.nextUp=0;

        parent.appendChild(this.node);

    }



    init(){
        this.node.click(()=>{
            alert('holi')
        })
        const elemRect = this.node.getBoundingClientRect()
        this.originalParentWidth = 1280;
        this.originalWidth=elemRect.width;


            this.node.style.opacity= '0.3';

    }

    getRight(){
        const parent = this.node.parentElement.getBoundingClientRect();
        const elemRect = this.node.getBoundingClientRect()
        return elemRect.right - parent.left
    }

    getBottom(){
        const parent = this.node.parentElement.getBoundingClientRect();
        const elemRect = this.node.getBoundingClientRect()
        return elemRect.bottom - parent.bottom
    }

    getId(){
        return this.getId();
    }

    setLeft(x){
        this.node.style.marginLeft= x+'px';
    }

    setTop(y){
        this.node.style.marginTop= y+'px';
    }

    responsive(){
        const parent = this.node.parentElement.getBoundingClientRect();
        const elemRect = this.node.getBoundingClientRect()
        const x = (parent.width*this.originalWidth)/this.originalParentWidth;
        this.node.style.width= x+'px';
    }

    setNextDown(value){
        this.nextDown=value;
    }
    setNextUp(value){
        this.nextUp=value;
    }

    getNextUp(){
        return this.nextUp
    }

    getNextDown(){
        return this.nextDown;
    }
    getElement(){
        return this.node;
    }

getAudio(){
   return this.audio
}

    getFeedBack(){
        return this.feedBack;
    }
getRetazo(){
        return this.retazo;
}
}