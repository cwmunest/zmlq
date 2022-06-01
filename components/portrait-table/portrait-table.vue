<template>
  <view class="table">
    <view class="thead">
      <view
        :style="{textAlign:align,backgroundColor:titleBg}"
        class="title"
        v-for="(item, index) in columns"
        :key="index"
      >
        <text>{{ item.title }}</text>
      </view>
    </view>
    <view class="tbody_wrap">
      <view class="tbody">
        <view class="col" v-for="(item, index) in columns" :key="index">
          <view
            class="flex justift-content-center flex-direction-column align-items-center row"
            :style="{textAlign:align}"
            v-for="(zItem, zIndex) in tableData"
            :key="zIndex"
          >
            <template v-if="item.slotName">
              <slot :name="item.slotName" :row="zItem" />
            </template>
            <text v-else>{{ zItem[item.key] || '-' }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    align: {
      type: String,
      default: "center"
    },
    titleBg: {
      type: String,
      default: "#fff"
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.table {
  display: flex;
  .thead {
    border-bottom: 1rpx solid #e5e5e5;
    box-shadow: 5rpx 0 5rpx #eee;
    .title {
      box-sizing: border-box;
      position: relative;
      padding: 0 20rpx;
      min-width: 180rpx;
      height: 125rpx;
      line-height: 125rpx;
      font-size: 24rpx;
      color: #666;
      border: 1rpx solid #e5e5e5;
      border-bottom: none;
      border-right: none;
    }
  }
  .tbody_wrap {
    overflow-x: auto;
    border-right: 1rpx solid #e5e5e5;
    border-bottom: 1rpx solid #e5e5e5;
    .tbody {
      .col {
        display: flex;
      }
      .row {
        box-sizing: border-box;
        padding: 0 20rpx;
        font-size: 24rpx;
        color: #666;
        min-width: 180rpx;
        height: 125rpx;
        border: 1rpx solid #e5e5e5;
        border-bottom: none;
        border-right: none;
      }
      .flex {
        display: flex;
      }
      .justift-content-center {
        justify-content: center;
      }
      .align-items-center {
        align-items: center;
      }
      .flex-direction-column {
        flex-direction: column;
      }
    }
  }
}
.baseBg {
  background-color: #fff;
}
.firstCol {
  background-color: #007aff;
}
</style>
