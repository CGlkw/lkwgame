
export default class Button {
  constructor( x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.strokeStyle = "#ffffff";
    this.fillStyle = "#9c9c9c";
    this.defaultFillStyle = "#000000";
    this.isCheck = false;
  }
  print(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    if (this.isCheck) ctx.fillStyle = this.fillStyle;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    if (this.isCheck) ctx.fill();
  }


  isMoveOn(x, y) {
    return Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2) <= Math.pow(this.r, 2)
  }

}