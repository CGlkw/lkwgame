import tetirsData from "./tetirs-data.js";

class Tetirs {
    constructor(width, height,defaultSpeed, center_x, center_y, cooler){
        this.width = width;
        this.height = height;
        this.center_x = center_x;
        this.center_y = center_y;
        this.cooler = cooler;
        this.block_list = [];
        this.l_direction=0;
        this.left_block = null;
        this.right_block = null;
        this.defaultSpeed = defaultSpeed;
        this.speed = defaultSpeed;
    }

    onChange(data,callback, render){
        switch (data) {
            case 37:
                this.moveLeft();
                break;
            case 38:
                this.change();
                break;
            case 39:
                this.moveRight();
                break;
            case 40:
                this.speed = 0.5;
                break;
        }
    }
    onKeyUp(data){
        switch (data) {
            case 40:
              this.speed = this.defaultSpeed;
              break;
        }
    }

    moveLeft(){
        if (this.left_block.x <= 0) return;
        if (this.isExist(tetirsData.data, this.leftBody())) return;
        this.center_x -= 1;
    }

    moveRight(){
        if (this.right_block.x >= this.width-1) return;
        if (this.isExist(tetirsData.data, this.rightBody())) return;
        this.center_x += 1;
    }

    change(){}

    move(callback, render){
        this.center_y += 1;
        if (this.check(this.nextBody(), tetirsData.data)){
            callback();
        }else{
            render();
        }
    }

    nextChange( temp_center_x,temp_center_y){
        let _body_list = this.copy(this.block_list);
        let _l_direction = this.l_direction + 1;
        if (_l_direction === 4)_l_direction=0;
        this.getNextBody(_body_list, temp_center_x, temp_center_y,_l_direction);
        return _body_list;
    }

    rightBody(){
        let right_body_list = this.copy(this.block_list);
        let right_center_x =  this.center_x + 1;
        let right_center_y =  this.center_y;
        this.getNextBody(right_body_list, right_center_x, right_center_y)
        return right_body_list;
    }

    leftBody(){
        let left_body_list = this.copy(this.block_list);
        let left_center_x =  this.center_x - 1;
        let left_center_y =  this.center_y;
        this.getNextBody(left_body_list, left_center_x, left_center_y)
        return left_body_list;
    }

    nextBody(){
        let next_body_list = this.copy(this.block_list);
        let next_center_x =  this.center_x;
        let next_center_y =  this.center_y;
        this.getNextBody(next_body_list, next_center_x, next_center_y)
        return next_body_list;
    }

    flush(){}
    getNextBody(block_list, center_x, center_y, l_direction){}

    check(data, list){
        if (this.isExist(list, data)){
            return true;
        }else if (this.isOnBoot(data)){
            return true;
        }
    }

    isOnBoot(data){
        for(let key in data){
            if (data[key].y >= this.height){
                return true;
            }
        }
    }

    isExist(list, data){
        for (let key in list){
            for (let k in list[key]){
                for (let j in data){
                    if (list[key][k].x === data[j].x && list[key][k].y === data[j].y)
                        return key;
                }
            }
        }
    }

    copy(list) {
        let temp = []
        for (var key in list){
            temp[key] =  Object.assign({}, list[key]);
        }
        return temp;
    }
}
export default Tetirs;