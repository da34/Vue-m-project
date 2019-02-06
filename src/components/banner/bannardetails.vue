<template>
  <div class="mb">
    <head-nav title="banner详情"></head-nav>
    <div class="con">
      <h2 class="title" v-text="bannerDetails.title"></h2>
      <span class="source">{{bannerDetails.source}}</span>
      <span class="time" v-text="bannerDetails.time"></span>
      <img :src="bannerDetails.picUrl" alt="" class="pic">
      <div class="content" v-html="bannerDetails.des"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bannerDetails: {}
      }
    },
    created() {
      // 点击对应的轮播图 显示对应的详情
      let id = this.$route.query.id,
        url = this.API2 + '/news/ndetail?aid=' + id,
        imgReg = /<img.*?(?:>|\/>)/gi, //匹配图片中的img标签
        srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i, // 匹配图片中的src
        reg = /[\u4e00-\u9fa5]/gm;
      this.$ajax.get(url)
        .then(res => {
          this.bannerDetails = res.data.data
          this.bannerDetails.des=this.bannerDetails.content.match(reg).join('')
          //从责任编辑开始删除
          this.bannerDetails.des=this.bannerDetails.des.substring(0,this.bannerDetails.des.indexOf('责任编辑'))
          //找出内容的img标签
          let arr = this.bannerDetails.content.match(imgReg) || ''
          if (!arr) return
          //匹配src
          let src = arr[0].match(srcReg) || ''
          this.$set(this.bannerDetails, 'picUrl', src[1])
        })
    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb {
    margin-bottom: 130/@rem;
  }

  .con {
    padding: 0 40/@rem;

    h2 {
      text-align: left;
    }

    .title {
      font-size: 40/@rem;
      color: #3f4146;
    }

    .source {
      font-size: 24/@rem;
    }

    .time {
      font-size: 20/@rem;
    }

    .pic {
      display: block;
      margin: auto;
      width: 670/@rem;
    }

    .content {
      font-size: 32/@rem;
      text-align: left;
      text-indent: 2em;
      line-height: 2em;
    }

  }
</style>
