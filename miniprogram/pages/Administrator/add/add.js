// pages/Administrator/manager_activities/addActivities.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activities: [],
        id: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.id)
        if (options.id == 1) {
            wx.cloud.database().collection('activities').get({
                success: (res) => {
                    console.log("res.data", res.data)
                    this.setData({
                        activities: res.data,
                        id: 1
                    })

                }
            })
            console.log("activities", this.data.activities)
        } else if (options.id == 2) {
            wx.cloud.database().collection('knowledge').get({
                success: (res) => {
                    console.log("res.data", res.data)
                    this.setData({
                        activities: res.data,
                        id: 2
                    })

                }
            })
            console.log("activities", this.data.activities)
        }

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
    delete(e) {
        let id = this.data.id;
        var that = this;
        if (that.data.activities[e.currentTarget.dataset.index].title === undefined) {
            that.data.activities[e.currentTarget.dataset.index].title = ' ';
        }
        wx.showModal({
            title: '提示',
            content: '是否删除' + that.data.activities[e.currentTarget.dataset.index].title,
            success: res => {
                console.log("index", e.currentTarget.dataset.index)
                if (res.confirm && id == 1) {
                    wx.cloud.database().collection('activities').doc(that.data.activities[e.currentTarget.dataset.index]._id).remove({
                        success: res => {
                            console.log('删除成功')
                            for (let i = 0; i < that.data.activities[e.currentTarget.dataset.index].image.length; i++) {
                                wx.cloud.deleteFile({
                                    fileList: [that.data.activities[e.currentTarget.dataset.index].image[i]]
                                })
                            }
                            wx.cloud.deleteFile({
                                fileList: [that.data.activities[e.currentTarget.dataset.index].topPic]
                            })
                            let arr = that.data.activities;
                            arr.splice(e.currentTarget.dataset.index, 1)
                            console.log("arr", arr)
                            this.setData({
                                activities: arr
                            })
                        }
                    })
                } else if (res.confirm && id == 2) {
                    wx.cloud.database().collection('knowledge').doc(that.data.activities[e.currentTarget.dataset.index]._id).remove({
                        success: res => {
                            console.log('删除成功')
                            for (let i = 0; i < that.data.activities[e.currentTarget.dataset.index].image.length; i++) {
                                wx.cloud.deleteFile({
                                    fileList: [that.data.activities[e.currentTarget.dataset.index].image[i]]
                                })
                            }
                            wx.cloud.deleteFile({
                                fileList: [that.data.activities[e.currentTarget.dataset.index].topPic]
                            })
                            let arr = that.data.activities;
                            arr.splice(e.currentTarget.dataset.index, 1)
                            console.log("arr", arr)
                            this.setData({
                                activities: arr
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('取消')
                }
            }
        })
    },


    handleJump: function () {
        console.log('跳转事件被触发')
    }
})