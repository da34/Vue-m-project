<template>
  <div class="mb">
    <head-nav title="图片详情"></head-nav>
    <!--<div class="photoImgs">-->
    <!--<img class="preview-img" height="300" :key="index" v-for="(item,index) in picList" :src="item.picUrl" @click="$preview.open(index,picList)"-->
    <!--v-lazy="item.picUrl"/>-->
    <!--</div>-->
    <!--<div style="height: 1000px; background-color: pink;"></div>-->
    <vue-preview
      :list="picList"
      :thumbImageStyle='styleImg'
      :previewBoxStyle="{border: '1px solid #eee'}"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"
    />
  </div>
</template>

<script>
  // import 'photoswipe/dist/photoswipe.css'
  export default {
    data() {
      return {
        picList: [],
        styleImg:{
          height:'300px'
        }
      }
    },
    created() {

      let title = this.$route.query.title,
        id = this.$route.query.id

      this.styleImg.width=this.$jq('html').width()+'px'
      this.$ajax.get('http://tanzhouweb.com/vueProject/vue.php?title=' + title + id)
        .then((res) => {
          this.picList = res.data;
          // console.log(this.picList);
          this.picList.forEach((item, index) => {
            item.src = item.picUrl
            item.w = 1200
            item.h = 900
          })
        })

    },
    methods: {
      // 即将关闭的时候，调用这个处理函数
      closeHandler() {
        console.log('closeHandler')
      },
      // 完全关闭之后，调用这个函数清理资源
      destroyHandler() {
        console.log('destroyHandler')
      }
    }
  }
</script>

<style lang="less">
  @rem: 750/10rem;
  .mb {
    margin-bottom: 130/@rem;
  }

  /* .photoImgs {
     padding: 40/@rem 40/@rem 0;
     background: white;
     position: relative;

     img {
       display: block;
       width: 670/@rem;
       margin-bottom: 30/@rem;
       object-fit: cover;
     }*/
  /*}*/
</style>
