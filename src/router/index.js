import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'


//导入Axios
import Axios from 'axios'
// Axios.defaults.baseURL = 'http://tanzhouweb.com/vueProject'
Vue.prototype.API1='/api1'
Vue.prototype.API2='/api2'

Vue.prototype.dataURL = function (file,title,id) {
  id = (id === undefined)?'':id;
  return file+'?title='+title+id;
}
Vue.prototype.dataURL = function (file, title, id) {
  id = (id === undefined) ? '' : id;
  return file + '?title=' + title;
}

Vue.prototype.$ajax = Axios

import VuePreview from 'vue2-preview'
Vue.use(VuePreview)


//导入Mint-ui组件
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(Mint)
//导入Jq组件
import jq from 'jquery'
import photolist from "../components/photoshare/photolist";
import newslist from "../components/news/newslist";
import shoplist from "../components/shop/shoplist";
import map from '../components/map/map'
import weather from "../components/common/weather";
import shopdetails from "../components/shop/shopdetails";
import my from "../components/my/my";
import newsdetails from "../components/news/newsdetails";
import photo from "../components/photoshare/photo";
import shopcart from '../components/shopcart/shopcart.vue'
import bannardetails from "../components/banner/bannardetails";

Vue.prototype.$jq = jq
Vue.use(Router)

export default new Router({
  linkActiveClass:'rlActive',
  routes: [
    {
      path:'/',
      redirect:{
        name:'index'
      }
    }
    ,
    {
      path: '/ ',
      name: 'index',
      component: index
    },
    {
      path:'/bannerDetails',
      name:'bannerDetails',
      component:bannardetails
    },
    {
      path: '/news',
      name: 'news',
      component: newslist
    },
    {
      path:'/news/newsdetail',
      name:'newsdetail',
      component:newsdetails
    },
    {
      path: '/photo',
      name: 'photo',
      component: photolist
    },
    {
      path:'/photo/womandetails',
      name:'photoshare.womandetails',
      component:photo
    },
    {
      path:'/photo/mandetails',
      name:'photoshare.mandetails',
      component:photo
    },{
      path:'/photo/fullviewdetails',
      name:'photoshare.fullviewdetails',
      component:photo
    },
    {
      path: '/shop',
      name: 'shop',
      component: shoplist
    },
    {
      path:'/shop/shopdetails',
      name:'shop.shopdetails',
      component:shopdetails
    },
    {
      path:'/shop/shopcart',
      name:'shopcart',
      component:shopcart
    },
    {
      path: '/map',
      name: 'map',
      component: map
    }
    , {
      path: '/weather',
      name: 'weather',
      component: weather
    }
    , {
      path: '/shopcart',
      name: 'shopcart',
      component: shopdetails
    }
    , {
      path: '/my',
      name: 'my',
      component: my
    }
  ]
})
