export class GrassBlade {
    private ctx : CanvasRenderingContext2D;
    private xOffset : number;
    private yOffset : number;
    private height : number = 40;
    private width : number = 80;
    private image = new Image();


    constructor(x : number, y : number,context : CanvasRenderingContext2D) {
        this.xOffset = x;
        this.yOffset = y;
        this.image.src = '../assets/pictures/grass_blade.png';
        this.image.onload = this.loaded; 
        this.ctx = context;
    }

    loaded() {
        console.log('loaded')
    }

    draw() {
        this.ctx.drawImage(this.image, this.xOffset, this.yOffset, this.width, this.height);
    }
}