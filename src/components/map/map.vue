<template>
  <div class="mb map " id="map">



  </div>
</template>

<script>
  import AMap from 'AMap'

  export default {
    data() {
      return {
        address: {},
      }
    },
    mounted() {
      var map = map = new AMap.Map('map', {

        // center: [116.43, 39.92],
        resizeEnable: true,


      });



    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb {
    margin-bottom: 130/@rem;
  }

  .map {
    height: 93%;
  }

  .amap-marker-label {
    padding: 10px 20px !important;
    background-color: rgba(255, 255, 255, 0.2) !important;
  }

</style>
