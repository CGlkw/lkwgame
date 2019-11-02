import Button from "../button.js";

export default class DownButton extends Button{
    constructor( x, y, r){
        super();
        this.x = x - 100;
        this.y = y + 30;
        this.r = r;
        this.strokeStyle = "#ffffff";
        this.fullStyle = "#b4b4b4";
        this.code = 40
    }
    print(ctx) {
        super.print(ctx);
        ctx.moveTo(this.x-12,this.y-5);
        ctx.lineTo(this.x,this.y + 10)
        ctx.lineTo(this.x + 12 ,this.y - 5)
        ctx.stroke();
    }
}