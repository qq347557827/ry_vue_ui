
<template>
  <div>
    <el-card class="box-card cardW">
      <div slot="header" class="clearfix">
        <el-input v-model="searchVal" clearable placeholder="搜索名字" style="width: 260px"
                  @change="changeSearch"
        />
        <!--                    <el-popconfirm confirm-button-text="确认" cancel-button-text="不了" icon="el-icon-info"-->
        <!--                                   icon-color="red"-->
        <!--                                   title="确定清空吗？" @confirm="clearAllList"-->
        <!--                    >-->
        <!--                      <template slot="reference">-->
        <!--                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>-->
        <!--                      </template>-->

        <!--                    </el-popconfirm>-->
        <!--                <el-button style="float: right; padding: 3px 0" type="text" @click="clearAllList">清空</el-button>-->
      </div>
      <template v-if="queryList.length >= 1">
        <div v-for="(item, index) in queryList" :key="index" class="text item">
          <div>
            <el-link type="primary" @click="cardClick(item)">
              <div v-for="(data, idx) in item.table" :key="idx">
                {{
                  data.form.name + '--' + (data.form.isSolar ? '公历' : '农历') + data.form.nian + '年' +
                  (data.form.isLeapMonth ? '闰' : '') + data.form.yue + '月' + data.form.ri + '日' +
                  (data.form.hh
                    ?
                    data.form.hh : '')
                }}
              </div>
            </el-link>
            <el-popconfirm cancel-button-text="不了" confirm-button-text="确认" icon="el-icon-info"
                           icon-color="red" title="确定删除吗？" @confirm="deleteList(item.key)"
            >
              <template slot="reference">
                <el-link style="float: right" type="danger"><i class="el-icon-delete"></i></el-link>
              </template>

            </el-popconfirm>

          </div>
          <el-divider></el-divider>
        </div>
      </template>
      <template v-else>
        <el-empty description="暂无数据"></el-empty>

      </template>
      <div>
        <el-pagination :current-page="page" :page-size="limit" :total="total" layout="prev, pager, next"
                       small @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script >
export default {
  name: "QueryList",
  props: {
    queryList: Array,
    searchVal: String,
    page: Number,
    limit: Number,
    total: Number,
  },
  methods: {
    changeSearch() {
      this.$emit('changeSearch')

    },
    cardClick(key) {
      this.$emit('deleteList', key)

    },
    deleteList(key) {
      this.$emit('deleteList', key)

    },
    currentChange(page) {
      this.$emit('currentChange', page)
    },
  }
}
</script>

<style scoped lang="scss">

</style>
