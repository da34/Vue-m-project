<template>
  <div class="mb">
    <head-nav title="H5课程"></head-nav>
    <div id='write'>
      <img src="../../assets/my.jpg" alt="" height=150>
      <p>玉捷</p>
      <p>一个刚接触vue的小白</p>
      <p>本项目存在许多bug,请多包涵</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb {
    margin-bottom: 130/@rem;

  }

  #write {
    /*background-color: #15131E;*/
    margin: 150/@rem;

    p {
      font-size: 30/@rem;
      line-height: 50/@rem;
      color: rgba(128, 118, 212, 1);
    }

    img {
      border-radius: 50%;
    }
  }
</style>
