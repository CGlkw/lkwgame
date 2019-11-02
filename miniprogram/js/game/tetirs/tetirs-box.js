import ITetirs from "./i-tetirs.js";
import OTetirs from "./o-tetirs.js";
import tetirsData from "./tetirs-data.js";
import TTetirs from "./t-tetirs.js";
import LTetirs from "./l-tetirs.js";
import JTetirs from "./j-tetirs.js";
import ZTetirs from "./z-tetirs.js";
import STetirs from "./s-tetirs.js";

class TetirsBox {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.key_lock = true;
        this.defaultSpeed = 20;
        this.i = 0;
        this.isRunning = false;
        this.isDie = false;
        this.score = 0;
        this.level = 1;
    }

    init() {
        tetirsData.data = [];
        tetirsData.full_data = [];
        this.key_lock = true;
        this.defaultSpeed = 20;
        this.i = 0;
        this.score = 0;
        this.isRunning = false;
        this.isDie = false;
        this.show_tetirs = null;
        this.next_tetirs = this.getNextTetirs();
        
        tetirsData.init(this.width,this.height);
    }

    keyDownListen(data){
      if(!this.isRunning)return;
        let _this = this;
      if (data.type === 'touchOn' ){
          if (!_this.key_lock) {
            this.lock = true;
            _this.show_tetirs.onChange(data.code);
          }
      } else if (data.type === 'touchUp'){
          if (!_this.key_lock) {
            this.lock = true;
            _this.show_tetirs.onKeyUp(data.code);
          }
        }
    }

    run(die, render){
        let _this = this;
        this.i += 1;
        if (this.show_tetirs == null) {
          _this.show_tetirs = _this.next_tetirs;
          _this.next_tetirs = _this.getNextTetirs();
          _this.show_tetirs.init();
        }
        if (this.i > this.show_tetirs.speed) {
            this.lock = true;
            this.show_tetirs.move(function () {
                tetirsData.push(_this.show_tetirs.block_list)
                if (tetirsData.data[-1]!==undefined){
                  _this.isRunning = false;
                  _this.isDie = true;
                  if(die)die()
                }
                tetirsData.checkSuccess(function(data){
                  _this.score += data;
                  wx.vibrateShort()//震动
                  _this.flushLevel();
                });
                _this.show_tetirs = _this.next_tetirs;
                _this.next_tetirs = _this.getNextTetirs();
                _this.show_tetirs.init();
            }, function () {
                _this.flush();
                render();
            });
            this.i = 0;
        }else{
            this.flush();
            render();
        }
    }

    flushLevel(){
      if(this.score > 100 && this.score < 200){
        this.level = 2;
        this.defaultSpeed = 15;
      } else if (this.score >= 200 && this.score < 500){
        this.level = 3;
        this.defaultSpeed = 13;
      } else if (this.score >= 500 && this.score < 1000) {
        this.level = 4;
        this.defaultSpeed = 10;
      } else if (this.score >= 1000 && this.score < 2000) {
        this.level = 5;
        this.defaultSpeed = 8;
      } else if (this.score >= 2000 && this.score < 5000) {
        this.level = 6;
        this.defaultSpeed = 6;
      } else if (this.score >= 5000 && this.score < 10000) {
        this.level = 7;
        this.defaultSpeed = 5;
      } else if (this.score >= 10000 ) {
        this.level = 8;
        this.defaultSpeed = 3;
      }
    }

    flush(){
        this.show_tetirs.flush();
        tetirsData.full_data = [];
        for (let key in tetirsData.data){
            for (let k in tetirsData.data[key]){
                if (!tetirsData.full_data[key]){
                    tetirsData.full_data[key] = [];
                }
                tetirsData.full_data[key][k] =tetirsData.data[key][k];
            }
        }
        for (let key in this.show_tetirs.block_list){
            if (this.show_tetirs.block_list[key].y >= 0){
                let y1 = this.show_tetirs.block_list[key].y;
                if (!tetirsData.full_data[y1]){
                    tetirsData.full_data[y1] = [];
                }
                tetirsData.full_data[y1][this.show_tetirs.block_list[key].x] =this.show_tetirs.block_list[key];
            }
        }
        this.key_lock = false;
    }

    getNextTetirs(){
      let number = Math.floor(Math.random() * 7);
        switch (number) {
            case 0:
              return new ITetirs(this.width, this.height, this.defaultSpeed, 4, -2, '#00fcff');
            case 1:
              return new OTetirs(this.width, this.height, this.defaultSpeed, 4, -2, '#feff51');
            case 2:
              return new TTetirs(this.width, this.height, this.defaultSpeed, 4, -2, '#8432ff');
            case 3:
              return new LTetirs(this.width, this.height, this.defaultSpeed, 4, -2, '#ffd125');
            case 4:
              return new JTetirs(this.width, this.height, this.defaultSpeed, 4, -2, '#243cff');
            case 5:
              return new ZTetirs(this.width, this.height, this.defaultSpeed, 4, -2, '#ff3538');
            case 6:
              return new STetirs(this.width, this.height, this.defaultSpeed, 4, -2, '#2eff41');
        }
    }
}

export default TetirsBox;