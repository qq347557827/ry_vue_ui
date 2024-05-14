<template>
  <div class="guoxue">
    <div class="search">
      <template v-if="isMobile">
        <el-form :model="form" :rules="rules" ref="ruleForm"
                 class="demo-ruleForm"
        >
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
                <el-switch
                  v-model="isShiJi"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
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
                  <el-option
                    v-for="item in 74"
                    :key="item"
                    :label="item + 1950"
                    :value="item + 1950"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item prop="yue">
                <el-select v-model="form.yue" placeholder="月">
                  <el-option
                    v-for="item in months"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                  >
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
                  <el-option
                    v-for="item in 31"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-select v-model="form.hh" placeholder="时" clearable>
                  <el-option
                    v-for="item in timeArr"
                    :key="item.time"
                    :label="item.timeStr"
                    :value="item.time"

                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              <el-popover
                placement="bottom"
                trigger="click"
              >
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <el-input v-model="searchVal" @change="changeSearch" clearable placeholder="搜索名字"
                              style="width: 260px"
                    />
                    <el-popconfirm
                      confirm-button-text="确认"
                      cancel-button-text="不了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定清空吗？"
                      @confirm="clearAllList"
                    >
                      <template slot="reference">
                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>
                      </template>

                    </el-popconfirm>
                    <!--                <el-button style="float: right; padding: 3px 0" type="text" @click="clearAllList">清空</el-button>-->
                  </div>
                  <div class="container-overflow">
                    <div v-for="(item, index) in cardList" :key="index" class="text item">
                      <div>
                        <el-link type="primary" @click="cardClick(item)">
                          <div v-for="(data,idx) in item.table">
                            {{
                              data.form.name + '--' + (data.form.isSolar ? '公历' : '农历') + data.form.nian + '年' + (data.form.isLeapMonth ? '闰' : '') + data.form.yue + '月' + data.form.ri + '日' + (data.form.hh ? data.form.hh : '')
                            }}
                            <!--                      {{data}}-->
                          </div>
                          <!--                    {{item.key}}-->
                        </el-link>
                        <el-popconfirm
                          confirm-button-text="确认"
                          cancel-button-text="不了"
                          icon="el-icon-info"
                          icon-color="red"
                          title="确定删除吗？"
                          @confirm="deleteList(item.key)"
                        >
                          <template slot="reference">
                            <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>
                          </template>

                        </el-popconfirm>


                      </div>
                      <el-divider></el-divider>
                    </div>

                  </div>

                </el-card>
                <el-button slot="reference">列表</el-button>
              </el-popover>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="onSubmit('add')" :disabled="tableVal.table.length < 1">增加
              </el-button>
            </el-col>
            <el-col :span="5">
              <el-button @click="reset">取消</el-button>
            </el-col>
            <el-col :span="4">
              <el-popover
                placement="bottom"
                width="120"
              >
                <div v-for="(item, index) in tableVal.table" :key="index" style="margin-bottom: 12px">
                  <div class="mobile-action">
                    <div class="">
                      <span>关闭时间</span>
                      <el-switch
                        v-model="item.closeSolarH"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </div>
                    <div>
                      <span>关闭时辰</span>
                      <el-switch
                        v-model="item.closeLunarH"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </div>
                    <div>
                      <span>最后八字</span>
                      <el-switch
                        v-model="item.closeBaZhiH"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </div>
                    <div>
                      <span>最后五行</span>
                      <el-switch
                        v-model="item.closeWuXinH"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                      >
                      </el-switch>
                    </div>
                    <!--                  <div>-->
                    <!--                    <el-button size="mini" type="primary" @click="updateTableForm(index)">修改</el-button>-->
                    <!--                  </div>-->
                    <div>
                      <el-popconfirm
                        confirm-button-text="确认"
                        cancel-button-text="不了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗？"
                        @confirm="delTable(tableVal.table, index)"
                      >
                        <template slot="reference">
                          <el-button size="mini" type="danger">删除</el-button>
                          <!--                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>-->
                        </template>

                      </el-popconfirm>
                      <!--                    <el-button size="mini" type="danger" @click="delTable(tableVal.table, index)">删除</el-button>-->
                    </div>
                    <div>
                      <el-button size="mini" type="primary" @click="repeatPostGuoxue(item.form)">查询</el-button>
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
              <table class="heavier-text main" style="width: 760px;" id="table-val" v-show="tableVal.table.length>0">
                <tbody v-for="(item, index) in tableVal.table" :key="index" class="tbody-val">
                <tr>
                  <td width="7%" rowspan="5" bgcolor="#FFFFFF" class="new no-internal-borders vertical-text">
                    <b v-if="item.name.length < 3">
                      <template v-for="(str,idx) in item.name">
                        {{ str }}<br><br v-if="idx < 1">
                      </template>
                    </b>
                    <b v-else>
                      <template v-for="(str,idx) in item.name">
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
                      :style="{ paddingBottom: randomOffsets[index].solarYear + 'px',  paddingLeft: randomOffsets[index].solarYear + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.solarYear }}
                  </td>
                  <td style=" width:10%" bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].solarMonth + 'px',  paddingLeft: randomOffsets[index].solarMonth + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.solarMonth }}
                  </td>
                  <td style=" width:12%" bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].solarDay + 'px',  paddingLeft: randomOffsets[index].solarDay + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.solarDay }}
                  </td>
                  <td style=" width:11%" bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].solarHh + 'px',  paddingLeft: randomOffsets[index].solarHh + 'px' }"
                      class="new no-internal-borders"
                  >
                    {{ item.closeSolarH ? item.solarHh : '' }}
                  </td>
                  <td style=" width:30%;padding-left:4px;padding-right:4px;" rowspan="5" bgcolor="#FFFFFF"
                      class="new no-internal-borders"
                  >
                    {{ isShiJi ? item.gaiYao : item.gaiYao.slice(0, -5) }}
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#FFFFFF" class="new no-internal-borders">农历</td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].lunarYear + 'px', paddingLeft: randomOffsets[index].lunarYear + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.lunarYear }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].lunarMonth + 'px', paddingLeft: randomOffsets[index].lunarMonth + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.lunarMonth }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].lunarDay + 'px', paddingLeft: randomOffsets[index].lunarDay + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.lunarDay }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].lunarHh + 'px', paddingLeft: randomOffsets[index].lunarHh + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.closeLunarH ? item.lunarHh : '' }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">八字：</td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].baZhiYear + 'px', paddingLeft: randomOffsets[index].baZhiYear + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.baZhiYear }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].baZhiMonth + 'px', paddingLeft: randomOffsets[index].baZhiMonth + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.baZhiMonth }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].baZhiDay + 'px', paddingLeft: randomOffsets[index].baZhiDay + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.baZhiDay }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].baZhiHh + 'px', paddingLeft: randomOffsets[index].baZhiHh + 'px' }"
                      class="new no-internal-borders"
                  >{{ item.closeBaZhiH ? item.baZhiHh : '' }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">五行：</td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].wuXinYear + 'px', paddingLeft: randomOffsets[index].wuXinYear + 'px' }"
                      class="new no-internal-borders"
                  >{{
                      item.wuXinYear
                    }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].wuXinMonth + 'px', paddingLeft: randomOffsets[index].wuXinMonth + 'px' }"
                      class="new no-internal-borders"
                  >{{
                      item.wuXinMonth
                    }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].wuXinDay + 'px', paddingLeft: randomOffsets[index].wuXinDay + 'px' }"
                      class="new no-internal-borders"
                  >{{
                      item.wuXinDay
                    }}
                  </td>
                  <td bgcolor="#FFFFFF"
                      :style="{paddingBottom: randomOffsets[index].wuXinHh + 'px', paddingLeft: randomOffsets[index].wuXinHh + 'px' }"
                      class="new no-internal-borders"
                  >{{
                      item.closeWuXinH ? item.wuXinHh : ''
                    }}
                  </td>
                </tr>
                <tr>
                  <td bgcolor="#ffffff" class="new no-internal-borders" colspan="6"> {{
                      item.geShu ? item.geShu : '八字五行个数 :'
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
                      <el-input
                        type="textarea"
                        :rows="2"
                        size="medium"
                        autosize
                        placeholder="请输入内容"
                        v-model="tableVal.text"
                        @blur="tableIptBlur"
                      >
                      </el-input>
                    </td>
                  </template>
                  <template v-else>
                    <td colspan="7" id="#pre-line" style="white-space: pre-line; padding-right: 10px"
                        class="new no-internal-borders"
                    >
                      {{ tableVal.text }}
                    </td>
                  </template>

                </tr>
                </tbody>
              </table>
            </div>
            <table border="0" cellpadding="1" cellspacing="1"
                   style="MARGIN-BOTTOM: 5px; table-layout:fixed;word-wrap:break-word;border: 1px solid #A3E7FA"
                   v-show="tableVal.table.length>0"
            >
              <tbody>
              <tr style=" border-bottom: 1px solid black; " v-for="(item, index) in tableVal.table">
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

              <el-button v-show="tableVal.table.length>0" type="primary" @click="test" :loading="btnLoad">生成图片
              </el-button>
            </div>
            <div>
              <div ref="imageTable"></div>
              <el-image v-if="isMobile"
                        style="width: 100%; height: 100%"
                        :src="imgUrl"
              ></el-image>
            </div>

            <template v-if="this.html">
              <div style="" v-html="html"></div>
            </template>
          </div>
        </el-col>
      </template>


      <template v-else>
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" labelPosition="top"
                 class="demo-ruleForm"
        >
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
                  <el-option
                    v-for="item in 74"
                    :key="item"
                    :label="item + 1950"
                    :value="item + 1950"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-form-item label="月" prop="yue">
                <el-select v-model="form.yue" placeholder="月">
                  <el-option
                    v-for="item in months"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                  >
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
                <el-select v-model="form.ri" placeholder="日">
                  <el-option
                    v-for="item in 31"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="时">
                <el-select v-model="form.hh" placeholder="几点" clearable>
                  <el-option
                    v-for="item in timeArr"
                    :key="item.time"
                    :label="item.timeStr"
                    :value="item.time"

                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="操作栏">
                <!--              <el-button type="primary" @click="onSubmit('update')" v-if="updateTableIndex !== null">修改</el-button>-->
                <!--              <template v-else>-->
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="onSubmit('add')" :disabled="tableVal.table.length < 1">增加
                </el-button>
                <!--              </template>-->

                <el-button @click="reset">取消</el-button>

              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="显示四季">
                <el-switch
                  v-model="isShiJi"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <el-row>
            <el-col :xs="0" :span="6" v-if="!isMobile">
              <div>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <el-input v-model="searchVal" @change="changeSearch" clearable placeholder="搜索名字"
                              style="width: 260px"
                    />
                    <el-popconfirm
                      confirm-button-text="确认"
                      cancel-button-text="不了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定清空吗？"
                      @confirm="clearAllList"
                    >
                      <template slot="reference">
                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>
                      </template>

                    </el-popconfirm>
                    <!--                <el-button style="float: right; padding: 3px 0" type="text" @click="clearAllList">清空</el-button>-->
                  </div>
                  <div v-for="(item, index) in cardList" :key="index" class="text item">
                    <div>
                      <el-link type="primary" @click="cardClick(item)">
                        <div v-for="(data,idx) in item.table">
                          {{
                            data.form.name + '--' + (data.form.isSolar ? '公历' : '农历') + data.form.nian + '年' + (data.form.isLeapMonth ? '闰' : '') + data.form.yue + '月' + data.form.ri + '日' + (data.form.hh ? data.form.hh : '')
                          }}
                          <!--                      {{data}}-->
                        </div>
                        <!--                    {{item.key}}-->
                      </el-link>
                      <el-popconfirm
                        confirm-button-text="确认"
                        cancel-button-text="不了"
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定删除吗？"
                        @confirm="deleteList(item.key)"
                      >
                        <template slot="reference">
                          <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>
                        </template>

                      </el-popconfirm>


                    </div>
                    <el-divider></el-divider>
                  </div>

                </el-card>
              </div>
            </el-col>
            <el-col :span="12">
              <!--              <div>{{randomOffsets}}</div>-->
              <div class="main table-width">
                <!--            <div v-html="tableHtml" id="table-html" style="background-color: red"></div>-->
                <div>
                  <table class="heavier-text" id="table-val" v-show="tableVal.table.length>0">
                    <tbody v-for="(item, index) in tableVal.table" :key="index" class="tbody-val">
                    <tr>
                      <td width="7%" rowspan="5" bgcolor="#FFFFFF" class="new no-internal-borders vertical-text">
                        <b v-if="item.name.length < 3">
                          <template v-for="(str,idx) in item.name">
                            {{ str }}<br><br v-if="idx < 1">
                          </template>
                        </b>
                        <b v-else>
                          <template v-for="(str,idx) in item.name">
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
                          :style="{ paddingBottom: randomOffsets[index].solarYear + 'px',  paddingLeft: randomOffsets[index].solarYear + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.solarYear }}
                      </td>
                      <td style=" width:10%" bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].solarMonth + 'px',  paddingLeft: randomOffsets[index].solarMonth + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.solarMonth }}
                      </td>
                      <td style=" width:12%" bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].solarDay + 'px',  paddingLeft: randomOffsets[index].solarDay + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.solarDay }}
                      </td>
                      <td style=" width:11%" bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].solarHh + 'px',  paddingLeft: randomOffsets[index].solarHh + 'px' }"
                          class="new no-internal-borders"
                      >
                        {{ item.closeSolarH ? item.solarHh : '' }}
                      </td>
                      <td style=" width:30%;padding-left:4px;padding-right:4px;" rowspan="5" bgcolor="#FFFFFF"
                          class="new no-internal-borders"
                      >
                        {{ isShiJi ? item.gaiYao : item.gaiYao.slice(0, -5) }}
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#FFFFFF" class="new no-internal-borders">农历</td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].lunarYear + 'px', paddingLeft: randomOffsets[index].lunarYear + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.lunarYear }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].lunarMonth + 'px', paddingLeft: randomOffsets[index].lunarMonth + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.lunarMonth }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].lunarDay + 'px', paddingLeft: randomOffsets[index].lunarDay + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.lunarDay }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].lunarHh + 'px', paddingLeft: randomOffsets[index].lunarHh + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.closeLunarH ? item.lunarHh : '' }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">八字：</td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].baZhiYear + 'px', paddingLeft: randomOffsets[index].baZhiYear + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.baZhiYear }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].baZhiMonth + 'px', paddingLeft: randomOffsets[index].baZhiMonth + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.baZhiMonth }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].baZhiDay + 'px', paddingLeft: randomOffsets[index].baZhiDay + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.baZhiDay }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].baZhiHh + 'px', paddingLeft: randomOffsets[index].baZhiHh + 'px' }"
                          class="new no-internal-borders"
                      >{{ item.closeBaZhiH ? item.baZhiHh : '' }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">五行：</td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].wuXinYear + 'px', paddingLeft: randomOffsets[index].wuXinYear + 'px' }"
                          class="new no-internal-borders"
                      >{{
                          item.wuXinYear
                        }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].wuXinMonth + 'px', paddingLeft: randomOffsets[index].wuXinMonth + 'px' }"
                          class="new no-internal-borders"
                      >{{
                          item.wuXinMonth
                        }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].wuXinDay + 'px', paddingLeft: randomOffsets[index].wuXinDay + 'px' }"
                          class="new no-internal-borders"
                      >{{
                          item.wuXinDay
                        }}
                      </td>
                      <td bgcolor="#FFFFFF"
                          :style="{paddingBottom: randomOffsets[index].wuXinHh + 'px', paddingLeft: randomOffsets[index].wuXinHh + 'px' }"
                          class="new no-internal-borders"
                      >{{
                          item.closeWuXinH ? item.wuXinHh : ''
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td bgcolor="#ffffff" class="new no-internal-borders" colspan="6"> {{
                          item.geShu ? item.geShu : '八字五行个数 :'
                        }}
                      </td>
                    </tr>
                    <div class="tbody-val-action" v-if="!isMobile">
                      <div class="">
                        <span>关闭时间</span>
                        <el-switch
                          v-model="item.closeSolarH"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                        >
                        </el-switch>
                      </div>
                      <div>
                        <span>关闭时辰</span>
                        <el-switch
                          v-model="item.closeLunarH"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                        >
                        </el-switch>
                      </div>
                      <div>
                        <span>最后八字</span>
                        <el-switch
                          v-model="item.closeBaZhiH"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                        >
                        </el-switch>
                      </div>
                      <div>
                        <span>最后五行</span>
                        <el-switch
                          v-model="item.closeWuXinH"
                          active-color="#13ce66"
                          inactive-color="#ff4949"
                        >
                        </el-switch>
                      </div>
                      <!--                  <div>-->
                      <!--                    <el-button size="mini" type="primary" @click="updateTableForm(index)">修改</el-button>-->
                      <!--                  </div>-->
                      <div>
                        <el-popconfirm
                          confirm-button-text="确认"
                          cancel-button-text="不了"
                          icon="el-icon-info"
                          icon-color="red"
                          title="确定清空吗？"
                          @confirm="delTable(tableVal.table, index)"
                        >
                          <template slot="reference">
                            <el-button size="mini" type="danger">删除</el-button>
                            <!--                        <el-link type="danger" style="float: right"><i class="el-icon-delete"></i></el-link>-->
                          </template>

                        </el-popconfirm>
                        <!--                    <el-button size="mini" type="danger" @click="delTable(tableVal.table, index)">删除</el-button>-->
                      </div>
                      <div>
                        <el-button size="mini" type="primary" @click="repeatPostGuoxue(item.form)">查询</el-button>
                      </div>
                    </div>
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
                          <el-input
                            type="textarea"
                            :rows="2"
                            size="medium"
                            autosize
                            placeholder="请输入内容"
                            v-model="tableVal.text"
                            @blur="tableIptBlur"
                          >
                          </el-input>
                        </td>
                      </template>
                      <template v-else>
                        <td colspan="7" id="#pre-line" style="white-space: pre-line; padding-right: 10px"
                            class="new no-internal-borders"
                        >
                          {{ tableVal.text }}
                        </td>
                      </template>

                    </tr>
                    </tbody>
                  </table>
                </div>
                <table border="0" cellpadding="1" cellspacing="1"
                       style="MARGIN-BOTTOM: 5px; table-layout:fixed;word-wrap:break-word;border: 1px solid #A3E7FA"
                       v-show="tableVal.table.length>0"
                >
                  <tbody>
                  <tr style=" border-bottom: 1px solid black; " v-for="(item, index) in tableVal.table">
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

                  <el-button v-show="tableVal.table.length>0" type="primary" @click="test" :loading="btnLoad">生成图片
                  </el-button>
                </div>
                <div>
                  <div ref="imageTable"></div>
                  <el-image v-if="isMobile"
                            style="width: 100%; height: 100%"
                            :src="imgUrl"
                  ></el-image>
                </div>

                <template v-if="this.html">
                  <div style="" v-html="html"></div>
                </template>
              </div>
            </el-col>

          </el-row>


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

let tableDom = null
export default {
  name: 'GuoXue',
  data() {
    return {
      isMobile: false,
      isShiJi: false,
      btnLoad: false,
      imgUrl: null,
      html: null,
      tableHtml: null,
      lastFlg: {},
      form: {},
      checkForm: {},
      textarea: '',
      isTextarea: true,
      list: [],
      searchVal: '',
      searchList: [],
      tableKey: null,
      updateTableIndex: null,
      tableVal: {
        table: [
          //   {
          //   name: '',
          //   gaiYao: '',
          //   geShu: '',
          //
          //   solarYear: '',
          //   solarMonth: '',
          //   solarDay: '',
          //   solarHh: '',
          //
          //   lunarYear: '',
          //   lunarMonth: '',
          //   lunarDay: '',
          //   lunarHh: '',
          //
          //   baZhiYear: '',
          //   baZhiMonth: '',
          //   baZhiDay: '',
          //   baZhiHh: '',
          //
          //   wuXinYear: '',
          //   wuXinMonth: '',
          //   wuXinDay: '',
          //   wuXinHh: '',
          //
          //   close: {
          //     solarH: true,
          //     lunarH: true,
          //     BaZhiH: true,
          //     wuXinH: true
          //   }
          // }
        ],
        text: ''
      },
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
    cardList() {
      if (this.searchVal && this.searchList.length > 0) {
        return this.searchList
      } else {
        this.searchList = []
        return this.list
      }
    },
    months() {
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
    hePanStr() {
      if (this.tableVal.table.length === 2) {
        return this.hePan()
      } else {
        return ''
      }
    },
    randomOffsets() {
      return this.tableVal.table.map((item) => {
        let obj = {}
        Object.keys(item).map(key => {
          obj[key] = Math.floor(Math.random() * 7) + 1
        })
        // console.log("ssssssssssssssssssss",obj)
        return obj
      })
    }
  },
  created() {

    const tableListStr = this.$cache.local.get('table_list')
    // console.log(tableListStr)
    if (tableListStr) {
      const list = JSON.parse(tableListStr)
      if (list.length > 200) {
        list.splice(200)
      }
      this.list.push(...list)

    }
  },
  mounted() {
    this.checkIfMobile()
  },
  methods: {
    changeYueSelect() {

    },
    judgeRelationship(element1, element2) {
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
    hePan() {
      const naYinYear0 = this.tableVal.table[0].naYinYear
      const naYinYear1 = this.tableVal.table[1].naYinYear
      const nian = this.judgeRelationship(naYinYear0[2], naYinYear1[2])
      const naYinMonth0 = this.tableVal.table[0].naYinMonth
      const naYinMonth1 = this.tableVal.table[1].naYinMonth
      const month = this.judgeRelationship(naYinMonth0[2], naYinMonth1[2])
      const naYinDay0 = this.tableVal.table[0].naYinDay
      const naYinDay1 = this.tableVal.table[1].naYinDay
      const day = this.judgeRelationship(naYinDay0[2], naYinDay1[2])
      return `从双方命格上来看，一方为${naYinYear0}命、一方为${naYinYear1}命，${nian}。从双方月柱上来看，一方为${naYinMonth0[2]}、一方为${naYinMonth1[2]}，${month}。从双方日柱上来看，一方为${naYinDay0[2]}、一方为${naYinDay1[2]}，${day}`
    },
    checkIfMobile() {
      this.isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())
      // console.log(this.isMobile)
    }
    ,
    initData(form) {
      let data

      if (form.isSolar) {
        data = {
          nian: form.nian,
          yue: form.yue,
          ri: form.ri,
          hh: form.hh ? this.form.hh : 0,
          mm: form.mm ? this.form.mm : 0
        }
      } else {
        // 判断是否闰月
        if (form.isLeapMonth) {
          const leapMonth = calendar.leapMonth(form.nian)
          // console.log(monthDays)
          if (!leapMonth) {
            this.$message('该年份没有闰月')
            return
          } else if (leapMonth !== form.yue) {
            this.$message(`该年闰${leapMonth}月，请检查是否正确`)
            return
          }

        }
        // 判断该月天数
        const monthDays = calendar.monthDays(form.nian, form.yue)
        // console.log(monthDays)
        if (this.form.ri > monthDays) {
          this.$message(`${this.form.yue}月只有${monthDays}天，请检查是否正确`)
          return
        }
        const y = calendar.lunar2solar(form.nian, form.yue, form.ri, form.isLeapMonth)
        data = {
          nian: y.cYear,
          yue: y.cMonth,
          ri: y.cDay,
          hh: form.hh ? form.hh : 0,
          mm: form.mm ? form.mm : 0
        }

      }
      return data
    }
    ,

    onSubmit(type) {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const data = this.initData(this.form)
          if (!data) {
            // this.$message(`输入的数据有误`)
            return
          }
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          postGuoxue(data).then(res => {
            this.lastFlg = {}
            // this.reset()
            this.resetTableImg()
            // console.log(res)
            this.html = res
            const k = this.html.indexOf('<table')
            // console.log(k)
            this.html = this.html.slice(k)
            const lastClosingTableTagPosition = this.html.lastIndexOf('<table')
            // console.log(lastClosingTableTagPosition)
            this.html = this.html.slice(0, lastClosingTableTagPosition)
            // const tableRuleTRege = new RegExp(/<table/)
            // this.html = this.html.replace(tableRuleTRege, `<table rules="none"`)

            let parser = new DOMParser()
            let doc = parser.parseFromString(this.html, 'text/html')
            // console.log(doc)

            // 获取第一个table元素
            const tableArr = doc.querySelectorAll('table')
            const table = tableArr[0]
            const tableGeShu = tableArr[1]

            const obj = this.initTableVal(table, tableGeShu)

            // console.log(obj)

            // console.log(tdGaiYao)
            doc.body.removeChild(table)
            doc.body.removeChild(tableGeShu)
            // console.log(doc)

            // if (this.form.hh === null || this.form.hh === undefined || this.form.hh === '') {
            //   tds[6].textContent = ''
            //   tds[12].textContent = ''
            // }

            if (type === 'add') {
              this.tableVal.table.push(obj)

              // if (this.tableVal.table.length === 2) {
              //   this.hePan()
              // }
              this.updateLocalTable()
            } else {
              this.$set(this.tableVal, 'table', [obj])
              this.$set(this.tableVal, 'text', '')
              this.addLocalTable()
            }
            tableDom = table
            this.tableHtml = table.outerHTML

            // if (!this.form.hh) {
            //   this.tableClear1()
            //   this.tableClear2()
            // }
            this.html = doc.body.outerHTML
            const table_name = /赵灵芝/g
            this.html = this.replacePattern(this.html, table_name, this.form.name)
            // console.log(this.$cache.local.get('29bf2d47-cc7d-4208-b561-40794d713451'))
            // this.addLocalTable()
            this.resetHH()
          })
            .catch(err => console.log(err))
            .finally(res => {
              loading.close()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })

    }
    ,
    initGaiYao(tdGaiYaoStr, str) {
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
    initTableVal(table, geshuTable) {
      const tds = table.querySelectorAll('td')
      const geShuTds = geshuTable.querySelectorAll('td')
      // console.log(tds)
      const name = this.form.name ? this.form.name : ''
      const naYinYear = tds[24].textContent
      const gaiYao = this.initGaiYao(tds[7].textContent, naYinYear)
      // console.log('naying', naYinYear)
      // console.log("tds[24].textContent",tds[24].textContent)
      const form = JSON.parse(JSON.stringify(this.form))
      const obj = {
        form,
        name,
        gaiYao,
        geShu: geShuTds[0].textContent,

        solarYear: tds[3].textContent,
        solarMonth: tds[4].textContent,
        solarDay: tds[5].textContent,
        solarHh: tds[6].textContent,
        lunarYear: tds[9].textContent,
        lunarMonth: tds[10].textContent,
        lunarDay: tds[11].textContent,
        lunarHh: tds[12].textContent,
        baZhiYear: tds[14].textContent,
        baZhiMonth: tds[15].textContent,
        baZhiDay: tds[16].textContent,
        baZhiHh: tds[17].textContent,
        wuXinYear: tds[19].textContent,
        wuXinMonth: tds[20].textContent,
        wuXinDay: tds[21].textContent,
        wuXinHh: tds[22].textContent,

        naYinYear,
        naYinMonth: tds[25].textContent,
        naYinDay: tds[26].textContent,
        naYinHh: tds[27].textContent

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
    updateTableForm(index) {
      // console.log(index)
      this.updateTableIndex = index
      const updateTable = this.tableVal.table[index]
      // console.log(updateTable.form)
      this.form = updateTable.form
    },
    delTable(table, index) {
      this.delToUpdateForm(table[index].form)
      table.splice(index, 1)

      if (table.length === 0) {
        this.deleteList(this.tableKey)
      } else {
        this.updateLocalTable()
      }

    }
    ,
    repeatPostGuoxue(form) {
      // console.log(form)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // console.log(this.checkForm)
      const data = this.initData(form)
      // console.log('data', data)
      postGuoxue(data).then(res => {
        let html = res
        const k = html.indexOf('<\/TABLE>')
        html = html.slice(k)
        const lastClosingTableTagPosition = html.lastIndexOf('<table')
        html = html.slice(0, lastClosingTableTagPosition)
        // console.log(html)
        // const naYingPattern = />纳音：.*?<\/tr>/gs
        // const match = html.match(new RegExp(naYingPattern, 'g'))
        //
        // const geShuPattern = />八字五行个数.*?<\/tr>/gs
        // // const match2 = html.match(new RegExp(geShuPattern, 'g'))
        // html = this.replacePattern(html, geShuPattern, match[0])
        // const table1_2Pattern = /<table.*?<\/TABLE>/s
        // html = this.replacePattern(html, table1_2Pattern, '')
        const table_name = /赵灵芝/
        html = this.replacePattern(html, table_name, form.name)
        // console.log(html)
        this.html = html
      })
        .catch(err => console.log(err))
        .finally(res => {
          loading.close()
        })
    }
    ,
    changeSearch() {
      // console.log(this.searchVal)
      this.searchList = this.list.filter(obj => {
        // 使用 some() 方法检查每个对象的 "table" 属性中是否存在包含 "ab" 的名称
        return obj.table.some(item => item.name.includes(this.searchVal))
      })
      // console.log(this.searchList)
    }
    ,
    cardClick(item) {
      // this.tableVal =  JSON.parse(JSON.stringify(item));
      // console.log(item.key)
      this.tableKey = item.key
      this.$set(this.tableVal, 'table', item.table)
      this.$set(this.tableVal, 'text', item.text)
      this.searchList = []
      this.searchVal = ''
      this.html = null
      this.resetTableImg()
    },
    resetTableImg() {
      const tableImg = this.$refs.imageTable
      tableImg.textContent = ''
    },
    delToUpdateForm(form) {
      this.$set(this.form, 'name', form.name)
      this.$set(this.form, 'nian', form.nian)
      this.$set(this.form, 'yue', form.yue)
      this.$set(this.form, 'ri', form.ri)
      const hh = form.hh !== null ? form.hh : null
      this.$set(this.form, 'hh', hh)
      this.$set(this.form, 'isSolar', form.isSolar)
      this.$set(this.form, 'isLeapMonth', form.isLeapMonth)
    },
    deleteList(key) {
      // console.log(item.key)
      this.list.forEach((i, index) => {
        if (i.key === key) {
          // console.log(i.key)
          // this.tableKey = i.key
          // this.delToUpdateForm
          this.list.splice(index, 1)
          const listStr = JSON.stringify(this.list)
          this.$cache.local.set('table_list', listStr)
        }
      })
    }
    ,
    clearAllList() {
      // this.list.forEach((i) => {
      //   this.$cache.local.remove(i.key)
      // })
      this.$cache.local.remove('table_list')
      this.list = []

    }
    ,
    addLocalTable(obj) {
      const list0name = this.list[0]?.table[0]?.form?.name
      if (this.list[0]?.table.length === 1 && this.form.name === list0name) {
        // console.log(this.form.name)
        this.list[0].table = this.tableVal.table
        const listStr = JSON.stringify(this.list)
        // console.log(listStr)
        this.$cache.local.set('table_list', listStr)
      } else if (this.form.name) {
        this.tableKey = uuid()
        const item = { key: this.tableKey, ...this.tableVal }
        this.list.unshift(item)
        const listStr = JSON.stringify(this.list)
        // console.log(listStr)
        this.$cache.local.set('table_list', listStr)
      }
    }
    ,
    updateLocalTable() {
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i]
        if (item.key === this.tableKey) {
          // console.log(this.tableKey)
          // console.log(i.key)
          // this.tableKey = i.key

          this.list[i] = { key: this.tableKey, ...this.tableVal }
          // console.log(item)

        }
        const listStr = JSON.stringify(this.list)
        // console.log(listStr)
        this.$cache.local.set('table_list', listStr)
      }
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
    tableIptBlur() {
      // console.log(this.tableVal)
      this.updateLocalTable()
    }
    ,
// onSubmitText() {
//   const td = tableDom.querySelector('#pre-line')
//   if (td) {
//     // this.$message("有内容，请点修改再提交")
//     const odlStr = td.innerText
//     const newStr = odlStr + '\n' + this.textarea
//     td.textContent = newStr
//     // console.log(newStr)
//     // console.log(tableDom)
//
//   } else {
//     const tdNew = document.createElement('td')
//     const tdNew1 = document.createElement('td')
//     const trNew = document.createElement('tr')
//     trNew.id = 'tr-gaiYao'
//     trNew.append(tdNew1)
//     trNew.append(tdNew)
//     // console.log(trNew)
//     tableDom.querySelector('tbody').append(trNew)
//     // console.log(this.tableDom)
//
//     tdNew.textContent = this.textarea
//     // console.log(tdNew)
//     tdNew.classList.add('no-internal-borders')
//     tdNew.classList.add('new')
//     tdNew.id = 'pre-line'
//     tdNew1.classList.add('no-internal-borders')
//     tdNew.colSpan = 7
//   }
//   this.tableHtml = tableDom.outerHTML
//   this.tableKey && this.form.name && this.$cache.local.set(this.tableKey, this.tableHtml)
//   this.textarea = ''
// },
    replacePattern(html, searchPattern, replaceText) {
      // const regex = new RegExp(searchPattern, 'g')
      const regex = new RegExp(searchPattern)
      return html.replace(regex, replaceText)
    }
    ,
    resetHH() {
      this.$set(this.form, 'isSolar', false)
      this.$set(this.form, 'isLeapMonth', false)
      this.$set(this.form, 'hh', null)
      this.$set(this.form, 'mm', null)
    }
    ,
    test() {
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
      this.$nextTick(function() {
        html2canvas(table, {
          letterRendering: true,
          // scale: window.devicePixelRatio
          scale: 2
          // width: 760
        }).then(function(canvas) {
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
    reset() {
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

.box-card {
  width: 320px;
  //height: 750px;

  .el-icon-delete {
    float: right;
    color: red;
    font-size: 18px;
  }
}

.main {
  position: relative;

  .action, {
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

  .tbody-val-action, {
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

  td, th, textarea {
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
  td, th {
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
  height: 480px; /* 设置容器高度 */
  overflow: auto; /* 设置溢出时显示滚动条 */
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
