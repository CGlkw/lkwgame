import TetirsBox from "./tetirs-box.js";
import tetirsData from "./tetirs-data.js";
import DataBus from '../../dataBus.js'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const box = 23;
const dataBus = new DataBus();
export default class TetirsRender{
  constructor(ctx){
    this.ctx = ctx;
    this.width = box * 10;
    this.height = box * 20;    
    this.marginBot = 20
    this.marginLeft = 10
    
    this.x = 0 + this.marginLeft;
    this.y = screenHeight - 62 * 2 - this.height - this.marginBot;
    //首页
    this.mianX = screenWidth / 6
    this.mainY = this.y + 50
    this.mainWidth = screenWidth /6 * 4;
    this.mainHeight = 250
    this.titleName = 'TETIRS'
    this.titleFont = '35px bold 黑体'
    this.init();
    this.isRun = false;
    this.isPause = false;
  }

  init(){
    this.tetirsBox = new TetirsBox(this.width / box, this.height / box);
    this.tetirsBox.init();
    this.render(tetirsData.full_data);
    this.renderMain();
  } 

  start(){
    this.isRun = true;
    this.isPause = false;
    this.tetirsBox.isRunning = true
  }

  reStart() {
    this.isRun = true;
    this.isPause = false;
    this.tetirsBox.init();
    this.tetirsBox.isRunning = true;
  }

  stop(){
    this.isRun = false;
    this.isPause = true;
    this.tetirsBox.isRunning = false
  }

  listen(data){
    if (data.type === 'touchUp') {
      if (data.code === 41) {
        if (this.tetirsBox.isRunning === false) {
          this.start()
        } else {
          this.stop()
        }
      } else if (data.code === 42) {
        this.reStart()
      }
    }
    this.tetirsBox.keyDownListen(data);
  }

  run(){
    if (this.tetirsBox.isRunning){
      this.tetirsBox.run(function () {
        //die 
        this.isRun = false;
        if (dataBus.palyerInfo){
          if (dataBus.palyerInfo.score < this.tetirsBox.score){
            dataBus.palyerInfo.score = this.tetirsBox.score;
            dataBus.updateDbPlayerScore(this.tetirsBox.score)
          }
        }
      }.bind(this), function () {

      });
    };
    
    this.render(tetirsData.full_data)
  }

  render(list) {
    for (let i = 0; i < this.height / box; i++) {
      for (let j = 0; j < this.width / box; j++) {
        if (list[i] && list[i][j]) {
          this.ctx.fillStyle = list[i][j].cooler;
          this.ctx.fillRect(list[i][j].x * box + 1 + this.x, list[i][j].y * box + 1 + this.y, box - 1, box - 1);
        } else {
          this.ctx.fillStyle = "#1d1d1d";
          this.ctx.fillRect(j * box + 1 + this.x, i * box + 1 + this.y, box - 1, box - 1);
        }
      }
    }
    this.tetirsBox.next_tetirs.init()
    let block_list = this.tetirsBox.next_tetirs.block_list;
    this.renderNextTetir(block_list);
    this.renderLevelScore();
    //暂停界面
    if (!this.isRun){
      this.renderMain()
    }
  }

  //暂停界面
  renderMain(){
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.mianX, this.mainY, this.mainWidth, this.mainHeight);
    this.ctx.strokeStyle = "#fff"
    this.ctx.strokeRect(this.mianX+4, this.mainY+4, this.mainWidth-8, this.mainHeight-8)
    this.ctx.strokeRect(this.mianX + 8, this.mainY +8 , this.mainWidth - 16, this.mainHeight - 16)
    this.ctx.font = this.titleFont;
    // 设置颜色
    this.ctx.fillStyle = "#fff";
    // 设置水平对齐方式
    this.ctx.textAlign = "center";
    // 设置垂直对齐方式
    this.ctx.textBaseline = "middle";

