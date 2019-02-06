<template>
  <div class="mb">
    <head-nav title="新闻详情"></head-nav>
    <div class="con ">
      <h2 class="title" v-text="newsDetails.title"></h2>
      <span class="time" v-text="newsDetails.time"></span>
      <span class="source">{{newsDetails.source}}</span>
      <img :src="newsDetails.headpic" alt="" class="pic">
      <div class="content" v-text="newsDetails.content"></div>
      <p class="editor">
        <span>{{newsDetails.reporter}}</span>
        <span>责任编辑: {{newsDetails.editor}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newsDetails: {},
        content: ''
      }
    },
    created() {
      let id = this.$route.query.id
      var url = this.API2 + '/news/ndetail?aid=' + id
      var reg = /[\u4e00-\u9fa5]/gm;


      // 点击对应的新闻 显示对应的详情
      this.$ajax.get(url)
        .then(res => {
          this.newsDetails = res.data.data
          this.newsDetails.content = res.data.data.content.match(reg).join('')
          //截取责任编辑的署名   责任编辑4个字所以索引+4
          this.newsDetails.editor = this.newsDetails.content.substr(this.newsDetails.content.indexOf('责任编辑') + 4)
          this.newsDetails.content = this.newsDetails.content.substring(0, this.newsDetails.content.indexOf('责任编辑'))
          this.newsDetails.content = this.newsDetails.content.substring(0, this.newsDetails.content.indexOf('作者') === -1 ? this.newsDetails.content.length : this.newsDetails.content.indexOf('作者'))
        })
        .catch(err => {
          console.log(err);
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

    .editor {
      display: flex;
      justify-content: space-between;
      color: #9d9ea3;
      font-size: 22/@rem;
    }

  }
</style>
