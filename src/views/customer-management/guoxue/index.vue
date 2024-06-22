<template xmlns="">
  <div class="guoxue">
    <div class="search">
      <template v-if="isMobile">
        <el-form :model="form" :rules="rules" ref="ruleForm" class="demo-ruleForm">
          <el-row type="flex" class="row-bg">
            <el-col :span="11">
              <el-form-item label="姓名" label-width="42px">
                <el-input v-model.trim="form.name" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公历" label-width="42px">
                <el-switch v-model="form.isSolar"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="四季" label-width="42px">
                <el-switch v-model="isShiJi" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>

            <!--          <el-col :span="4">-->
            <!--            <el-form-item label="性别">-->
            <!--              <el-radio-group v-model="form.sex">-->
            <!--                <el-radio label="男"></el-radio>-->
            <!--                <el-radio label="女"></el-radio>-->
            <!--              </el-radio-group>-->
            <!--            </el-form-item>-->
            <!--          </el-col>-->
          </el-row>
          <el-row class="row-bg">
            <el-col :span="6">
              <el-form-item prop="nian">
                <el-select v-model="form.nian" filterable placeholder="年" @change="changeYueSelect">
                  <el-option v-for="item in 100" :key="item" :label="item + 1924" :value="item + 1924">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item prop="yue">
                <el-select v-model="form.yue" placeholder="月">
                  <el-option v-for="item in months" :key="item.value" :label="item.lable" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="闰" label-width="18px">
                <el-switch v-model="form.isLeapMonth"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item prop="ri">
                <el-select v-model="form.ri" placeholder="日">
                  <el-option v-for="item in 31" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="form.hh" placeholder="时" clearable>
                  <el-option v-for="item in timeArr" :key="item.time" :label="item.timeStr" :value="item.time">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-link type="primary" style="font-size:medium" @click="handleIsDrawer">列表<i
                  class="el-icon-s-unfold"></i></el-link>
              <el-drawer :visible.sync="isDrawer" direction="ltr" size="90%" :show-close="false">
                <template v-slot:title>
                  <div class="clearfix">
                    <el-input v-model="searchVal" @change="changeSearch" clearable placeholder="搜索名字"
                      style="width: 260px" />
                    <el-popconfirm confirm-button-text="确认" cancel-button-text="不了" icon="el-icon-info" icon-color="red"
                      title="确定清空吗？" @confirm="clearAllList">
                      <template slot="reference">
                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>
                      </template>

                    </el-popconfirm>
                  </div>
                </template>
                <el-card class="box-card">
                  <!-- <div slot="header" class="clearfix"> -->

                  <!--                <el-button style="float: right; padding: 3px 0" type="text" @click="clearAllList">清空</el-button>-->
                  <!-- </div> -->
                  <div>
                    <template v-if="list.length > 0">
                      <div v-for="(item, index) in list" :key="index" class="text item">
                        <div>
                          <el-link type="primary" @click="cardClick(item)">
                            <div v-for="(data, idx) in item.table" :key="idx">
                              {{
                                data.form.name + '--' + (data.form.isSolar ? '公历' : '农历') + data.form.nian + '年' +
                                (data.form.isLeapMonth ? '闰' : '') + data.form.yue + '月' + data.form.ri + '日' +
                                (data.form.hh
                                  ? data.form.hh : '')
                              }}
                              <!--                      {{data}}-->
                            </div>
                            <!--                    {{item.key}}-->
                          </el-link>
                          <el-popconfirm confirm-button-text="确认" cancel-button-text="不了" icon="el-icon-info"
                            icon-color="red" title="确定删除吗？" @confirm="deleteList(item.key)">
                            <template slot="reference">
                              <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>
                            </template>

                          </el-popconfirm>


                        </div>
                        <el-divider></el-divider>
                      </div>
                    </template>
                    <div v-else>
                      无
                      <el-empty description="无数据"></el-empty>
                    </div>
                    <div>
                      <el-pagination small layout="prev, pager, next" :total="total" :page-size="limit"
                        :current-page="page" @current-change="currentChange">
                      </el-pagination>
                    </div>

                  </div>

                </el-card>
                <el-button slot="reference">列表</el-button>
              </el-drawer>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="onSubmit('add')" :disabled="tableArr.length < 1">增加
              </el-button>
            </el-col>
            <el-col :span="5">
              <el-button @click="reset">取消</el-button>
              <!-- <el-button @click="test">test</el-button> -->

            </el-col>
            <el-col :span="4">
              <el-popover placement="bottom" width="120">
                <div v-for="(item, index) in tableArr" :key="index" style="margin-bottom: 12px">
                  <div class="mobile-action">
                    <div class="">
                      <span>关闭时间</span>
                      <el-switch v-model="item.closeSolarH" @change="closeChange" active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </div>
                    <div>
                      <span>关闭时辰</span>
                      <el-switch v-model="item.closeLunarH" @change="closeChange" active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </div>
                    <div>
                      <span>最后八字</span>
                      <el-switch v-model="item.closeBaZhiH" @change="closeChange" active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </div>
                    <div>
                      <span>最后五行</span>
                      <el-switch v-model="item.closeWuXinH" @change="closeChange" active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                    </div>
                    <!--                  <div>-->
                    <!--                    <el-button size="mini" type="primary" @click="updateTableForm(index)">修改</el-button>-->
                    <!--                  </div>-->
                    <div>
                      <el-popconfirm confirm-button-text="确认" cancel-button-text="不了" icon="el-icon-info"
                        icon-color="red" title="确定删除吗？" @confirm="delTable(tableArr, index)">
                        <template slot="reference">
                          <el-button size="mini" type="danger">删除</el-button>
                          <!--                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>-->
                        </template>

                      </el-popconfirm>
                      <!--                    <el-button size="mini" type="danger" @click="delTable(tableArr, index)">删除</el-button>-->
                    </div>
                    <div>
                      <el-button size="mini" type="primary" @click="repeatPostGuoxue(item)">查询</el-button>
                    </div>
                  </div>
                </div>
                <el-button slot="reference">操作</el-button>
              </el-popover>
            </el-col>

          </el-row>

        </el-form>
        <el-col :span="24">
          <div style="width: 100%">
            <!--            <div v-html="tableHtml" id="table-html" style="background-color: red"></div>-->
            <div style="overflow-x: auto">
              <table class="heavier-text main" style="width: 760px;" id="table-val" v-show="tableArr.length > 0">
                <tbody v-for="(item, index) in tableArr" :key="index" class="tbody-val">
                  <tr>
                    <td width="7%" rowspan="5" bgcolor="#FFFFFF" class="new no-internal-borders vertical-text">
                      <b v-if="item.name.length < 3">
                        <template v-for="(str, idx) in item.name">
                          {{ str }}<br><br v-if="idx < 1">
                        </template>
                      </b>
                      <b v-else>
                        <template v-for="(str, idx) in item.name">
                          {{ str }}<br>
                        </template>
                      </b>

                    </td>
                    <td width="8%" rowspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">
                      出生<br>日期
                    </td>
                    <td width="10%" bgcolor="#FFFFFF" class="new no-internal-borders">
                      公历
                    </td>
                    <td style="width:10%" bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].solarYear + 'px', paddingLeft: randomOffsets[index].solarYear + 'px' }"
                      class="new no-internal-borders">{{ item.solarYear }}
                    </td>
                    <td style=" width:10%" bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].solarMonth + 'px', paddingLeft: randomOffsets[index].solarMonth + 'px' }"
                      class="new no-internal-borders">{{ item.solarMonth }}
                    </td>
                    <td style=" width:12%" bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].solarDay + 'px', paddingLeft: randomOffsets[index].solarDay + 'px' }"
                      class="new no-internal-borders">{{ item.solarDay }}
                    </td>
                    <td style=" width:11%" bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].solarHh + 'px', paddingLeft: randomOffsets[index].solarHh + 'px' }"
                      class="new no-internal-borders">
                      {{ item.closeSolarH ? item.solarHh : '' }}
                    </td>
                    <td style=" width:30%;padding-left:4px;padding-right:4px;" rowspan="5" bgcolor="#FFFFFF"
                      class="new no-internal-borders">
                      {{ isShiJi ? item.gaiYao : item.gaiYao.slice(0, -5) }}
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">农历</td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].lunarYear + 'px', paddingLeft: randomOffsets[index].lunarYear + 'px' }"
                      class="new no-internal-borders">{{ item.lunarYear }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].lunarMonth + 'px', paddingLeft: randomOffsets[index].lunarMonth + 'px' }"
                      class="new no-internal-borders">{{ item.lunarMonth }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].lunarDay + 'px', paddingLeft: randomOffsets[index].lunarDay + 'px' }"
                      class="new no-internal-borders">{{ item.lunarDay }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].lunarHh + 'px', paddingLeft: randomOffsets[index].lunarHh + 'px' }"
                      class="new no-internal-borders">{{ item.closeLunarH ? item.lunarHh : '' }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">八字：</td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].baZhiYear + 'px', paddingLeft: randomOffsets[index].baZhiYear + 'px' }"
                      class="new no-internal-borders">{{ item.baZhiYear }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].baZhiMonth + 'px', paddingLeft: randomOffsets[index].baZhiMonth + 'px' }"
                      class="new no-internal-borders">{{ item.baZhiMonth }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].baZhiDay + 'px', paddingLeft: randomOffsets[index].baZhiDay + 'px' }"
                      class="new no-internal-borders">{{ item.baZhiDay }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].baZhiHh + 'px', paddingLeft: randomOffsets[index].baZhiHh + 'px' }"
                      class="new no-internal-borders">{{ item.closeBaZhiH ? item.baZhiHh : '' }}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">五行：</td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].wuXinYear + 'px', paddingLeft: randomOffsets[index].wuXinYear + 'px' }"
                      class="new no-internal-borders">{{
                        item.wuXinYear
                      }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].wuXinMonth + 'px', paddingLeft: randomOffsets[index].wuXinMonth + 'px' }"
                      class="new no-internal-borders">{{
                        item.wuXinMonth
                      }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].wuXinDay + 'px', paddingLeft: randomOffsets[index].wuXinDay + 'px' }"
                      class="new no-internal-borders">{{
                        item.wuXinDay
                      }}
                    </td>
                    <td bgcolor="#FFFFFF"
                      :style="{ paddingBottom: randomOffsets[index].wuXinHh + 'px', paddingLeft: randomOffsets[index].wuXinHh + 'px' }"
                      class="new no-internal-borders">{{
                        item.closeWuXinH ? item.wuXinHh : ''
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#ffffff" class="new no-internal-borders" colspan="6"> {{
                      '八字五行数 ：' + item.geShu
                    }}
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td>
                    </td>
                    <!--                  <td colspan="7" class="table-textarea">-->
                    <!--                    <el-input-->
                    <!--                      type="textarea"-->
                    <!--                      :rows="2"-->
                    <!--                      autosize-->
                    <!--                      placeholder="请输入内容"-->
                    <!--                      v-model="textarea"-->
                    <!--                    >-->
                    <!--                    </el-input>-->
                    <!--                  </td>-->
                    <template v-if="isTextarea">
                      <td colspan="7" class="table-textarea">
                        <el-input type="textarea" :rows="2" size="medium" autosize placeholder="请输入内容"
                          v-model="mingPanText" @blur="tableIptBlur">
                        </el-input>
                      </td>
                    </template>
                    <template v-else>
                      <td colspan="7" id="#pre-line" style="white-space: pre-line; padding-right: 10px"
                        class="new no-internal-borders">
                        {{ mingPanText }}
                      </td>
                    </template>

                  </tr>
                </tbody>
              </table>
            </div>
            <table border="0" cellpadding="1" cellspacing="1"
              style="width: 100%; MARGIN-BOTTOM: 5px; table-layout:fixed;word-wrap:break-word;border: 1px solid #A3E7FA"
              v-show="tableArr.length > 0">
              <thead>
                <tr>
                  <th colspan="2">年柱</th>
                  <th colspan="2">月柱</th>
                  <th colspan="2">日柱</th>
                  <th colspan="2">时柱</th>
                </tr>
              </thead>
              <tbody>
                <tr style=" border-bottom: 1px solid black; " v-for="(item, index) in tableArr" :key="index">
                  <td colspan="2" style="text-align: center;" class="new">{{ item.naYinYear }}</td>
                  <td colspan="2" style="text-align: center;" class="new">{{ item.naYinMonth }}</td>
                  <td colspan="2" style="text-align: center;" class="new">{{ item.naYinDay }}</td>
                  <td colspan="2" style="text-align: center;" class="new">{{ item.naYinHh }}</td>
                </tr>
              </tbody>
              <tbody v-if="hePanStr">
                <tr>
                  <td colspan="8" class="new">{{ hePanStr }}</td>
                </tr>
              </tbody>
            </table>
            <div>

              <el-button v-show="tableArr.length > 0" type="primary" @click="handleTableToImg" :loading="btnLoad">
                生成图片
              </el-button>
            </div>
            <div>
              <div ref="imageTable"></div>
              <el-image v-if="isMobile" style="width: 100%; height: 100%" :src="imgUrl"></el-image>
            </div>

            <template v-if="this.html">
              <div style="" v-html="html"></div>
            </template>
          </div>
        </el-col>
      </template>


      <template v-else>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" labelPosition="top"
          class="demo-ruleForm">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="2">
              <el-form-item label="姓名">
                <el-input v-model.trim="form.name" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label="是否公历">
                <el-switch v-model="form.isSolar"></el-switch>
              </el-form-item>
            </el-col>
            <!--          <el-col :span="4">-->
            <!--            <el-form-item label="性别">-->
            <!--              <el-radio-group v-model="form.sex">-->
            <!--                <el-radio label="男"></el-radio>-->
            <!--                <el-radio label="女"></el-radio>-->
            <!--              </el-radio-group>-->
            <!--            </el-form-item>-->
            <!--          </el-col>-->
            <el-col :span="2">
              <el-form-item label="年份" prop="nian">
                <el-select v-model="form.nian" filterable placeholder="年" @change="changeYueSelect">
                  <el-option v-for="item in 100" :key="item" :label="item + 1924" :value="item + 1924">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label="月" prop="yue">
                <el-select v-model="form.yue" placeholder="月">
                  <el-option v-for="item in months" :key="item.value" :label="item.lable" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label="是否闰月">
                <el-switch v-model="form.isLeapMonth"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label="日" prop="ri">
                <el-select v-model="form.ri" filterable placeholder="日">
                  <el-option v-for="item in 31" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="时">
                <el-select v-model="form.hh" placeholder="几点" clearable>
                  <el-option v-for="item in timeArr" :key="item.time" :label="item.timeStr" :value="item.time">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="操作栏">

                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="onSubmit('add')" :disabled="tableArr.length < 1">增加</el-button>


                <el-button @click="reset">取消</el-button>
                <!--                <el-button @click="test">test</el-button>-->

              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="显示四季">
                <el-switch v-model="isShiJi" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-row>
            <el-col :xs="0" :span="6" v-if="!isMobile">
              <div>
                <el-card class="box-card cardW">
                  <div slot="header" class="clearfix">
                    <el-input v-model="searchVal" @change="changeSearch" clearable placeholder="搜索名字"
                      style="width: 260px" />
                    <el-popconfirm confirm-button-text="确认" cancel-button-text="不了" icon="el-icon-info" icon-color="red"
                      title="确定清空吗？" @confirm="clearAllList">
                      <template slot="reference">
                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>
                      </template>

                    </el-popconfirm>
                    <!--                <el-button style="float: right; padding: 3px 0" type="text" @click="clearAllList">清空</el-button>-->
                  </div>
                  <template v-if="list.length >= 1">
                    <div v-for="(item, index) in list" :key="index" class="text item">
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
                        <el-popconfirm confirm-button-text="确认" cancel-button-text="不了" icon="el-icon-info"
                          icon-color="red" title="确定删除吗？" @confirm="deleteList(item.key)">
                          <template slot="reference">
                            <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>
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
                    <el-pagination small layout="prev, pager, next" :total="total" :page-size="limit"
                      :current-page="page" @current-change="currentChange">
                    </el-pagination>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <!--              <div>{{randomOffsets}}</div>-->
              <div class="main table-width">
                <!--            <div v-html="tableHtml" id="table-html" style="background-color: red"></div>-->
                <div>
                  <table class="heavier-text" id="table-val">
                    <tbody v-for="(item, index) in tableArr" :key="index" class="tbody-val">
                      <tr>
                        <td width="7%" rowspan="5" bgcolor="#FFFFFF" class="new no-internal-borders vertical-text">
                          <b v-if="item.name.length < 3">
                            <template v-for="(str, idx) in item.name">
                              {{ str }}<br><br v-if="idx < 1">
                            </template>
                          </b>
                          <b v-else>
                            <template v-for="(str, idx) in item.name">
                              {{ str }}<br>
                            </template>
                          </b>
                        </td>
                        <td width="8%" rowspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">
                          出生<br>日期
                        </td>
                        <td width="10%" bgcolor="#FFFFFF" class="new no-internal-borders">
                          公历
                        </td>
                        <td style="width:10%" bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].solarYear + 'px', paddingLeft: randomOffsets[index].solarYear + 'px' }"
                          class="new no-internal-borders">{{ item.solarYear }}
                        </td>
                        <td style=" width:10%" bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].solarMonth + 'px', paddingLeft: randomOffsets[index].solarMonth + 'px' }"
                          class="new no-internal-borders">{{ item.solarMonth }}
                        </td>
                        <td style=" width:12%" bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].solarDay + 'px', paddingLeft: randomOffsets[index].solarDay + 'px' }"
                          class="new no-internal-borders">{{ item.solarDay }}
                        </td>
                        <td style=" width:11%" bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].solarHh + 'px', paddingLeft: randomOffsets[index].solarHh + 'px' }"
                          class="new no-internal-borders">
                          {{ item.closeSolarH ? item.solarHh : '' }}
                        </td>
                        <td style=" width:30%;padding-left:4px;padding-right:4px;" rowspan="5" bgcolor="#FFFFFF"
                          class="new no-internal-borders">
                          {{ item.gaiYao }}
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#FFFFFF" class="new no-internal-borders">农历</td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].lunarYear + 'px', paddingLeft: randomOffsets[index].lunarYear + 'px' }"
                          class="new no-internal-borders">{{ item.lunarYear }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].lunarMonth + 'px', paddingLeft: randomOffsets[index].lunarMonth + 'px' }"
                          class="new no-internal-borders">{{ item.lunarMonth }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].lunarDay + 'px', paddingLeft: randomOffsets[index].lunarDay + 'px' }"
                          class="new no-internal-borders">{{ item.lunarDay }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].lunarHh + 'px', paddingLeft: randomOffsets[index].lunarHh + 'px' }"
                          class="new no-internal-borders">{{ item.closeLunarH ? item.lunarHh : '' }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">八字：</td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].baZhiYear + 'px', paddingLeft: randomOffsets[index].baZhiYear + 'px' }"
                          class="new no-internal-borders">{{ item.baZhiYear }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].baZhiMonth + 'px', paddingLeft: randomOffsets[index].baZhiMonth + 'px' }"
                          class="new no-internal-borders">{{ item.baZhiMonth }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].baZhiDay + 'px', paddingLeft: randomOffsets[index].baZhiDay + 'px' }"
                          class="new no-internal-borders">{{ item.baZhiDay }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].baZhiHh + 'px', paddingLeft: randomOffsets[index].baZhiHh + 'px' }"
                          class="new no-internal-borders">{{ item.closeBaZhiH ? item.baZhiHh : '' }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">五行：</td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].wuXinYear + 'px', paddingLeft: randomOffsets[index].wuXinYear + 'px' }"
                          class="new no-internal-borders">{{
                            item.wuXinYear
                          }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].wuXinMonth + 'px', paddingLeft: randomOffsets[index].wuXinMonth + 'px' }"
                          class="new no-internal-borders">{{
                            item.wuXinMonth
                          }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].wuXinDay + 'px', paddingLeft: randomOffsets[index].wuXinDay + 'px' }"
                          class="new no-internal-borders">{{
                            item.wuXinDay
                          }}
                        </td>
                        <td bgcolor="#FFFFFF"
                          :style="{ paddingBottom: randomOffsets[index].wuXinHh + 'px', paddingLeft: randomOffsets[index].wuXinHh + 'px' }"
                          class="new no-internal-borders">{{
                            item.closeWuXinH ? item.wuXinHh : ''
                          }}
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#ffffff" class="new no-internal-borders" colspan="6"> {{
                          '八字五行数 ：' + item.geShu
                        }}
                        </td>
                      </tr>
                      <div class="tbody-val-action" v-if="!isMobile">
                        <div class="">
                          <span>关闭时间</span>
                          <el-switch v-model="item.closeSolarH" @change="closeChange" active-color="#13ce66"
                            inactive-color="#ff4949">
                          </el-switch>
                        </div>
                        <div>
                          <span>关闭时辰</span>
                          <el-switch v-model="item.closeLunarH" @change="closeChange" active-color="#13ce66"
                            inactive-color="#ff4949">
                          </el-switch>
                        </div>
                        <div>
                          <span>最后八字</span>
                          <el-switch v-model="item.closeBaZhiH" @change="closeChange" active-color="#13ce66"
                            inactive-color="#ff4949">
                          </el-switch>
                        </div>
                        <div>
                          <span>最后五行</span>
                          <el-switch v-model="item.closeWuXinH" @change="closeChange" active-color="#13ce66"
                            inactive-color="#ff4949">
                          </el-switch>
                        </div>
                        <!--                  <div>-->
                        <!--                    <el-button size="mini" type="primary" @click="updateTableForm(index)">修改</el-button>-->
                        <!--                  </div>-->
                        <div>
                          <el-popconfirm confirm-button-text="确认" cancel-button-text="不了" icon="el-icon-info"
                            icon-color="red" title="确定清空吗？" @confirm="delTable(tableArr, index)">
                            <template slot="reference">
                              <el-button size="mini" type="danger">删除</el-button>
                              <!--                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>-->
                            </template>

                          </el-popconfirm>
                          <!--                    <el-button size="mini" type="danger" @click="delTable(tableArr, index)">删除</el-button>-->
                        </div>
                        <div>
                          <el-button size="mini" type="primary" @click="repeatPostGuoxue(item)">查询</el-button>
                        </div>
                      </div>
                    </tbody>
                    <tbody v-show="tableArr.length > 0">
                      <tr v-show="isTextarea">
                        <td style="vertical-align: top;text-align: center;">
                        </td>
                        <td colspan="7" class="table-textarea">
                          <el-input type="textarea" :rows="2" size="medium" autosize placeholder="请输入内容"
                            v-model="mingPanText" @blur="tableIptBlur">
                          </el-input>
                        </td>

                      </tr>
                      <tr v-show="!isTextarea">
                        <td>
                        </td>
                        <td colspan="7" id="#pre-line" style="white-space: pre-line; padding-right: 10px"
                          class="new no-internal-borders">
                          {{ mingPanText }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table border="0" cellpadding="1" cellspacing="1"
                  style="MARGIN-BOTTOM: 5px; table-layout:fixed;word-wrap:break-word;border: 1px solid #A3E7FA"
                  v-show="tableArr.length > 0">

                  <tbody>
                    <tr style=" border-bottom: 1px solid black; " v-for="(item, index) in tableArr" :key="index">
                      <td class="new" style="width: 190px">纳音</td>
                      <td class="new" style="width: 78px">{{ item.naYinYear }}</td>
                      <td class="new" style="width: 78px">{{ item.naYinMonth }}</td>
                      <td class="new" style="width: 94px">{{ item.naYinDay }}</td>
                      <td class="new">{{ item.naYinHh }}</td>
                      <td colspan="3" class="new"></td>
                    </tr>

                  </tbody>
                  <tbody v-if="hePanStr">
                    <tr>
                      <td colspan="8" class="new">{{ hePanStr }}</td>
                    </tr>
                  </tbody>
                </table>
                <div>

                  <el-button v-show="tableArr.length > 0" type="primary" @click="handleTableToImg" :loading="btnLoad">
                    生成图片
                  </el-button>
                </div>
                <div>
                  <div ref="imageTable"></div>
                  <el-image v-if="isMobile" style="width: 100%; height: 100%" :src="imgUrl"></el-image>
                </div>

                <template v-if="this.html">
                  <div style="" v-html="html"></div>
                </template>
              </div>
            </el-col>

          </el-row>


        </div>
        <div>
          <el-backtop></el-backtop>
        </div>
      </template>

    </div>

  </div>
</template>

<script>
import calendar from 'js-calendar-converter'
import { postGuoxue } from '../../../api/customer_order_goods/customer'
import { v4 as uuid } from 'uuid'
import html2canvas from 'html2canvas'
import db from '../../../plugins/db'
import Autocomplete from './Autocomplete.vue'
import { Lunar, EightChar, SolarUtil, LunarUtil, Solar, LunarMonth, LunarYear } from 'lunar-javascript'
import { countWuXin } from '../../../utils'

// import { msgError, msg } from '../../../plugins/modal'
function deepClone (obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    const copy = []
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i])
    }
    return copy
  }

  const copy = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepClone(obj[key])
    }
  }
  return copy
}

