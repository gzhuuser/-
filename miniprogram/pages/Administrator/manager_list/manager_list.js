// pages/Administrator/manager_list/manager_list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputVal: "",
        inputShowed: '',
        cat_list: []
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

    },

    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },


    hideInput: function () {
        //搜索功能,确认键
        let that = this;
        var db = wx.cloud.database();
        var cat_list = db.collection('cat_information')
        cat_list.where({
            name: db.RegExp({
                regexp: that.data.inputVal,
                options: 'i', //大小写不区分
            })
        }).get().then(res => {
            console.log(res);
            if (res.data.length > 0) {
                that.setData({
                    cat_list: res.data
                })
            } else {
                wx.showToast({ //显示登录成功信息
                    title: '查无此喵',
                })
            }
        }).catch(err => {
            console.log(err);
        })

        this.setData({
            inputVal: "",
            inputShowed: false
        });
        // getList(this);
    },


    clearInput: function () {
        this.setData({
            inputVal: ""
        });
        // getList(this);
    },
    inputTyping: function (e) {
        //搜索数据
        // getList(this, e.detail.value);
        this.setData({
            inputVal: e.detail.value
        });
    },

    aaa: function (e) {
        wx.cloud.database().collection('cat_information').add({
            data: {
                'address': '生活区\n 目击概率90%,剩下5%概率在睡大觉,5%概率在别的地方找乐子',
                'gender': '公',
                'image': "cloud://test-2ghmbb1v589c32c9.7465-test-2ghmbb1v589c32c9-1312200667/cat_list/zhima/zhima1.jpg",
                'intimacy': "多摸摸多抱抱，各种猫粮猫条冻干来多点，逗猫棒越多越好（指已经猎杀了至少六根逗猫棒）。",
                'name': '困困学姐',
                'otherName': '肥麻',
                'picture': [
                    "cloud://test-2ghmbb1v589c32c9.7465-test-2ghmbb1v589c32c9-1312200667/cat_list/zhima/ea5e9188fed49d3dc3e46844ce2257a.jpg",
                    "cloud://test-2ghmbb1v589c32c9.7465-test-2ghmbb1v589c32c9-1312200667/cat_list/zhima/900b0914170e63e5d1fc379ec289825.jpg",
                ],
                'story': "\n \“芝麻公公说不服再战，于是我以单手击之，不料公公面目呆滞，想必是将毕生所学附于蛋上。从此武功全失，哪怕有万种不服，也只得输在我的掌法之下...\”\n\“芝麻嘴里怎么有一根羽毛？”“那是我逗猫棒的头。\”\n“这芝麻真的用生命在玩逗猫棒啊。",
                'year': "两岁大"
            }
        })
    },


    onclick(e) {
        let that = this;
        console.log(e.currentTarget.dataset.index)
        wx.navigateTo({
            url: '../../message/cat_list/cat_list?id=' + e.currentTarget.dataset.index + '&root=1',
            events: e.currentTarget.dataset.index,
            success: (result) => {},
            fail: (res) => {},
            complete: (res) => {},
        })
    }
})