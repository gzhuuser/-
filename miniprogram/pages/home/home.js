// pages/index/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        school: [],
        nowSchoolIndex: 0,
        nowShow: {},
        petMessage: [],
        nowPetIndex: 0
    },
    change: function (e) {
        let len = this.data.school.length;
        for (let i = 0; i < len; i++) {
            this.data.school[i].bcolor = "#FFF",
                this.data.school[i].col = "gray"
        }
        let index = e.currentTarget.dataset.index;
        console.log(e);
        this.data.school[index].bcolor = "skyblue";
        this.data.school[index].col = "gold"
        console.log(index)
        this.setData({
            school: this.data.school,
            nowSchoolIndex: index,
            nowPetIndex: 0,
            nowShow: this.data.petMessage[index][0]
        })
    },
    rt: function (e) {
        let that = this
        let count = that.data.nowPetIndex + 1;
        let len = that.data.petMessage.length;
        console.log(that.data.petMessage.length)
        if (count == len) {
            count = 0;
        }
        let list = that.data.petMessage[count];
        that.setData({
            nowShow: list,
            nowPetIndex: count
        })
    },
    lt: function (e) {
        let that = this
        let count = that.data.nowPetIndex - 1;
        let len = that.data.petMessage.length;
        if (count < 0) {
            count = len - 1;
        }
        let list = that.data.petMessage[count];
        that.setData({
            nowShow: list,
            nowPetIndex: count
        })
    },


    btn: function () {
        let that = this;
        let name = that.data.nowShow.name;
        wx.navigateTo({
            url: '/pages/message/cat_list/cat_list?name=' + name,
            events: name,
        })
        console.log(name);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        wx.cloud.database().collection("adoption_cat").get().then(res => {
            console.log(res);
            that.setData({
                petMessage: res.data,
                nowShow: res.data[0],
                nowPetIndex: 0
            })
        }).catch(res => {
            console.log(res);
        })
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
        // wx.showLoading({
        //   title: 'title',
        // })     微信展示提示信息, 最后要用wx.hideLoading()来隐藏
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
})