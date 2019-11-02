import Buttons from './button/index.js'
import TetirsRender from './game/tetirs/tetirs-render.js'
import DataBus from './dataBus.js'
let sysInfo = wx.getSystemInfoSync(), width = sysInfo.windowWidth, height = sysInfo.windowHeight;

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

//canvas.style.width = width + "px";
//canvas.style.height = height + "px";
canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;

let ctx   = canvas.getContext('2d')
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
wx.cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  env: 'dev-lkwgame',
  traceUser: true
})
const db = wx.cloud.database()
const dataBus = new DataBus();
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0
    this.personalHighScore = null
    let _this = this;
  
 
    this.timeId;
    this.buts = new Buttons(ctx);
    this.game = new TetirsRender(ctx);
    this.start()
  }
  


  start(){
    this.buts.addListen(function(data){
      this.game.listen(data)
    }.bind(this))
    this.bindLoop = this.loop.bind(this)
    //启动游戏帧循环
    this.timeId = window.requestAnimationFrame(this.bindLoop)
  }
  // 实现游戏帧循环
  loop() {
    this.render();
    this.timeId = window.requestAnimationFrame(this.bindLoop);
  }
  //渲染
  render(){
    ctx.clearRect(0, 0, screenWidth, screenHeight)
    this.renderPayerInfo()
    this.buts.reprint();
    this.game.run();
  }

  renderPayerInfo(){
    if (dataBus.palyerInfo && dataBus.palyerInfo.imageDate){
      ctx.save() //保存上下文
      ctx.beginPath()//开始绘制
      ctx.arc(screenWidth / 10, screenHeight / 7, 24, 0, 2 * Math.PI, false)//画一个圆
      ctx.clip()//裁剪这个圆
      ctx.drawImage(dataBus.palyerInfo.imageDate, screenWidth / 10 - 25, screenHeight / 7 - 25, 50, 50)
      ctx.restore()//恢复上下文  接下来可以进行其他绘制操作
      ctx.font = "25px bold 黑体";
      // 设置颜色
      ctx.fillStyle = "#fff";
      // 设置水平对齐方式
      ctx.textAlign = "left";
      // 设置垂直对齐方式
      ctx.textBaseline = "middle";
      // 绘制文字（参数：要写的字，x坐标，y坐标）
      ctx.fillText(dataBus.palyerInfo.nickName, screenWidth / 10 + 30, screenHeight / 7 + 10);
      ctx.font = "18px bold 黑体";
      ctx.textAlign = "right";
      ctx.fillText('最高分：', screenWidth / 10 * 8 , screenHeight / 7 + 10);
      ctx.textAlign = "left";
      ctx.fillStyle = "#ff0";
      ctx.fillText(dataBus.palyerInfo.score, screenWidth / 10 * 8, screenHeight / 7 + 10);
    }
    
  }

  stop(){
    window.cancelAnimationFrame(this.timeId);
  }

  
}
