import Button from "../button.js";

export default class EndButton extends Button {
  constructor(x, y, r) {
    super();
    this.x = x + 120;
    this.y = y;
    this.r = r;
    this.strokeStyle = "#ffffff";
    this.fullStyle = "#b4b4b4";
    this.code = 42
  }

  print(ctx) {
    super.print(ctx);
    ctx.moveTo(this.x - this.r / 2, this.y - this.r / 2);
    ctx.lineTo(this.x + this.r / 2, this.y + this.r / 2)
    ctx.moveTo(this.x + this.r / 2, this.y - this.r / 2)
    ctx.lineTo(this.x - this.r / 2, this.y + this.r / 2)
    ctx.stroke();
  }
}