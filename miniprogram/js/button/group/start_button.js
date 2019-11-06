import Button from "../button.js";

export default class StartButton extends Button {
  constructor(x, y, r) {
    super();
    this.x = x + 50;
    this.y = y;
    this.r = r;
    this.strokeStyle = "#ffffff";
    this.fullStyle = "#b4b4b4";
    this.code = 41
  }

  print(ctx) {
    super.print(ctx);
    ctx.moveTo(this.x - this.r / 4, this.y + 12 / 20 * this.r);
    ctx.lineTo(this.x + this.r / 2, this.y)
    ctx.lineTo(this.x - this.r / 4, this.y - 12 / 20 * this.r)
    ctx.lineTo(this.x - this.r / 4, this.y + 12 / 20 * this.r)
    ctx.stroke();
  }
}