<template>
  <view class="pageHomeWrap">
    <uni-nav-bar
      left-icon="back"
      right-text="付费记录"
      title="红光湖互动"
      @clickLeft="goBack"
      @clickRight="goToRecord"
    ></uni-nav-bar>
    <view class="header">
      <v-tabs
        v-model="cur"
        lineHeight="4upx"
        :lineScale="0.2"
        color="#000"
        padding="10upx"
        activeColor="#0289E3"
        lineColor="#0289E3"
        :scroll="false"
        :tabs="tabsList"
        @change="handleClickTab"
      ></v-tabs>
    </view>
    <view class="scroll">
      <text>系统通知:</text>
      <uni-notice-bar backgroundColor="#fff" color="#000" style="width: 82%" scrollable="true" single="true" :speed="5" :text="notice"></uni-notice-bar>
    </view>
    <view class="content">
      <template v-if="cur == 0">
        <view
          class="img-list-wrap"
          v-for="(item, index) in resourcesVideoList"
          :key="index"
        >
          <view class="img-wrap">
            <image :src="item.image" mode="widthFix" lazy-load="false"></image>
            <button @tap="handleBuy(item.id, item, '1')" size="mini">点播</button>
          </view>
          <view class="extra">
            <text>{{ item.name }}</text>
            <text v-if="item.price == 0" style="color: red">免费</text>
            <text v-else style="color: red">￥{{ item.price }}</text>
          </view>
        </view>
      </template>
      <template v-else>
        <text class="des">请上传您需要定制播放的视频或图片</text>
        <text class="nodata" v-if="!myVideoList.length">您当前还没有上传或播放视频!</text>
        <view
          class="img-list-wrap mt-90"
          v-for="(item, index) in myVideoList"
          :key="index"
        >
          <view class="img-wrap">
            <video :src="item.video" controls :duration="item.playTime"></video>
            <button v-if="item.status == '1'" @tap="handleBuy(item.id, item, '2')" size="mini" style="z-index: 100">点播</button>
          </view>
          <view class="extra">
            <text>{{ item.videoName }}</text>
            <text v-if="item.status == '0'">待审核</text>
            <text v-else-if="item.status == '1'">审核通过</text>
            <text v-else-if="item.status == '2'">审核拒绝</text>
            <text style="color: #8C8989">{{ item.createTime | dataFormat }}</text>
          </view>
        </view>
      </template>
    </view>
    <view class="footer" v-if="cur == 1">
      <image
        src="../../../static/images/zmlq/uploadIcon.png"
        mode="widthFix"
        lazy-load="false"
        @tap="goToAddAnimate"
        class="add"
      />
    </view>
  </view>
</template>
<script>
import { backTo, getStorage } from '@/utils/utils.js'
import vTabs from '@/components/v-tabs.vue'
import executeS from '@/service/executeS.js'
import uniNoticeBar from '@/components/uni-notice-bar.vue'

