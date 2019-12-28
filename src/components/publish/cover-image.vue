<template>
  <div class="cover-image">
      <div class="cover-item" v-for="(item,index) of list" :key="index">
          <!-- {{list}} -->
          <img :src="item ? item : defaultImg" alt="">
      </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png')
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
