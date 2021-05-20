<template>
  <div class="w1300 farm">
    <div class="top">
      <div class="fl uni isActive">Uniswap Farm</div>
      <div class="fr talon">Talon Farm</div>
    </div>
    <div class="clear"></div>
    <div class="w1300 search" v-show="false">
      <div class="fl sort">
        <el-select v-model="sortValue" placeholder="请选择">
          <el-option
                  v-for="item in sortList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="fr mortgage">
        <el-switch
                style="display: block"
                v-model="mortgageValue"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="只看已抵押"
                inactive-text="">
        </el-switch>
      </div>
    </div>
    <div class="clear"></div>
    <div class="info">
      <div class="lis">
        <div class="title">
          <div class="fl symbol">
            <div class="logos">
              <!--<img src="./../assets/imges/eth.png" />
              <img src="./../assets/imges/usdt.png" />-->
            </div>
            <div class="names">NVT/USDT</div>
          </div>
          <ul class="fl">
            <li class="fl">
              <p>收益</p>
              <h2>2.25 NULS</h2>
            </li>
            <li class="fl">
              <p>年化收益</p>
              <h2>1999.89%</h2>
            </li>
            <li class="fl">
              <p>流动性总价值</p>
              <h2>$888236561</h2>
            </li>
            <li class="fl">
              <p>剩余总奖励</p>
              <h2>888888 Talon</h2>
            </li>
          </ul>
          <div class="fr view" @click="show3 = !show3">详情 <i class="el-icon-arrow-down"></i></div>
        </div>
        <div class="clear"></div>
        <div class="w1300 details" v-show="show3">
          <div class="fl getLp">
            <p>获取NULS-ETH LP <i class=""></i></p>
            <p>查看交易对信息 <i class=""></i></p>
          </div>
          <div class="fr biaoge">
            <div class="fl gain">
              <div class="fl">
                <h6>Tolon收益</h6>
                <h5>18.88888</h5>
                <h4>≈$8.88888</h4>
              </div>
              <div class="fr">
                <el-button class="btns" type="primary" size="small">收取</el-button>
              </div>
            </div>
            <div class="fl alter">
              <div class="fl">
                <h6>已质押LP</h6>
                <h5>0.888</h5>
              </div>
              <div class="fr">
                <el-button class="btns" type="primary" size="small" icon="el-icon-minus"></el-button>
                <el-button class="btns" type="primary" size="small" icon="el-icon-plus"></el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="lis">
        <div class="title">
          <div class="fl symbol">
            <div class="logos">
              <!--<img src="./../assets/imges/eth.png" />
              <img src="./../assets/imges/usdt.png" />-->
            </div>
            <div class="names">NVT/USDT</div>
          </div>
          <ul class="fl">
            <li class="fl">
              <p>收益</p>
              <h2>2.25 NULS</h2>
            </li>
            <li class="fl">
              <p>年化收益</p>
              <h2>1999.89%</h2>
            </li>
            <li class="fl">
              <p>流动性总价值</p>
              <h2>$888236561</h2>
            </li>
            <li class="fl">
              <p>剩余总奖励</p>
              <h2>888888 Talon</h2>
            </li>
          </ul>
          <div class="fr view" @click="show4 = !show4">详情 <i class="el-icon-arrow-down"></i></div>
        </div>
        <div class="clear"></div>
        <div class="w1300 details" v-show="show4">
          <div class="fl getLp">
            <p>获取NULS-ETH LP <i class=""></i></p>
            <p>查看交易对信息 <i class=""></i></p>
          </div>
          <div class="fr biaoge">
            <div class="fl gain">
              <div class="fl">
                <h6>Tolon收益</h6>
                <h5>18.88888</h5>
                <h4>≈$8.88888</h4>
              </div>
              <div class="fr">
                <el-button class="btns" type="primary" size="small">收取</el-button>
              </div>
            </div>
            <div class="fl alter">
              <div class="fl">
                <h6>已质押LP</h6>
                <h5>0.888</h5>
              </div>
              <div class="fr">
                <el-button class="btns" type="primary" size="small" icon="el-icon-minus"></el-button>
                <el-button class="btns" type="primary" size="small" icon="el-icon-plus"></el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {ethers} from 'ethers';
  //import {superLong} from '@/api/utils'
