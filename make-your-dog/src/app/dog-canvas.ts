import { min } from "rxjs";
import { DogsService } from "./services/dogs.service";

export class DogCanvas {
    private id : number;

    private movingTimeInFrame : number = 0;
    private moving : boolean = false;

    private maxDegree : number = 15;
    private minDegree : number = 10;

    private rotation : number = 0;
    private rotationIntensity : number = 4;

    private width : number = 200;
    private height: number = 100;
    

    private xVelocity : number = 4; 
    private yVelocity : number = 4;
    

    private maxX: number = 10;
    private maxY : number = 10;


    private xOffset: number = 0;
    private yOffset: number = 0;

    private isSelected : boolean = false;


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
        return Math.random() < 0.5 ? -1 : 1;
    }

    draw() {
        if (this.moving) {
            this.ctx.save();
            this.ctx.translate(this.xOffset, this.yOffset);
            this.ctx.rotate(this.angleInDegrees(this.rotation));
            if (this.rotation > this.maxDegree || this.rotation < -this.maxDegree) {
                this.rotationIntensity = - this.rotationIntensity;
            }
            this.rotation += this.rotationIntensity;
            this.ctx.drawImage(this.imgObject, -this.width / 2, -this.height / 2, this.width, this.height);
            this.ctx.restore();
        } else {
            this.ctx.drawImage(this.imgObject, this.xOffset, this.yOffset, this.width, this.height);
        }
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

        this.reverseDirection();

        if (this.isSelected){
            this.moving = false;
        } else {
            this.move();
        }
    }

    getSize() : {width : number, height : number} {
        return {width : this.width, height : this.height}
    }

    getCoordonates() : {x : number, y : number} {
        return {
            x : this.xOffset,
            y : this.yOffset 
        }
    }


    selectDog() {
        if (this.isSelected === false) {
            this.isSelected = true;
            if (this.moving) {
                
            } 
        }
    }

    deselectDog() {
        this.isSelected = false;

    }


    reverseDirection() {
        if (this.xOffset < this.width || this.xOffset > this.maxX - this.width) {
            this.xVelocity = -this.xVelocity;
        }


        if (this.yOffset < this.height || this.yOffset > this.maxY - this.height) {
            this.yVelocity = -this.yVelocity;
        }
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

    getRandomInRange(min : number, max : number) : number {
        return Math.random() * (max - min + 1) + min;
    }


    sqewAngle() : number {
        return Math.random()*(this.maxDegree - this.minDegree + 1) + this.minDegree;
    }

    move() {
        if (this.moving) {
            if (this.movingTimeInFrame < 1) {
                this.moving = false;
                this.xOffset -= this.width / 2;
                this.yOffset -= this.height / 2;
                this.xVelocity = this.getRandNegativeOrPositive() * this.getRandomInRange(0, 4);
                this.yVelocity = this.getRandNegativeOrPositive() * this.getRandomInRange(0, 4);
                
                this.rotationIntensity = Math.max(((Math.abs(this.xVelocity) + Math.abs(this.yVelocity)) / 2), 2);
                this.rotation = 0;
                console.log(this.rotationIntensity);
            } else {
                this.xOffset += this.xVelocity;
                this.yOffset += this.yVelocity;
                this.movingTimeInFrame -= 1;
            }
        } else if (Math.random() > 0.99 && this.isSelected === false) {
            this.xOffset += this.width / 2;
            this.yOffset += this.height / 2;
            this.moving = true;
            this.movingTimeInFrame = this.getRandomInRange(4, 2) * 60;
        }
    }

 }