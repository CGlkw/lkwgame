let tetirsData = {
    init:function (width, height) {
        this.width = width;
        this.height = height;
        this.data = [];
        this.full_data = [];
    },
    push:function (list) {
        for(let key in list){
            let y = list[key].y;
            if (!this.data[y]){
                this.data[y] = [];
            }
            this.data[y][list[key].x] =list[key];
        }
    },
    checkSuccess:function (callback) {
      let score = 0;
      let i = 0
        s:for(let key in this.data){
            for (let k = 0; k <this.data[key].length;k++ ){
                if(!this.data[key][k]){
                    continue s;
                }
                if (k === this.width -1 ) {
                  this.removeLine(parseInt(key));
                  i++;
                  score+=i;
                }
            }
        }
      if (callback) callback(score);
    },
    removeLine(line){
        for (let i = this.data.length -1; i>=0 ; i--){
            if (i<= line ){
                if (i !== 0){
                    if (this.data[i-1]){
                        this.data[i] = this.data[i-1];
                        for (var key in this.data[i]){
                            this.data[i][key].y += 1;
                        }
                    }else{
                        this.data[i] = [];
                        break;
                    }
                }
            }
        }
    }
};
export default tetirsData;