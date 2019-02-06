<template>
  <div>
    <!--<head-nav title="结算购物车"></head-nav>-->

    <div class="shopArea mb">
      <p class="location clearFix" v-if="location">
        <span class="fl">送到地点: {{location}}</span>
        <span class="fr">编辑地址</span>
      </p>
      <div class="shop " v-for="(item,index) in shopList" :key="index">
        <div class="shopShow">
          <div class="pic ">
            <img :src="item.imgUrl" width="100%" height="100%" alt="">
          </div>
          <div class="des ">{{item.des}}</div>
        </div>

        <div class="buyNum ">
          <p class=" buyfont">{{item.symbol}} {{item.price}}</p>
          <p class="addNum ">
            <a href="javascript:;" class="reduce" @click="shopReduce(index)">-</a>
            <a href="javascript:;" class="num">{{item.num}}</a>
            <a href="javascript:;" class="add" @click="shopAdd(index)">+</a>
          </p>
          <a href="javascript:;" class="del" @click="del(index)">删除</a>
        </div>
      </div>
      <div class="totalPrice">
        <!--一共 {{totalPrice.num}} 件, 共计 {{totalPrice.sum}} 元-->
        <!--<div class="all">
            <i></i>
            <span>全选</span>
        </div>-->
        <div class="total">
          <p class="totalMoney">
            <span class="font">总计:</span> <span>￥{{totalPrice.sum}}</span>
          </p>
          <!--<p class="preferential">-->
          <!--总金额￥{totalPrice.sum}} 优惠￥0.00-->
          <!--</p>-->
        </div>
        <div class="goPayment">
          <span class="font">去结算</span><span class="num">{{totalPrice.num}}件</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // country 国家  province 省份 city 城市
  // var city = remote_ip_info['city'];
  //import 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js'
  import shopTools from '../common/shopTools'
  // import bS from '../common/bS'

  export default {
    data() {
      return {
        location: '',
        shopList: [],
        nullArr:[]
      }
    },
    created() {
      let shop = shopTools.getShopDetails(),
        arrKey = Object.keys(shop)    //获取键

      arrKey.forEach((item, index) => {
        this.$ajax.get("http://tanzhouweb.com/vueProject/vue.php?title=likeYou" + item)
          .then(res => {
            this.shopList.push(res.data)
            this.shopList.forEach((item, index) => {
              this.$set(item,'num',shop[item.id])   //要这样设置不然Vue检测不到
            })

          })

      })

      // console.log(this.shopList);
    },
    computed: {
      totalPrice() {   // 总价格
        let num = 0,
          sum = 0

        this.shopList.forEach(item => {
          num += item.num
          sum += item.num * item.price
        })
        return {
          num: num,
          sum: sum
        }
      },

    },
    methods: {
      shopReduce(i) {   //  商品数量减少
        this.shopList[i].num--
        if (this.shopList[i].num <= -1) return
        this.$store.commit('reduceshop')
        shopTools.upData({
          id: this.shopList[i].id,
          num: -1
        })

      },
      shopAdd(i) {     //   商品数量增加
        this.$store.commit('addshop')
        this.shopList[i].num++
        shopTools.upData({
          id: this.shopList[i].id,
          num: 1
        })
      },
      del(i) {
        //删除缓存里面的数据
        shopTools.unShop(this.shopList[i])
        this.$store.state.num -= this.shopList[i].num
        //删除页面的
        this.shopList.splice(i, 1)
      }
    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb {
    margin-bottom: 130/@rem;
  }

  .shopArea {
    text-align: left;
    background: #fff;

    .location {
      font-size: 32/@rem;
      color: #ccc;
      padding: 10/@rem;
      padding: 20/@rem 55/@rem;
    }

    .shop {
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      padding: 0 55/@rem;

      .shopShow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        padding: 25/@rem 0;

        .pic {
          width: 200/@rem;
          height: 200/@rem;
        }

        .des {
          width: 400/@rem;
          font-size: 35/@rem;
        }
      }

      .buyNum {
        border-top: 1px solid #ddd;
        border-left: none;
        border-right: none;
        padding: 20/@rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .buyfont {
          font-size: 40/@rem;
        }

        .addNum {
          font-size: 40/@rem;

          a {
            width: 60/@rem;
            height: 60/@rem;
            background: #f1f1f1;
            display: inline-block;
            color: #878787;
            text-align: center;
          }

          a:active {
            background: #ddd;
          }
        }

        .del {
          color: skyblue;
          font-size: 40/@rem;
        }
      }
    }

    .totalPrice {
      height: 100/@rem;
      text-align: center;
      display: flex;
      justify-content: space-between;
      margin-top: 20/@rem;
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 -1px 2px #d7d7d7;
      /*align-items: center;*/

      .all {

        color: #999;
        font-size: 20/@rem;

        i {
          width: 40/@rem;
          height: 40/@rem;
          border-radius: 50%;
          background: #e93b3d;
        }

        i::after {
          content: '';
        }
      }

      .total {
        text-align: left;
        text-indent: 1em;

        p {
          height: 50%;
          font-size: 32/@rem;
          line-height: 50/@rem;
          color: #999;
        }

        .totalMoney {
          color: #e4393c;
          font-weight: bold;

          .font {
            color: #333;
          }
        }

        .preferential {
          font-size: 18/@rem;
        }
      }

      .goPayment {
        width: 220/@rem;
        background: #e4393c;
        color: #fff;

        span {
          vertical-align: middle;
        }

        .font {
          font-size: 32/@rem;
        }

        .num {
          font-size: 23/@rem;
        }

      }
    }
  }

</style>
