<template>
  <div class="cover-image">
      <!-- 封面生成 -->
      <div @click="openDialog(index)" class="cover-item" v-for="(item,index) of list" :key="index">
          <!-- {{list}} -->
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 放置一个弹层 -->
      <el-dialog
        @close="closeDialog"
        :visible="dialog"
        width="30%">
        <!-- 父组件 用方法接收 -->
        <select-image @selectImg="reciveImg"></select-image>
        <!-- 放置另外的组件 -->
        </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialog: false, // 控制弹层
      selectIndex: -1// 用来存储点击的封面的下标
    }
  },
  methods: {
    reciveImg (url) { // 第一次传递接收的url
      // 接收方法 因为只能读取不能修改 需进一步子传父找到能够修改的
      // alert('接收到参数' + url)
      this.$emit('selectTwo', url, this.selectIndex)
      this.closeDialog()
    },
    openDialog (index) { // 记录index 把index存储 然后赋值 用来传递 确定是点击的哪个封面 因为封面图片是个数组
      this.dialog = true
      this.selectIndex = index // 记录当前点击的是哪个封面图片
    },
    closeDialog () {
      this.dialog = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image{
    display: flex;
    .cover-item{
border: 1px solid #ccc;
height: 230px;
width: 230px;
text-align: center;
margin-right: -1px;
margin-bottom: 50px;
img{
    width: 100%;
    height: 100%;
}
    }
}

</style>
