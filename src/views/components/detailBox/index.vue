<template>
  <div class="detail bgc">
    <el-row >
      <el-col :span="18" >
        <div class="grid-content bg-purple-dark">
          <div class="bgf-pd10 mb10" >
            <el-descriptions title="用户信息">
              <el-descriptions-item label="客户姓名">{{ customer.nabla }}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{ customer.phone }}</el-descriptions-item>
              <el-descriptions-item label="微信">{{ customer.wechat }}</el-descriptions-item>
              <el-descriptions-item label="添加时间"> {{ customer.wechatDate }}</el-descriptions-item>
              <el-descriptions-item label="添加方式"> {{ customer.sourceChannel }}</el-descriptions-item>
              <el-descriptions-item label="年龄"> {{ customer.age }}</el-descriptions-item>
              <el-descriptions-item label="身高"> {{ customer.height }}</el-descriptions-item>
              <el-descriptions-item label="体重"> {{ customer.weight }}</el-descriptions-item>
              <el-descriptions-item label="减"> {{ customer.loseWeight }}</el-descriptions-item>
              <el-descriptions-item label="联系地址" :span="4"> {{ customer.address }}</el-descriptions-item>
              <el-descriptions-item label="客户备注" :span="4">{{ customer.remark }} </el-descriptions-item>
            </el-descriptions>
          </div>
          <slot name="after">
            <div ></div>
          </slot>
        </div>


      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <slot name="action"></slot>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DetailBox',
  props: {
    customer: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>


<style scoped lang="scss">
.detail {
  background-color: #f7f7f7;
}
.bgc {

  padding: 10px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    height: 100%;
    background-color: #f7f7f7;
  }
}
.grid-content {

}
</style>
