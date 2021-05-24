<template>
  <div class="w1300 farm">
    <div class="top">
      <div class="fl uni isActive">Uniswap Farm</div>
      <div class="fr click talon">Talon Farm</div>
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
      <div class="lis" v-for="item of tokenList">
        <div class="title">
          <div class="fl symbol">
            <div class="logos">
              <!--<img src="./../assets/imges/eth.png" />
              <img src="./../assets/imges/usdt.png" />-->
            </div>
            <!--  <div class="names">NVT/USDT</div>-->
            <div class="names">{{item.name}}</div>
          </div>
          <ul class="fl">
            <li class="fl">
              <p>收益</p>
              <h2>{{item.earnings}} NULS</h2>
            </li>
            <li class="fl">
              <p>年化收益</p>
              <h2>{{item.annualEarnings}}%</h2>
            </li>
            <li class="fl">
              <p>流动性总价值</p>
              <h2>{{item.annualEarnings}}</h2>
            </li>
            <li class="fl">
              <p>剩余总奖励</p>
              <h2>{{item.totalReward}} Talon</h2>
            </li>
          </ul>
          <div class="fr click view" @click="item.showId = !item.showId">
            详情
            <i :class="item.showId ? 'el-icon-arrow-down':'el-icon-arrow-right'"></i>
          </div>
        </div>
        <div class="clear"></div>
        <DetailsBar :tokenInfo="item" :showId="item.showId" @openDialogAddOrMinus="openDialogAddOrMinus">
        </DetailsBar>
        <div class="clear"></div>
      </div>
    </div>

    <el-dialog title="" center width="470px" custom-class="addOrMinus" v-model="dialogAddOrMinus"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="titles">{{addOrMinus ==='add' ? '添加':'取回'}}LP</div>
      <div class="infos">
        <div class="in">
          <span class="fl">{{addOrMinus ==='add' ? '添加':'取回'}}LP</span>
          <label class="fr">余额：0.268</label>
        </div>
        <div class="clear"></div>
        <div class="to">
          <el-input v-model="numberValue" class="fl" placeholder="0"></el-input>
          <span class="fl click max" @click="clickMax">最大</span>
          <span class="fr lp">NULS-ETH LP</span>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogAddOrMinus = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddOrMinus">确 定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script lang="ts">
  import {ethers} from 'ethers';
  import {divisionDecimals} from "../../api/util";
  import DetailsBar from './DetailsBar.vue'

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

        tokenList: [],//token list

        dialogAddOrMinus: false, //加减弹框
        formAddOrMinus: {
          nums: '',
        },
        addOrMinus: 'add',//加减类型
        numberValue: '',//数量
      }
    },
    components: {
      DetailsBar
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
      async init() {
        console.log('init');
        let contractAddress = "0x0faee22173db311f4c57c81ec6867e5deef6c218";
        this.tokenList = await this.getTokenList(contractAddress);
        console.log(this.tokenList);
      },

      /**
       * @disc:  获取token 列表
       * @params: contractAddress
       * @date: 2021-05-20 17:05
       * @author: Wave
       */
      async getTokenList(contractAddress) {
        // The Contract interface
        let abi = [
          "function owner() public view returns (address)",
          "function pendingToken(uint256 _pid, address _user) external view returns (uint256)",
          "function poolInfo(uint256 input) external view returns (address,address,uint256,uint256,uint256,uint256,uint256)",
          "function poolLength() external view returns (uint256)",
          "function userInfo(uint256 _pid, address _user) external view returns (uint256,uint256)"
        ];
        // Connect to the network
        let provider = ethers.getDefaultProvider('ropsten');
        // 使用Provider 连接合约，将只有对合约的可读权限
        let contract = new ethers.Contract(contractAddress, abi, provider);
        //console.log(contract);

        let poolLengthValue = await contract.poolLength();
        let poolLength = Array.from({length: Number(poolLengthValue.toString())});
        //console.log(poolLength);

        let tokenList = [];
        for (let item in poolLength) {
          let tokenInfo = {
            name: '',
            earnings: '',
            annualEarnings: '',  //APR = 365 * ( 每日出块数量 * candyPrice * candyPerBlock / candyDecimals )
            //除以
            //( lpPrice * lpSupply / lpDecimals )
            totalValue: '',
            totalReward: '',
            lpToken: '',
            candyToken: '',
            lpDecimals: '',
            candyDecimals: '',
            showId: false
          };
          let poolInfoValue = await contract.poolInfo(Number(item));
          //console.log(poolInfoValue);
          tokenInfo.lpToken = poolInfoValue[0];
          tokenInfo.candyToken = poolInfoValue[1];

          let pendingTokenValue = await contract.pendingToken(Number(item), this.$store.state.account);
          tokenInfo.earnings = pendingTokenValue.toString();
          //{'lpToken','candyToken','lastRewardBlock','accPerShare','candyPerBlock','lpSupply','candyBalance'};
          //{'name','earnings','annualEarnings','totalValue','totalReward'}
          let abiTwo = [
            "function symbol() public view returns (string)",
            "function decimals() public view returns (uint8)"
          ];
          let contractTwo = new ethers.Contract(poolInfoValue[0], abiTwo, provider);
          let symbolValue = await contractTwo.symbol();
          tokenInfo.name = symbolValue.toString();
          let decimalsValue = await contractTwo.decimals();
          tokenInfo.lpDecimals = decimalsValue.toString();
          tokenInfo.totalReward = divisionDecimals(poolInfoValue[6].toString(), Number(tokenInfo.lpDecimals)).toString();
          tokenList.push(tokenInfo);
        }
        return tokenList
      },

      //打开加减弹框
      openDialogAddOrMinus(tokenInfo, addOrMinus) {
        this.dialogAddOrMinus = true;
        this.addOrMinus = addOrMinus;
        console.log(tokenInfo, 'tokenInfo');
      },

      //选择最大
      clickMax() {
        console.log('clickMax')
      },

      //确定提交
      confirmAddOrMinus() {
        console.log(this.numberValue, "确定提交");
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
    min-height: 750px;
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

      }
    }
    .addOrMinus {
      border-radius: 10px;
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        font-family: PingFang SC;
        .titles {
          font-size: 24px;
          font-weight: 600;
          color: #3A3C44;
          line-height: 36px;
          text-align: center;
          margin: 0 0 20px 20px;
        }
        .infos {
          width: 417px;
          height: 94px;
          background: #FFFFFF;
          border: 1px solid #E3EEFF;
          border-radius: 10px;
          .in {
            font-size: 14px;
            font-weight: 500;
            color: #7E87C2;
            padding: 15px 20px 15px 20px;
            height: 20px;
          }
          .to {
            .el-input {
              width: 100px;
              margin: 0 0 0 20px;
              .el-input__inner {
                border: transparent;
                height: 30px;
                line-height: 30px;
              }
            }
            span {
              font-size: 14px;
              font-weight: 600;
              color: #3A3C44;
            }
            .max {
              width: 36px;
              height: 24px;
              background: #E4E7FF;
              font-size: 12px;
              font-weight: 400;
              color: #4A5EF2;
              border-radius: 5px;
              text-align: center;
              line-height: 22px;
              margin: 8px 0 0 10px;
            }
            .lp {
              margin: 8px 20px 0 0;
            }
          }
        }
      }
      .el-dialog__footer {
        padding: 10px 0 60px 0;
        .dialog-footer {
          .el-button {
            width: 185px;
            height: 48px;
            background: #FFFFFF;
            border: 1px solid #4A5EF2;
          }
          .el-button--primary {
            background: #4A5EF2;
            margin: 0 0 0 30px;
          }
        }
      }
    }
  }
</style>
