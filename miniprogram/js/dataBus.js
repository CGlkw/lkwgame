
let instance;
wx.cloud.init({
  env: 'dev-lkwgame',
  traceUser: true
})
const db = wx.cloud.database()
const playerTable = db.collection('player');
const _ = db.command
/**
 * 全局状态管理器
 */
export default class DataBus{
  constructor() {
    if (instance)
      return instance

    instance = this
    this.login();
    this.getDbPlayerInfo('')
  }

  getDbPlayerInfo(openid){
    let _this = this;
    playerTable.where({
      _openid: _.eq('123456')
    }).get({
      success:function(res){
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
        //console.log(that.getDbPlayerInfo('123456'))
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