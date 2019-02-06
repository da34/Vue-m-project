<template>
  <div class="newsList mb">
    <head-nav title="新闻列表"></head-nav>
    <ul>
      <li v-for="(item) in newsList" :key="item.aid">
        <router-link :to='{name:"newsdetail" ,query:{id:item.aid}}'>
          <div class="pic ">
            <img :src="item.headpic" v-lazy="item.headpic" alt="" width="100%" height="100%">
          </div>
          <div class="con ">
            <h2 v-text="item.title"></h2>
            <p>
              <span class="fl" v-text="'回复数:'+item.reply_count"></span>
              <span class="fr">来源 {{item.source}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newsList: [],
        url: [],
      }
    },
    created() {
      let url = this.API2 + '/news/nlist?cid=9'

      this.$jq.get(url)
        .then(res => {
          this.newsList = res.data.list;
        })
        .catch(err => {
          console.log(err);
        })
    },
    mounted() {

    },
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb {
    margin-bottom: 130/@rem;
  }

  .newsList {
    text-align: left;

    ul li {
      padding: 25/@rem 0;
      border-bottom: 1px solid #ddd;
    }

    a {
      /*display: block !important;*/
      display: flex;
      justify-content: center;
    }

    .pic {
      width: 110/@rem;
      height: 110/@rem;
      margin-right: 25/@rem;
    }

    .con {
      width: 550/@rem;
      height: 110/@rem;

      display: flex;
      flex-flow: wrap;
      align-content: space-between;
    }

    h2 {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #555;
      font-weight: normal;
      font-size: 25/@rem;
    }

    p {
      width: 100%;
      color: #999;
      font-size: 22/@rem;
    }

    p span {
      /*-padding: 0 25/@rem;*/
    }
  }
</style>
