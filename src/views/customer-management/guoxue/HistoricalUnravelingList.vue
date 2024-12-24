<template>
  <div>
    <el-drawer :visible="isHistoryList" class="custom-class" direction="ltr" size="100%" @close="closeDrawer">
      <template v-slot:title>
        <div>
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClickTab">
            <el-tab-pane label="收藏批解" name="collect">
              <div class="clearfix">
                <el-input v-model="searchVal" clearable placeholder="搜索关键字" style="width: 300px"
                  @change="changeSearch" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="历史批解" name="history">
              <div class="clearfix">
                <el-input v-model="searchVal" clearable placeholder="搜索关键字" style="width: 300px"
                  @change="changeSearch" />
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>

      </template>
      <div style="height: 100%; position: relative;">
        <div v-infinite-scroll="historyListLoad" :infinite-scroll-disabled="historyListLoading"
          :infinite-scroll-distance="historyListDistance" :infinite-scroll-immediate="false"
          style="overflow:auto;height: 100%;">
          <ul>
            <li v-for="(item, index) in historyList" :key="index" style="word-wrap: break-word;">
              <div>{{ item }}
              </div>
              <div style="display: flex;justify-content: space-between;margin-top: 10px">
                <span>
                  <el-link type="primary">
                    <i class="el-icon-star-off"></i>
                    收藏</el-link>
                </span>
                <span @click="addPiJie(item)">
                  <el-link type="primary">
                    <i class="el-icon-edit-outline"></i>加入批解</el-link>
                </span>


              </div>
              <el-divider></el-divider>
            </li>
          </ul>
          <div v-loading="total > historyList.length"></div>
        </div>

        <div v-if="activeName !== 'collect'" class="collect-box">
          <div v-infinite-scroll="historyListLoad" :infinite-scroll-disabled="historyListLoading"
            :infinite-scroll-distance="historyListDistance" :infinite-scroll-immediate="false"
            style="overflow:auto; height: 100%;">
            <ul>
              <li v-for="(item, index) in historyList" :key="index" style="word-wrap: break-word;">
                <div>{{ item }}
                </div>
                <div style="display: flex;justify-content: space-between;margin-top: 10px">
                  <span>
                    <el-link type="primary">
                      <i class="el-icon-star-off"></i>
                      收藏</el-link>
                  </span>
                  <span @click="addPiJie(item)">
                    <el-link type="primary">
                      <i class="el-icon-edit-outline"></i>加入批解</el-link>
                  </span>


                </div>
                <el-divider></el-divider>
              </li>
            </ul>
            <div v-loading="total > historyList.length"></div>
          </div>
        </div>
      </div>


    </el-drawer>
  </div>

</template>
<script>
import db from '../../../plugins/db'

export default {
  name: 'HistoricalUnravelingList',
  props: {
    isHistoryList: Boolean
  },
  data () {
    return {
      activeName: 'collect',
      page: 0,
      limit: 20,
      historyList: [],
      collectList: [],
      total: '',
      historyListLoading: false,
      historyListDistance: 20,
      searchVal: ''
    }
  },
  methods: {
    clearPageList () {
      this.page = 0
      this.historyListLoading = false
      this.historyList = []

    },
    closeDrawer () {
      console.log("🚀 ~ file:HistoricalUnravelingList method:closeDrawer line:75 -----", 'closeDrawer')

      this.$emit('closeDrawer')
    },
    changeSearch () {
      console.log("🚀 ~ file:HistoricalUnravelingList method:changeSearch line:80 -----", 'changeSearch')

      this.clearPageList()
      this.historyListLoad()
    },
    handleClickTab () {
      this.searchVal = ''
      this.clearPageList()
      this.historyListLoad()
    },
    async historyListLoad () {
      console.log("🚀 ~ file:index method:historyListLoad line:1738 -----", '+++++++++++++++++++++')
      if (this.historyListLoading) return;
      this.historyListLoading = true;

      if (this.activeName === 'collect') {
        await this.fetchList()
        this.total > this.historyList.length && (this.historyListLoading = false);
      } else if (this.activeName === 'history') {
        await this.fetchList()
        this.total > this.historyList.length && (this.historyListLoading = false);
      }
    },
    addPiJie (v) {
      this.$emit('addPiJie', v, this.handleClickTab)
    },
    async fetchList () {
      // 按 id 倒序排序并获取前 20 条记录
      let start = this.page * this.limit
      const value = this.searchVal.trim()
      // console.log(value)
      const list = await db?.data
        .filter(item => item.mingPanText && item.mingPanText.includes(value)
        )
        .reverse()
        .offset(start)
        .limit(this.limit)
        .toArray()
        .then(array => array.map(item => item.mingPanText))

      console.log("🚀 ~ file:HistoricalUnravelingList method:fetchList-list line:99 -----", list)
      if (list.length > 0) {
        this.page += 1
        this.historyList.push(...list)
        this.total = await db?.data
          .filter(item => item.mingPanText && item.mingPanText.includes(value))
          .count()
      } else {
        this.historyList.push('暂无数据')
        this.total = 0
      }

      if (value) {

      } else {

      }
    }
  }

}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding-left: 20px;
  padding-right: 20px;

  li {
    font-size: 14px;
  }
}

.custom-class {
  ::v-deep .el-drawer__header {
    position: relative;
    padding: 0;
    margin-bottom: 0;

    .el-drawer__close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .el-tabs__content {
      padding-bottom: 1px;
      padding-top: 5px;
    }
  }

  ::v-deep .el-divider--horizontal {
    margin-top: 0;
  }

  .collect-box {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: aliceblue;
  }
}
</style>
