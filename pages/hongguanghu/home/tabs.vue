<template>
  <view class="tabsBox">
    <view
      class="itemTabs"
      :class="cur == index ?'active':''"
      v-for="(item,index) in tabsList"
      :key="index"
      @click="onChiose(index)"
    >{{item.name}}</view>
  </view>
</template>

<script>
export default {
  name: "tabs",
  props: {
    tabsList: {
      type: Array,
      default() {
        return [];
      }
    },
    cur: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    onChiose(index) {
      this.$emit("onClick", index);
    }
  }
};
</script>

<style lang="scss">
.tabsBox {
  width: 50%;
  display: flex;
  align-items: center;
  height: 60rpx;
  font-size: 28rpx;
  background-color: #ececec;
	margin: 0 auto;
  .itemTabs {
    width: 50%;
    height: 100%;
    text-align: center;
    line-height: 60rpx;
    border-radius: 4rpx;
  }
  .active {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
