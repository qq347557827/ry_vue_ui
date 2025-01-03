<template>
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
  </div>
</template>

<script>
export default {
  name: "CollectionTags",
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  props: {
    localCollectionTags: {
      type: Array,
      required: true,
      validator (value) {
        // 验证传递过来的数组中的每个元素是否符合要求
        return value.every(item =>
          item.hasOwnProperty('id') &&
          typeof item.id === 'number' &&
          item.hasOwnProperty('name') &&
          typeof item.name === 'string' &&
          item.hasOwnProperty('selected') &&
          typeof item.selected === 'boolean'
        );
      }
    },
    dynamicTags: Array,

  },
  methods: {
    toggleTag (tagId) {
      this.$emit('toggleTag', tagId)
    },
    handleClose (tag) {
      this.$emit('handleClose', tag)
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
        this.$emit('handleInputConfirm', inputValue)

      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }
}
</script>

<style lang="scss" scoped>
//.tag-main {
//  width: 200px;
//  display: flex;
//  flex-wrap: wrap;
//  align-content: center;
//}

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
