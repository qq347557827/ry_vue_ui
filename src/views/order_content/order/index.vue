<template>
  <div class="app-container">
    <el-tabs v-model="statusTabsActiveName" @tab-click="tabHandleClick">
      <el-tab-pane label="全部订单" name="all"/>
      <el-tab-pane label="待修改" name="modified"/>
      <el-tab-pane label="待审核" name="review"/>
      <el-tab-pane label="待发货" name="pendingShipment"/>
      <el-tab-pane label="已发货" name="Shipped"/>
      <el-tab-pane label="已签收" name="received"/>
      <el-tab-pane label="拒收" name="rejected"/>
      <el-tab-pane label="退款" name="refund"/>
    </el-tabs>
    <el-form v-show="showSearch" ref="queryForm" :inline="true" :model="queryParams" label-width="68px" size="small">
      <el-form-item label="订单编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          clearable
          placeholder="订单编号"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="客户编号" prop="customerId">
        <el-input
          v-model="queryParams.customerId"
          clearable
          placeholder="请输入客户编号"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          clearable
          placeholder="请输入姓名"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input
          v-model="queryParams.phone"
          clearable
          placeholder="请输入手机"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--      <el-form-item label="地址" prop="address">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.address"-->
      <!--          placeholder="请输入地址"-->
      <!--          clearable-->
      <!--          @keyup.enter.native="handleQuery"-->
      <!--        />-->
      <!--      </el-form-item>-->
      <el-form-item label="微信" prop="wechat">
        <el-input
          v-model="queryParams.wechat"
          clearable
          placeholder="请输入微信"
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
      <el-form-item label="是否导出" prop="exportShipment">
        <el-radio-group v-model="radio1" @input="exportShipmentHandle">
          <el-radio-button label="未导出" name="0"></el-radio-button>
          <el-radio-button label="已导出" name="1"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" size="mini" type="primary" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">

      <template v-if="statusTabsActiveName === 'all' || statusTabsActiveName === 'review'">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:order:approval']"
            icon="el-icon-s-check"
            plain
            size="mini"
            type="primary"
            @click="handleApproval"
          >审核
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button
            v-hasPermi="['system:order:approval']"
            icon="el-icon-s-check"
            plain
            size="mini"
            type="danger"
            @click="handleReject"
          >拒绝
          </el-button>
        </el-col>
      </template>

      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:order:add']"
          icon="el-icon-plus"
          plain
          size="mini"
          type="primary"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:order:edit']"
          :disabled="single"
          icon="el-icon-edit"
          plain
          size="mini"
          type="success"
          @click="handleUpdate"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:order:remove']"
          :disabled="multiple"
          icon="el-icon-delete"
          plain
          size="mini"
          type="danger"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:order:export']"
          icon="el-icon-download"
          plain
          size="mini"
          type="warning"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <template v-if="statusTabsActiveName=== 'all' || statusTabsActiveName === 'pendingShipment'">
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:order:import']"
            icon="el-icon-upload2"
            size="mini"
            type="info"
            @click="handleImport"
          >导入发货
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
            v-hasPermi="['system:order:export']"
            icon="el-icon-download"
            plain
            size="mini"
            title="如果没有勾选表格中的订单，默认导出没有导出过的所有待发货订单，如需导出特定待发货订单，请先勾选"
            type="warning"
            @click="handleExportShipment"
          >导出待发货
          </el-button>
        </el-col>
      </template>

      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="orderList" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="55"/>
      <el-table-column align="center" label="订单编号" prop="orderId" width="180">
        <template v-slot="scope">
          <el-link type="primary" @click="handleClickOrderId(scope.row)">{{ scope.row.orderId }}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单类型" prop="orderType">
        <template v-slot="scope">
          <div>{{ orderTypeArr[scope.row.orderType] }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="status">
        <template v-slot="scope">
          <template v-if="scope.row.status==='0'">
            <el-button plain size="mini" type="danger"
                       @click="handleCellUpdate(scope.row)"
            >{{ scope.row.statusName }}
            </el-button>
          </template>
          <!--          <div v-if="scope.row.status==='0'" class="status-modified">{{ scope.row.statusName }}</div>-->
          <div v-else-if="scope.row.status==='1'" class="status-review">{{ scope.row.statusName }}</div>
          <div v-else-if="scope.row.status==='2'" class="status-pending-shipment">{{ scope.row.statusName }}</div>
          <div v-else-if="scope.row.status==='3'" class="status-Shipped">{{ scope.row.statusName }}</div>
          <div v-else-if="scope.row.status==='4'" class="status-brand">{{ scope.row.statusName }}</div>
          <div v-else-if="scope.row.status==='8'" class="status-pending-shipment">{{ scope.row.statusName }}</div>
          <div v-else>{{ scope.row.statusName }}</div>

        </template>

      </el-table-column>
      <!--      <el-table-column label="订单状态" align="center" prop="statusName" :cell-style	="tableCellstyle"	/>-->
      <el-table-column align="center" label="客户编号" prop="customerId"/>
      <el-table-column align="center" label="姓名" prop="name"/>
      <el-table-column align="center" label="手机" prop="phone" width="120"/>
      <el-table-column align="center" label="地址" min-width="280" prop="address"/>
      <el-table-column align="center" label="微信" prop="wechat"/>
      <el-table-column align="center" label="商品数量" prop="orderGoodsList" width="180">
        <template v-slot="scope">
          <div v-for="(item, index) in scope.row.orderGoodsList">
            <div :key="index">{{ item.goodsNameQuantity }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总金额" prop="totalAmount"/>
      <el-table-column align="center" label="定金" prop="deposit"/>
      <el-table-column align="center" label="支付方式" prop="payMethod"/>
      <el-table-column align="center" label="代收金额" prop="collectAmount"/>
      <el-table-column align="center" label="退款金额" prop="refund"/>
      <el-table-column align="center" label="实际金额" prop="actualAmount"/>
      <el-table-column align="center" label="快递公司" prop="expressCompany"/>
      <el-table-column align="center" label="快递单号" prop="trackingNumber"/>
      <el-table-column align="center" label="下单员工" prop="userName"/>
      <el-table-column align="center" label="部门" prop="deptName"/>
      <el-table-column align="center" label="导出发货" prop="exportShipment">
        <template slot-scope="scope">
          <div>{{ scope.row.exportShipment ? scope.row.exportShipment : '未导出' }}</div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="原订单号" prop="oldId"/>
      <el-table-column align="center" class-name="small-padding fixed-width" label="操作">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['system:order:edit']"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            v-hasPermi="['system:order:remove']"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :limit.sync="queryParams.pageSize"
      :page.sync="queryParams.pageNum"
      :total="total"
      @pagination="getList"
    />
    <Editor :dialog="open" :propForm="form"
            :title="title"
            :type="editorType"
            @handleClose="handleCloseDetail"
            @handleSuccess="handleSuccessDetail"
    />
    <el-drawer
      ref="orderDetail"
      :title="detailTitle"
      :visible.sync="isDetail"
      :wrapperClosable="false"
      custom-class="demo-drawer"
      direction="rtl"
      size="50%"
    >
      <div style="background-color: #f7f7f7; height: 100%; width: 100%">

        <detail-box :customer="detailCustomer">
          <template v-slot:after>
            <!--            <div>{{stepsActive}}</div>-->
            <el-steps :active="stepsActive.active" finish-status="success" simple style="margin-top: 20px">
              <template v-for="(title, index) in stepsActive.titleArr">
                <el-step :key="index" :title="title"/>
              </template>


            </el-steps>
            <div class="bgf-pd10">

              <el-descriptions title="订单信息">

                <el-descriptions-item :span="1" label="订单类型">{{
                    orderTypeArr[detailOrder.orderType]
                  }}
                </el-descriptions-item>
                <el-descriptions-item :span="2" label="订单状态">{{ detailOrder.statusName }}</el-descriptions-item>
                <el-descriptions-item :span="1" label="所属部门">{{ detailOrder.deptName }}</el-descriptions-item>
                <el-descriptions-item :span="2" label="创建员工">{{ detailOrder.userName }}</el-descriptions-item>
              </el-descriptions>
              <el-divider content-position="center">收件人信息</el-divider>
              <el-descriptions>
                <el-descriptions-item :span="4" label="客户姓名">{{ detailOrder.name }}</el-descriptions-item>
                <el-descriptions-item :span="4" label="手机号">{{ detailOrder.phone }}</el-descriptions-item>
                <el-descriptions-item :span="4" label="收货地址">{{ detailOrder.address }}</el-descriptions-item>
              </el-descriptions>

              <el-divider content-position="center">商品信息</el-divider>
              <el-table
                :data="detailOrder.orderGoodsList"
                border
                style="width: 100%"
              >
                <el-table-column
                  align="center"
                  label="ID"
                  type="index"
                  width="90"
                />
                <el-table-column
                  label="商品名"
                  prop="goodsName"
                  width="300"
                >
                </el-table-column>
                <el-table-column
                  label="数量"
                  prop="quantity"
                >
                </el-table-column>
              </el-table>
              <el-divider content-position="center">金额信息</el-divider>
              <el-descriptions :column="4">
                <el-descriptions-item :span="4" label="总金额">{{ detailOrder.totalAmount }}</el-descriptions-item>
                <el-descriptions-item :span="1" label="定金">{{ detailOrder.deposit }}</el-descriptions-item>
                <el-descriptions-item :span="1" label="支付方式">{{ detailOrder.payMethod }}</el-descriptions-item>
                <el-descriptions-item v-if="detailOrder.secondaryRevenue" :span="1" label="二次收款">
                  {{ detailOrder.secondaryRevenue }}
                </el-descriptions-item>
                <el-descriptions-item v-if="detailOrder.secondaryRevenueMethod" :span="1" label="二次收款方式">
                  {{ detailOrder.secondaryRevenueMethod }}
                </el-descriptions-item>
                <el-descriptions-item :span="1" label="代收货款">{{ detailOrder.collectAmount }}</el-descriptions-item>
                <el-descriptions-item :span="2" label="快递公司">{{ detailOrder.expressCompany }}</el-descriptions-item>
                <el-descriptions-item :span="2" label="快递单号">{{ detailOrder.trackingNumber }}</el-descriptions-item>
                <el-descriptions-item :span="4" label="订单备注">{{ detailOrder.remark }}</el-descriptions-item>
              </el-descriptions>
            </div>


          </template>
          <template v-slot:action>

            <div v-if="detailOrder.status === '0'" class="bgf-pd10 ml10"
                 @click="handleCellUpdate(detailOrder)"
            >
              <el-link type="primary">修改</el-link>
            </div>
            <template v-if="detailOrder.status==='1'">
              <div class="bgf-pd10 ml10" @click="handleOrderApproval(detailOrder.orderId)">
                <el-link type="primary">审核通过</el-link>
              </div>

            </template>
            <div v-if="detailOrder.status === '1' || detailOrder.status === '2'" class="bgf-pd10 ml10 mt1"
                 @click="handleOrderReject(detailOrder.orderId)"
            >
              <el-link type="primary">踢回修改</el-link>
            </div>
            <div v-if="detailOrder.status === '1' || detailOrder.status === '2'" class="bgf-pd10 ml10 mt1"
                 @click="createSFOrder(detailOrder.orderId)"
            >
              <el-link type="primary">获取顺丰单号</el-link>
            </div>
            <div v-if="detailOrder.status === '1' || detailOrder.status === '2'" class="bgf-pd10 ml10 mt1"
                 @click="searchSFOrder(detailOrder.orderId)"
            >
              <el-link type="primary">查询顺丰单号</el-link>
            </div>
            <div v-if="detailOrder.status === '1' || detailOrder.status === '2'" class="bgf-pd10 ml10 mt1"
                 @click="cancelSFOrder(detailOrder.orderId)"
            >
              <el-link type="primary">取消顺丰单号</el-link>
            </div>
            <div v-if="detailOrder.status === '1' || detailOrder.status === '2'" class="bgf-pd10 ml10 mt1"
                 @click="searchSFRoutes(detailOrder.orderId)"
            >
              <el-link type="primary">查询物流信息</el-link>
            </div>
            <div>
              <el-button
                :loading="printing"
                type="primary"
                @click="handlePrint"
              >
                打印面单
              </el-button>

              <el-dialog
                :visible.sync="showPrinterDialog"
                title="打印机选择"
                width="30%"
              >
                <el-select v-model="selectedPrinter">
                  <el-option
                    v-for="printer in printers"
                    :key="printer.index"
                    :label="printer.name"
                    :value="printer.index"
                  />
                </el-select>
                <span slot="footer">
        <el-button @click="showPrinterDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmPrinter">确定</el-button>
      </span>
              </el-dialog>
            </div>
            <div v-if="detailOrder.status === '2'" class="bgf-pd10 ml10">
              <el-popover
                v-model="isDetailShipment"
                placement="right"
                width="400"
              >
                <template v-slot:reference>
                  <div @click="detailShipmentClick">
                    <el-link type="primary">发货/修改单号</el-link>
                  </div>
                </template>
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="快递公司">
                    <el-select v-model="detailShipmentForm.expressCompany" placeholder="快递公司">
                      <el-option
                        v-for="item in order.sysExpressCompany"
                        :key="item.dictCode"
                        :label="item.dictLabel"
                        :value="item.dictLabel"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="快递单号">
                    <el-input v-model="detailShipmentForm.trackingNumber" placeholder="请输入快递单号"/>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="detailShipmentOnSubmit">确认</el-button>
                    <el-button @click="detailShipmentOnCanel">取消</el-button>
                  </el-form-item>
                </el-form>

              </el-popover>

            </div>
            <template v-if="detailOrder.status === '3'">
              <div class="bgf-pd10 ml10 mt1">
                <el-popover
                  v-model="isDetailSecondaryRevenue"
                  placement="right"
                  width="400"
                >
                  <template v-slot:reference>
                    <div @click="detailSecondaryRevenueClick">
                      <el-link type="primary">二次收款</el-link>
                    </div>
                  </template>
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="收款方式">
                      <el-select v-model="detailSecondaryRevenueForm.secondaryRevenueMethod"
                                 placeholder="请输入二次收款方式"
                      >
                        <el-option
                          v-for="item in order.sysPayMethod"
                          :key="item.dictCode"
                          :label="item.dictLabel"
                          :value="item.dictLabel"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="二次收款">
                      <el-input v-model="detailSecondaryRevenueForm.secondaryRevenue" placeholder="请输入二次收款金额"/>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="detailSecondaryRevenueOnSubmit">确认</el-button>
                      <el-button @click="detailSecondaryRevenueOnCanel">取消</el-button>
                    </el-form-item>
                  </el-form>

                </el-popover>

              </div>
              <div class="bgf-pd10 ml10 mt1">
                <el-link type="primary">确认签收</el-link>
              </div>
              <div class="bgf-pd10 ml10 mt1">
                <el-link type="primary">补发产品</el-link>
              </div>
              <div class="bgf-pd10 ml10 mt1">
                <el-link type="primary">从新发货</el-link>
              </div>
              <div class="bgf-pd10 ml10 mt1">
                <el-link type="primary">拒收</el-link>
              </div>
            </template>
            <div v-if="detailOrder.status === '3' || detailOrder.status === '4'" class="bgf-pd10 ml10 mt1">
              <el-link type="primary">退差价</el-link>
            </div>
            <div
              v-if="detailOrder.status === '3' || detailOrder.status ==='4'|| detailOrder.status ==='5'|| detailOrder.status ==='8'"
              class="bgf-pd10 ml10 mt1"
            >
              <el-link type="primary">退款</el-link>
            </div>


          </template>

        </detail-box>
      </div>

    </el-drawer>

    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px">
      <el-upload
        ref="upload"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :auto-upload="false"
        :disabled="upload.isUploading"
        :headers="upload.headers"
        :limit="1"
        :on-error="handleFileError"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        accept=".xlsx, .xls"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">
          <el-checkbox v-model="upload.updateSupport"/>
          是否更新已经存在的用户数据
          <el-link style="font-size:12px" type="info" @click="importTemplate">下载模板</el-link>
        </div>
        <div slot="tip" class="el-upload__tip" style="color:red">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  approvalOrderIds,
  approvalRejectByOrderId,
  delOrder,
  getOrder,
  listOrder,
  rejectOrderIds,
  secondaryRevenueOrder,
  shipmentOrder
} from '@/api/customer_order_goods/order'
import { formatDateStr } from '@/utils'
import { mapGetters, mapState } from 'vuex'

import { getToken } from '@/utils/auth'
import Editor from '@/views/order_content/editor/editor.vue'
import DetailBox from '@/views/components/detailBox/index.vue'
import { getCustomer } from '@/api/customer_order_goods/customer'
import { cancelSFOrder, createSFOrder, querySFOrder } from '../../../api/customer_order_goods/order'
import { initSfPrint, printWaybill } from '../../../utils/sfPrint'

const statusTabsActiveNameMap = new Map([['all', null], ['modified', 0], ['review', 1], ['pendingShipment', 2], ['Shipped', 3], ['received', 4], ['rejected', 5], ['refund', 6]])

export default {
  name: 'Order',
  components: { DetailBox, Editor },
  data() {
    return {
      printing: false,
      showPrinterDialog: false,
      printers: [],
      selectedPrinter: null,
      // 顺丰打印相关

      // exportShipment单选框
      exportShipmentLabelArr: ['未导出', '已导出'],
      statusColor: ['.status-danger', '.status-Warning', '.status-success', '.status-success', '.status-brand', '.status-success'],
      radio1: '',
      // tab选中值
      statusTabsActiveName: 'all',
      loading: true,
      // 选中数组
      ids: [],
      isApproval: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 订单表格数据
      orderList: [],
      // 弹出层标题
      editorType: '',
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      detailTitle: '订单详情',
      isDetail: false,
      detailCustomer: {},
      detailOrder: {},
      detailShipmentForm: {
        expressCompany: null,
        trackingNumber: null
      },
      isDetailShipment: false,
      detailSecondaryRevenueForm: {
        secondaryRevenue: null,
        secondaryRevenueMethod: null
      },
      isDetailSecondaryRevenue: false,

      orderTypeArr: ['预定单', '正常订单', '从发订单', '补发订单', '退款单'],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        status: null,
        customerId: null,
        name: null,
        phone: null,
        address: null,
        wechat: null,
        goodsId: null,
        quantity: null,
        totalAmount: null,
        deposit: null,
        collectAmount: null,
        refund: null,
        actualAmount: null,
        exportShipment: null,
        orderType: null,
        oldId: null,
        sourceChannel: null
      },
      // 商品表
      goodsNumData: {},
      // 表单参数
      form: {},

      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {
          Authorization: 'Bearer ' + getToken(),
          'Content-Type': 'application/json;charset=utf-8'
        },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/system/order/importData'
      }
    }
  },
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState(['order']),
    stepsActive() {
      const status = this.detailOrder.status
      let active = 0
      let titleArr = []
      if (status === '0') {
        titleArr = ['待修改']
      } else if (status === '1') {
        titleArr = ['待审核', '待发货', '待签收']
      } else if (status === '2') {
        titleArr = ['已审核', '待发货', '待签收']
        active = 1
      } else if (status === '3') {
        titleArr = ['已审核', '已发货', '待签收']
        active = 2
      } else if (status === '4') {
        titleArr = ['已审核', '已发货', '已签收']
        active = 3
      } else if (status === '5') {
        titleArr = ['已审核', '已发货', '拒收']
        active = 3
      } else if (status === '6') {
        titleArr = ['已审核', '已发货', '已签收', '退货']
        active = 4
      } else if (status === '8') {
        titleArr = ['预定', '等发货', '待签收']
        active = 1
      }
      return { active, titleArr }
    },

    statusClass() {
      return this.statusColor[1]
    }

  },
  created() {
    this.getList()

  },
  mounted() {
    // 初始化插件（替换实际 partnerID）
    if (!window.sfPrinter) {
      initSfPrint();
    }

    // 获取打印机列表
    window.sfPrinter.getPrinters()
      .then(printers => {
        this.printers = printers;
      })
      .catch(error => {
        console.error('获取打印机失败:', error);
      });
  },
  methods: {
    async handlePrint() {
      try {
        const token = await this.$store.dispatch('order/getSfToken');
        const result = await window.sfPrinter.print({
          requestID: `PRINT_${Date.now()}`,
          accessToken: token,
          templateCode: 'fm_76165_standard2_YNR1URDE',
          documents: [{ masterWaybillNo: this.detailOrder.trackingNumber }]
        });

        if (result.code === 1) {
          console.log('打印任务已推送');
        }
      } catch (error) {
        console.error('打印失败:', error);
      }
    },
    // async loadPrinters() {
    //   try {
    //     this.printers = await window.SCPPrint.getPrinters();
    //   } catch (error) {
    //     this.$message.error('获取打印机失败');
    //   }
    // },
    //
    // async handlePrint() {
    //   this.printing = true;
    //   try {
    //     // 获取 accessToken（假设已实现）
    //     const token = await this.$store.dispatch('getSfToken');
    //
    //     // 打印参数
    //     const params = {
    //       accessToken: token,
    //       templateCode: 'fm_76130_standard_xxx', // 实际模板编码
    //       waybillNo: this.detailOrder.trackingNumber            // 实际运单号
    //     };
    //
    //     await printWaybill(params);
    //     this.$message.success('打印任务已发送');
    //   } catch (error) {
    //     if (error.downloadUrl) {
    //       this.showPrinterDialog = true;
    //     } else {
    //       this.$message.error(error.message);
    //     }
    //   } finally {
    //     this.printing = false;
    //   }
    // },

    confirmPrinter() {
      if (this.selectedPrinter) {
        window.SCPPrint.setPrinter(this.selectedPrinter);
        this.$message.success('打印机已切换');
        this.showPrinterDialog = false;
      }
    },



    /** tab点击操作 */
    tabHandleClick(data) {
      console.log('tabHandleClickvalue', data)
      // 获取index - 1 如果小于0  那说明是全部数据
      const s = data.index - 1
      if (s < 0) {
        this.$set(this.queryParams, 'status', '')
      } else {
        this.$set(this.queryParams, 'status', s)
      }
      this.handleQuery()
    }
    ,
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '用户导入'
      this.upload.open = true
    }
    ,
    /** 下载模板操作 */
    importTemplate() {
      importTemplate().then(response => {
        this.download(response.msg)
      })
    }
    ,
