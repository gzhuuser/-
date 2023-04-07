//index.js
//获取应用实例
const app = getApp()
let username = ''
let password = ''
Page({
    data: {
        username: '',
        password: '',
        clientHeight: '',
        list: []
    },
    onLoad() {
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                console.log(res.windowHeight)
                that.setData({
                    clientHeight: res.windowHeight
                });
            }
        })
    },
    //协议
    goxieyi() {
        wx.navigateTo({
            url: '/pages/oppoint/oppoint',
        })
    },
    //获取输入款内容
    content(e) {
        this.setData({
            username: e.detail.value
        })

    },
    password(e) {
        this.setData({
            password: e.detail.value
        })
    },
    //登录事件
    login(e) {
        let that = this

        wx.cloud.database().collection("Administrator").get().then(res => {
            console.log("调用成功", res)

            this.setData({
                list: res.data
            })
            for (var i = 0; i < that.data.list.length; i++) {
                if (that.data.username === that.data.list[i].Account) {
                    if (that.data.password === that.data.list[i].password) {

                        wx.showToast({ //显示登录成功信息
                            title: '登陆成功！！',
                            icon: 'success',
                            duration: 2500
                        }).then(res => {
                            wx.navigateTo({
                                url: '../index/index',
                            })
                        })

                    }
                } else {
                    console.log(12, that.data.list[i].Account)
                }
            }
        }).catch(res => {
            console.log("调用失败", res)
        })
    }

})