export default {
  components: {
    vTabs,
    uniNoticeBar
  },
  data() {
    return {
      goBack: backTo,
      params: {
        id: '',
        pageSize: 100,
        pageNum: 1,
      },
      tabsList: ['互动', '定制'],
      cur: 0,
      recordTimeInterval: {},
      notice: '',
      resourcesVideoList: [],
      myVideoList: []
    }
  },
  filters: {
    dataFormat(e) {
      return e.split(' ')[0]
    }
  },
  onLoad(options) {
    this.params.id = getStorage('userInfo').user.id;
    this.updataUserResourcesVideoList()
    this.updataSystemRecorsList()
    // 每10分钟执行一次
    this.recordTimeInterval = setInterval(() => {
      this.updataSystemRecorsList()
    }, 600000)
  },
  methods: {
    updataSystemRecorsList() {
      const paramsPayload = {
        apixkey: 'querySystemRecord',
        payload: {}
      }
      executeS(paramsPayload).then((res) => {
        if (res.data.length) {
          this.notice = res.data.map(item => {
            return `${item.name}在${item.createTime}购买了${item.videoName}`
          }).join('；')
          console.log(this.notice)
        }
      })
    },
    // 获取我的视频
    updataUserVideoList() {
      uni.showLoading({
        title: '加载中'
      })
      const paramsPayload = {
        apixkey: 'queryAppUserVideo',
        payload: this.params
      }
      executeS(paramsPayload).then((res) => {
        if (res.success) {
          uni.hideLoading()
          this.myVideoList = res.data.records
        } else {
          uni.hideLoading()
        }
      })
    },
    updataUserResourcesVideoList() {
      uni.showLoading({
        title: '加载中'
      })
      const paramsPayload = {
        apixkey: 'queryAppUserResourcesVideo',
        payload: this.params
      }
      executeS(paramsPayload).then((res) => {
        if (res.success) {
          uni.hideLoading()
          this.resourcesVideoList = res.data.records
        } else {
          uni.hideLoading()
          uni.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    },
    goToRecord() {
      uni.navigateTo({
        url:
          '/pages/hongguanghu/orderRecords/orderRecords?userId=' +
          this.params.id
      })
    },
    handleBuy(id, info, type) {
      uni.navigateTo({
        url:
          '/pages/hongguanghu/orderDetail/orderDetail?userId=' +
          this.params.id +
          '&&info=' +
          JSON.stringify({  ...info, type })
      })
    },
    handleClickTab(index) {
      this.cur = index
      if (index == 0) {
        this.updataUserResourcesVideoList()
      } else if (index == 1) {
        this.updataUserVideoList()
      }
    },
    goToAddAnimate() {
      uni.navigateTo({
        url:
          '/pages/hongguanghu/addAnimate/addAnimate?userId=' + this.params.id
      })
    },
    onUnload() {
      if (this.recordTimeInterval) clearInterval(this.recordTimeInterval)
    }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont'; /* project id 1850222 */
  src: url('//at.alicdn.com/t/font_1850222_odsfusw2tu.eot');
  src: url('//at.alicdn.com/t/font_1850222_odsfusw2tu.eot?#iefix')
      format('embedded-opentype'),
    url('//at.alicdn.com/t/font_1850222_odsfusw2tu.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_1850222_odsfusw2tu.woff') format('woff'),
    url('//at.alicdn.com/t/font_1850222_odsfusw2tu.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_1850222_odsfusw2tu.svg#iconfont') format('svg');
}
.custom-icon {
  font-family: 'iconfont';
}
.mt-90 {
  margin-top: 90upx !important;
}
.header {
  font-size: $uni-font-size-base;
  text {
    display: block;
    margin: 20upx 0;
  }
}
.scroll {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  text {
    font-weight: bolder;
  }
}
.content {
  position: relative;
  display: grid;
  justify-content: space-around;
  margin-top: 8upx;
  grid-template-columns: repeat(auto-fill, 150px);
  height: 70vh;
  overflow-y: scroll;
  background-color: #fff;
  .des {
    position: absolute;
    top: 35upx;
    left: 50%;
    margin-left: -218upx;
    height: 25upx;
    line-height: 25upx;
    font-weight: bold;
  }
  .img-list-wrap {
    margin-bottom: 52upx;
    width: 202upx;
    margin: 0 auto;
    .img-wrap {
      position: relative;
      overflow: hidden;
      border-radius: 8upx;
      image {
        width: 100%;
      }
      video {
        width: 100%;
        height: 300upx;
      }
      button {
        position: absolute;
        left: calc(50% - 58upx);
        bottom: 38upx;
      }
    }
    .extra {
      width: 100%;
      text {
        display: block;
        font-size: $uni-font-size-base;
      }
      button {
        margin: 0;
      }
    }
  }
  .nodata {
    position: absolute;
    top: calc(50% - 38upx);
    display: block;
    width: 100%;
    font-size: 40upx;
    text-align: center;
  }
}
.footer {
  height: 11vh;
  background: #fff;
  .add {
    float: right;
    width: 84upx;
    height: 84upx;
    margin: 33upx;
  }
}
</style>
