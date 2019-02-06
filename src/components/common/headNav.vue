<template>
  <div>
    <header>
      <a href="javascript:;" class="iconfont icon-fanhui2" @click="goBack">
        返回
      </a>
      <span>{{title}}</span>
      <a href="javascript:;" class="iconfont icon-diandian"></a>
    </header>
    <!--
        <mt-header >
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
                {{title}}
            </router-link>

            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
    -->
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: ['title'], // 接收来自父级的参数
    created() {
      //console.log( this.$route.query )

    },
    methods: {
      goBack() {

        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  header {
    height: 100/@rem;
    background: #3c3f41;
    color: white !important;
    font-size: 35/@rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    letter-spacing: 2px;
    text-align: center;
    a {

      /*width: 3rem;*/
      color: white !important;
    }
  }
</style>
