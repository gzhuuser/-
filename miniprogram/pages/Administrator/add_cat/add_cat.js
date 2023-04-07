// pages/Administrator/add_cat/add_cat.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cat_list: {
            address: "",
            image: "",
            intimacy: "",
            name: "",
            othername: "",
            picture: "",
            status: "未知",
            story: "",
            year: "",
            fileList: []
        },
        fileList: [{
                url: 'https://img.yzcdn.cn/vant/leaf.jpg',
                name: '图片1',
            },
            // Uploader 根据文件后缀来判断是否为图片文件
            // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
            {
                url: 'http://iph.href.lu/60x60?text=default',
                name: '图片2',
                isImage: true,
                deletable: true,
            },
        ]
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

    cat_name(e) {
        this.setData({
            "cat_list.name": e.detail
        })
    },
    cat_otherName(e) {
        this.setData({
            " cat_list.othername": e.detail
        })
    },
    cat_year(e) {
        this.setData({
            "cat_list.year": e.detail
        })
    },
    cat_address(e) {
        this.setData({
            "cat_list.address": e.detail
        })
    },
    cat_intimacy(e) {
        this.setData({
            "cat_list.intimacy": e.detail
        })
    },
    cat_story(e) {
        this.setData({
            "cat_list.story": e.detail
        })
    }
})