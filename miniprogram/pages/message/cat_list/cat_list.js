// pages/index/message/cat_atlas/cat_atlas.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cat: {

        },
        cat_list: {},
        flat: 0,
        id: '',
        status: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this;
        console.log(options.root == 1)
        console.log(options.name)
        if (options.id == undefined) {
            console.log("按名字查询")
            wx.cloud.database().collection('cat_information').where({
                name: options.name
            }).get({
                success(res) {
                    console.log(res)
                    that.setData({
                        cat: res.data,
                        id: options.id
                    })
                    console.log(that.data.cat.picture)
                },
                fail(err) {
                    console.log("调用失败")
                }
            })
            if (options.root == 1) {
                that.setData({
                    flat: 1
                })
            }

        } else {
            wx.cloud.database().collection('cat_information').where({
                _id: '' + options.id
            }).get({
                success(res) {
                    console.log(res)
                    that.setData({
                        cat: res.data,
                        id: options.id
                    })
                    console.log(that.data.cat.picture)
                },
                fail(err) {
                    console.log("调用失败")
                }
            })
            if (options.root == 1) {
                that.setData({
                    flat: 1
                })
            }

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

    clickImg(e) {
        var ImgUrl = this.data.cat[0].picture;
        wx.previewImage({
            urls: ImgUrl,
            current: ImgUrl[e.currentTarget.dataset.index]
        })
    },

    commit: function (e) {
        let that = this
        let db = wx.cloud.database();
        let cat_list = db.collection('cat_information');
        wx.chooseMedia({
            camera: 'back',
            count: 9,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            sizeType: ['original', 'compressed'],
            success(res) {
                //tempFilePaths可以作为图片标签src属性
                const tempFilePaths = res.tempFiles
                console.log("选择成功", res)
                // console.log(tempFilePaths.length, tempFilePaths[0].tempFilePath)
                for (let i = 0; i < tempFilePaths.length; i++) { //多个图片的循环上传
                    wx.cloud.uploadFile({ //上传至微信云存储
                        cloudPath: "cat_list/zhima/" + new Date().getTime() + "_" + Math.floor(Math.random() * 1000) + ".jpg", //使用时间戳加随机数作为上传至云端的图片名称
                        filePath: tempFilePaths[i].tempFilePath, // 本地文件路径
                        success: res => {
                            // 返回文件 ID
                            console.log("上传成功", res.fileID)
                            let picture = that.data.cat.picture
                            let num = picture.length
                            picture.push(res.fileID)
                            that.setData({
                                status: 1
                            }, () => {
                                // console.log(that.data.cat.picture, 1111)
                                wx.cloud.database().collection('cat_information').doc('' + that.data.cat._id).update({
                                        data: {
                                            picture: that.data.cat.picture
                                        }
                                    })
                                    .then(res => {
                                        console.log('更新成功')
                                    })
                                    .catch(res => {
                                        console.log(res)
                                    })
                            })
                        }
                    })
                }

                wx.showToast({
                    title: '上传成功',
                })




            }
        })
    }
})