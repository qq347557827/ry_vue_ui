<template>
  <div>
    <div v-if="collectItem && collectItem.isCollected" style="color: #E6A23C">
      <i class="el-icon-star-on"></i>
    </div>
    <el-popover v-else v-model="isPopover" placement="right" trigger="click" @show="showPopover" @hide="closeInit">
      <div>
        <div class="tag-main">
          <el-tag v-for="(item, index) in localCollectionTags" :key="index" :effect="item.selected ? 'dark' : 'plain'"
            class="input-new-tag pointer" type="success" @click="toggleTag(item.id)">
            {{ item.name }}
          </el-tag>
        </div>
        <div class="tag-main">
          <el-tag v-for="tag in dynamicTags" :key="tag" :disable-transitions="false" class="input-new-tag" closable
            @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input v-if="inputVisible" ref="saveTagInput" v-model="inputValue" class="input-new-tag" size="small"
            @blur="handleInputConfirm" @keyup.enter.native="handleInputConfirm" />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 标签</el-button>

        </div>
        <div>

        </div>
        <div class="collection-submit">
          <el-button circle icon="el-icon-check" type="success" @click="submitCollection"></el-button>
        </div>
      </div>

      <div slot="reference">
        <el-link type="primary">
          <i class="el-icon-star-off"></i>
          收藏
        </el-link>
      </div>

    </el-popover>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: "CollectionBtn",
  data () {
    return {
      inputVisible: false,
      isPopover: false,
      inputValue: '',
      dynamicTags: [],
      localCollectionTags: []
    }
  },
  props: {
    collectItem: {
      isCollected: Boolean,
      content: String,
      itemKey: String
    }
  },
  created () {
    // 初始化局部状态
    this.initCollectionTags()
  },
  computed: {
    globalCollectionTags () {
      return this.$store.state.user.collectionTags
    }
  },
  methods: {
    ...mapMutations(['TOGGLE_TAG_SELECTION']), // 映射 Vuex Mutation
    initCollectionTags () {
      this.localCollectionTags = this.globalCollectionTags.map(tag => ({
        ...tag,
        selected: false // 动态添加 selected 属性
      }));
    },
    closeInit () {
      this.dynamicTags = []
      this.initCollectionTags()
      // this.isPopover = false
    },

    showPopover () {
      this.dynamicTags = []
      this.initCollectionTags()
    },
    toggleTag (tagId) {
      const tagIndex = this.localCollectionTags.findIndex(tag => tag.id === tagId);
      if (tagIndex !== -1) {
        const tag = this.localCollectionTags[tagIndex];
        this.$set(tag, 'selected', !tag.selected);
        // 使用 Vue.set 来确保响应式更新
        this.$set(this.localCollectionTags, tagIndex, { ...tag });
      }
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    submitCollection () {
      const selectedIds = this.localCollectionTags
        .filter(tag => tag.selected) // 筛选出 selected 为 true 的标签
        .map(tag => tag.id); // 返回它们的 id 数组
      // this.handleSubmitCollectBtn(selectedIds, this.dynamicTags, this.content)
      this.$emit('submitCollection', this.closeInit, selectedIds, this.dynamicTags, this.collectItem)
    }
  }
}
</script>


<style lang="scss" scoped>
.tag-main {
  width: 200px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  width: 90px;
  margin-bottom: 5px;
}

.input-new-tag {
  width: 90px;
  line-height: 30px;
  margin-left: 10px;
  margin-bottom: 5px;
  vertical-align: bottom;
}

.collection-submit {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
