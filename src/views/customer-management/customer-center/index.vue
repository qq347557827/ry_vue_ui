<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="客户姓名">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入客户姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信">
        <el-input
          v-model="queryParams.wechat"
          placeholder="请输入微信"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="来源渠道">
        <el-select v-model.number="queryParams.sourceChannel" placeholder="来源渠道">
          <el-option
            v-for="item in order.sysSourceChannel"
            :key="item.dictCode"
            :label="item.dictLabel"
            :value="item.dictLabel"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省份">
        <el-input
          v-model="queryParams.province"
          placeholder="请输入省份"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="城市">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入城市"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区县">
        <el-input
          v-model="queryParams.district"
          placeholder="请输入区县"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="员工ID">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入员工ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="部门ID">
        <el-input
          v-model="queryParams.deptId"
          placeholder="请输入部门ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker clearable
                        v-model="queryParams.wechatDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择添加时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker clearable
                        v-model="queryParams.createDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择创建时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:customer:add']"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:customer:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:customer:remove']"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:customer:export']"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="customerList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column label="customer_id" align="center" prop="id"/>
      <el-table-column label="客户姓名" align="center" prop="name"/>
      <el-table-column label="手机号码" align="center" prop="phone"/>
      <el-table-column label="微信" align="center" prop="wechat"/>
      <el-table-column label="身高" align="center" prop="height"/>
      <el-table-column label="年龄" align="center" prop="age"/>
      <el-table-column label="体重" align="center" prop="weight"/>
      <el-table-column label="减" align="center" prop="loseWeight"/>
      <el-table-column label="省份" align="center" prop="province"/>
      <el-table-column label="城市" align="center" prop="city"/>
      <el-table-column label="区县" align="center" prop="district"/>
      <el-table-column label="详细地址" align="center" prop="address"/>
      <el-table-column label="员工" align="center" prop="userName"/>
      <el-table-column label="部门" align="center" prop="deptName"/>
      <el-table-column label="添加时间" align="center" prop="wechatDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.wechatDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleAddOrder(scope.row)"
            v-hasPermi="['system:customer:add']"
          >下单
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:customer:edit']"
          >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:customer:remove']"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <Editor :dialog="open" :title="title"
            :type="editorType"
            :propForm="customerForm"
            @handleClose="handleCloseDetail"
            @handleSuccess="handleSuccessDetail"
    />
  </div>
</template>

<script>
import {
  listCustomer,
  getCustomer,
  delCustomer,
  addCustomer,
  updateCustomer
} from '@/api/customer_order_goods/customer'
import Address from '@/views/order_content/editor/address.vue'
import CreateCustomer from '@/views/customer-management/createCustomer.vue'
import RecipientDetails from '@/views/order_content/editor/recipientDetails.vue'
import store from '@/store'
import { mapState } from 'vuex'
import Editor from '@/views/order_content/editor/editor.vue'

export default {
  name: 'Customer',
  components: { Editor, RecipientDetails, CreateCustomer, Address },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 【请填写功能名称】表格数据
      customerList: [],
      formLabelWidth: '80px',
      // 弹出层标题
      title: '新增客户信息',
      // 是否显示弹出层
      open: false,
      editorType: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        phone: null,
        wechat: null,
        age: null,
        height: null,
        weight: null,
        loseWeight: null,
        province: null,
        city: null,
        district: null,
        address: null,
        userId: null,
        deptId: null,
        wechatDate: null,
        createDate: null
      },
      // 表单参数
      customerForm: {},
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapState(['order'])
  },

  methods: {
    /** 查询【请填写功能名称】列表 */
    getList() {
      this.loading = true
      listCustomer(this.queryParams).then(response => {
        this.customerList = response.rows
        this.total = response.total
        this.loading = false
      })
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    handleAdd() {
      this.open = true
      this.title = '添加客户资料'
      this.editorType = 'addCustomer'
    },
    /** 新增订单操作 */
    handleAddOrder(row) {
      this.title = '新增订单'
      this.customerForm = row
      this.open = true
      this.editorType = 'customerToAddOrder'
    },
    // 关闭Detail drawer
    handleCloseDetail() {
      this.open = false
      this.editorType = ''
    },
    // Detail drawer新增成功回调
    handleSuccessDetail() {
      this.open = false
      this.editorType = ''
      this.getList()
    },
    handleUpdate(row) {
      const id = row.id || this.ids
      getCustomer(id).then(response => {
        this.customerForm = response.data
        this.open = true
        this.title = '修改客户资料'
        this.editorType = 'updateCustomer'
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + ids + '"的数据项？').then(function() {
        return delCustomer(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/customer/export', {
        ...this.queryParams
      }, `customer_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
