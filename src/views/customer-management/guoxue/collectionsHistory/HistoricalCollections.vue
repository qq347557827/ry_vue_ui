<template>
  <div>
    <el-drawer  :size="isMobile ? '100%' : 760" :visible="isHistoryCollection"
               class="custom-class"
               direction="ltr"
               @close="closeDrawer" @open="openDrawer"
    >
      <template v-slot:title>
        <div style="position: relative">
          <el-tabs v-model="activeName" class="tab-pane-box" type="border-card" @tab-click="handleClickTab">
            <el-tab-pane class="tab-pane-collection" label="收藏批解" name="collect"/>
            <el-tab-pane label="历史批解" name="history"/>
          </el-tabs>
          <!--          <el-button type="primary" icon="el-icon-edit" circle>新增</el-button>-->
          <div
            style="position: absolute;top: 0; left: 200px; height: 39px;z-index: 99; display: flex;align-items: center;"
          >
            <el-button icon="el-icon-plus" round size="mini" type="primary" @click="handleClickAdd">新增</el-button>
          </div>
        </div>
      </template>
      <div class="nav-bar-box nav-shadow">
        <div style="display: flex; overflow-x: auto">
          <!--          <el-tooltip class="item" content="选中属于该标签的收藏批解" effect="dark" placement="bottom">-->
          <el-tag v-for="(item, index) in localNavbarTags" :key="index"
                  :effect="item.selected ? 'dark' : 'plain' "
                  class="input-new-tag pointer"
                  type="success"
                  @click="handleClickNavTags(index)"
          >
            {{ item.name }}
          </el-tag>
          <span style="flex: 0 0 auto;width: 56px; height: 27px;opacity: 0">1</span>
        </div>
        <div style="position: absolute; right: 0; top: 0">
          <el-tooltip class="item" content="重置选中的标签刷新收藏批解" effect="dark" placement="bottom">
            <el-button class="tab-pane-collection-btn" plain size="mini" type="info" @click="handelClickClearTags">重置
            </el-button>
          </el-tooltip>
        </div>
      </div>
      <div style=" position: relative; flex: 1;overflow: auto">
        <div v-infinite-scroll="historyListLoad" :infinite-scroll-disabled="ListLoading"
             :infinite-scroll-distance="ListDistance" :infinite-scroll-immediate="false"

        >
          <ul>
            <li v-for="(item, index) in collectList" :key="index" style="word-wrap: break-word;">
              <div style="white-space:pre-line;"> {{ index }} {{ item.content }}
              </div>
              <div style="display: flex;justify-content: space-between;align-items: center; margin-top: 10px">
                <div @click="handleClickUpdate(index)">
                  <el-link type="primary">
                    <i class="el-icon-edit"></i>
                    修改
                  </el-link>
                </div>
                <div style="flex: 1; display: flex;flex-wrap: wrap">

                  <span v-for="(tag, tagIdx) in item.tagList" style="margin-left: 5px">
                    <el-tag size="mini" type="success">{{ tag.name }}</el-tag>
                  </span>
                </div>

                <div>
                  <span @click="addPiJie(item)">
                  <el-link type="primary">
                    <i class="el-icon-finished"></i>加入批解</el-link>
                </span>
                </div>
              </div>
              <el-divider></el-divider>
            </li>
          </ul>
          <div v-if="total === null || (total > collectList.length)" v-loading="ListLoading"></div>
          <div v-else-if="total != null && (collectList.length <= total) && ListLoading"
               style="display: flex;justify-content: center;"
          >
            没有更多了
          </div>
        </div>
        <div class="dialog-update-collection">
          <el-dialog :append-to-body="true" :visible.sync="dialogTableVisible" :width="isMobile ? '100%' : '760px'"
                     class="custom-class" @close="handleCloseDialog"
          >
            <template v-slot:title>
              <div style="display: flex;justify-content: center; position: relative">
                <el-popconfirm cancel-button-text="不了" confirm-button-text="确认" icon="el-icon-info"
                               icon-color="red"
                               style="position: absolute; left: 0" title="这是删除哦！确定删除这条收藏吗？"
                               @confirm="deleteCollection"
                >
                  <template v-slot:reference>
                    <el-link style="float: right" type="danger"><i class="el-icon-delete"></i>删除</el-link>
                  </template>

                </el-popconfirm>
                <div>{{ isUpdate ? '新增收藏' : '修改收藏' }}</div>
              </div>
            </template>
            <template>
              <el-input
                v-model="textarea"
                autosize
                placeholder="请输入内容"
                type="textarea"
              />
              <collection-tags :dynamic-tags="dynamicTags" :local-collection-tags="localCollectionTags"
                               @handleClose="handleClose"
                               @handleInputConfirm="handleInputConfirm" @toggleTag="toggleTag"
              />
            </template>
            <template v-slot:footer class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitCollection">确 定</el-button>
            </template>
          </el-dialog>
        </div>
      </div>
      <history v-if="activeName=== 'history'" :tags="tags" @addForCollectList="addForCollectList"
               @handleCollection="handleCollection" @historyAddPiJie="addPiJieHistory"
      />
    </el-drawer>
  </div>

