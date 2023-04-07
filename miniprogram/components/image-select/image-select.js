// components/image-select/image-select.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //临时图片路径
        aimgur1: 'cloud://test-2ghmbb1v589c32c9.7465-test-2ghmbb1v589c32c9-1312200667/image/35_xk.png',
        //可选图片剩余数量
        countIndex: 3,
        //上传的图片数据
        imageData: [],
        apiKey: "Kp3CR5fNNWGGZLBDOmq8blsl",
        secretKey: 'tqKPfysBY89HdG32WwwdgHqPnsG05ZdB',
        baseImg: "",
        results: {}
    },
    // 
    browse: function (e) {
        let that = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#CED63A",
            success: function (res) {
                if (!res.cancel) {
                    if (res.tapIndex == 0) {
                        that.chooseWxImage('album');
                    } else if (res.tapIndex == 1) {
                        that.chooseWxImage('camera');
                    }
                }
            }
        })
    },
    // 打开相册，相机
    chooseWxImage: function (type) {
        let that = this;
        wx.chooseImage({
            count: that.data.countIndex,
            sizeType: ['original', 'compressed'],
            sourceType: [type],
            success: function (res) {
                //选择图片后完成确认操作
                that.setData({
                    aimgur1: res.tempFilePaths,
                });
                that.base64(res.tempFilePaths)
            }
        })
    },
    base64: function (filePath) {
        //全局文件管理器
        var obj = wx.getFileSystemManager();
        //利用上面读文件内容
        console.log(filePath)
        obj.readFile({
            filePath: filePath[0],
            encoding: "base64",
            success: res => {
                console.log(res.data);
                this.get_token(res.data);
            },
            fail: res => {
                console.log(123)
            }
        })
    },
    //获取百度access_token
    get_token: function (base64I) {
        wx.request({
            url: 'https://aip.baidubce.com/oauth/2.0/token',
            //请求方式
            method: "get",
            //请求参数
            data: {
                grant_type: "client_credentials",
                client_id: 'Kp3CR5fNNWGGZLBDOmq8blsl',
                client_secret: 'tqKPfysBY89HdG32WwwdgHqPnsG05ZdB'
            },
            //返回数据格式
            dataType: "json",
            success: res => {
                console.log(res.data.access_token)
                this.recognition_img(res.data.access_token, base64I)
            },
            fail: res => {
                console.log(123)
            }
        })
    },
    recognition_img: function (token, base64I) {
        wx.request({
            url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/animal?access_token=' + token,
            method: "POST",
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                image: base64I,
                baike_num: 6
            },
            success: res => {
                this.setData({
                    results: res.data.result
                })
                console.log(this.data.results)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})