let tableDom = null
export default {
  name: 'GuoXue',
  components: { Autocomplete },
  data () {
    return {
      isMobile: false,
      isShiJi: false,
      btnLoad: false,
      isDrawer: false,
      imgUrl: null,
      html: null,
      tableHtml: null,
      lastFlg: {},
      form: {},
      checkForm: {},
      textarea: '',
      isTextarea: true,
      isShengXiaoByLiChun: false, // 生肖是否以立春为界
      list: [],
      page: 1,
      total: 1,
      limit: 40,
      searchVal: '',
      searchList: [],
      tableKey: null,
      updateTableIndex: null,
      tableArr: [],
      mingPanText: '',
      baZhiTest: [],
      monthArr: [],
      lunarMonthArr: [
        { value: 1, lable: '1正月' },
        { value: 2, lable: '2月' },
        { value: 3, lable: '3月' },
        { value: 4, lable: '4月' },
        { value: 5, lable: '5月' },
        { value: 6, lable: '6月' },
        { value: 7, lable: '7月' },
        { value: 8, lable: '8月' },
        { value: 9, lable: '9月' },
        { value: 10, lable: '10月' },
        { value: 11, lable: '11冬月' },
        { value: 12, lable: '12腊月' }
      ],
      timeArr: [
        { time: 0, timeStr: '00子时(晚上12点)' },
        { time: 1, timeStr: '01丑时(凌晨1点)' },
        { time: 2, timeStr: '02丑时(凌晨2点)' },
        { time: 3, timeStr: '03寅时(凌晨3点)' },
        { time: 4, timeStr: '04寅时(凌晨4点)' },
        { time: 5, timeStr: '05卯时(凌晨5点)' },
        { time: 6, timeStr: '06卯时(早上6点)' },
        { time: 7, timeStr: '07辰时(早上7点)' },
        { time: 8, timeStr: '08辰时(早上8点)' },
        { time: 9, timeStr: '09巳时(早上9点)' },
        { time: 10, timeStr: '10巳时(上午10点)' },
        { time: 11, timeStr: '11午时(上午11点)' },
        { time: 12, timeStr: '12午时(中午12点)' },
        { time: 13, timeStr: '13未时(下午1点)' },
        { time: 14, timeStr: '14未时(下午2点)' },
        { time: 15, timeStr: '15申时(下午3点)' },
        { time: 16, timeStr: '16申时(下午4点)' },
        { time: 17, timeStr: '17酉时(下午5点)' },
        { time: 18, timeStr: '18酉时(下午6点)' },
        { time: 19, timeStr: '19戌时(晚上7点)' },
        { time: 20, timeStr: '20戌时(晚上8点)' },
        { time: 21, timeStr: '21亥时(晚上9点)' },
        { time: 22, timeStr: '22亥时(晚上10点)' },
        { time: 23, timeStr: '23子时(晚上11点)' }
      ],
      rules: {
        nian: [
          { required: true, message: '年份必填', trigger: 'blur' }
        ],
        yue: [
          { required: true, message: '月份必填', trigger: 'blur' }
        ],
        ri: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    months () {
      let arr = JSON.parse(JSON.stringify(this.lunarMonthArr))
      let monthArr = []
      const leapMonth = calendar.leapMonth(this.form.nian)
      // console.log(leapMonth)
      arr.map(item => {
        const obj = { ...item }
        if (leapMonth && item.value === leapMonth) {
          obj.lable = item.lable += '(闰)'
        }
        monthArr.push(item)
      })
      return monthArr
    },
    // 合年柱月柱日柱
    hePanStr () {
      if (this.tableArr.length === 2) {
        return this.hePan()
      } else {
        return ''
      }
    },
    randomOffsets () {
      return this.tableArr.map((item) => {
        let obj = {}
        Object.keys(item).map(key => {
          obj[key] = Math.floor(Math.random() * 7) + 1
        })
        console.log("ssssssssssssssssssss", obj)
        return obj
      })
    }
  },
  created () {
    this.initLocationToIndexedDB()
    this.fetchList()
    // this.updateTotalCount()
  },
  mounted () {
    this.checkIfMobile()
  },
  methods: {
    LunarTest () {
      const yue = this.form.isLeapMonth ? -this.form.yue : this.form.yue
      console.log('this.form.hh', this.form.hh)
      const d = Lunar.fromYmdHms(this.form.nian, yue, this.form.ri, this.form.hh, 0, 0)
      console.log(d.toFullString())
      console.log(d.getTimeZhi() + '时')
      // const e = EightChar.fromLunar(d)
      const e = d.getEightChar()
      // e.setSect(1)
      console.log(e.getSect())
      const arr = []
      arr.push(e.getYearWuXing(), e.getMonthWuXing(), e.getDayWuXing(), e.getTimeWuXing())
      this.$set(this.baZhiTest, 'wuXin', arr)
      const baZhiArr = []
      this.$set(this.baZhiTest, 'baZhiArr', baZhiArr)
      baZhiArr.push(e.getYear(), e.getMonth(), e.getDay(), e.getTime())
      const naYinArr = []

      naYinArr.push(e.getYearNaYin(), e.getMonthNaYin(), e.getDayNaYin(), e.getTimeNaYin())
      console.log(arr)
      this.$set(this.baZhiTest, 'naYin', naYinArr)
      console.log(naYinArr)
      const r = countWuXin(arr)
      console.log(r)
      this.$set(this.baZhiTest, 'geShu', r.counts)
      this.$set(this.baZhiTest, 'geShuStr', r.geShu)
      this.$set(this.baZhiTest, 'wuXinWang', r.wuXinWang)
      this.$set(this.baZhiTest, 'wuXinQue', r.wuXinQue)
      this.$set(this.baZhiTest, 'wangQue', r.wangQue)

    },
    async initLocationToIndexedDB () {
      const table_list = this.$cache.local.get('table_list')
      if (table_list) {
        const list = JSON.parse(table_list)
        for (const item of list) {
          const data = {
            key: item.key,
            table: item.table,
            mingPanText: item.text
          }
          await db.data.add(data)
        }
        await this.fetchList()
        this.$cache.local.remove('table_list')
      }
    },
    test () {
      const chineseCharacters = [
        '你', '我', '他', '的', '是', '了', '在', '有', '和', '不', '就', '人', '都', '一', '上', '中', '大', '来', '说', '个',
        '这', '们', '为', '子', '到', '地', '出', '道', '也', '时', '要', '下', '会', '里', '生', '着', '去', '样', '过', '看',
        '好', '没', '那', '天', '还', '得', '着', '作', '对', '能', '而', '也', '后', '于', '小', '最', '说', '子', '多', '用'
      ]

      // 随机生成 1 到 3 之间的数量

      for (let i = 0; i < 500; i++) {
        const numCharacters = Math.floor(Math.random() * 3) + 1
        let result = ''

        for (let i = 0; i < numCharacters; i++) {
          const randomIndex = Math.floor(Math.random() * chineseCharacters.length)
          result += chineseCharacters[randomIndex]
        }
        const table = deepClone(this.list[0].table)

        table[0].form.name = result

        const key = uuid()
        db.data.add({ key, table }).then(res => {
          this.fetchList()
          this.updateTotalCount()
        })
      }
    },
    async fetchList () {
      // 按 id 倒序排序并获取前 20 条记录
      let start = (this.page - 1) * this.limit
      const value = this.searchVal.trim()
      // console.log(value)
      if (value) {
        this.page = 1
        start = 0
        this.list = await db?.data
          .filter(item => item.table.some(subItem => subItem.form.name && subItem.form.name.includes(value)
          ))
          .reverse()
          .offset(start)
          .limit(this.limit)
          .toArray()

        this.total = await db?.data
          .filter(item => item.table.some(subItem => subItem.form && subItem.form.name && subItem.form.name.includes(value)
          ))
          .count()

      } else {
        this.list = await db?.data
          .orderBy('id')
          .reverse()
          .offset(start)
          .limit(this.limit)
          .toArray()

        this.total = await db.data.count()
      }
      // 将记录按 id 升序排列
      // this.last20Items = items.reverse();
      // console.log(this.list.length, this.total)
    },
    async updateTotalCount () {
      this.total = await db.data.count()
    },
    changeYueSelect () {

    },
    judgeRelationship (element1, element2) {
      const generateCycle = {
        木: '火',
        火: '土',
        土: '金',
        金: '水',
        水: '木'
      }

      const overcomeCycle = {
        木: '土',
        火: '金',
        土: '水',
        金: '木',
        水: '火'
      }

      const checkRelationship = (e1, e2) => {
        if (generateCycle[e1] === e2) {
          return `五行${e1}生${e2} 是为相生`
        } else if (generateCycle[e2] === e1) {
          return `五行${e2}生${e1} 是为相生`
        } else if (overcomeCycle[e1] === e2) {
          return `五行${e1}克${e2} 是为相克`
        } else if (overcomeCycle[e2] === e1) {
          return `五行${e2}克${e1} 是为相克`
        } else if (e1 === e2) {
          return `五行同属，是为相和`
        } else {
          return '无特殊关系'
        }
      }
      // console.log(element1, element2)
      return checkRelationship(element1, element2)
    },
    hePan () {
      const naYinYear0 = this.tableArr[0].naYinYear
      const naYinYear1 = this.tableArr[1].naYinYear
      const nian = this.judgeRelationship(naYinYear0[2], naYinYear1[2])
      const naYinMonth0 = this.tableArr[0].naYinMonth
      const naYinMonth1 = this.tableArr[1].naYinMonth
      const month = this.judgeRelationship(naYinMonth0[2], naYinMonth1[2])
      const naYinDay0 = this.tableArr[0].naYinDay
      const naYinDay1 = this.tableArr[1].naYinDay
      const day = this.judgeRelationship(naYinDay0[2], naYinDay1[2])
      return `从双方命格上来看，一方为${naYinYear0}命、一方为${naYinYear1}命，${nian}。从双方月柱上来看，一方为${naYinMonth0[2]}、一方为${naYinMonth1[2]}，${month}。从双方日柱上来看，一方为${naYinDay0[2]}、一方为${naYinDay1[2]}，${day}`
    },
    checkIfMobile () {
      this.isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())
      // console.log(this.isMobile)
    }
    ,
    validateForm () {
      try {
        if (this.form.isSolar) {
          const daysOfMonth = SolarUtil.getDaysOfMonth(this.form.nian, this.form.yue)

          console.log("🚀 ~ file:index method:initData line:1257 -----daysOfMonth", daysOfMonth)

          if (this.form.ri > daysOfMonth) {
            throw { code: 3, message: `${this.form.yue}月只有${daysOfMonth}天，请检查是否正确` }
          }
        } else {
          const lunarMonth = LunarMonth.fromYm(this.form.nian, this.form.yue)
          const lunarYear = LunarYear.fromYear(this.form.nian);
          const leapMonth = lunarYear.getLeapMonth()
          // 判断是否闰月
          if (this.form.isLeapMonth) {

            console.log(lunarYear.getLeapMonth());
            if (!leapMonth) {
              throw { code: 1, message: '该年份没有闰月' }
            } else if (leapMonth !== this.form.yue) {
              throw { code: 2, message: `该年闰${leapMonth}月，请检查是否正确` }
            }
          }

          // 判断该月天数
          const getDayCount = lunarMonth.getDayCount()
          if (this.form.ri > getDayCount) {
            throw { code: 3, message: `${this.form.yue}月只有${getDayCount}天，请检查是否正确` }
          }
        }
        return true
      } catch (error) {
        error.message ? this.$message(error.message) : this.$message("数据未知错误")

      }
    }

    ,

    onSubmit (type) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const flg = this.validateForm()
          if (!flg) return;
          // this.lastFlg = {}
          // this.reset()
          this.resetTableImg()
          this.html = ''

          const obj = this.initTableObj()
          console.log("🚀 ~ file:index method: line:1295 -----obj", obj)


          // 如果是增加一个命盘
          if (type === 'add') {
            this.tableArr.push(obj)
            this.updateLocalTable()
          } else {
            this.mingPanText = ''
            this.tableArr = []
            this.tableArr.push(obj)
            // this.tableArr.splice(0, this.tableArr.length, obj);
            console.log("🚀 ~ file:index method: line:1309 -----this.tableArr", this.tableArr)

            this.addLocalTable()
          }
          this.resetHH()
        } else {
          console.log('error submit!!')
          return false
        }
      })

    }
    ,
    initGaiYao (tdGaiYaoStr, str) {
      // console.log(tdGaiYaoStr)
      // console.log(str)
      const searchPattern = /日柱.*?命/g // 匹配以<b>赵开头，“<br /><br />”结尾的文本
      // this.html = this.replacePattern(this.html, searchPattern, str)
      tdGaiYaoStr = this.replacePattern(tdGaiYaoStr, searchPattern, str + '命')
      // console.log(tdGaiYaoStr)

      const searchPattern2 = /季。.*?！/gs
      tdGaiYaoStr = this.replacePattern(tdGaiYaoStr, searchPattern2, '')

      return tdGaiYaoStr + '季'
    }
    ,

    initTableObj () {
      const year = this.form.nian
      const month = this.form.isLeapMonth ? -this.form.yue : this.form.yue
      const day = this.form.ri
      const time = this.form.hh ? this.form.hh : 0
      let lunarObj, data
      if (this.form.isSolar) {
        const solarObj = Solar.fromYmdHms(year, month, day, time, 0, 0);
        lunarObj = solarObj.getLunar();
      } else {
        lunarObj = Lunar.fromYmdHms(year, month, day, time, 0, 0)
        console.log("🚀 ~ file:index method:initTableObj line:1462 -----lunarObj", lunarObj)

      }
      console.log("🚀 ~ file:index method:initTableObj line:1474 -----data", data)


      const e = lunarObj.getEightChar()
      const arr = []
      arr.push(e.getYearWuXing(), e.getMonthWuXing(), e.getDayWuXing(), e.getTimeWuXing())
      const r = countWuXin(arr)
      const shengXiao = lunarObj.getYearShengXiao()
      console.log("🚀 ~ file:index method:initTableObj line:1481 -----shengXiao", shengXiao)

      console.log("🚀 ~ file:index method:initTableObj line:1455 -----shengXiao", shengXiao)

      const gaiYao = `本命属${shengXiao}，${e.getYearNaYin()}命。五行${r.wangQue}；日主天干为${e.getDayWuXing().slice(0, -1)}`
      console.log("🚀 ~ file:index method:initTableObj line:1460 -----gaiYao", gaiYao)
      const name = this.form.name ? this.form.name : ''
      const form = JSON.parse(JSON.stringify(this.form))
      const solar = lunarObj.getSolar();
      const obj = {
        form,
        name,
        gaiYao,
        geShu: r.geShu,

        solarYear: solar.getYear() + '年',
        solarMonth: solar.getMonth() + '月',
        solarDay: solar.getDay() + '日',
        solarHh: time + '点',
        lunarYear: lunarObj.getYearInGanZhi() + '年',
        lunarMonth: lunarObj.getMonthInChinese() + '月',
        lunarDay: lunarObj.getDayInChinese() + '日',
        lunarHh: lunarObj.getTimeZhi() + '时',

        baZhiYear: e.getYear(),
        baZhiMonth: e.getMonth(),
        baZhiDay: e.getDay(),
        baZhiHh: e.getTime(),
        wuXinYear: e.getYearWuXing(),
        wuXinMonth: e.getMonthWuXing(),
        wuXinDay: e.getDayWuXing(),
        wuXinHh: e.getTimeWuXing(),

        naYinYear: e.getYearNaYin(),
        naYinMonth: e.getMonthNaYin(),
        naYinDay: e.getDayNaYin(),
        naYinHh: e.getTimeNaYin()

      }

      if (this.form.hh === null || this.form.hh === undefined || this.form.hh === '') {
        obj.closeSolarH = false
        obj.closeLunarH = false
        obj.closeBaZhiH = true
        obj.closeWuXinH = true
      } else {
        obj.closeSolarH = true
        obj.closeLunarH = true
        obj.closeBaZhiH = true
        obj.closeWuXinH = true
      }
      return obj
    }
    ,
    updateTableForm (index) {
      // console.log(index)
      this.updateTableIndex = index
      const updateTable = this.tableArr[index]
      // console.log(updateTable.form)
      this.form = updateTable.form
    },
    async closeChange () {
      await this.updateLocalTable()
    },
    delTable (table, index) {
      this.delToUpdateForm(table[index].form)
      table.splice(index, 1)

      if (table.length === 0) {
        this.deleteList(this.tableKey)
      } else {
        this.updateLocalTable()
      }

    }
    ,
    repeatPostGuoxue (item) {
      // console.log(form)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // console.log(this.checkForm)
      const data = {
        nian: item.solarYear.slice(0, -1) - 0,
        yue: item.solarMonth.slice(0, -1) - 0,
        ri: item.solarDay.slice(0, -1) - 0,
        hh: item.solarHh.slice(0, -1) - 0,
        mm: 0
      }
      console.log('data', data)
      postGuoxue(data).then(res => {
        let html = res
        const k = html.indexOf('<\/TABLE>')
        html = html.slice(k)
        const lastClosingTableTagPosition = html.lastIndexOf('<table')
        html = html.slice(0, lastClosingTableTagPosition)
        const table_name = /赵灵芝/g
        html = this.replacePattern(html, table_name, item.name)
        // console.log(html)
        this.html = html
      })
        .catch(err => console.log(err))
        .finally(res => {
          loading.close()
        })
    },
    handleIsDrawer () {
      this.isDrawer = true
    },
    async currentChange (page) {
      console.log(page)
      console.log(this.page)
      this.page = page
      await this.fetchList()
    },
    async changeSearch () {
      await this.fetchList()
      // const value = this.searchVal.trim()
      // console.log(value)
      // if (value) {
      //   this.list = await db.data
      //     .filter(item => item.table.some(subItem => subItem.form.name && subItem.form.name.includes(value)
      //     ))
      //     .toArray()
      //   this.total = this.list.length + 1
      // } else  {
      //   await this.fetchList()
      //   // await this.updateTotalCount()
      // }
      // // console.log(this.searchList)
    }
    ,
    async cardClick (item) {
      console.log('item.key', item.key)
      this.tableKey = item.key
      this.mingPanText = item.mingPanText
      this.tableArr = []
      this.tableArr.push(...item.table)
      this.html = null
      this.resetTableImg()
      if (this.searchVal) {
        this.searchVal = ''
        await this.fetchList()
        // await this.updateTotalCount()
      }
      this.isMobile && (this.isDrawer = false)
    },
    resetTableImg () {
      const tableImg = this.$refs.imageTable
      tableImg.textContent = ''
    },
    delToUpdateForm (form) {
      this.$set(this.form, 'name', form.name)
      this.$set(this.form, 'nian', form.nian)
      this.$set(this.form, 'yue', form.yue)
      this.$set(this.form, 'ri', form.ri)
      const hh = form.hh !== null ? form.hh : null
      this.$set(this.form, 'hh', hh)
      this.$set(this.form, 'isSolar', form.isSolar)
      this.$set(this.form, 'isLeapMonth', form.isLeapMonth)
    },
    // 列表删除按钮
    async deleteList (key) {
      if (key) {
        if (typeof key === 'string' || typeof key === 'number') {
          await db.data.where('key').equals(key).delete()
          await this.fetchList()
          // await this.updateTotalCount()

          if (key === this.tableKey) {
            this.tableKey = ''
            this.html = null
            this.resetTableImg()
            this.tableArr = []
          }

        } else {
          console.error('Invalid key type. Keys must be of type string, number, Date or Array<string | number | Date>.')
        }
      }
    }
    ,
    // 列表清空按钮
    async clearAllList () {
      // this.list.forEach((i) => {
      //   this.$cache.local.remove(i.key)
      // })
      await db.data.clear()
      await this.updateTotalCount()
      this.list = []

    }
    ,
    async addLocalTable (obj) {
      const list0name = this.list[0]?.table[0]?.form?.name
      console.log("🚀 ~ file:index method:addLocalTable line:1674 -----this.list[0]", this.list[0])

      if (this.list[0]?.table.length === 1 && this.form.name === list0name) {
        await db.data.where('key').equals(this.tableKey).modify({ table: this.tableArr })
        await this.fetchList()
        // await this.updateTotalCount()
      } else if (this.form.name) {
        this.tableKey = uuid()
        console.log(this.tableArr)
        const item = { key: this.tableKey, table: this.tableArr }
        db.data.add(item).then(res => {
          this.fetchList()
          // this.updateTotalCount()
        })
          .catch(() => this.$modal.msgError('添加到本地失败'))

        // this.list.unshift(item)
        // const listStr = JSON.stringify(this.list)
        // this.$cache.local.set('table_list', listStr)
      }
    }
    ,
    async updateLocalTable () {
      await db.data.where('key').equals(this.tableKey).modify({ table: this.tableArr })
      await this.fetchList()
      // for (let i = 0; i < this.list.length; i++) {
      //   let item = this.list[i]
      //   if (item.key === this.tableKey) {
      //     // console.log(this.tableKey)
      //     // console.log(i.key)
      //     // this.tableKey = i.key
      //
      //     this.list[i] = { key: this.tableKey, table: this.tableArr }
      //     // console.log(item)
      //
      //   }
      //   const listStr = JSON.stringify(this.list)
      //   // console.log(listStr)
      //   this.$cache.local.set('table_list', listStr)
      // }
      // this.list.forEach((item, index) => {
      //   if (item.key === this.tableKey) {
      //     console.log(this.tableKey)
      //     // console.log(i.key)
      //     // this.tableKey = i.key
      //     item = { key: this.tableKey, ...this.tableVal }
      //     const listStr = JSON.stringify(this.list)
      //     listStr
      //     this.$cache.local.set('table_list', listStr)
      //
      //   }
      // })
    }
    ,
    async tableIptBlur () {
      // console.log(this.tableVal)

      db.data.where('key').equals(this.tableKey).modify({ mingPanText: this.mingPanText })
      await this.fetchList()
      // this.updateLocalTable()
    },
    replacePattern (html, searchPattern, replaceText) {
      // const regex = new RegExp(searchPattern, 'g')
      const regex = new RegExp(searchPattern)
      return html.replace(regex, replaceText)
    }
    ,
    resetHH () {
      this.$set(this.form, 'isSolar', false)
      this.$set(this.form, 'isLeapMonth', false)
      this.$set(this.form, 'hh', null)
      this.$set(this.form, 'mm', null)
    }
    ,
    handleTableToImg () {
      // const
      // html2canvas(tableDom).then(function(canvas) {
      //   console.log(canvas)
      //   // const tableImg = window.document.querySelector("#image-table")
      //   // tableImg.appnedChild(canvas)
      // })
      this.isTextarea = false
      this.resetTableImg()
      this.btnLoad = true
      const that = this
      this.$nextTick(function () {
        html2canvas(table, {
          letterRendering: true,
          // scale: window.devicePixelRatio
          scale: 2
          // width: 760
        }).then(function (canvas) {
          // console.log(canvas)
          // document.body.appnedChild(canvas)
          // console.log(canvas)

          that.btnLoad = false
          that.isTextarea = true

          if (that.isMobile) {
            // const tableImgUrl = window.document.querySelector('#image-png')
            // const downloadLink = document.createElement('a')
            // 将 Canvas 转为 Data URL

            that.imgUrl = canvas.toDataURL('image/png')
            // 设置下载链接的 href 属性为 Data URL
            // downloadLink.href = dataUrl
            //
            // // 设置文件名
            // downloadLink.download = 'screenshot.png'
            //
            // // 模拟点击下载链接
            // document.body.appendChild(downloadLink)
            // downloadLink.click()
            // document.body.removeChild(downloadLink)
          } else {
            const tableImg = that.$refs.imageTable
            //
            tableImg.append(canvas)
          }

        })
      })
      const table = document.querySelector('#table-val')
      // const tableTextarea = table.querySelector(".table-textarea")
      // console.log(tableTextarea)
      // tableTextarea.textContent = this.textarea

    }
    ,
    reset () {
      this.$refs['ruleForm'].resetFields()
      // this.updateTableIndex = null
      this.form = {
        name: null,
        nian: null,
        yue: null,
        ri: null,
        hh: null,
        mm: null,
        isLeapMonth: false,
        isSolar: false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  //padding: 8px 0;
}

.cardW {
  width: 320px;

}

.box-card {
  // width: 320px;
  //height: 750px;

  .el-icon-delete {
    float: right;
    color: red;
    font-size: 18px;
  }
}

.main {
  position: relative;

  .action,
  {
  position: absolute;
  top: 0;
  right: -120px;

  div {
    height: 46px;
  }
}
}

.tbody-val {
  position: relative;

  .tbody-val-action,
  {
  position: absolute;
  top: 0;
  right: -120px;

  div {
    padding: 5px 5px;
  }
}
}

.table-width {
  width: 760px;
  margin: auto;
}

.main::v-deep {
  .new {

    //PADDING-RIGHT: 10px;
    //PADDING-LEFT: 10px;
    FONT-SIZE: 18px;
    PADDING-BOTTOM: 5px;
    LINE-HEIGHT: 2;
    PADDING-TOP: 5px;
  }

  .no-internal-borders {

    //font-family: '楷体', sans-serif;
    font-family: 'FangZKaiTi', sans-serif;
    //border: none;
    //border-collapse: collapse;
    //background-color: red;
  }

  #pre-line {
    white-space: pre-line;
  }
}

