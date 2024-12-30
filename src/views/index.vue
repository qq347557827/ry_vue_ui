<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="orderStatistics.monthStatistics && orderStatistics.monthStatistics.totalAmountSum"
              title="本月总业绩"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :value="Number(orderStatistics.monthStatistics && orderStatistics.monthStatistics.orderCount)"

              title="本月总单量"
            />
          </div>
        </el-card>

      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">

          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="orderStatistics.monthStatistics && orderStatistics.monthStatistics.depositSum"
              title="本月定金总额"
            />
          </div>
        </el-card>

      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="orderStatistics.monthStatistics && orderStatistics.monthStatistics.collectAmountSum"
              title="本月代收总额"
            />
          </div>
        </el-card>
      </el-col>
      <!--      <el-col :span="4">-->
      <!--        <el-card shadow="hover" style="width: 100%;">-->
      <!--          <div>-->
      <!--            <el-statistic-->
      <!--              group-separator=","-->
      <!--              :precision="2"-->
      <!--              :value="orderStatistics.monthStatistics.refundSum"-->
      <!--              title="本月退款总额"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
      <!--      <el-col :span="4">-->
      <!--        <el-card shadow="hover" style="width: 100%;">-->
      <!--          <div>-->
      <!--            <el-statistic-->
      <!--              group-separator=","-->
      <!--              :precision="2"-->
      <!--              :value="orderStatistics.monthStatistics.actualAmountSum"-->
      <!--              title="本月实际业绩"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
    </el-row>
    <el-row :gutter="20" class="mt20">
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="orderStatistics.lastMonthStatistics && orderStatistics.lastMonthStatistics.totalAmountSum"
              title="上月总业绩"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :value="Number(orderStatistics.lastMonthStatistics && orderStatistics.lastMonthStatistics.orderCount)"

              title="上月总单量"
            />
          </div>
        </el-card>

      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">

          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="orderStatistics.lastMonthStatistics && orderStatistics.lastMonthStatistics.depositSum"
              title="上月定金总额"
            />
          </div>
        </el-card>

      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="orderStatistics.lastMonthStatistics && orderStatistics.lastMonthStatistics.collectAmountSum"
              title="上月代收总额"
            />
          </div>
        </el-card>
      </el-col>
      <!--      <el-col :span="4">-->
      <!--        <el-card shadow="hover" style="width: 100%;">-->
      <!--          <div>-->
      <!--            <el-statistic-->
      <!--              group-separator=","-->
      <!--              :precision="2"-->
      <!--              :value="orderStatistics.monthStatistics.refundSum"-->
      <!--              title="本月退款总额"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
      <!--      <el-col :span="4">-->
      <!--        <el-card shadow="hover" style="width: 100%;">-->
      <!--          <div>-->
      <!--            <el-statistic-->
      <!--              group-separator=","-->
      <!--              :precision="2"-->
      <!--              :value="orderStatistics.monthStatistics.actualAmountSum"-->
      <!--              title="本月实际业绩"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </el-card>-->
      <!--      </el-col>-->
    </el-row>
    <el-row :gutter="20" class="mt20">
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="orderStatistics.todayStatistics && orderStatistics.todayStatistics.totalAmountSum"
              title="当天业绩"
            ></el-statistic>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :value="orderStatistics.todayStatistics && orderStatistics.todayStatistics.orderCount"
              title="当天单量"
            ></el-statistic>
          </div>
        </el-card>

      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">

          <div>
            <el-statistic
              group-separator=","
              :precision="2"
              :value="orderStatistics.yesterdayStatistics && orderStatistics.yesterdayStatistics.totalAmountSum"

              title="昨天业绩"
            ></el-statistic>
          </div>
        </el-card>

      </el-col>
      <el-col :span="4">
        <el-card shadow="hover" style="width: 100%;">
          <div>
            <el-statistic
              group-separator=","
              :value="orderStatistics.yesterdayStatistics && orderStatistics.yesterdayStatistics.orderCount"
              title="昨天单量"
            ></el-statistic>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>
      <el-row>
        <el-col :span="8">
          <el-card shadow="hover" style="width: 100%;">
            <div>
              <el-statistic
                group-separator=","
                :value="orderStatistics.yesterdayStatistics && orderStatistics.yesterdayStatistics.orderCount"
                title="总排名"
              ></el-statistic>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import { selectOrderAllAmount } from '../api/customer_order_goods/order'

export default {
  name: 'Index',
  data() {
    return {
      // 版本号

      orderStatistics: {}
    }
  },
  created() {
    selectOrderAllAmount().then(res => {
      console.log('selectOrderAllAmount', res)
      this.orderStatistics = res
    }).catch()
  },
  methods: {
    goTarget(href) {
      window.open(href, '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

