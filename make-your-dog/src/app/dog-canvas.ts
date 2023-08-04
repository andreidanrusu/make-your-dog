export class DogCanvas {
    private width : number = 200;
    private height: number = 100;
    

    private xVelocity : number = 4;
    private yVelocity : number = 4;
    

    private maxX: number = 10;
    private maxY : number = 10;


    private xOffset: number = 0;
    private yOffset: number = 0;



    private ctx : CanvasRenderingContext2D;
    private imageURL : string;
    private imgObject = new Image();

    constructor(maxX : number, maxY : number, initialX : number, initialY : number, ctx:CanvasRenderingContext2D, image : string) {
        this.xOffset = initialX;
        this.yOffset = initialY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.ctx = ctx;
        this.imageURL = image;
        this.convertDataURLToImg();
    }

    draw() {
        this.ctx.drawImage(this.imgObject, this.xOffset, this.yOffset, this.width, this.height);
    }

    convertDataURLToImg() {
        this.imgObject.onload = () => {
            console.log('loaded');
        };

        this.imgObject.onerror = (error) => {
            console.error('Error loading img',error);
        }

        this.imgObject.src = this.imageURL;
        
    }

    update() {
        if (this.xOffset < this.width || this.xOffset > this.maxX - this.width) {
            this.xVelocity = -this.xVelocity;
        }

        if (this.yOffset < this.height || this.yOffset > this.maxY - this.height) {
            this.yVelocity = -this.yVelocity;
        }

        console.log(this.xOffset);
        this.xOffset += this.xVelocity;
        this.yOffset += this.yVelocity;

        this.draw();

    }
}