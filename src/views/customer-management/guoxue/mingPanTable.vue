<template>
  <div>
    <table class="heavier-text">
      <tbody>
        <template v-if="!tableItem.closeSolarRow">
          <tr>
            <td width="7%" rowspan="4" :style="{ 'line-height': nameLineHeight }" class=" new no-internal-borders
                          vertical-text">
              <b v-if="tableItem.name.length < 3">
                <template v-for="(str, idx) in tableItem.name">
                  {{ str }}<br><br v-if="idx < 1">
                </template>
              </b>
              <b v-else>
                <template v-for="(str) in tableItem.name">
                  {{ str }}<br>
                </template>
              </b>
            </td>
            <!--                        <td width="8%" rowspan="1"  class="new no-internal-borders">-->
            <!--                          &lt;!&ndash;                          生辰&ndash;&gt;-->
            <!--                        </td>-->
            <td style="width:15%;" class="new no-internal-borders" colspan="2">农历生辰</td>
            <td style="width:13%;" :style="paddingStyle('lunarYear')" class="new no-internal-borders">{{
              tableItem.lunarYearChinese
                ? tableItem.lunarYearChinese : tableItem.lunarYear }}
            </td>
            <td style="width:10%;" :style="paddingStyle('lunarMonth')" class="new no-internal-borders">{{
              tableItem.lunarMonth }}
            </td>
            <td style="width:12%;" :style="paddingStyle('lunarDay')" class="new no-internal-borders">{{
              tableItem.lunarDay }}
            </td>
            <td style="width:11%;" :style="paddingStyle('lunarHh')" class="new no-internal-borders">{{
              tableItem.closeLunarH ?
              tableItem.lunarHh : '' }}
            </td>
            <td style=" width:30%;padding-left:4px;padding-right:4px;" rowspan="4" class="new no-internal-borders">
              {{ tableItem.gaiYao }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td width="7%" rowspan="5" :style="{ 'line-height': nameLineHeight }"
              class=" new no-internal-borders vertical-text">
              <b v-if="tableItem.name.length < 3">
                <template v-for="(str, idx) in tableItem.name">
                  {{ str }}<br><br v-if="idx < 1">
                </template>
              </b>
              <b v-else>
                <template v-for="(str) in tableItem.name">
                  {{ str }}<br>
                </template>
              </b>
            </td>
            <td width="8%" rowspan="2" class="new no-internal-borders">
              出生<br>日期
            </td>
            <td width="10%" class="new no-internal-borders">
              公历
            </td>
            <td style="width:10%" :style="paddingStyle('solarYear')" class="new no-internal-borders">{{
              tableItem.solarYear }}
            </td>
            <td style=" width:10%" :style="paddingStyle('solarMonth')" class="new no-internal-borders">{{
              tableItem.solarMonth }}
            </td>
            <td style=" width:12%" :style="paddingStyle('solarDay')" class="new no-internal-borders">{{
              tableItem.solarDay }}
            </td>
            <td style=" width:11%" :style="paddingStyle('solarHh')" class="new no-internal-borders">
              {{ tableItem.closeSolarH ? tableItem.solarHh : '' }}
            </td>
            <td style=" width:30%;padding-left:4px;padding-right:4px;" rowspan="5" class="new no-internal-borders">
              {{ tableItem.gaiYao }}
            </td>
          </tr>
          <tr>
            <td class="new no-internal-borders">农历</td>
            <td :style="paddingStyle('lunarYear')" class="new no-internal-borders">{{ tableItem.lunarYear }}
            </td>
            <td :style="paddingStyle('lunarMonth')" class="new no-internal-borders">{{ tableItem.lunarMonth }}
            </td>
            <td :style="paddingStyle('lunarDay')" class="new no-internal-borders">{{ tableItem.lunarDay }}
            </td>
            <td :style="paddingStyle('lunarHh')" class="new no-internal-borders">{{ tableItem.closeLunarH ?
              tableItem.lunarHh : ''
              }}
            </td>
          </tr>
        </template>

        <!--                      <show-lunar-and-solar :tableItem="tableItem" :tableIndex="tableIndex" :randomOffsets="randomOffsets" :key="tableIndex"></show-lunar-and-solar>-->

        <tr>
          <td colspan="2" class="new no-internal-borders">八字：</td>
          <td :style="paddingStyle('baZhiYear')" class="new no-internal-borders">{{ tableItem.baZhiYear }}
          </td>
          <td :style="paddingStyle('baZhiMonth')" class="new no-internal-borders">{{ tableItem.baZhiMonth }}
          </td>
          <td :style="paddingStyle('baZhiDay')" class="new no-internal-borders">{{ tableItem.baZhiDay }}
          </td>
          <td :style="paddingStyle('baZhiHh')" class="new no-internal-borders">{{ tableItem.closeBaZhiH ?
            tableItem.baZhiHh : ''
            }}
          </td>
        </tr>
        <tr>
          <td colspan="2" class="new no-internal-borders">五行：</td>
          <td :style="paddingStyle('wuXinYear')" class="new no-internal-borders">{{
            tableItem.wuXinYear
          }}
          </td>
          <td :style="paddingStyle('wuXinMonth')" class="new no-internal-borders">{{
            tableItem.wuXinMonth
          }}
          </td>
          <td :style="paddingStyle('wuXinDay')" class="new no-internal-borders">{{
            tableItem.wuXinDay
          }}
          </td>
          <td :style="paddingStyle('wuXinHh')" class="new no-internal-borders">{{
            tableItem.closeWuXinH ? tableItem.wuXinHh : ''
          }}
          </td>
        </tr>
        <tr>
          <td class="new no-internal-borders" colspan="6"> {{
            '八字五行数 ：' + tableItem.geShu
          }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MingPanTable",
  props: {
    tableItem: Object,
    tableIndex: Number,
  },
  data: () => {
    return {
      randomOffsets: {}
    }
  },
  computed: {
    nameLineHeight () {
      if (this.tableItem.name) {
        if (this.tableItem.name.length <= 3) {
          return 2
        } else if (this.tableItem.name.length <= 4) {
          return 1.5
        } else if (this.tableItem.name.length <= 5) {
          return 1.2
        } else {
          return 1
        }
      }
    }
  },
  created () {
    this.randomOffsets = this.generateRandomOffsets()
  },
  methods: {
    generateRandomOffsets () {
      let obj = {};
      Object.keys(this.tableItem || {}).forEach(key => {
        obj[key] = Math.floor(Math.random() * 7) + 1;
      });
      console.log("🚀 ~ Generated random offsets: ", obj);
      return obj;
    },
    paddingStyle (property) {

      // console.log("🚀 ~ file:mingPanTable method:paddingStyle line:231 -----property",property )

      return {
        paddingBottom: this.randomOffsets[property] + 'px',
        paddingLeft: this.randomOffsets[property] + 'px'
      };
    },
  }
}
</script>

<style scoped lang="scss">
@media only screen and (max-width: 768px) {
  .table-textarea::v-deep {
    textarea {
      //font-family: '楷体', sans-serif;
      font-family: 'FangZKaiTi', sans-serif;
    }
  }

  .no-internal-borders {
    //font-family: '楷体', sans-serif;
    font-family: 'FangZKaiTi', sans-serif;
  }
}

/* 针对平板设备 */
@media only screen and (min-width: 768px) and (max-width: 1024px) {

  .table-textarea::v-deep {
    textarea {
      //font-family: '楷体', sans-serif;
      font-family: 'FangZKaiTi', sans-serif;
    }
  }

  .no-internal-borders {
    //font-family: '楷体', sans-serif;
    font-family: 'FangZKaiTi', sans-serif;
  }
}

/* 针对电脑（桌面）设备 */
@media only screen and (min-width: 1024px) {
  .table-textarea::v-deep {
    textarea {
      font-family: '楷体', sans-serif;
      //font-family: 'FangZKaiTi', sans-serif;
    }
  }

  .no-internal-borders {
    font-family: '楷体', sans-serif;
    //font-family: 'FangZKaiTi', sans-serif;
  }
}

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

.heavier-text {
  color: #131313;
  font-weight: 600;

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
    //font-family: 'FangZKaiTi', sans-serif;
    //border: none;
    //border-collapse: collapse;
    //background-color: red;
  }

  #pre-line {
    white-space: pre-line;
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
</style>
