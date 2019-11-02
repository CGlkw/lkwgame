import Tetirs from "./tetirs.js";
import Block from "./block.js";
import tetirsData from "./tetirs-data.js";


class JTetirs extends Tetirs{
  constructor(width, height, defaultSpeed, center_x, center_y, cooler){
        super(width, height,defaultSpeed);
        this.center_x = center_x;
        this.center_y = center_y;
        this.cooler = cooler;
        this.l_direction = 0;
        this.i = 0;

        this.direction =    [[-1,1,0,1,0,-1],
            [-1,-1,-1,0,1,0],
            [1,-1,0,-1,0,1],
            [1,1,1,0,-1,0]];
    }

    init() {
        this.block_list = [];
        this.l_direction = 0;
        this.block_list.push(new Block(this.center_x -1, this.center_y+1, this.cooler));
        this.block_list.push(new Block(this.center_x , this.center_y +1 , this.cooler));
        //this.block_list.push(new Block(this.center_x, this.center_y, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y - 1, this.cooler));
        this.left_block = this.block_list[0];
        this.right_block = this.block_list[1];
        this.i = 0;
        //$(document).unbind('keydown');
    }


    change(){
        let temp_center_x = this.center_x;
        let temp_center_y = this.center_y;
        if (this.l_direction === 0){
            if( temp_center_x> this.width -2 ){
                temp_center_x= this.width -2
            }
        }else if (this.l_direction === 2){
            if (temp_center_x < 1 ){
                temp_center_x = 1
            }
        }

        if (super.check(this.nextChange(temp_center_x,temp_center_y), tetirsData.data))
            return;
        this.center_x = temp_center_x;
        this.center_y = temp_center_y;
        this.l_direction += 1;
        if (this.l_direction === 4)this.l_direction=0;
        //let nextChange1 = this.nextChange();

    }


    flush(){
        this.getNextBody(this.block_list, this.center_x, this.center_y)
        if (this.l_direction=== 0){
            this.left_block = this.block_list[0];
            this.right_block = this.block_list[1];
        }else if (this.l_direction=== 1){
            this.left_block = this.block_list[1];
            this.right_block = this.block_list[3];
        }else if (this.l_direction=== 2){
            this.left_block = this.block_list[3];
            this.right_block = this.block_list[0];
        }else if (this.l_direction=== 3){
            this.left_block = this.block_list[3];
            this.right_block = this.block_list[0];
        }
    }

    getNextBody(block_list, center_x, center_y, l_direction){
        l_direction = l_direction ===undefined ? this.l_direction : l_direction;
        let a = this.direction[l_direction];
        block_list[0].x = center_x + a[0];   // -1 0
        block_list[0].y = center_y + a[1];
        block_list[1].x = center_x+ a[2];
        block_list[1].y = center_y+ a[3];
        block_list[2].x = center_x ;
        block_list[2].y = center_y ;
        block_list[3].x = center_x + a[4];
        block_list[3].y = center_y + a[5];
    }
}
export default JTetirs;