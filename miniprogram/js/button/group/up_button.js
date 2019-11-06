import Button from "../button.js";

export default class UpButton extends Button{
    constructor(x, y, r){
        super();
        this.x = x ;
        this.y = y - r * 1.3;
        this.r = r;
        this.strokeStyle = "#ffffff";
        this.fullStyle = "#b4b4b4";
        this.code = 38
    }

  print(ctx) {
    super.print(ctx);
    ctx.moveTo(this.x - 12 / 20 * this.r, this.y + this.r/4);
    ctx.lineTo(this.x, this.y - this.r/2)
    ctx.lineTo(this.x + 12 / 20 * this.r, this.y + this.r / 4)
        ctx.stroke();
    }
}