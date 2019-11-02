import Tetirs from "./tetirs.js";
import Block from "./block.js";
import tetirsData from "./tetirs-data.js";

class OTetirs extends Tetirs{
  constructor(width, height, defaultSpeed, center_x, center_y, cooler){
        super(width, height,defaultSpeed);
        this.center_x = center_x;
        this.center_y = center_y;
        this.cooler = cooler;
        this.i = 0;
    }

    init() {
        this.block_list = [];
        this.block_list.push(new Block(this.center_x, this.center_y, this.cooler));
        this.block_list.push(new Block(this.center_x, this.center_y + 1, this.cooler));
        this.block_list.push(new Block(this.center_x - 1, this.center_y + 1, this.cooler));
        this.block_list.push(new Block(this.center_x - 1, this.center_y , this.cooler));
        this.left_block = this.block_list[2];
        this.right_block = this.block_list[1];
        this.i = 0;
    }

    flush(){
        this.getNextBody(this.block_list, this.center_x, this.center_y)
    }

    getNextBody(block_list, center_x, center_y){
        block_list[0].x = center_x;
        block_list[0].y = center_y;
        block_list[1].x = center_x;
        block_list[1].y = center_y +1;
        block_list[2].x = center_x -1;
        block_list[2].y = center_y + 1;
        block_list[3].x = center_x -1;
        block_list[3].y = center_y ;
    }
}

export default OTetirs;