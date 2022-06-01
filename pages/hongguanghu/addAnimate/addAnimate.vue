<template>
  <!-- 投诉建议-提交 -->
  <view class="pageHomeWrap">
    <!-- 导航 -->
    <uni-nav-bar left-icon="back" title="上传视频" @clickLeft="goBack"></uni-nav-bar>
    <view class="formMain">
      <lay-out-wrap title="视频名称" :isMoreShow="false">
        <view class="remark" slot="content">
          <input v-model="params.videoName" class="uni-input" style="border: 1px solid #b3afaf99; border-radius: 6upx" focus placeholder="请输入视频名称" />
        </view>
      </lay-out-wrap>
      <lay-out-wrap title="请输入您想说的话" :isMoreShow="false">
        <view class="remark" slot="content">
          <textarea placeholder="请输入你想说的话" v-model="params.caption" />
        </view>
      </lay-out-wrap>
      <lay-out-wrap title="上传视频" :isMoreShow="false">
        <view class="photoBox" slot="content">
          <xyz-choose-image
            :isVideo="true"
            :num="1"
            @chooseImage="chooseVideo"
            @delImg="chooseVideo"
          ></xyz-choose-image>
        </view>
      </lay-out-wrap>
      <lay-out-wrap :title="`上传者：${username}`" :isMoreShow="false" style="margin-top: 21upx"></lay-out-wrap>
    </view>
    <view class="btnFixed" @click="onReserve">提交</view>
  </view>
</template>

<script>
import LayOutWrap from "@/components/layout.vue";
import cell from "@/components/cell.vue";
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
import xyzChooseImage from "@/components/xyz-choose-image.vue";
import executeS from "@/service/executeS.js";
import { backTo, linkTo, upLoad, showMsg, getStorage } from "@/utils/utils.js";

export default {
  components: {
    uniNavBar,
    LayOutWrap,
    cell,
    uniNavBar,
    xyzChooseImage
  },
  data() {
    return {
      goBack: backTo,
      video: "",
      params: {
        videoName: '',
        caption: "",
        video: "",
        userId: ""
      },
      timeArray: [],
      username: ''
    };
  },
  onLoad(options) {
    this.params.userId = options.userId;
    this.username = Shell.UserInfo.name
    for (let i = 1; i <= 100; i++) {
      this.timeArray.push(i)
    }
  },
  methods: {
    async onReserve() {
      uni.showLoading({
        title: "上传中",
        mask: true
      });
      if (!this.params.videoName) return showMsg("请输入视频名称");
      if (!this.params.caption) return showMsg("请输入描述内容");
      if (!this.video) {
        return showMsg("请上传视频");
      }
      this.submitContent(this);
    },
    chooseVideo(video) {
      this.video = video[0];
      uni.showLoading({
        title: "上传中",
        mask: true
      });
      upLoad(this.video).then(res => {
        uni.hideLoading();
        if (res.url) this.params.video = res.url
        else showMsg("上传失败");
      }).catch(() => {
        showMsg("上传失败");
      })
    },
    submitContent: async _this => {
      const paramsPayload = {
        apixkey: "queryAppUserUploadVideo",
        payload: _this.params
      };
      const response = await executeS(paramsPayload);
      if (response.success) {
        uni.hideLoading();
        uni.showModal({
          content: '上传成功， 请在管理员审核通过之后进行点播。', //提示的内容,
          showCancel: false, //是否显示取消按钮,
          confirmText: '确定', //确定按钮的文字，默认为取消，最多 4 个字符,
          success: res => {
            linkTo("/pages/hongguanghu/home/home?userId=" + _this.params.userId)
          }
        })
      } else {
        uni.hideLoading()
        uni.showToast({
          title: response.message, //提示的内容,
          icon: 'none', //图标,
          duration: 2000, //延迟时间
        })
      }
    }
  }
};
</script>

<style lang="scss">
.formMain {
  margin-bottom: 92rpx;
  .formBox {
    background-color: $uni-bg-color;
    padding: 0 28rpx;
    margin: 20rpx 0;
    .valueR {
      font-size: 28rpx;
    }
  }
  .remark {
    padding: 0 28rpx;
    box-sizing: border-box;
    textarea {
      border: 1px solid #b3afaf99;
      border-radius: 7upx;
      width: 100%;
      padding: 25rpx;
      box-sizing: border-box;
    }
  }
  .photoBox {
    margin: 0 28rpx;
  }
  .owner {
    font-size: $uni-font-size-base;
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
