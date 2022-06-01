<template>
  <view class="pageHomeWrap">
    <template>
      <view style="position: fixed; top: 0; z-index: 1000">
        <uni-nav-bar left-icon="back" title="订单列表" @clickLeft="goBack"></uni-nav-bar>
        <v-tabs
          v-model="cur"
          lineHeight="4upx"
          :lineScale="0.5"
          color="#000"
          padding="10upx"
          activeColor="#0289E3"
          lineColor="#0289E3"
          :scroll="false"
          :tabs="tabsList"
          @change="handleChangeTab"
        ></v-tabs>
      </view>
      <view class="list-wrap">
        <view class="list" v-for="(item, index) in list" :key="index">
          <view class="header">
            <view class="play-status">
              <text>播放状态：</text>
              <text v-if="item.playStatus === '-1' || item.playStatus === '0'">{{ item.playStatus | playStatusFormat }}</text>
              <view v-else style="display: flex; align-items: center">
                <uni-countdown
                  :show-day="false"
                  :hour="countdownTimeFormate(item.playStatus, 'hour')"
                  :minute="countdownTimeFormate(item.playStatus, 'minute')"
                  :second="countdownTimeFormate(item.playStatus, 'second')"
                ></uni-countdown>
                <text style="font-size: 22upx">后播放</text>
              </view>
            </view>
            <text class="status" :class="{ 'red': item.status === '1' }">{{ item.status | statusFormat }}</text>
          </view>
          <view class="content">
            <view class="wrap">
              <view class="img-wrap">
                <image :src="item.image" mode="widthFix" />
              </view>
              <view class="des">
                <text class="video-res">{{ item.videoName }}</text>
                <text class="video-res">{{ item.createTime }}</text>
              </view>
            </view>
            <view class="right">
              <text class="price">¥ {{ item.price }}</text>
              <text style="color: #D6D8DA">X 1</text>
            </view>
          </view>
          <view class="footer">
            <text class="order-number">订单编号：{{ item.orderNumber }}</text>
            <text class="price">总价￥ {{ item.price }}</text>
          </view>
        </view>
      </view>
    </template>
    <uni-load-more :loadingType="loadingType" :contentText="contentText"></uni-load-more>
  </view>
</template>

<script>
import { backTo } from "@/utils/utils.js";
import uniLoadMore from "@/components/uni-load-more.vue";
import executeS from "@/service/executeS.js";
import vTabs from '@/components/v-tabs.vue'
import uniCountdown from '@/components/uni-countdown.vue'

export default {
  components: {
    vTabs,
    uniLoadMore,
    uniCountdown
  },
  data() {
    return {
      goBack: backTo,
      params: {
        pageSize: 10,
        pageNum: 1
      },
      pages: 0,
      list: [],
      loadingType: 0,
      contentText: {
        contentdown: "上拉加载更多信息",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多数据了"
      },
      tabsList: ['全部', '待支付', '已支付'],
      cur: 0,
      countdownTime: {
        hour: 0,
        minute: 0,
        second: 0
      }
    };
  },
  filters: {
    playStatusFormat(val) {
      if (val == '-1') {
        return '已播放'
      } else if (val == '0') {
        return '正在播放'
      }
    },
    statusFormat(val) {
      if (val == '1') {
        return '待支付'
      } else if (val == '2') {
        return '已支付'
      }
    }
  },
  onLoad(options) {
    this.updateList();
  },
  async onReachBottom() {
    if (this.loadingType !== 0) {
      return;
    }
    this.loadingType = 1;
    let list = [], params = this.params;
    params.pageSize += 10;
    const paramsPayload = {
      apixkey: "queryAppUserRecordsList",
      payload: params
    };
    if (params.pageSize > 10) {
      this.loadingType = 2;
    }
    const response = await executeS(paramsPayload);
    if (response.success) {
      this.list = response.data.records;
      this.loadingType = 0;
    }
  },
  methods: {
    handleChangeTab(e) {
      this.params.pageSize = 10;
      this.updateList(e);
    },
    updateList(type) {
      uni.showLoading();
      this.params.type = type == 0 ? '' : type
      const paramsPayload = {
        apixkey: "queryAppUserRecordsList",
        payload: this.params
      };
      executeS(paramsPayload).then(res => {
        if (res.success) {
          uni.hideLoading();
          this.list = res.data.records;
        } else {
          uni.hideLoading();
          uni.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    },
    countdownTimeFormate(data, type) {
      let list = data.split(':')
      switch (type) {
        case 'hour':
          return Number(list[0])
          break
        case 'minute':
          return Number(list[1])
          break
        case 'second':
          return Number(list[2])
          break
      }
      return 0
    }
  },
  onUnload() {
    console.log(this.$refs)
  }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  height: 80vh;
  padding: 215upx 28upx 0 35upx;
  .list {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 10upx 29upx;
    border-radius: 8upx;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 24upx;
      padding-bottom: 10upx;
      border-bottom: 1px solid #F4F4F4;
      .play-status {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: $uni-font-size-base;
      }
      .status {
        font-weight: bolder;
        color: #0289E3;
        font-size: $uni-font-size-sm;
      }
      text {
        font-size: $uni-font-size-sm;
      }
    }
    .content {
      padding: 18upx 0;
      font-size: $uni-font-size-sm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .wrap {
        display: flex;
        align-items: flex-start;
        .img-wrap {
          display: flex;
          align-items: center;
          width: 144upx;
          margin-right: 17upx;
          image {
            height: 0;
            width: 100%;
          }
        }
        .des {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .video-res {
            font-weight: bolder;
            max-width: 380upx;
            word-break: break-all;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        text-align: right;
        width: 100upx;
        height: 100upx;
        font-size: $uni-font-size-sm;
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      font-size: $uni-font-size-sm;
      .order-number {
        font-size: $uni-font-size-base;
      }
      .time {
        color: #858688
      }
    }
  }
  .price {
    font-size: $uni-font-size-base;
    font-weight: bold;
  }
}
.red {
  color: #E94E4E !important
}
</style>