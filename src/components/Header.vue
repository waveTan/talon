<template>
  <div class="w1300 header">
    <div class="fl logo" @click="toUrl('home')"><img class="fl" src="./../assets/talon.svg"><span
            class="fl">Talon</span></div>
    <el-menu class="fl menu" mode="horizontal" @select="handleSelect" :default-active="activeIndex"
             background-color="#3A4BE1"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="assets">资产</el-menu-item>
      <el-menu-item index="trading">交易</el-menu-item>
      <el-menu-item index="liquidity">流动性</el-menu-item>
      <el-menu-item index="farm">Farm</el-menu-item>
      <el-menu-item index="info">Info</el-menu-item>
    </el-menu>
    <div class="fr account">
      ETH
      <div class="fr address">0x9f...565468</div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script lang="ts">
  import {ref, defineComponent} from 'vue'

  export default defineComponent({
    name: 'Header',
    props: {
      /*msg: {
        type: String,
        required: true
      }*/
    },
    setup: () => {
      const count = ref(0);
      return {count}
    },
    data() {
      return {
        activeIndex: 'home',
      };
    },
    methods: {
      handleSelect(key) {
        this.toUrl(key)
      },

      /**
       * @disc: url 连接
       * @params: name 路由名称
       * @params: parameter 路由参数
       * @params: url 跳转链接
       * @date: 2021-05-12 11:02
       * @author: Wave
       */
      toUrl(name, parameter = '', url = '') {
        if (url) {
          //let newUrl = EXPLORER_URL + 'address/info?address=' + name;
          window.open(url)
        } else {
          this.$router.push({name: name})
        }

      }
    }
  })
</script>

<style lang="scss">
  .header {
    .logo {
      width: 98px;
      height: 28px;
      margin: 20px 80px 0 0;
      img {
        width: 30px;
      }
      span {
        color: #ffffff;
        padding: 3px 0 0 5px;
        font-weight: bold;
        font-size: 16px;
      }
    }
    .menu {
      background-color: #3A4BE1;
      border-bottom: 0;
      margin-top: 15px;
      .el-menu-item {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 36px;
      }
      .is-active {
        border-bottom: 0;
      }
      &:hover {
        background-color: transparent;
      }
    }
    .account {
      width: 150px;
      height: 36px;
      margin-top: 20px;
      background: #FFFFFF;
      border-radius: 18px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #3A3C44;
      line-height: 36px;
      padding: 0 0 0 20px;
      .address {
        width: 100px;
        height: 34px;
        border: 1px solid #4A5EF2;
        border-radius: 18px;
        color: #4A5EF2;
        padding: 0 0 0 10px;
      }
    }
  }
</style>
