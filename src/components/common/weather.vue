<template>
    <div class="bg">
        <div class="weather">
            <div class="address">{{cityInfo.province}} {{cityInfo.city}} </div>

            <div class="clearFix">
                <div id="date" class=" on" >
                    <div class="date_main clearfix">
                        <div class="date_left">
                            <div class="location">{{location}}</div>
                            <div class="main">
                                <p class="month" id="month">五月</p>
                                <p class="date" id="day">19</p>
                            </div>
                        </div>
                        <div class="date_right">
                            <p class="time" id="time">21 : 39 : 47</p>
                            <p class="date" id="year">2018年05月19日</p>
                            <p class="week" id="week">星期六</p>
                        </div>
                    </div>
                    <div class="date_close" id="date_close" ></div>
                </div>
            </div>

            <ul class="weatherList">
                <li>
                    <p class="week">周{{nowDay.day}} (实时)</p>
                    <p class="day">{{nowDay.month}}{{nowDay.date}}</p>
                    <div class="pic"><img :src="now.weather_pic" width="100%" height="100%" alt=""></div>
                    <p class="temperature"> {{now.temperature}} °C</p>
                    <p class="nowWeather">{{now.weather}}</p>
                    <p class="windDir">{{now.wind_direction}}</p>
                    <p class="humidity">空气湿度 {{now.sd}}</p>
                </li>
                <li>
                    <p class="week">周{{Tomorrow.day}}</p>
                    <p class="day">{{Tomorrow.month}}{{Tomorrow.date}}</p>
                    <div class="pic"><img :src="f2.day_weather_pic" width="100%" height="100%" alt=""></div>
                    <p class="temperature">{{f2.night_air_temperature}} ~ {{f2.day_air_temperature}} °C</p>
                    <p class="nowWeather">{{f2.day_weather}}</p>
                    <p class="windDir">{{f2.day_wind_direction}}</p>
                    <p class="humidity">降水概率 {{f2.jiangshui}}</p>
                </li>
                <li>
                    <p class="week">周{{twoTomorrow.day}}</p>
                    <p class="day">{{twoTomorrow.month}}{{twoTomorrow.date}}</p>
                    <div class="pic"><img :src="f3.day_weather_pic" width="100%" height="100%" alt=""></div>
                    <p class="temperature">{{f3.night_air_temperature}} ~ {{f3.day_air_temperature}} °C</p>
                    <p class="nowWeather">{{f3.day_weather}}</p>
                    <p class="windDir">{{f3.day_wind_direction}}</p>
                    <p class="humidity">降水概率 {{f3.jiangshui}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import '../../../static/css/date.css'
    export default {
        data() {
            return {
                location:'',
                cityInfo:{},
                now:{},
                f1:{},
                f2:{},
                f3:{},
                nowDay:{},
                Tomorrow:{},
                twoTomorrow:{}
            }
        },
        created(){
            let dataArr = [this.nowDay,this.Tomorrow,this.twoTomorrow];
            let arr = ['天','一','二','三','四','五','六','七','八','九','十','十一','十二'];
            let date = new Date;
            dataArr.forEach((item,index)=>{
                item['day'] = arr[(date.getDay()+index)%7];
                item['month'] = (date.getMonth()+1) + '月';
                item['date'] = (date.getDate()+index) +'日';
            });

            let timePlay = ()=>{
                date = new Date;
                this.$jq('#time').html(zero(date.getHours())+' : '+zero(date.getMinutes())+' : '+zero(date.getSeconds()));
                this.$jq('#year').html(date.getFullYear() + '年' + zero((date.getMonth()+1)) + '月' + zero(date.getDate()) + '日');
                this.$jq('#week').html('星期' + arr[date.getDay()]);
                this.$jq('#month').html(arr[(date.getMonth()+1)] + '月');
                this.$jq('#day').html(date.getDate());
            };

            setInterval(timePlay,1000);
            timePlay();

            function zero( num ){
                if ( num < 10 ){
                    return '0'+num;
                }else{
                    return num;
                }
            };

            {
                function formatterDateTime() {
                    var date=new Date()
                    var month=date.getMonth() + 1
                    var datetime = date.getFullYear()
                        + ""
                        + (month >= 10 ? month : "0"+ month)
                        + ""
                        + (date.getDate() < 10 ? "0" + date.getDate() : date
                            .getDate())
                        + ""
                        + (date.getHours() < 10 ? "0" + date.getHours() : date
                            .getHours())
                        + ""
                        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                            .getMinutes())
                        + ""
                        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                            .getSeconds());
                    return datetime;
                }
                this.$jq.ajax({
                  type: 'get',
                  url:'https://restapi.amap.com/v3/ip?key=59fadb0033d9fef1cd912fe9cf1647d0&',
                  success:(res)=>{
                    this.cityInfo=res
                    this.location=this.cityInfo.city






                    this.$jq.ajax({
                      type: 'post',
                      url: 'http://route.showapi.com/9-2',
                      dataType: 'json',
                      data: {
                        "showapi_timestamp": formatterDateTime(),
                        "showapi_appid": 37928,
                        "showapi_sign": 'd0ca1605e19241c38849c3fb9a56b447',
                        "area":this.location,
                      },

                      error: function(XmlHttpRequest, textStatus, errorThrown) {
                        console.log("操作失败!");
                      },
                      success: (result)=> {
                        //console.log(result.showapi_res_body)
                        // this.cityInfo = result.showapi_res_body.cityInfo;
                        this.now = result.showapi_res_body.now;
                        this.f1 = result.showapi_res_body.f1;
                        this.f2 = result.showapi_res_body.f2;
                        this.f3 = result.showapi_res_body.f3;
                      }
                    });
                  }
                })



            }
        }
    }
</script>

<style scoped lang="less">
    @rem:750/10rem;
    .bg{
        height: 100%;
        background: -webkit-linear-gradient(
                top,
                #394984,
                #edb46d
        ) !important;
    }
    .weather{
        overflow: hidden;
        zoom:1;
        padding-top: 10/@rem;

        .address{
            color: #fff;
            font-size: 28/@rem;
        }
        .location{
            font-size: 2px ;
            color: #eee;
            text-shadow: 1px 1px 1px #555;
            -webkit-text-size-adjust: 100% ;
        }
        .weatherList{
            display: flex;
            height: 440/@rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            li{
                flex: 1;
                border-right: 1px solid rgba(255,255,255,0.1);
                padding: 20/@rem 0;
                overflow: hidden;
                p{
                    color: #fff ;
                    text-shadow: 1px 1px 1px #555;;
                    font-size: 20/@rem;
                    margin: 6/@rem 0;
                }
                .week{

                }
                .day{
                    font-size: 16/@rem;
                    opacity: 0.5;
                }
                .pic{
                    width: 130/@rem;
                    height: 130/@rem;
                    margin: auto;
                }
                .temperature{
                }
                .nowWeather{

                }
                .windDir{

                }
                .humidity{

                }

            }
            li:first-child{
                flex: 1.5;
                p{

                    margin: 0;
                }
                .pic{
                    width: 180/@rem;
                    height: 180/@rem;
                }
            }
            li:last-child{
                border: none;
            }
        }
    }
</style>