</template>
<script>
import History from './history.vue'
import CollectionTags from './CollectionTags.vue'
import { mapActions } from 'vuex'
import {
  addCollections,
  delCollections,
  getCollections, listCollections,
  updateCollections, updateCollectionsUsageCount
} from '../../../../api/customer_order_goods/guoXue'

export default {
  name: 'HistoricalCollections',
  components: { CollectionTags, History },
  props: {
    isHistoryCollection: Boolean
  },
  data() {
    return {
      isUpdate: false,
      dialogTableVisible: false,
      updateCollectionIdx: null,
      tags: [],
      localCollectionTags: [], // 收藏批解的tags
      dynamicTags: [],
      localNavbarTags: [], //导航栏的tags
      textarea: '',
      activeName: 'collect',
      page: 1,
      limit: 20,
      collectList: [],
      total: null,
      ListLoading: false,
      ListDistance: 10
    }
  },
  computed: {
    globalCollectionTags() {
      return this.$store.state.user.collectionTags
    },
    isMobile() {
      return this.$store.state.app.isMobile
    }
  },
  created() {
    this.initNavbarTags()
  },
  methods: {
    ...mapActions(['fetchCollectionTags']),
    initTags(tagIds) {
      console.log("🚀 ~ file:HistoricalCollections method:this.globalCollectionTags line:175 -----", this.globalCollectionTags)

      if (tagIds && tagIds.length > 0) {
        return this.globalCollectionTags.map(tag => {
          if (tagIds.includes(tag.id)) {
            // 如果 tag.id 存在于 tagIds 中，则选中该标签
            return {
              ...tag,
              selected: true
            };
          } else {
            // 如果 tag.id 不在 tagIds 中，则不选中
            return {
              ...tag,
              selected: false
            };
          }

        });
      } else {
        return this.globalCollectionTags.map(tag => ({
            ...tag,
            selected: false
          }
        ));
      }

    },
    initCollectionTags(tagIds) {
      const list = this.initTags(tagIds)
      console.log("🚀 ~ file:HistoricalCollectmethod:historyListLoad line:106ions method:initCollectionTags line:148 -----list", list)
      this.localCollectionTags = []
      this.localCollectionTags.push(...list)
    },
    initNavbarTags() {
      const list = this.initTags()
      this.localNavbarTags = []
      this.localNavbarTags.push(...list)
    },
    clearPageList() {
      this.page = 1
      this.ListLoading = false
      this.collectList = []

    },
    openDrawer() {
      this.initNavbarTags()
    },
    closeDrawer() {
      this.$emit('closeDrawer')
    },

    async addPiJie(item) {
      const content = item.content
      const id = item.id
      this.$emit('addPiJie', content, this.handleClickTab)
      const res = await updateCollectionsUsageCount({id})
      if (res.code === 200) {
        await this.handelClickClearTags()
      }
    },
    addPiJieHistory(v) {
      this.addPiJie(v)
    },
    addForCollectList(listItem) {
      this.handelClickClearTags()
    },
    // 修改收藏
    handleCloseDialog() {
      this.dynamicTags = []
      this.textarea = ''
    },
    handleClickAdd() {
      this.isUpdate = false
      this.textarea = ""
      this.dynamicTags = []
      this.initCollectionTags()

      this.dialogTableVisible = true
    },
    handleClickUpdate(index) {
      console.log("🚀 ~ file:HistoricalCollections method:handleClickUpdate line:258 -----", index)

      this.updateCollectionIdx = index
      const tagIds = this.collectList[index].tagList.map(item => item.id)
      const content = this.collectList[index].content
      this.initCollectionTags(tagIds)
      console.log("🚀 ~ file:HistoricalCollections method:handleClickUpdate line:171 -----", this.localCollectionTags)

      this.dialogTableVisible = true
      this.textarea = content

    },
    async deleteCollection() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      try {
        const id = this.collectList[this.updateCollectionIdx].id
        console.log("🚀 ~ file:HistoricalCollections method:deleteCollection line:247 -----collectionId", id)
        const res = await delCollections(id)
        if (res.code === 200) {
          this.$modal.msgSuccess("删除成功");
          this.dialogTableVisible = false
          await this.handelClickClearTags()
        }
      } finally {
        loading.close()
      }
    },
    toggleTag(tagId) {
      const tagIndex = this.localCollectionTags.findIndex(tag => tag.id === tagId);
      if (tagIndex !== -1) {
        const tag = this.localCollectionTags[tagIndex];
        this.$set(tag, 'selected', !tag.selected);
        // 使用 Vue.set 来确保响应式更新
        this.$set(this.localCollectionTags, tagIndex, { ...tag });
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirm(inputValue) {
      this.dynamicTags.push(inputValue);
    },
    async submitCollection() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });

      try {
        const tagIds = this.localCollectionTags
          .filter(tag => tag.selected) // 筛选出 selected 为 true 的标签
          .map(tag => tag.id);
        const collection = {
          tagIds,
          tags: this.dynamicTags,
          content: this.textarea
        }
        let selectCollectionRes
        if (this.isUpdate) {
          selectCollectionRes = await this.updateCollection(collection)
          // this.$set(this.collectList, this.updateCollectionIdx, selectCollectionRes.data)

        } else {
          await this.interCollection(collection)


        }
        this.dialogTableVisible = false
        if (this.dynamicTags.length > 0) {
          await this.fetchCollectionTags()
          this.dynamicTags = []
        }
        await this.handelClickClearTags()
      } catch (e) {
        console.log(e)
      } finally {
        loading.close()
      }

    },
    async updateCollection(collection) {
      collection.id = this.collectList[this.updateCollectionIdx]
      const res = await updateCollections(collection)
      if (res.code === 200) {
        // this.$set(this.collectList, this.updateCollectionIdx, )
        // 根據Collection_id 請求新的
        return await getCollections(collection.id)
      }
    },
    async interCollection(collection) {
      return addCollections(collection)
    },
    handleCollection(content) {
      console.log("🚀 ~ file:HistoricalCollections method:handleCollection line:101 -----", content)

    },
    handleClickTab() {
      // this.searchVal = ''
      // this.clearPageList()
      // this.historyListLoad()
    },
    async handleClickNavTags(index) {
      const item = this.localNavbarTags[index]
      item.selected = !item.selected
      this.$set(this.localNavbarTags, index, item)
      const tagIds = this.localNavbarTags
        .filter(tag => tag.selected) // 筛选出 selected 为 true 的标签
        .map(tag => tag.id);
      console.log("🚀 ~ file:HistoricalCollections method:handleClickNavTags line:334 -----tagIds", tagIds)
      this.clearPageList()
      await this.historyListLoad(tagIds)

    },
    async handelClickClearTags() {
      this.initNavbarTags()
      this.clearPageList()
      await this.historyListLoad()
    },
    async historyListLoad(tagIds) {
      try {
        if (this.ListLoading) return;
        this.ListLoading = true;
        const param = {
          pageNum: this.page,
          pageSize: this.limit,
          tagIds
        }
        const res = await listCollections(param)
        const list = res.data.list
        this.total = res.data.total
        if (res.code === 200 && list.length > 0) {

          this.page += 1
          this.collectList.push(...list)
        }
        console.log("🚀 ~ file:HistoricalCollections method:historyListLoad line:106 -----", this.collectList)
        this.total > this.collectList.length && (this.ListLoading = false);

      } catch (e) {
        console.log(e)
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

  ::v-deep .el-tabs--border-card {
    box-shadow: none;
  }

  ::v-deep .el-tabs--border-card {
    border: none;
  }

  ::v-deep .el-drawer__body {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    //height: 100%;
  }
}

.tab-pane-collection {
  .clearfix {
    display: flex;
    position: relative;

    .tab-pane-collection-btn {
      position: absolute;
      right: 0;
    }
  }
}

.dialog-update-collection {
  .custom-class {
    //height: 700px;
    .el-dialog__header {
      padding: 10px;
    }
  }
}

.tab-pane-box {
  ::v-deep .el-tabs--border-card {
    box-shadow: none;
  }
}

.nav-shadow {
  background: #FFFFFF;
  border-bottom: 1px solid #DCDFE6;
  -webkit-box-shadow: -2px 4px 4px 0px rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
  box-shadow: -2px 4px 4px 0px rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
}

.nav-bar-box {

  //display: flex;
  //height: 20px;
  position: relative;

  .tab-pane-collection-btn {
  }

  .input-new-tag {
    margin-right: 5px;
  }

  //width: 100%;
}

.pointer {
  cursor: pointer;
}

</style>
