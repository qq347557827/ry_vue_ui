<template>
  <div class="history-box">
    <div class="nav-shadow">
      <el-input v-model.trim="searchVal" clearable placeholder="搜索关键字" style="width: 300px"
                @change="changeSearch"
      />
    </div>
    <div v-infinite-scroll="historyListLoad" :infinite-scroll-disabled="historyListLoading"
         :infinite-scroll-distance="historyListDistance" :infinite-scroll-immediate="false"
         style="overflow:auto; flex: 1"
    >
      <!--      <div>{{collectionTags}}</div>-->
      <ul>
        <li v-for="(item, index) in historyList" :key="index" style="word-wrap: break-word;">
          <div>{{ item.content }}
          </div>
          <div style="display: flex;justify-content: space-between;margin-top: 10px">
            <div>
              <collection-btn :collect-item="item" @submitCollection="submitCollection"></collection-btn>
            </div>
            <div>
              <span @click="addPiJie(item.content)">
                    <el-link type="primary">
                      <i class="el-icon-finished"></i>加入批解</el-link>
                  </span>
            </div>
          </div>
          <el-divider></el-divider>
        </li>
      </ul>
      <div v-show="(total > historyList.length)"  v-loading="historyListLoading"></div>
      <div v-show="(historyList.length <= total) && historyListLoading" style="display: flex;justify-content: center">没有更多了</div>
    </div>
  </div>
</template>
<script>
import db from '../../../../plugins/db'
import CollectionBtn from './CollectionBtn.vue'
import { mapActions } from 'vuex'
import { addCollections } from '../../../../api/customer_order_goods/customer'

export default {
  name: "History",
  components: { CollectionBtn },
  props: {
    tags: Array
  },
  data() {
    return {
      searchVal: '',
      page: 1,
      limit: 20,
      total: null,
      historyList: [],
      historyListLoading: false,
      historyListDistance: 20,
      isPopover: false
    }
  },
  created() {
    console.log("🚀 ~ file:history method:created line:53 -----", this.collectionTags)

  },
  computed: {
    collectionTags() {
      return this.$store.state.user.collectionTags
    }
  },
  methods: {
    ...mapActions(['fetchCollectionTags']),
    async historyListLoad() {
      console.log("🚀 ~ file:index method:historyListLoad line:1738 -----", this.historyListLoading)
      if (this.historyListLoading) return;
      this.historyListLoading = true;
      await this.fetchList()
      // this.historyListLoading = false
      console.log("🚀 ~ file:history method:historyListLoad line:76 -----this.total", this.total)
      console.log("🚀 ~ file:history method:historyListLoad line:76 -----this.historyList.length", this.historyList.length)

      this.total > this.historyList.length && (this.historyListLoading = false);
      console.log("🚀 ~ file:history method:historyListLoad line:80 -----this.historyListLoading", this.historyListLoading)

    },
    async submitCollection(collectionBtnCloseFn,selectedIds, dynamicTags, collectItem) {
      const content = collectItem.content
      const itemKey = collectItem.key
      try {
        const res = await addCollections({tagIds: selectedIds, tags: dynamicTags, content})
        console.log("🚀 ~ file:res method:handleSubmitCollectBtn line:82 -----", res)
        if (res.code === 200) {
          this.$message({
            message: '收藏成功',
            type: 'success'
          });
          await db.data.where('key').equals(itemKey).modify({ isCollected: true })
          await this.$store.dispatch('fetchCollectionTags');
          this.$set(collectItem, "isCollected", true)
          collectionBtnCloseFn()
          this.$emit('addForCollectList', res.data)

        }

      }catch (e) {

      }
    },
    clearPageList() {
      this.page = 1
      this.historyListLoading = false
      this.historyList = []

    },
    changeSearch() {
      console.log("🚀 ~ file:HistoricalUnravelingList method:changeSearch line:80 -----", this.searchVal)

      this.clearPageList()
      this.historyListLoad()
    },
    addPiJie(v) {
      // console.log("🚀 ~ file:history method:addPiJie line:73 -----", v)

      this.$emit('historyAddPiJie', v)
    },
    handleClickCollection(content) {
      this.$emit('handleCollection', content)
    },
    async fetchList() {
      // 按 id 倒序排序并获取前 20 条记录
      let start = (this.page - 1) * this.limit
      console.log(start)
      const value = this.searchVal.trim()
      console.log("🚀 ~ file:historyvalue method:fetchList line:124 -----", value)

      const list = await db?.data
        .filter(item => item.mingPanText && item.mingPanText.includes(value)
        )
        .reverse()
        .offset(start)
        .limit(this.limit)
        .toArray()
        .then(array => array.map(item => {
          return {
            key: item.key, content: item.mingPanText, isCollected: item.isCollected
          }
        }))
      if (list.length > 0) {
        this.page += 1
        this.historyList.push(...list)
      }
      this.total = await db?.data
        .filter(item => item.mingPanText && item.mingPanText.includes(value))
        .count()
      console.log("🚀 ~ file:HistoricalUnravelingList method:fetchList-list line:99 -----", this.total)

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

.history-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
}
.nav-shadow {
  background: #FFFFFF;
  border-bottom: 1px solid #DCDFE6;
  -webkit-box-shadow: -2px 4px 4px 0px rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
  box-shadow: -2px 4px 4px 0px rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
}
</style>
