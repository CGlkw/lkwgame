
let instance;
wx.cloud.init({
  env: 'dev-lkwgame',
  traceUser: true
})
const db = wx.cloud.database()
const playerTable = db.collection('player');
/**
 * 全局状态管理器
 */
export default class DataBus{
  constructor() {
    if (instance)
      return instance

    instance = this
    this.login();
    
  }

  getDbPlayerInfo(openid){
    let _this = this;
    playerTable.where({
      _openid: openid
    }).get({
      success:function(res){
        console.log(res);
        if(res.data.length < 1){
          _this.addDbUserInfo();
        }else{
          _this.palyerInfo.id = res.data[0]._id;
          _this.palyerInfo.score = res.data[0].score === 0 ? '0' : res.data[0].score
        }
      }
    })
  }

  updateDbPlayerScore(_score){
    let _this = this;
    if (!_this.palyerInfo.id){
      this.getOpenid();
    }
    console.log(_this.palyerInfo.id)
    playerTable.doc(_this.palyerInfo.id).update({
      data:{
        score : _score
      },
      success:res =>{
        console.log(res)
      }
    })
  }

  addDbUserInfo(){
    let _this = this;
    playerTable.add({
      data: _this.palyerInfo,
      success: function (res) {
        console.log(res)
        _this.palyerInfo.id = res.data[0]._id;
      }
    })
  }

  login(){
    let _this = this;
    wx.getUserInfo({
      success: function (res) {
        _this.palyerInfo = res.userInfo;
        _this.loadImage(res.userInfo.avatarUrl);
        _this.getOpenid();
        
      }
    })
  }
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        that.palyerInfo.openid = res.result.openid
        that.getDbPlayerInfo(that.palyerInfo.openid)
      }
    })
  }
  loadImage(imageURL) {
    let _this = this;
    return new Promise((resolve, reject) => {
      const image = wx.createImage();
      image.onload = () => {
        _this.palyerInfo.imageDate = image;
      }
      image.onerror = (e) => {
        console.log(e);
        const error = new RES.ResourceManagerError(1001, imageURL);
        reject(error);
      }
      image.src = imageURL;

    })
  }
}