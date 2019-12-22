<template>
<!-- <div><img :src="defaultImg" alt="" width="100%"></div> -->
<!-- 如果想要把一个动态变量给img 相对地址无法显示 固定地址可以 需要先把图片转换成一个变量 -->
<!-- 方法是 require(相对地址) 赋值给一个变量-->
<div class="demo-image__lazy">
  <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
</div>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/background-home.jpg'),
      urls: [

        'http://img4.xiazaizhijia.com/walls/20160121/1440x900_ccbf03d990617ca.jpg',
        'http://pic.netbian.com/uploads/allimg/180417/174216-1523958136a79f.jpg',
        'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1305/21/c0/21161039_1369122792797.jpg',
        'http://img2.xiazaizhijia.com/walls/20151230/1440x900_62a888f383e71ae.jpg',
        'https://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/8d5494eef01f3a29223c63eb9d25bc315c607c1a.jpg',
        'https://imgstatic.ctfile.com/upload/portal/879674/MfEl1hE0/20170317-1489716566501250.jpg',
        'http://img.article.pchome.net/01/74/96/17/pic_lib/wm/7.jpg',
        'http://img1.xiazaizhijia.com/walls/20160314/1366x768_ac117ef62c49119.jpg',
        'http://img2.xiazaizhijia.com/walls/20160329/1440x900_491b08d27b3fb54.jpg',
        'https://desk-fd.zol-img.com.cn/t_s1280x800c5/g5/M00/02/06/ChMkJlbKynSIIVfzAALNn_lMp3cAALIcABlkKgAAs23604.jpg'

      ]
    }
  }

}
</script>

<style lang='less' scoped>
 div{
     height: 80vh;
     opacity: .8;
    //  background-image: url('../../assets/img/background-home.jpg');
 }
</style>
