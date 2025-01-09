<template>
  <div ref="tag-management" class="tag-management">
    <template >
      <div v-for="(item, index) in localCollectionTags" :key="index" class="tag-item">
        <template v-if="updateIndex !== index">
          <div class="pl-5 pr5">
            <el-tag  :disable-transitions="true">
              {{ item.name }}
            </el-tag>
          </div>
          <div class="pr5">
            <el-button circle icon="el-icon-edit" size="mini" type="primary" @click="clickUpdateBtn(index)"></el-button>
          </div>
          <div class="pr5">
            <el-popconfirm
              :title="'可以修改标签文字，确定要删除吗？'"
              cancel-button-text="不用了"
              confirm-button-text="好的"
              icon="el-icon-info"
              icon-color="red"
              @confirm="handleDel(index)"
            >
              <template v-slot:reference>
                <el-button circle icon="el-icon-delete" size="mini" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
        <template v-else>
          <div class="pl-5 pr5">
            <el-input

              v-model="tagName"
              class="input-new-tag"
              size="small"
              @keyup.enter.native="handleUpdate(index)"
              @blur="handleBlur(index)"
            />
          </div>
          <div class="pr5">
            <el-button circle icon="el-icon-close" size="mini" title="取消修改" type="info" @mousedown="preventBlur = true" @click="clickClose(index)"
            ></el-button>
          </div>
          <div class="pr5">
            <el-button circle icon="el-icon-check" size="mini" title="提交修改" type="primary" @mousedown="preventBlur = true"  @click="handleUpdate(index)"></el-button>
          </div>
        </template>
      </div>

    </template>
  </div>

</template>
<script>

import { delTag, updateTag } from '../../../../api/customer_order_goods/guoXue'
import { mapActions } from 'vuex'

export default {
  name: "TagManagement",
  data() {
    return {
      updateIndex: null,
      tagName: "",
      preventBlur: false,
    }
  },
  created() {

  },
  computed: {
    localCollectionTags() {
      return this.$store.state.user.collectionTags
    }
  },
  methods: {
    ...mapActions(['fetchCollectionTags']),
    async handleDel(index) {
      const loading = this.$loading({
        lock: true,
        text: '删除中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      try {
        const tagId = this.localCollectionTags[index].id
        const res = await delTag(tagId)
        if (res.code === 200) {
          await this.fetchCollectionTags()
          this.$emit("updateTag")
        }
      } finally {
        loading.close()
      }
    },
    clickUpdateBtn(index) {
      this.updateIndex = index
      this.tagName = this.localCollectionTags[index].name
      console.log("🚀 ~ file:TagManagement method:clickUpdateBtn line:79 -----", this.updateIndex, index)

    },
    clickClose(index) {
      this.preventBlur = true;
      this.updateIndex = null
      this.tagName = ''
    },
    handleBlur(index) {
      setTimeout(() => {
        if (!this.preventBlur) {
          this.handleUpdate(index);
        }
        this.preventBlur = false; // 重置标志变量
      }, 200)
    },
    async handleUpdate(index) {
      const localName = this.localCollectionTags[index].name
      const id = this.localCollectionTags[index].id
      if (localName === this.tagName || index !== this.updateIndex){
        this.clickClose()
        return
      }
      const data = { id, name: this.tagName }
      const loading = this.$loading({
        lock: true,
        text: '更新中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)'
      });
      try {
        const res = await updateTag(data)
        if (res.code === 200) {
          this.clickClose()
          await this.fetchCollectionTags()
          // this.$emit("updateTag")
        }
      } finally {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-management {
  padding: 20px;
  overflow: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .tag-item {
    display: flex;
    padding: 5px 20px;
  }

  .input-new-tag {
    width: 100px;
  }
}
</style>
