import Button from "../button.js";

export default class LeftButton extends Button{
    constructor( x, y, r){
        super();
        this.x = x - 150;
        this.y = y ;
        this.r = r;
        this.strokeStyle = "#ffffff";
        this.fullStyle = "#b4b4b4";
        this.code = 37
    }
    print(ctx) {
        super.print(ctx);
        ctx.moveTo(this.x+5,this.y+12);
        ctx.lineTo(this.x - 10,this.y)
        ctx.lineTo(this.x+5 ,this.y - 12)
        ctx.stroke();
    }

}