// 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true
    }
    ,
// 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true })
      this.getList()
    }
    ,
// 文件上传处理
    handleFileError(response, file, fileList) {
      this.upload.open = false
      this.upload.isUploading = false
      this.$refs.upload.clearFiles()
      this.$alert(response.msg, '导入结果', { dangerouslyUseHTMLString: true })
      this.getList()
    }
    ,
// 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit()
    }
    ,
    /** 查询订单列表 */
    getList() {
      this.loading = true
      listOrder(this.queryParams).then(response => {
        this.orderList = response.rows
        this.total = response.total
        this.loading = false
      })
    }
    ,

    /** 订单分类切换tab */
    exportShipmentHandle(value) {
      const idx = this.exportShipmentLabelArr.indexOf(value)
      console.log(value)
      console.log('value--idx', idx)
      this.$set(this.queryParams, 'exportShipment', idx)
      this.handleQuery()
    }
    ,
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    }
    ,
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
      this.radio1 = ''
    }
    ,
// 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.orderId)
      this.isApproval = selection.every(item => item.status === '1')
      console.log('this.isApproval', this.isApproval)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    }
    ,
    handleClickOrderId(row) {
      console.log(row)
      this.isDetail = true
      getCustomer(row.customerId).then(res => {
        console.log(res)
        this.detailCustomer = res.data
      })
      this.detailOrder = row
    }
    ,
