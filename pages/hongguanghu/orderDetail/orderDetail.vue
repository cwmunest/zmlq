<template>
  <view class="pageHomeWrap">
    <uni-nav-bar left-icon="back" title="提交订单" @clickLeft="goBack"></uni-nav-bar>
    <view class="list-wrap">
      <view class="list">
        <view class="content">
          <view class="wrap">
            <view class="img-wrap">
              <image :src="info.image" mode="widthFix" />
            </view>
            <view class="des">
              <text class="video-res">{{ info.type == '1' ? info.name : info.videoName }}</text>
              <picker
                mode="selector"
                @change="hanldeChangePlayTime"
                :range="timeArray"
              >
                <view>
                  播放时长：<text>{{ playTime }}分钟</text>
                </view>
              </picker>
            </view>
          </view>
          <view class="right">
            <text class="price">¥ {{ info.price }}</text>
            <text style="color: #D6D8DA">X 1</text>
          </view>
        </view>
        <view class="caption">
          <text>描述：{{ info.caption }}</text>
        </view>
        <view class="footer">
          <text class="price">总价￥ {{ info.price }}</text>
        </view>
      </view>
    </view>
    <view class="btnFixed" @click="onSubmit">提交</view>
  </view>
</template>

<script>
import { backTo } from "@/utils/utils.js";
import executeS from "@/service/executeS.js";

export default {
  data() {
    return {
      goBack: backTo,
      userId: '',
      info: {},
      playTime: 10,
      timeArray: []
    };
  },
  onLoad(options) {
    this.info = JSON.parse(options.info)
    this.info.playTime = 10
    console.log(this.info)
    this.userId = options.userId
    for (let i = 1; i <= 100; i++) {
      this.timeArray.push(i)
    }
  },
  methods: {
    onSubmit() {
      uni.showLoading({
        title: '加载中'
      })
      const paramsPayload = {
        apixkey: "queryAppUserBuy",
        payload: {
          videoNumber: this.info.type == '1' ? this.info.programId : this.info.id,
          videoRes: this.info.type == '1' ? this.info.name : this.info.video,
          playTime: this.playTime,
          type: this.info.type,
          videoName: this.info.type == '1' ? this.info.name : this.info.videoName
        }
      };
      executeS(paramsPayload).then(res => {
        uni.hideLoading()
        if (res.success) {
          uni.showModal({
            content: '恭喜您购买成功，您购买的动画将在稍后播放！播放状态请在付费记录中查看。',
            showCancel: false, //是否显示取消按钮,
            confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
            success: res => {
              if (res.confirm) {
                uni.navigateTo({
                  url: "/pages/hongguanghu/home/home?userId=" + this.userId
                })
              }
            }
          })
        } else {
          uni.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    },
    hanldeChangePlayTime(e) {
      this.playTime = this.timeArray[e.detail.value]
    }
  }
};
</script>

<style lang="scss" scoped>
.list-wrap {
  padding: 35upx 0;
  .list {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 29upx;
    border-radius: 8upx;
    overflow: hidden; // 清除浮动
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      line-height: 24upx;
      padding-bottom: 29upx;
      border-bottom: 1px solid #F4F4F4;
      .order-number {
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
          width: 70%;
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
    .caption {
      word-break: break-all
    }
    .footer {
      margin-top: 40upx;
      float: right;
      font-size: $uni-font-size-sm;
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
.btnFixed {
  width: 100%;
  height: 92rpx;
  background-color: #0289E3;
  position: fixed;
  bottom: 0;
  font-size: 30rpx;
  color: #fff;
  text-align: center;
  line-height: 92rpx;
}
</style>