import {superLong} from "../../api/util";

  export default ({
    name: 'Farm',
    data() {
      return {
        sortList: [
          {value: '选项1', label: '黄金糕'},
          {value: '选项2', label: '双皮奶'},
        ],
        sortValue: '',
        mortgageValue: false,
        show3: false,
        show4: false,
      }
    },
    mounted() {
      this.init();
    },
    methods: {

      /**
       * @disc: init
       * @params:
       * @date: 2021-05-18 16:40
       * @author: Wave
       */
      init() {
        console.log('init');
        // The Contract interface
        let abi = [
          "event ValueChanged(address indexed author, string oldValue, string newValue)",
          "constructor(string value)",
          "function getValue() view returns (string value)",
          "function setValue(string value)"
        ];

        // Connect to the network
        let provider = ethers.getDefaultProvider();

        // 地址来自上面部署的合约
        let contractAddress = "0x0faee22173db311f4c57c81ec6867e5deef6c218";

        // 使用Provider 连接合约，将只有对合约的可读权限
        let contract = new ethers.Contract(contractAddress, abi, provider);
        console.log(contract);
      },

      superLong(str, len = 9) {
        return superLong(str, len);
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
  .farm {
    min-height: 800px;
    .top {
      width: 360px;
      height: 48px;
      margin: 46px auto 0;
      border-radius: 24px;
      background-color: #fff;
      .uni, .talon {
        width: 180px;
        height: 48px;
        text-align: center;
        line-height: 48px;
        color: #4A5EF2;
        font-size: 16px;
      }
      .isActive {
        background-color: #5F71F5;
        border-radius: 24px;
        margin: 0 0 0 -1px;
        color: #fff;
        border: 0 solid #5F71F5;
      }
    }
    .search {
      .sort {
        width: 150px;
        height: 40px;
        background: #5F71F5;
      }

    }
    .info {
      margin: 70px auto 0;
      height: 723px;
      background: #FFFFFF;
      border-radius: 20px;
      .lis {
        min-height: 114px;
        font-family: PingFang SC;
        .title {
          padding: 30px 0 0 0;
          height: 84px;
          border-bottom: 1px solid #E4EFFF;
          .symbol {
            margin: 0 0 0 40px;
            .logos {
            }
            .names {
              width: 110px;
              height: 16px;
              font-size: 20px;
              font-weight: bold;
              color: #3A3C44;
              line-height: 54px;
            }
          }
          ul {
            width: 1000px;
            li {
              width: 25%;
              text-align: center;
              p {
                font-size: 14px;

                font-weight: 400;
                color: #7E87C2;
                line-height: 30px;
              }
              h2 {
                font-size: 18px;
                font-family: Roboto;
                font-weight: bold;
                color: #3A3C44;
                line-height: 30px;
              }
            }
          }
          .view {
            width: 100px;
            font-size: 16px;
            font-weight: 500;
            color: #4A5EF2;
            line-height: 36px;
            margin: 10px 0 0 0;
          }
        }
        .details {
          margin: 0 0 0 0;
          height: 148px;
          font-family: PingFang SC;
          background: #FAFCFF;
          .getLp {
            width: 300px;
            text-align: center;
            margin: 40px 0 0 0;
            p {
              font-size: 16px;
              font-weight: 500;
              color: #4A5EF2;
              line-height: 30px;
            }
          }
          .biaoge {
            width: 1000px;
            margin: 20px 0 0 0;
            .gain, .alter {
              height: 108px;
              width: 390px;
              background: #FFFFFF;
              border: 1px solid #E4EFFF;
              border-radius: 5px;
              h6 {
                font-size: 14px;
                font-weight: 500;
                color: #3A3C44;
                padding: 20px 0 0 0;
                margin: 0 0 0 40px;
              }
              h5 {
                font-size: 20px;
                font-weight: bold;
                color: #3A3C44;
                margin: 0 0 0 40px;
              }
              h4 {
                font-size: 14px;
                font-weight: bold;
                color: #858FB1;
                margin: 0 0 0 40px;
              }
              .btns {
                width: 100px;
                height: 38px;
                background: #4A5EF2;
                margin: 35px 40px 35px 0;
              }
            }
            .alter {
              margin: 0 0 0 60px;
              h6 {
                font-size: 14px;
                font-weight: 500;
                color: #3A3C44;
              }
              h5 {
                font-size: 20px;
                font-weight: bold;
                color: #3A3C44;
              }
              .btns {
                width: 70px;
                i {
                  font-size: 20px;
                }
              }
            }
          }

        }
      }
    }
  }
</style>
