<template>
  <div class="mb">
    <head-nav title="图文分享"></head-nav>
    <div class="tabItem">
      <a href="javascript:;" v-for="(item) in photoNav" @click='getImgs(item.tip)' v-text="item.title" :class="item.id==1?'active':''" :key="item.id"></a>
    </div>
    <div class="tabCon">
      <div class="conList" :class="'show'">
        <ul>
          <li v-for="(item) in womanStar" :key="item.id">
            <router-link :to="{name:'photoshare.womandetails',query:{id:item.id,title:item.tip}}">
              <div class="pic ">
                <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
              </div>
              <div class="con ">
                <h2 v-text="item.title"></h2>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="conList">
        <ul>
          <li v-for="(item) in manStar" :key="item.id">
            <router-link :to="{name:'photoshare.mandetails',query:{id:item.id,title:item.tip}}">
              <div class="pic ">
                <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
              </div>
              <div class="con ">
                <h2 v-text="item.title"></h2>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="conList">
        <ul>
          <li v-for="(item) in fullView" :key="item.id">
            <router-link :to="{name:'photoshare.fullviewdetails',query:{id:item.id,title:item.tip}}">
              <div class="pic ">
                <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
              </div>
              <div class="con ">
                <h2 v-text="item.title"></h2>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        photoNav: [],
        womanStar: [],
        manStar: [],
        fullView: [],
        bool: ['womanStar', 'manStar', 'fullView']
      }
    },
    created() {

      // 图文导航请求
      {
        this.$ajax.get('http://tanzhouweb.com/vueProject/vue.php?title=shareNav')
          .then(res => {
            this.photoNav = res.data;

          })
      }
      this.getImgs('womanStar');
    },
    methods: {
      getImgs(title) {

        this.$ajax.get('http://tanzhouweb.com/vueProject/vue.php?title=' + title)
          .then((res) => {
            this[title] = res.data
            this.tabActive()
          })

      },
      tabActive() {

        let aA = document.querySelectorAll('.tabItem a'),
          conList = document.querySelectorAll('.conList')
        for (let i = 0, len = aA.length; i < len; i++) {
          aA[i].index = i
          aA[i].onclick = function () {

            for (let j = 0; j < len; j++) {
              aA[j].classList.remove('active')
              conList[j].style.display = 'none'
            }
            this.classList.add('active')
            conList[this.index].style.display = 'block'
          }
        }


      }
    }
  }
</script>

<style scoped lang="less">
  @rem: 750/10rem;
  .mb {
    margin-bottom: 130/@rem;
  }

  .tabItem {
    font-size: 30/@rem;
    display: flex;


    a {
      flex: 1;
      color: #26a2ff;
      padding: 30/@rem 0;
    }

    a.active {
      border-bottom: 3px solid #26a2ff;
      color: #000;
    }


  }

  .tabCon {
    .conList {
      display: none;

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
        align-items: center;
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

    .conList.show {
      display: block;
    }
  }
</style>