// 审核拒绝通用方法
    approvalRejectUtils(fn) {
      // 判断有无选中订单
      if (this.ids.length > 0) {
        // 判断是否都为待审核订单
        if (this.isApproval) {
          console.log('全为待审核订单')
          fn(this.ids).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.$modal.msg('批量审核成功')
              this.getList()
            }
          }).catch()
        } else {
          this.$modal.msg('选中订单含有非待审核订单')
        }
      } else {
        this.$modal.msg('没有选中订单')
      }
    }
    ,
// 批量审核订单
    handleApproval() {
      this.approvalRejectUtils(approvalOrderIds)
    }
    ,

// 批量拒绝订单
    handleReject() {
      this.approvalRejectUtils(rejectOrderIds)
    }
    ,
// 单个审核
    handleOrderApproval(orderId) {
      console.log('orderId', orderId)
      approvalRejectByOrderId({ orderId, status: '2' }).then(res => {
        console.log(res)
        if (res) {
          this.$modal.msg('审核成功')
          this.getList()
          this.isDetail = false
        }
      }).catch(err => console.log(err))
    }
    ,

// 单个拒绝
    handleOrderReject(orderId) {
      approvalRejectByOrderId({ orderId, status: '0' }).then(res => {
        console.log(res)
        if (res) {
          this.$modal.msg('踢回成功')
          this.getList()
          this.isDetail = false
        }
      }).catch(err => console.log(err))
    }
    ,
    /** 详情页发货点击 */
    detailShipmentClick() {
      console.log('detailShipmentClick', this.isDetailShipment)
      this.$set(this.detailShipmentForm, 'expressCompany', this.detailOrder.expressCompany)
      this.$set(this.detailShipmentForm, 'trackingNumber', this.detailOrder.trackingNumber)
      // this.isDetailShipment = false
    }
    ,
    /** 获取顺丰单号 */
    createSFOrder(orderId) {
      createSFOrder({ orderId }).then(res => {
        // detailOrder
        console.log("🚀 ~ file:index method: line:840 -----")
        if (res.code === 200) {
          const trackingNumber = res.data.trackingNumber
          this.$set(this.detailOrder, "trackingNumber", trackingNumber)
          this.$set(this.detailOrder, "expressCompany", '顺丰快递')
          this.$modal.msg(`获取单号成功${trackingNumber}`)
        }
      }).catch(err => console.log(err))
    }
    ,
    /** 查询顺丰单号 */
    searchSFOrder(orderId) {
      console.log("🚀 ~ file:index method:searchSFOrder line:873 -----orderId", orderId)

      querySFOrder(orderId).then(res => {
        // detailOrder
        console.log("🚀 ~ file:index method: line:840 -----")
        if (res.code === 200) {
          const trackingNumber = res.data.trackingNumber
          this.$set(this.detailOrder, "trackingNumber", trackingNumber)
          this.$set(this.detailOrder, "expressCompany", '顺丰快递')
          this.$modal.msg(`获取单号成功${trackingNumber}`)
        }
      }).catch(err => console.log(err))
    }
    ,
    /** 取消顺丰单号 */
    cancelSFOrder(orderId) {
      cancelSFOrder(orderId).then(res => {
        // detailOrder
        console.log("🚀 ~ file:index method: line:840 -----")
        if (res.code === 200) {
          const trackingNumber = res.data.trackingNumber
          this.$set(this.detailOrder, "trackingNumber", trackingNumber)
          this.$set(this.detailOrder, "expressCompany", '顺丰快递')
          this.$modal.msg(`获取单号成功${trackingNumber}`)
        }
      }).catch(err => console.log(err))
    }
    ,
    /** 详情页发货提交 */
    async detailShipmentOnSubmit() {
      if (this.detailShipmentForm.expressCompany && this.detailShipmentForm.trackingNumber) {
        const data = {
          orderId: this.detailOrder.orderId,
          expressCompany: this.detailShipmentForm.expressCompany,
          trackingNumber: this.detailShipmentForm.trackingNumber
        }
        try {
          const res = await shipmentOrder(data)
          if (res) {
            this.$modal.msg('发货成功')
            this.$set(this.detailOrder, 'expressCompany', this.detailShipmentForm.expressCompany)
            this.$set(this.detailOrder, 'trackingNumber', this.detailShipmentForm.trackingNumber)
            this.$set(this.detailOrder, 'status', '3')
            this.getList()
            this.detailShipmentForm = {}
            this.isDetailShipment = false
          } else {
            this.$modal.msg('发货失败')
          }
        } catch (err) {
          this.$modal.msg('发货失败')
        }

      }
    }
    ,
    /** 详情页发货取消 */
    detailShipmentOnCanel() {
      console.log('detailShipmentOnCanel')
      this.isDetailShipment = false
      this.detailShipmentForm = {}
    }
    ,
    /** 二次收款点击 */
    detailSecondaryRevenueClick() {
      console.log('detailShipmentClick', this.isDetailShipment)
      this.$set(this.detailSecondaryRevenueForm, 'secondaryRevenue', this.detailOrder.secondaryRevenue)
      this.$set(this.detailSecondaryRevenueForm, 'secondaryRevenueMethod', this.detailOrder.secondaryRevenueMethod)
      // this.isDetailShipment = false
    }
    ,
    /** 二次收款提交 */
    async detailSecondaryRevenueOnSubmit() {
      if (this.detailSecondaryRevenueForm.secondaryRevenue && this.detailSecondaryRevenueForm.secondaryRevenueMethod) {
        const data = {
          orderId: this.detailOrder.orderId,
          secondaryRevenue: this.detailSecondaryRevenueForm.secondaryRevenue,
          secondaryRevenueMethod: this.detailSecondaryRevenueForm.secondaryRevenueMethod
        }
        try {
          const res = await secondaryRevenueOrder(data)
          if (res) {
            this.$modal.msg('成功')
            this.$set(this.detailOrder, 'secondaryRevenue', this.detailSecondaryRevenueForm.secondaryRevenue)
            this.$set(this.detailOrder, 'secondaryRevenueMethod', this.detailSecondaryRevenueForm.secondaryRevenueMethod)
            this.getList()
            this.detailSecondaryRevenueForm = {}
            this.isDetailSecondaryRevenue = false
          } else {
            this.$modal.msg('失败')
          }
        } catch (err) {
          this.$modal.msg('失败')
        }

      }
    }
    ,
    /** 二次收款取消 */
    detailSecondaryRevenueOnCanel() {
      console.log('detailShipmentOnCanel')
      this.isDetailSecondaryRevenue = false
      this.detailSecondaryRevenueForm = {}
    }
    ,
    /** 新增按钮操作 */
    handleAdd() {
      // this.$tab.openPage("个人中心", "/user/profile");
      // this.reset()
      this.open = true
      this.title = '添加订单'
      // console.log("mapGetters(['goodsList'])", goodsList)
    }
    ,
    /** 修改按钮操作 */
    handleUpdate(row) {
      // this.reset()
      const orderId = row.orderId || this.ids
      getOrder(orderId).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改订单'
        this.editorType = 'updateOrder'
      })
    }
    ,

    /** 修改单个按钮操作 */
    handleCellUpdate(row) {
      console.log('row', row)
      this.form = row
      // this.isUpdateOrder = true
      this.open = true
      this.title = '修改订单'
      this.editorType = 'updateOrder'
    }
    ,

    /** 删除按钮操作 */
    handleDelete(row) {
      const orderIds = row.orderId || this.ids
      this.$modal.confirm('是否确认删除订单编号为"' + orderIds + '"的数据项？').then(function() {
        return delOrder(orderIds)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {
      })
    }
    ,
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/order/export', {
        ...this.queryParams
      }, `order_${new Date().getTime()}.xlsx`)
    }
    ,
    /** 导出待发货操作 */
    handleExportShipment() {
      console.log(123)
      const str = formatDateStr()
      console.log(str)
      if (this.ids.length > 0) {
        const flg = this.ids.some(id => {
          const arr = this.orderList.filter(item => item.orderId === id)
          return arr[0].status !== '2'
        })
        if (flg) {
          this.$alert('勾选订单中有非待发货的订单')
        } else {
          this.download('system/order/export_shipment', {
            ...this.queryParams,
            searchIds: this.ids
          }, `待发货_${str}.xlsx`)
        }
      } else {
        this.download('system/order/export_shipment', {
          ...this.queryParams
        }, `待发货_${str}.xlsx`)
      }
    }
    ,
    handleCloseDetail(v) {
      this.open = false
      this.editorType = ''
      // this.isUpdateOrder = false
    }
    ,
    handleSuccessDetail() {
      this.handleCloseDetail()
      this.getList()
    }
  }
}
</script>

<style>
.order-title {
  background-color: #f8f8f8;
  padding: 16px 16px;
  margin-bottom: 1em;
  font-size: 16px;
  font-weight: 500;
}

.status-review {
  background-color: #E6A23C;
  color: #FFFFFF;
}

.status-pending-shipment {
  background-color: #A8CB42;
  color: #FFFFFF;
}

.status-Shipped {
  background-color: #67C23A;
  color: #FFFFFF;
}

.status-brand {
  background-color: #409EFF;
  color: #FFFFFF;
}

.status-modified {
  background-color: #F56C6C;
  color: #FFFFFF;
}

.card-box {
  display: flex;
}
</style>
