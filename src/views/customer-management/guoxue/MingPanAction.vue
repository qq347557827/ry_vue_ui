<template>
  <div class="action-box">
    <div class="action-left">
      <div class="action-switch">
        <div>关闭时间</div>
        <el-switch :value="closeSolarH" active-color="#13ce66" inactive-color="#ff4949"
                   @change="value => closeChange(value, 'closeSolarH')"
        >
        </el-switch>
      </div>
      <div class="action-switch">
        <div>关闭时辰</div>
        <el-switch :value="closeLunarH" active-color="#13ce66" inactive-color="#ff4949"
                   @change="value => closeChange(value, 'closeLunarH')"
        >
        </el-switch>
      </div>
      <div class="action-switch">
        <div>最后八字</div>
        <el-switch :value="closeBaZhiH" active-color="#13ce66" inactive-color="#ff4949"
                   @change="value => closeChange(value, 'closeBaZhiH')"
        >
        </el-switch>
      </div>
      <div  class="action-switch">
        <div>最后五行</div>
        <el-switch :value="closeWuXinH" active-color="#13ce66" inactive-color="#ff4949"
                   @change="value => closeChange(value, 'closeWuXinH')"
        >
        </el-switch>
      </div>
      <div class="action-switch">
        <el-popconfirm cancel-button-text="不了" confirm-button-text="确认" icon="el-icon-info"
                       icon-color="red" title="确定删除吗？" @confirm="delTable"
        >
          <template slot="reference">
            <el-button size="mini" type="danger">删除</el-button>
            <!--                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>-->
          </template>

        </el-popconfirm>
        <!--                    <el-button size="mini" type="danger" @click="delTable(tableArr, index)">删除</el-button>-->
      </div>
      <div  class="action-switch">
        <el-button size="mini" type="primary" @click="repeatPostGuoxue">查询</el-button>
      </div>
    </div>
    <div class="action-right">
      <div>
        <div  class="action-switch">
          <div>关闭公历</div>
          <el-switch :value="closeSolarRow" active-color="#13ce66" inactive-color="#ff4949"
                     @change="value => closeChange(value, 'closeSolarRow')"
          >
          </el-switch>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { checkAuth } from '../../../utils/authUtils'

export default {
  name: "MingPanAction",
  props: {
    closeSolarH: Boolean,
    closeLunarH: Boolean,
    closeBaZhiH: Boolean,
    closeWuXinH: Boolean,
    closeSolarRow: Boolean,
    actionIndex: Number

  },
  methods: {
    closeChange(value, type) {
      // if (!checkAuth(this)) return;
      console.log("🚀 ~ file:MingPanAction method:closeChange line:75 -----value", value, type)

      this.$emit('closeChange', type, value, this.actionIndex)
    },
    repeatPostGuoxue() {
      this.$emit('repeatPostGuoxue', this.actionIndex)
    },
    delTable() {
      if (!checkAuth(this)) return;
      this.$emit('delTable', this.actionIndex)
    },
  }
}

</script>


<style lang="scss" scoped>
.action-box {
  display: flex;
  .action-left {
    display: flex;
    flex-direction: column;
  }
}
.action-switch {
  display: flex;
  padding: 5px;
  //writing-mode: horizontal-tb; /* 确保水平书写 */
  //white-space: normal; /* 正常换行 */
  // div {
  //  display: flex;
  //}
}
</style>
