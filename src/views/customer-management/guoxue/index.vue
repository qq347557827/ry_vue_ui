<template>
  <div class="guoxue">
    <div class="search">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px" labelPosition="top" class="demo-ruleForm">
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
              <el-select v-model="form.nian" filterable placeholder="年">
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
                  v-for="item in 12"
                  :key="item"
                  :label="item"
                  :value="item"
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
              <el-select v-model="form.hh" placeholder="请选择">
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
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button @click="reset">取消</el-button>
              <el-button @click="test">test</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <el-row>
        <el-col :xs="0" :span="6">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="clearList">清空</el-button>
              </div>
              <div v-for="(item, index) in list" :key="index" class="text item">
                <div>
                  <el-link type="primary" @click="cardClick(item)">
                    {{
                      item.name + '--' + (item.isSolar ? '公历' : '农历') + item.nian + '年' + (item.isLeapMonth ? '闰' : '') + item.yue + '月' + item.ri + '日' + (item.hh ? item.hh : '')
                    }}
                    <!--                    {{item.key}}-->
                  </el-link>
                  <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="不了"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定删除吗？"
                    @confirm="deleteList(item)"
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
          <div class="main">
            <div v-html="tableHtml" id="table-html" style="background-color: red"></div>
            <div>
              <table>
                <template v-for="(item, index) in tableVal.table">
                  <tr>
                    <td width="6%" rowspan="5" bgcolor="#FFFFFF" class="new no-internal-borders">
                      {{ item.name }}
                    </td>
                    <td width="8%" rowspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">
                      出生<br>日期
                    </td>
                    <td width="10%" bgcolor="#FFFFFF" class="new no-internal-borders">
                      公历
                    </td>
                    <td style="width:10%" bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.solarYear }}</td>
                    <td style=" width:10%" bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.solarMonth }}</td>
                    <td style=" width:12%" bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.solarDay }}</td>
                    <td style=" width:11%" bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.closeSolarH ?  item.solarHh : '' }}</td>
                    <td style=" width:30%;padding-left:4px;padding-right:4px;" rowspan="5" bgcolor="#FFFFFF"
                        class="new no-internal-borders"
                    >
                      {{ item.gaiYao }}
                    </td>
                  </tr>
                  <tr>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">农历</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.lunarYear }}</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.lunarMonth }}</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.lunarDay }}</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.closeLunarH ?  item.lunarHh : '' }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">八字：</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.baZhiYear }}</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.baZhiMonth }}</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.baZhiDay }}</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{ item.closeBaZhiH ?  item.baZhiHh : '' }}</td>
                  </tr>
                  <tr>
                    <td colspan="2" bgcolor="#FFFFFF" class="new no-internal-borders">五行：</td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{
                         item.wuXinYear
                      }}
                    </td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{
                        item.wuXinMonth
                      }}
                    </td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{
                        item.wuXinDay
                      }}
                    </td>
                    <td bgcolor="#FFFFFF" class="new no-internal-borders">{{
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
                </template>
                <tr>
                  <td colspan="8">
                    <el-input
                      type="textarea"
                      :rows="2"
                      autosize
                      placeholder="请输入内容"
                      v-model="textarea"
                    >
                    </el-input>
                  </td>
                </tr>
              </table>
            </div>
            <!--        <el-row>-->
            <!--          <el-col :span="1"><div class="grid-content bg-purple-dark"></div></el-col>-->
            <!--          <el-col :span="24"><div class="grid-content bg-purple-dark">-->
            <!--            <span style="background-color: red">{{textarea}}</span>-->
            <!--          </div></el-col>-->
            <!--        </el-row>-->
            <div v-show="tableHtml">
              <el-input
                type="textarea"
                :rows="2"
                autosize
                placeholder="请输入内容"
                v-model="textarea"
              >
              </el-input>
              <el-button type="primary" @click="onSubmitText">提交</el-button>
              <el-button type="primary" @click="onUpdateText">修改</el-button>
              <el-button type="primary" @click="test" :loading="btnLoad">生成图片</el-button>
            </div>
            <div>
              <div id="image-table"></div>
              <el-image
                style="width: 100%; height: 100%"
                :src="imgUrl"
              ></el-image>
            </div>
            <template v-if="this.html">
              <div style="" v-html="html"></div>
            </template>
            <template v-else-if="tableHtml">
              <span>只缓存了表格，如需详细数据，请点击旁边从新获取-->></span>
              <el-button type="primary" @click="repeatPostGuoxue">从新获取</el-button>
            </template>

            <div class="action">
              <div class="">
                <span>关闭时间</span>
                <el-switch
                  v-model="lastFlg.lastValue1"
                  @change="tableClear1"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </div>
              <div>
                <span>关闭时辰</span>
                <el-switch
                  v-model="lastFlg.lastValue2"
                  @change="tableClear2"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </div>
              <div>
                <span>最后八字</span>
                <el-switch
                  v-model="lastFlg.lastValue3"
                  @change="tableClear3"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </div>
              <div>
                <span>最后五行</span>
                <el-switch
                  v-model="lastFlg.lastValue4"
                  @change="tableClear4"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </div>
            </div>
          </div>
        </el-col>

      </el-row>


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
      btnLoad: false,
      imgUrl: null,
      html: null,
      tableHtml: null,
      lastFlg: {},
      form: {},
      checkForm: {},
      textarea: '',
      list: [],
      tableKey: null,
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
  created() {
    const tableListStr = this.$cache.local.get('table_list')
    // console.log(tableListStr)
    if (tableListStr) {
      this.list = JSON.parse(tableListStr)

    }
  },
  mounted() {
    this.checkIfMobile()
  },
  methods: {
    checkIfMobile() {
      this.isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())
      // console.log(this.isMobile)
    },
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
        if (form.isLeapMonth) {
          const leapMonth = calendar.leapMonth(form.nian)
          if (!leapMonth) {
            this.$message('该年份没有闰月')
            return
          } else if (leapMonth !== form.yue) {
            this.$message(`该年闰${leapMonth}月，请检查是否正确`)
            return
          }
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
    },

    onSubmit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const data = this.initData(this.form)

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

            this.replaceName()
            let parser = new DOMParser()
            let doc = parser.parseFromString(this.html, 'text/html')
            // console.log(doc)

            // 获取第一个table元素

            const table = doc.querySelector('table')
            const tds = table.querySelectorAll('td')
            tds[1].innerHTML = '出生<br>时间'
            tds[1].style.width = '8%'
            tds[2].style.width = '10%'
            tds.forEach(item => {
              item.classList.add('no-internal-borders')
            })
            // table.className = "no-internal-borders"
// 输出table元素的内容

            const trArr = table.querySelectorAll('tr')
            // console.log('trArr', trArr)
            const trNaYing = trArr[4]
            // console.log(trNaYing)

            const tableGeShu = doc.querySelectorAll('table')[1]
            const trGeShu = tableGeShu.querySelector('tr')
            const tdGeShu = trGeShu.querySelector('td')
            // tdGeShu.textContent = "测试"
            tdGeShu.colSpan = 6
            tdGeShu.classList.add('no-internal-borders')
            // console.log(trGeShu)
            // table.replaceChild(trGeShu, trNaYing)
            table.deleteRow(4)
            table.querySelector('tbody').append(trGeShu)
            // tableGeShu.deleteRow(0)
            tableGeShu.querySelector('tbody').append(trNaYing)
            const tableStr = table.innerHTML

            const tr0TdArr = table.querySelectorAll('tr')[0].querySelectorAll('td')
            tr0TdArr[0].rowSpan = 5
            tr0TdArr[7].rowSpan = 5

            // const tableT = /<tbody>.*?纳音：.*?<\/tbody>/gs
            // const tableTRegex = new RegExp(tableT);
            // this.html = this.html.replace(tableTRegex,tableStr)

            // const f = this.html.test(searchPattern3)

            // console.log("table...............",table)
            // console.log('doc...............', tableStr)
            // this.replaceNianZhu(trNaYing.querySelectorAll('td')[1].innerText)

            const tdNianZhu = trNaYing.querySelectorAll('td')[1]
            const tdGaiYao = trArr[0].querySelectorAll('td')[7]
            let tdGaiYaoStr = tdGaiYao.innerHTML

            const str = tdNianZhu.innerText + '命'
            // console.log(str)
            const searchPattern = /日柱.*?命/g // 匹配以<b>赵开头，“<br /><br />”结尾的文本
            // this.html = this.replacePattern(this.html, searchPattern, str)
            tdGaiYaoStr = this.replacePattern(tdGaiYaoStr, searchPattern, str)

            // this.html = this.replacePattern(this.html, searchPattern2, '')
            const searchPattern2 = /。<br>.*?<\/span>/gs
            // this.html = this.replacePattern(this.html, searchPattern2, '')
            tdGaiYaoStr = this.replacePattern(tdGaiYaoStr, searchPattern2, '')
            const strongPattern = /<strong>/g // 匹配以<b>赵开头，“<br /><br />”结尾的文本
            tdGaiYaoStr = this.replacePattern(tdGaiYaoStr, strongPattern, '')
            const strong2Pattern = /<\/strong>/g // 匹配以<b>赵开头，“<br /><br />”结尾的文本
            tdGaiYaoStr = this.replacePattern(tdGaiYaoStr, strong2Pattern, '')
            const bPattern = /<b>/g // 匹配以<b>赵开头，“<br /><br />”结尾的文本
            tdGaiYaoStr = this.replacePattern(tdGaiYaoStr, bPattern, '')
            const b2Pattern = /<\/b>/g // 匹配以<b>赵开头，“<br /><br />”结尾的文本
            tdGaiYaoStr = this.replacePattern(tdGaiYaoStr, b2Pattern, '')
            // console.log("tdGaiYaoStr",tdGaiYaoStr)
            tdGaiYao.innerHTML = tdGaiYaoStr
            // console.log(tdGaiYao)
            doc.body.removeChild(table)
            // console.log(doc)
            console.log(this.$cache.local.get('29bf2d47-cc7d-4208-b561-40794d713451'))

            if (this.form.hh === null || this.form.hh === undefined || this.form.hh === '') {
              tds[6].textContent = ''
              tds[12].textContent = ''
            }
            console.log(tds)
            const obj = this.initTableVal(table)
            this.tableVal.table.push(obj)
            tableDom = table
            this.tableHtml = table.outerHTML

            // if (!this.form.hh) {
            //   this.tableClear1()
            //   this.tableClear2()
            // }
            this.html = doc.body.outerHTML
            console.log(this.$cache.local.get('29bf2d47-cc7d-4208-b561-40794d713451'))
            this.addLocalTable()
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

    },
    initTableVal(table) {
      const tds = table.querySelectorAll('td')
      console.log(tds)
      // console.log("tds[24].textContent",tds[24].textContent)
      const obj = {
        name: tds[0].textContent,
        gaiYao: tds[7].textContent,
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
        geShu: tds[23].textContent
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
    },
    repeatPostGuoxue() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log(this.checkForm)
      const data = this.initData(this.checkForm)
      console.log('data', data)
      postGuoxue(data).then(res => {
        let html = res
        const k = html.indexOf('<table')
        html = html.slice(k)
        const lastClosingTableTagPosition = html.lastIndexOf('<table')
        html = html.slice(0, lastClosingTableTagPosition)
        // console.log(html)
        const naYingPattern = />纳音：.*?<\/tr>/gs
        const match = html.match(new RegExp(naYingPattern, 'g'))

        const geShuPattern = />八字五行个数.*?<\/tr>/gs
        // const match2 = html.match(new RegExp(geShuPattern, 'g'))
        html = this.replacePattern(html, geShuPattern, match[0])
        const table1_2Pattern = /<table.*?<\/table>/s
        html = this.replacePattern(html, table1_2Pattern, '')
        // console.log(html)
        this.html = html
      })
        .catch(err => console.log(err))
        .finally(res => {
          loading.close()
        })
    },
    cardClick(item) {
      this.checkForm = item
      this.lastFlg = {}
      this.reset()
      this.resetTableImg()
      this.textarea = ''
      console.log(item.key)
      this.tableKey = item.key
      const str = this.$cache.local.get(item.key)
      this.tableHtml = str
      let parser = new DOMParser()
      let doc = parser.parseFromString(str, 'text/html')
      tableDom = doc.querySelector('table')
      // console.log(tableDom)
      // this.form = item
      this.html = null
      // console.log(str)
    },
    deleteList(item) {
      // console.log(item.key)
      this.list.forEach((i, index) => {
        if (i.key === item.key) {
          // console.log(i.key)
          const tableKey = i.key
          // this.tableKey = i.key
          this.list.splice(index, 1)
          const listStr = JSON.stringify(this.list)
          this.$cache.local.set('table_list', listStr)
          this.$cache.local.remove(tableKey)
        }
      })
    },
    clearList() {
      this.list.forEach((i) => {
        this.$cache.local.remove(i.key)
      })
      this.$cache.local.remove('table_list')
      this.list = []

    },
    addLocalTable() {
      if (this.form.name) {
        this.tableKey = uuid()
        console.log(this.tableKey)
        console.log(this.list)
        const item = { key: this.tableKey, ...this.form }
        this.list.unshift(item)
        const listStr = JSON.stringify(this.list)
        // console.log(listStr)
        this.$cache.local.set('table_list', listStr)
        this.$cache.local.set(this.tableKey, this.tableHtml)
      }
    },
    onSubmitText() {
      const td = tableDom.querySelector('#pre-line')
      if (td) {
        // this.$message("有内容，请点修改再提交")
        const odlStr = td.innerText
        const newStr = odlStr + '\n' + this.textarea
        td.textContent = newStr
        // console.log(newStr)
        // console.log(tableDom)

      } else {
        const tdNew = document.createElement('td')
        const tdNew1 = document.createElement('td')
        const trNew = document.createElement('tr')
        trNew.id = 'tr-gaiYao'
        trNew.append(tdNew1)
        trNew.append(tdNew)
        // console.log(trNew)
        tableDom.querySelector('tbody').append(trNew)
        // console.log(this.tableDom)

        tdNew.textContent = this.textarea
        // console.log(tdNew)
        tdNew.classList.add('no-internal-borders')
        tdNew.classList.add('new')
        tdNew.id = 'pre-line'
        tdNew1.classList.add('no-internal-borders')
        tdNew.colSpan = 7
      }
      this.tableHtml = tableDom.outerHTML
      this.tableKey && this.form.name && this.$cache.local.set(this.tableKey, this.tableHtml)
      this.textarea = ''
    },
    onUpdateText() {
      const td = tableDom.querySelector('#pre-line')
      if (!td) return
      const tr = tableDom.querySelector('#tr-gaiYao')
      this.textarea = td.innerText
      tr.remove()
      this.tableHtml = tableDom.outerHTML
    },
    replaceNianZhu(nianZhu) {
      const str = nianZhu + '命'
      const searchPattern = /日柱.*?命/g // 匹配以<b>赵开头，“<br /><br />”结尾的文本
      this.html = this.replacePattern(this.html, searchPattern, str)
      // this.html = this.replacePattern(this.html, searchPattern2, '')
      const searchPattern2 = /。<br \/>.*?<\/td>/gs
      this.html = this.replacePattern(this.html, searchPattern2, '')

      const table = /<table.*?个土.*?<\/TABLE>/gs
      // const f = this.html.test(searchPattern3)
      const startRegex = new RegExp(table)
      const match = this.html.match(startRegex)[0]
      // console.log('match', match)
      const trTest = new RegExp(/<tr.*?<\/tr>/gs)
      const trMatchArr = match.match(trTest)
      const tr4 = trMatchArr[4]
      const tr5 = trMatchArr[5]
      const inx = this.html.indexOf(tr4)
      console.log('index', inx)
      // const newTable = table.replace(tr4, tr5)
      // console.log("newTable",newTable)

    },
    replaceName() {
      let name
      let nameHtml = ''
      let searchPattern = /<b>赵.*?<\/td>/gs // 匹配以<b>赵开头，“<br /><br />”结尾的文本
      if (!this.form.name) {
        nameHtml = ''
      } else {
        name = this.form.name
        for (const char of name) {
          nameHtml += `<b>${char}</b><br><br>`
        }
        nameHtml += '</td>'
      }
      this.html = this.replacePattern(this.html, searchPattern, nameHtml)

    },
    replacePattern(html, searchPattern, replaceText) {
      // const regex = new RegExp(searchPattern, 'g')
      const regex = new RegExp(searchPattern)
      return html.replace(regex, replaceText)
    },
    resetHH() {
      this.$set(this.form, 'isSolar', false)
      this.$set(this.form, 'isLeapMonth', false)
      this.$set(this.form, 'hh', null)
      this.$set(this.form, 'mm', null)
    },
    resetTableImg() {
      const tableImg = window.document.querySelector('#image-table')
      tableImg.textContent = ''
    },
    tableClear1() {

      // this.last1 = tds[6].innerText
      this.tableClear(6)
    },
    tableClear2() {

      // this.last1 = tds[6].innerText
      this.tableClear(12)
    },
    tableClear3() {

      // this.last1 = tds[6].innerText
      this.tableClear(17)
    },
    tableClear4() {
      // this.last1 = tds[6].innerText
      this.tableClear(22)
    },
    tableClear(num) {
      if (tableDom) {
        const tds = tableDom.querySelectorAll('td')
        // this.last1 = tds[6].innerText
        tds[num].textContent = ''
        this.tableHtml = tableDom.outerHTML
        this.$cache.local.set(this.tableKey, this.tableHtml)
      }

    },
    test() {
      // const
      // html2canvas(tableDom).then(function(canvas) {
      //   console.log(canvas)
      //   // const tableImg = window.document.querySelector("#image-table")
      //   // tableImg.appnedChild(canvas)
      // })
      this.resetTableImg()
      this.btnLoad = true
      const that = this
      const table = document.querySelector('#table-html')
      html2canvas(table, {
        letterRendering: true,
        // scale: window.devicePixelRatio
        scale: 2
        // width: 760
      }).then(function(canvas) {
        // console.log(canvas)
        // document.body.appnedChild(canvas)
        const tableImg = window.document.querySelector('#image-table')

        tableImg.append(canvas)
        that.btnLoad = false
        if (that.isMobile) {
          const tableImgUrl = window.document.querySelector('#image-png')
          const downloadLink = document.createElement('a')
          // 将 Canvas 转为 Data URL
          const dataUrl = canvas.toDataURL('image/png')
          // console.log(dataUrl)
          that.imgUrl = dataUrl
          // 设置下载链接的 href 属性为 Data URL
          downloadLink.href = dataUrl

          // 设置文件名
          downloadLink.download = 'screenshot.png'

          // 模拟点击下载链接
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        }

      })
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
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

  .el-icon-delete {
    float: right;
    color: red;
    font-size: 18px;
  }
}

.main {
  position: relative;

  .action {
    position: absolute;
    top: 0;
    right: -120px;

    div {
      height: 46px;
    }
  }
}

.main::v-deep {
  width: 760px;
  margin: auto;


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
</style>