    if (this.tetirsBox.isDie){
      //死亡提示
      this.ctx.fillStyle = "#FF6374";
      this.ctx.fillText("GAME OVER", this.mianX + this.mainWidth / 2, this.mainY + 50);
      this.ctx.font = '20px 黑体'
      this.ctx.fillStyle = "#fff";
      this.ctx.fillText("SCORE:", this.mianX + this.mainWidth / 2, this.mainY + 90);
      this.ctx.fillStyle = "#ff0";
      this.ctx.fillText(this.tetirsBox.score, this.mianX + this.mainWidth / 2, this.mainY +110);
      //绘制提示
      this.printRestartBut(this.ctx, this.mianX + this.mainWidth / 2 - 40, this.mainY + this.mainHeight - 45, 10)
      // 绘制文字（参数：要写的字，x坐标，y坐标）
      this.ctx.font = '18px 黑体'
      this.ctx.fillStyle = "#fff";
      this.ctx.textAlign = "left";
      this.ctx.fillText('重新开始', this.mianX + this.mainWidth / 2 - 20, this.mainY + this.mainHeight - 45);
    }else if(this.isPause){
      this.ctx.fillStyle = "#FFF188";
      this.ctx.fillText("PAUSE", this.mianX + this.mainWidth / 2, this.mainY + 50);
      //绘制提示
      this.printStartBut(this.ctx, this.mianX + this.mainWidth / 2 - 40, this.mainY + this.mainHeight - 70, 10)
      // 绘制文字（参数：要写的字，x坐标，y坐标）
      this.ctx.font = '18px 黑体'
      this.ctx.fillStyle = "#fff";
      this.ctx.textAlign = "left";
      this.ctx.fillText('继续游戏', this.mianX + this.mainWidth / 2 - 20, this.mainY + this.mainHeight - 70);
      this.printRestartBut(this.ctx, this.mianX + this.mainWidth / 2 - 40, this.mainY + this.mainHeight - 45, 10)
      // 绘制文字（参数：要写的字，x坐标，y坐标）
      this.ctx.fillText('重新开始', this.mianX + this.mainWidth / 2 - 20, this.mainY + this.mainHeight - 45);
      
    }else{
      // 绘制文字（参数：要写的字，x坐标，y坐标）
      this.ctx.fillText(this.titleName, this.mianX + this.mainWidth / 2, this.mainY + 50);
      //绘制提示
      this.printStartBut(this.ctx, this.mianX + this.mainWidth / 2 - 40, this.mainY + this.mainHeight - 45, 10)
      // 绘制文字（参数：要写的字，x坐标，y坐标）
      this.ctx.font = '18px 黑体'
      this.ctx.textAlign = "left";
      this.ctx.fillText('开始游戏', this.mianX + this.mainWidth / 2 - 20, this.mainY + this.mainHeight - 45);
    }
  }

  renderNextTetir(block_list){
    this.ctx.font = "18px bold 黑体";
    // 设置颜色
    this.ctx.fillStyle = "#fff";
    // 设置水平对齐方式
    this.ctx.textAlign = "center";
    // 设置垂直对齐方式
    this.ctx.textBaseline = "middle";
    // 绘制文字（参数：要写的字，x坐标，y坐标）
    this.ctx.fillText("NEXT:", this.x + this.width +this.marginLeft+30, this.y+10);
    for (let i = 0; i < block_list.length; i++) {
      this.ctx.fillStyle = block_list[i].cooler;
      this.ctx.fillRect((block_list[i].x + 8) * box + 1 + this.x, (block_list[i].y + 4) * box + 1 + this.y, box - 1, box - 1);
    }
  }
  //级别与分数
  renderLevelScore(){
    this.ctx.font = "18px bold 黑体";
    this.ctx.fillStyle = "#fff";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("LEVEL:", this.x + this.width + this.marginLeft + 30, this.y + 10 + 6 * box);
    this.ctx.fillText("SCORE:", this.x + this.width + this.marginLeft + 30, this.y + 10 + 8 * box);
    this.ctx.fillStyle = "#ff0";
    this.ctx.fillText(this.tetirsBox.level, this.x + this.width + this.marginLeft + 30, this.y + 10 + 7 * box);
    this.ctx.fillText(this.tetirsBox.score, this.x + this.width + this.marginLeft + 30, this.y + 10 + 9 * box);
  }
  //绘制开始提示按钮
  printStartBut(ctx,x,y,r) {
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.moveTo(x - r / 4, y +  12 / 20 * r);
    ctx.lineTo(x + r / 2, y)
    ctx.lineTo(x - r / 4, y - 12 / 20 * r)
    ctx.lineTo(x - r / 4, y + 12 / 20 * r)
    ctx.stroke();
  }

  //绘制重新开始提示按钮
  printRestartBut(ctx, x, y, r) {
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.moveTo(x - r / 2, y - r / 2);
    ctx.lineTo(x + r / 2, y + r / 2)
    ctx.moveTo(x + r / 2, y - r / 2)
    ctx.lineTo(x - r / 2, y + r / 2)
    ctx.stroke();
  }

}