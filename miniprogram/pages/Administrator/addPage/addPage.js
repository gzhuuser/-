// pages/Administrator/manager_activities/AddPage/AddPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgs: [],
        images: [],
        pic: [],
        count: 3,
        TopPic: "",
        flag: 0,
        id: 0
    },
    bindUpload: function (e) {
        switch (this.data.imgs.length) {
            case 0:
                this.data.count = 3
                break
            case 1:
                this.data.count = 2
                break
            case 2:
                this.data.count = 1
                break
        }
        var that = this
        wx.chooseImage({
            count: that.data.count, // 默认3
            sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                that.data.images.push(tempFilePaths[0])
                console.log(that.data.images)
                for (var i = 0; i < tempFilePaths.length; i++) {
                    wx.uploadFile({
                        url: 'https://graph.baidu.com/upload',
                        filePath: tempFilePaths[i],
                        name: "file",
                        header: {
                            "content-type": "multipart/form-data"
                        },
                        success: function (res) {
                            if (res.statusCode == 200) {
                                wx.showToast({
                                    title: "上传成功",
                                    icon: "none",
                                    duration: 1500
                                })


                                that.setData({
                                    imgs: that.data.images
                                })
                                console.log(that.data.imgs)
                            }
                        },
                        fail: function (err) {
                            wx.showToast({
                                title: "上传失败",
                                icon: "none",
                                duration: 2000
                            })
                        },
                        complete: function (result) {
                            console.log(result.errMsg)
                        }
                    })
                }
            }
        })
    },
    // 删除图片
    deleteImg: function (e) {
        var that = this
        wx.showModal({
            title: "提示",
            content: "是否删除",
            success: function (res) {
                if (res.confirm) {
                    that.data.imgs.splice(e.currentTarget.dataset.index, 1)
                    that.data.images.splice(e.currentTarget.dataset.index, 0)
                    console.log(that.data.images)
                    that.setData({
                        imgs: that.data.images
                    })
                } else if (res.cancel) {
                    console.log("用户点击取消")
                }
            }
        })
    },
    bthsub(res) {
        let _id = this.data.id;
        var pics = [];
        var {
            Title,
            remake
        } = res.detail.value;
        var t = res.detail.value.Title;
        var r = res.detail.value.remark
        console.log(res.detail.value)
        var that = this;
        var arr = that.data.images;
        console.log("arr", arr)
        if (t == "" || r == "" || that.data.TopPic == "" || arr.length == 0) {
            wx.showToast({
                title: '标题/内容/列表显示图片/图片不能为空！',
                icon: 'none',
                duration: 2000 //持续的时间
            })
        } else {
            wx.cloud.uploadFile({
                cloudPath: 'activities-images/' + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg",
                filePath: that.data.TopPic,
                success: (res) => {
                    var topPic = res.fileID
                    that.setData({
                        TopPic: topPic
                    })
                }
            })
            for (let i = 0; i < arr.length; i++) {
                wx.cloud.uploadFile({
                    cloudPath: 'activities-images/' + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg",
                    filePath: arr[i],
                    success: (res) => {
                        console.log(res.fileID)
                        pics.push(res.fileID)
                        var pic = that.data.pic
                        pic.push(res.fileID)
                        that.setData({
                            pic: pic
                        })
                        if (pics.length == arr.length && _id == 2) {
                            wx.cloud.database().collection('knowledge').add({
                                data: {
                                    title: t,
                                    inner: r,
                                    image: pics,
                                    topPic: that.data.TopPic
                                }
                            })
                        } else if (pics.length == arr.length && _id == 1) {
                            wx.cloud.database().collection('activities').add({
                                data: {
                                    title: t,
                                    inner: r,
                                    image: pics,
                                    topPic: that.data.TopPic
                                }
                            })
                        }
                    }
                })
            }
            if (arr.length == 0 && _id == 2) {
                wx.cloud.database().collection('knowledge').add({
                    data: {
                        title: t,
                        inner: r,
                        image: pics,
                        topPic: that.data.TopPic
                    }
                })
            } else if (arr.length == 0 && _id == 1) {
                wx.cloud.database().collection('activities').add({
                    data: {
                        title: t,
                        inner: r,
                        image: pics,
                        topPic: that.data.TopPic
                    }
                })
            }
            let pages = getCurrentPages();
            let beforePage = pages[pages.length - 2];
            beforePage.onLoad()

            wx.navigateBack({
                url: '/pages/Administrator/manager_activities/addActivities.js'
            })
        }

    },
    deletepic(e) {
        var that = this
        wx.showModal({
            title: "提示",
            content: "是否删除",
            success: function (res) {
                if (res.confirm) {
                    that.setData({
                        TopPic: "",
                        flag: 0
                    })
                } else if (res.cancel) {
                    console.log("用户点击取消")
                }
            }
        })
    },
    bindUploadPic(e) {
        var that = this
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'https://graph.baidu.com/upload',
                    filePath: tempFilePaths[0],
                    name: "file",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    success: function (res) {
                        if (res.statusCode == 200) {
                            wx.showToast({
                                title: "上传成功",
                                icon: "none",
                                duration: 1500
                            })


                            that.setData({
                                TopPic: tempFilePaths[0],
                                flag: 1
                            })
                        }
                    },
                    fail: function (err) {
                        wx.showToast({
                            title: "上传失败",
                            icon: "none",
                            duration: 2000
                        })
                    },
                    complete: function (result) {
                        console.log(result.errMsg)
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let _id = options.id;
        this.setData({
            id: _id
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})