#pre-line {
  white-space: pre-line;
}

.table-textarea::v-deep {
  white-space: pre-line;
  padding-right: 12px;

  textarea {
    border: none;
    resize: none;
    padding-left: 0;
    padding-right: 0;
    font-family: 'FangZKaiTi', sans-serif;
    //FONT-SIZE: 18px;
    color: #000000;
    background-color: red;

  }

}

#table-val {
  border-collapse: collapse;
  background-color: red;

  td,
  th,
  textarea {
    border: none;
    //padding: 0;
    background-color: red;
  }
}

#table-html::v-deep {
  #image-table {
    background-color: red;
  }


  //table {
  //  border-collapse: separate;
  //  border-spacing: 0;
  //}
  //
  ///* 设置水平分割线颜色 */
  //td, th {
  //  border-bottom: 0px solid red; /* 替换 #ccc 为您想要的颜色代码 */
  //}
  //
  ///* 设置垂直分割线颜色 */
  //td:not(:last-child), th:not(:last-child) {
  //  border-right: 0px solid red; /* 替换 #ccc 为您想要的颜色代码 */
  //}
  table {
    //border: none;
    border-collapse: collapse;
    background-color: red;
  }

  /* 如果需要同时关闭单元格的边框，可以使用以下样式 */
  td,
  th {
    border: none;
    padding: 0;
    background-color: red;
  }
}

.vertical-text {
  //writing-mode: vertical-rl; /* 将文字竖排 */
  //text-align: center; /* 设置文字居中 */
  //white-space: nowrap; /* 防止文字换行 */
  font-size: 28px !important;
  padding-left: 8px;
  //text-align: center;
  //line-height: 5px!important;
}

.container-overflow {
  //width: 300px; /* 设置容器宽度 */
  // height: 480px;
  /* 设置容器高度 */
  // overflow: auto;
  /* 设置溢出时显示滚动条 */
}

.mobile-action {
  div {
    padding: 5px 5px;
  }
}

.heavier-text {
  color: #131313;
  font-weight: 600;
}
</style>
