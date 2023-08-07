export class DogCanvas {
    private id;

    private rotation : number = 2;
    private rotationIntensity : number = 4;

    private width : number = 200;
    private height: number = 100;
    

    private xVelocity : number = 5;
    private yVelocity : number = 5;
    

    private maxX: number = 10;
    private maxY : number = 10;


    private xOffset: number = 0;
    private yOffset: number = 0;



    private ctx : CanvasRenderingContext2D;
    private imageURL : string;
    private imgObject = new Image();

    constructor(id : number,maxX : number, maxY : number, initialX : number, initialY : number, ctx:CanvasRenderingContext2D, image : string) {
        this.id = id;

        this.xVelocity = this.getRandNegativeOrPositive() * this.xVelocity;
        this.yVelocity = this.getRandNegativeOrPositive() * this.yVelocity;


        this.xOffset = initialX;
        this.yOffset = initialY;


        this.maxX = maxX;
        this.maxY = maxY;


        this.ctx = ctx;

        this.imageURL = image;
        this.convertDataURLToImg();
    }

    getRandNegativeOrPositive() : number {
        return (Math.random() * 2) - 1;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.xOffset, this.yOffset);
        this.ctx.rotate(this.angleInDegrees(this.rotation));
        if (this.rotation > 50 || this.rotation < -50) {
            this.rotationIntensity = - this.rotationIntensity;
        }
        this.rotation += this.rotationIntensity;
        this.ctx.drawImage(this.imgObject, 0, 0, this.width, this.height);
        this.ctx.restore();
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
        this.draw();

        if (this.xOffset < this.width || this.xOffset > this.maxX - this.width) {
            this.xVelocity = -this.xVelocity;
        }


        if (this.yOffset < this.height || this.yOffset > this.maxY - this.height) {
            this.yVelocity = -this.yVelocity;
        }

        this.xOffset += this.xVelocity;
        this.yOffset += this.yVelocity;


    }

    getId() : number {
        return this.id;
    }

    changeCanvasSize(newHeight: number, newWidth : number) {
        this.maxX = newWidth;
        this.maxY = newHeight;
    } 

    angleInDegrees(degrees : number) : number {
        return (degrees * Math.PI) / 180;
    }
 }