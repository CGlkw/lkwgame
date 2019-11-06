import UpButton from "./group/up_button.js";
import DownButton from "./group/down_button.js";
import RightButton from "./group/right_button.js";
import LeftButton from "./group/left_button.js";
import StartButton from "./group/start_button.js";
import EndButton from "./group/end_button.js";


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const dpr = window.devicePixelRatio /2;
export default class Buttons {
  constructor(ctx) {
    this.ctx = ctx;
    this.centerX = screenWidth / 2;
    this.centerY = screenHeight - screenHeight / 10;
    this.r = screenWidth * 30 / 375;
    this.width = screenWidth;
    this.height = screenHeight / 5;
    this.x = 0;
    this.y = screenHeight - this.height;
    this.buttons = [];
    this.init();
    this.initEvent();
  }

  init() {
    let c_x = this.centerX - screenWidth * 100 / 375;
    let c_y = this.centerY 
    let upButton = new UpButton(c_x, c_y, this.r);
    let downButton = new DownButton(c_x, c_y, this.r);
    let rightButton = new RightButton(c_x, c_y, this.r);
    let leftButton = new LeftButton(c_x, c_y, this.r);
    let startButton = new StartButton(this.centerX, this.centerY, this.r);
    let endButton = new EndButton(this.centerX, this.centerY, this.r);
    this.buttons.push(upButton);
    this.buttons.push(downButton);
    this.buttons.push(rightButton);
    this.buttons.push(leftButton);
    this.buttons.push(startButton);
    this.buttons.push(endButton);
    this.reprint();
  }

  addListen(callback){
    this.callback = callback
  }

  listenBack(data){
    if(this.callback){
      this.callback(data)
    }
  }

  reprint(){
    for (let key in this.buttons) {
      this.buttons[key].print(this.ctx)
    }
  }

  initEvent() {
    let _this = this
    wx.onTouchStart(function(e){
   
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      for (let key in _this.buttons) {
        if (_this.buttons[key].isMoveOn(x, y)) {
          _this.buttons[key].isCheck = true;
          wx.vibrateShort()//震动
          _this.listenBack({
            type: 'touchOn', code: _this.buttons[key].code
          })
        }
      }
    })

    wx.onTouchMove(function (e){
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      for (let key in _this.buttons) {
        if (_this.buttons[key].isCheck) {
          if (!_this.buttons[key].isMoveOn(x, y)) {
            _this.buttons[key].isCheck = false;
            wx.vibrateShort()//震动
            _this.listenBack({
              type: 'touchUp', code: _this.buttons[key].code
            })
          }
        }
      }
    })

    wx.onTouchEnd(function (e){
        let x = e.changedTouches[0].clientX
        let y = e.changedTouches[0].clientY
      for (let key in _this.buttons) {
          if (_this.buttons[key].isCheck) {
            if (_this.buttons[key].isMoveOn(x, y)) {
              _this.buttons[key].isCheck = false;
              _this.listenBack({
                type: 'touchUp', code: _this.buttons[key].code
              })
            }
          }
        }
  })
  }

}