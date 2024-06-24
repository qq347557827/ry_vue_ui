<script>
import { Solar, LunarYear, Lunar, LunarMonth, SolarUtil, Foto } from 'lunar-typescript'
import I18n from './config';

const now = new Date()
export default {
  name: "index",
  data () {
    return {
      dayNum: 30,
      lang: I18n.getLanguage(),
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      yearGanZhi: '',
      yearShengXiao: '',
      yearNaYin: '',
      lunarYearInChinese: '',
      lunarMonthInChinese: '',
      lunarDayInChinese: '',
      yearZhiShui: '',
      yearGenTian: '',
      yearDeJin: '',
      yearFenBing: '',
      yearKongWang: '',
      monthGanZhi: '',
      monthShengXiao: '',
      monthNaYin: '',
      monthTaiShen: '',
      monthKongWang: '',
      dayGanZhi: '',
      dayShengXiao: '',
      dayNaYin: '',
      dayTaiShen: '',
      dayZhiShen: '',
      dayChong: '',
      dayTianShen: '',
      daySha: '',
      dayLu: '',
      dayJiShen: [],
      dayXiongSha: [],
      dayYi: [],
      dayJi: [],
      dayKongWang: '',
      dayJiuXing: '',
      prevJq: '',
      nextJq: '',
      pengZuGan: '',
      pengZuZhi: '',
      liuYao: '',
      yueXiang: '',
      yueMing: '',
      wuHou: '',
      weekInChinese: '',
      xingZuo: '',
      xiu: '',
      positionFu: '',
      positionCai: '',
      positionXi: '',
      positionYangGui: '',
      positionYinGui: '',
      modelYear: '',
      modelMonth: '',
      modelDay: '',
      timesList: [],
      festivals: {

      }
    }
  },
  created () {
    console.log("🚀 ~ file:index method:created line:914 -----I18n", I18n.getLanguage())

  },
  computed: {
    model: {
      get () {
        return {
          year: this.modelYear,
          month: this.modelMonth,
          day: this.modelDay
        }
      },
      set (value) {
        this.modelYear = value.year
        this.modelMonth = value.month
        this.modelDay = value.day
      }
    }
  },
  watch: {
    year (val) {
      this.dayNum = SolarUtil.getDaysOfMonth(val, this.month)
      console.log('lunarMonth: ', this.dayNum);
      if (this.day > this.dayNum) {
        this.day = this.dayNum
      }
      this.render()
    },
    month (val) {
      this.dayNum = SolarUtil.getDaysOfMonth(this.year, val)
      console.log('lunarMonth: ', this.dayNum);
      if (this.day > this.dayNum) {
        this.day = this.dayNum
      }
      this.render()
    },
    day () {
      this.render()
    },

    // modelYear (val) {
    //   const year = parseInt(val, 10)
    //   if (!isNaN(year)) {
    //     this.year = year
    //     this.render()
    //   }
    // },
    // modelMonth (val) {
    //   const month = parseInt(val, 10)
    //   if (!isNaN(month)) {
    //     this.month = month
    //     this.render()
    //   }
    // },
    // modelDay (val) {
    //   const day = parseInt(val, 10)
    //   if (!isNaN(day)) {
    //     this.day = day
    //     this.render()
    //   }
    // }
  },
  methods: {
    render () {
      this.model.year = this.year + ''
      this.model.month = this.month + ''
      this.model.day = this.day + ''
      const solar = Solar.fromYmd(this.year, this.month, this.day)

      this.weekInChinese = solar.getWeekInChinese()
      this.xingZuo = solar.getXingZuo()

      const lunar = solar.getLunar()
      this.yearGanZhi = lunar.getYearInGanZhi()
      this.yearShengXiao = lunar.getYearShengXiao()
      this.yearNaYin = lunar.getYearNaYin()
      this.lunarYearInChinese = lunar.getYearInChinese()
      this.yearKongWang = lunar.getYearXunKong()

      this.monthGanZhi = lunar.getMonthInGanZhi()
      this.monthShengXiao = lunar.getMonthShengXiao()
      this.monthNaYin = lunar.getMonthNaYin()
      this.monthTaiShen = lunar.getMonthPositionTai()
      this.lunarMonthInChinese = lunar.getMonthInChinese()
      this.monthKongWang = lunar.getMonthXunKong()

      this.yueXiang = lunar.getYueXiang()
      this.wuHou = lunar.getHou() + ' ' + lunar.getWuHou()
      this.yueMing = lunar.getSeason()

      this.dayGanZhi = lunar.getDayInGanZhi()
      this.dayShengXiao = lunar.getDayShengXiao()
      this.dayNaYin = lunar.getDayNaYin()
      this.dayTaiShen = lunar.getDayPositionTai()
      this.pengZuGan = lunar.getPengZuGan()
      this.pengZuZhi = lunar.getPengZuZhi()
      this.dayZhiShen = lunar.getZhiXing()
      this.dayTianShen = lunar.getDayTianShen() + '(' + lunar.getDayTianShenType() + '日)'
      this.daySha = lunar.getDaySha()
      this.liuYao = lunar.getLiuYao()
      this.dayLu = lunar.getDayLu()
      this.dayJiShen = lunar.getDayJiShen()
      this.dayXiongSha = lunar.getDayXiongSha()
      this.dayYi = lunar.getDayYi()
      this.dayJi = lunar.getDayJi()
      this.lunarDayInChinese = lunar.getDayInChinese()

      const dayNineStar = lunar.getDayNineStar()
      this.dayJiuXing = dayNineStar.toString()

      const prevJq = lunar.getPrevJieQi(true)
      const prevJqSolar = prevJq.getSolar()
      this.prevJq = prevJq.getName() + '：' + prevJqSolar.toYmd() + ' ' + I18n.getMessage('my.zhou') + prevJqSolar.getWeekInChinese()

      const nextJq = lunar.getNextJieQi(true)
      const nextJqSolar = nextJq.getSolar()
      this.nextJq = nextJq.getName() + '：' + nextJqSolar.toYmd() + ' ' + I18n.getMessage('my.zhou') + nextJqSolar.getWeekInChinese()

      this.dayChong = lunar.getDayShengXiao() + '日冲' + lunar.getDayChongDesc()
      this.dayKongWang = lunar.getDayXunKong()

      this.xiu = lunar.getGong() + '方' + lunar.getXiu() + lunar.getZheng() + lunar.getAnimal() + '(' + lunar.getXiuLuck() + ')'

      this.positionXi = lunar.getPositionXiDesc()
      this.positionFu = lunar.getPositionFuDesc()
      this.positionCai = lunar.getPositionCaiDesc()
      this.positionYangGui = lunar.getPositionYangGuiDesc()
      this.positionYinGui = lunar.getPositionYinGuiDesc()

      const lunarYear = LunarYear.fromYear(lunar.getYear())
      this.yearZhiShui = lunarYear.getZhiShui()
      this.yearDeJin = lunarYear.getDeJin()
      this.yearGenTian = lunarYear.getGengTian()
      this.yearFenBing = lunarYear.getFenBing()

      // const testLunar = Lunar.fromYmd(2021, 5, 5)
      // const Times = testLunar.getTimes()
      const Times = lunar.getTimes()
      // console.log("🚀 ~ file:index method:render line:1031 -----", Times)
      this.initTimesList(Times)
      // console.log("🚀 ~ file:index method:render line:1035 -----this.initTimesList", this.timesList)
      this.initFestivals()
      console.log('this.festivals: ', this.festivals);
      // log

    },
    initTimesList (Times) {
      this.timesList = []
      for (const time of Times) {
        const obj = {}
        obj.ganZhi = time.getGanZhi()
        obj.shengXiao = time.getShengXiao()
        obj.positionXiDesc = time.getPositionXiDesc()
        obj.positionYinGuiDesc = time.getPositionYinGuiDesc()
        obj.positionFuDesc = time.getPositionFuDesc()
        obj.positionCaiDesc = time.getPositionCaiDesc()
        obj.chong = time.getChong()
        obj.sha = time.getSha()
        obj.chongShengXiao = time.getChongShengXiao()
        obj.yi = time.getYi()
        obj.ji = time.getJi()
        obj.minHh = time.getMinHm()
        obj.maxHh = time.getMaxHm()
        this.timesList.push(obj)
      }
    },
    initFestivals () {
      const d = Foto.fromLunar(Solar.fromYmd(this.year, this.month, this.day).getLunar());
      console.log('d: ', d);
      const festivals = d.getOtherFestivals();
      const isTodayZhaiTen = d.isDayZhaiTen();
      const isTodayZhaiGuanYin = d.isDayZhaiGuanYin();
      console.log('isTodayZhaiGuanYin: ', isTodayZhaiGuanYin);

      if (isTodayZhaiTen || isTodayZhaiGuanYin || festivals.length > 0) {
        this.updateFestivals(0, festivals, isTodayZhaiTen, isTodayZhaiGuanYin);
      } else {
        for (let index = 1; index < 7; index++) {
          const solar = Solar.fromYmd(this.year, this.month, this.day).next(index);
          const d2 = Foto.fromLunar(solar.getLunar());
          const otherFestivals = d2.getOtherFestivals();
          const isDayZhaiTen = d2.isDayZhaiTen();
          const isDayZhaiGuanYin = d2.isDayZhaiGuanYin();

          if (isDayZhaiTen || isDayZhaiGuanYin || otherFestivals.length > 0) {
            this.updateFestivals(index, otherFestivals, isDayZhaiTen, isDayZhaiGuanYin);
            break;
          }
        }
      }
    },

    updateFestivals (daysSince, festivals, isZhaiTen, isDayZhaiGuanYin) {
      this.$set(this.festivals, 'daysSince', daysSince);
      this.$set(this.festivals, 'arr', [...festivals, ...(isZhaiTen ? ['十斋日'] : []), ...(isDayZhaiGuanYin ? ['观音斋'] : [])]);
    }
    ,
    // initFestivals () {
    //   const d = Foto.fromLunar(Solar.fromYmd(this.year, this.month, this.day).getLunar());
    //   console.log('d: ', d);
    //   const l = d.getOtherFestivals();
    //   const isToDayZhaiTen = d.isDayZhaiTen();
    //   console.log('isToDayZhaiTen: ', isToDayZhaiTen);

    //   if (isToDayZhaiTen && l.length > 0) {
    //     this.$set(this.festivals, 'daysSince', 0)
    //     this.$set(this.festivals, 'arr', l)
    //     this.festivals.arr.push("十斋日")
    //   } else if (isToDayZhaiTen) {
    //     this.$set(this.festivals, 'daysSince', 0)
    //     this.$set(this.festivals, 'arr', ["十斋日"])
    //   } else if (l2.length > 0) {
    //     this.$set(this.festivals, 'daysSince', 0)
    //     this.$set(this.festivals, 'arr', l2)

    //   } else {
    //     for (let index = 1; index < 7; index++) {
    //       const solar = Solar.fromYmd(this.year, this.month, this.day).next(index)
    //       const d2 = Foto.fromLunar(solar.getLunar());
    //       const l2 = d2.getOtherFestivals();
    //       const isDayZhaiTen = d2.isDayZhaiTen()();
    //       if (isDayZhaiTen && l2.length > 0) {
    //         this.$set(this.festivals, 'daysSince', index)
    //         this.$set(this.festivals, 'arr', l2)
    //         this.festivals.arr.push("十斋日")
    //         break;
    //       } else if (isDayZhaiTen) {
    //         this.$set(this.festivals, 'daysSince', index)
    //         this.$set(this.festivals, 'arr', ["十斋日"])
    //         break;
    //       } else if (l2.length > 0) {
    //         this.$set(this.festivals, 'daysSince', index)
    //         this.$set(this.festivals, 'arr', l2)
    //         break;
    //       }
    //     }
    //   }
    // },
    nextDay () {
      const solar = Solar.fromYmd(this.year, this.month, this.day).next(1)
      this.year = solar.getYear()
      this.month = solar.getMonth()
      this.day = solar.getDay()
      this.render()
    },
    prevDay () {
      const solar = Solar.fromYmd(this.year, this.month, this.day).next(-1)
      this.year = solar.getYear()
      this.month = solar.getMonth()
      this.day = solar.getDay()
      this.render()
    },
    setLang (lang) {
      this.lang = lang
      I18n.setLanguage(lang)
      this.render()
    }
  },
  mounted () {
    this.render()
  }
}
</script>

<template>

  <div style="padding: 36px">
    <el-row :gutter="22">
      <el-col :span="16">
        <div class="col-left">
          <div class="calendar">
            <div class="border-right">
              <div class="row col border-bottom">
                <div class="label">{{ yearGanZhi }}年</div>
                <div>属{{ yearShengXiao }}</div>
                <div>{{ yearNaYin }}</div>
              </div>
              <div class="row col border-bottom">
                <div class="label">{{ monthGanZhi }}月</div>
                <div>属{{ monthShengXiao }}</div>
                <div>{{ monthNaYin }}</div>
              </div>
              <div class="row col border-bottom">
                <div class="label">{{ dayGanZhi }}日</div>
                <div>属{{ dayShengXiao }}</div>
                <div>{{ dayNaYin }}</div>
              </div>
              <div class="row col bg border-bottom">
                <div class="ml10">节气{{ prevJq }}</div>
              </div>
              <div class="yj-container border-bottom">
                <div class="yj yi">宜</div>
                <ul class="ml10">
                  <li v-for="(o, index) in dayYi" :key="index">{{ o }}</li>
                </ul>
              </div>
              <div class="border-bottom js">
                <div>
                  <div class="label">吉神宜趋</div>
                  <ul class="ml10">
                    <li v-for="o in dayJiShen">{{ o }}</li>
                  </ul>
                </div>
              </div>
              <div class="row col bg">
                <div class="label">彭祖</div>
                <div>{{ pengZuGan }}</div>
              </div>
              <div class="row col bg border-bottom">
                <div class="label">百忌</div>
                <div>{{ pengZuZhi }}</div>
              </div>
              <div class="row col">
                <div class="label">月名</div>
                <div>{{ yueMing }}</div>
              </div>
              <div class="row col">
                <div class="label">月相</div>
                <div>{{ yueXiang }}月</div>
              </div>
              <div class="row col">
                <div class="label">物候</div>
                <div>{{ wuHou }}</div>
              </div>
            </div>
            <div class="center border-right bg">
              <div class="border-bottom">
                <div class="inputs">
                  <div>
                    <el-select v-model="year" placeholder="请选择" class="el-select-year">
                      <el-option v-for="item in 50" :key="item" :label="item + 1980" :value="item + 1980">
                      </el-option>
                    </el-select>年
                  </div>
                  <div>
                    <el-select v-model="month" placeholder="请选择" class="el-select-year">
                      <el-option v-for="item in 12" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>月
                  </div>
                  <div>
                    <el-select v-model="day" placeholder="请选择" class="el-select-year">
                      <el-option v-for="item in dayNum" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>日
                  </div>
                  <!-- <div>
                    <input v-model="model.year">年
                  </div> -->
                  <!-- <div>
                    <select v-model="model.month">
                      <option :value="i" v-for="i in 12">{{ i }}</option>
                    </select>月
                  </div> -->
                  <!-- <div>
                    <input v-model="model.day">日
                  </div> -->
                </div>
                <div>
                  <div class="pl20">公历{{ year }}年 {{ month }}月 {{ day }}日 星期{{ weekInChinese }} {{ xingZuo }}座
                  </div>
                  <div class="today">
                    <a href="javascript:void(0);" class="prev" @click="prevDay"></a>
                    {{ day }}
                    <a href="javascript:void(0);" class="next" @click="nextDay"></a>
                  </div>
                  <div class="lunar">
                    <div class="pl20 ">农历 {{ lunarYearInChinese }}年 {{ lunarMonthInChinese }}月{{
                      lunarDayInChinese
                    }}
                    </div>
                    <div class="pl20" :style="{ 'color': festivals.daysSince ? '#C0C4CC' : '' }" v-if="festivals.arr">
                      <span class="daysSince mr5" v-if="festivals.daysSince">({{ festivals.daysSince }}天后)</span>
                      <span class="mr5">佛教</span>
                      <span class="mr5" v-for="(item, index) in festivals.arr" :key="index">{{ item }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid border-bottom">
                <div class="col2 border-right">
                  <div class="bar">财神位</div>
                  <div>
                    <div class="row col">
                      <div class="label">喜神</div>
                      <div>{{ positionXi }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">福神</div>
                      <div>{{ positionFu }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">财神</div>
                      <div>{{ positionCai }}</div>
                    </div>
                  </div>
                </div>
                <div class="col2">
                  <div class="bar">阴阳贵神</div>
                  <div>
                    <div class="row col">
                      <div class="label">阳贵神</div>
                      <div>{{ positionYangGui }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">阴贵神</div>
                      <div>{{ positionYinGui }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid">
                <div class="col2 border-right">
                  <div class="bar">空亡所值</div>
                  <div>
                    <div class="row col">
                      <div class="label">年</div>
                      <div>{{ yearKongWang }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">月</div>
                      <div>{{ monthKongWang }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">日</div>
                      <div>{{ dayKongWang }}</div>
                    </div>
                  </div>
                </div>
                <div class="col2">
                  <div class="bar">九宫飞星</div>
                  <div>
                    <div class="row col">
                      <div class="label">九星</div>
                      <div>{{ dayJiuXing }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">二十八宿</div>
                      <div>{{ xiu }}</div>
                    </div>
                    <div class="row col">
                      <div>{{ yearZhiShui }}</div>
                      <div>{{ yearDeJin }}</div>
                    </div>
                    <div class="row col">
                      <div>{{ yearFenBing }}</div>
                      <div>{{ yearGenTian }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="row col border-bottom">
                <div class="label">相冲</div>
                <div> {{ dayChong }}</div>
              </div>
              <div class="row col border-bottom">
                <div class="label">值神</div>
                <div> {{ dayZhiShen }}</div>
              </div>
              <div class="row col border-bottom">
                <div class="label">十二神</div>
                <div> {{ dayTianShen }}</div>
              </div>
              <div class="row col bg border-bottom">
                <div class="ml10">节气{{ nextJq }}</div>
              </div>
              <div class="yj-container border-bottom">
                <div class="yj ji">忌</div>
                <ul class="ml10">
                  <li v-for="o in dayJi">{{ o }}</li>
                </ul>
              </div>
              <div class="border-bottom js">
                <div>
                  <div class="label">凶煞宜忌</div>
                  <ul class="ml10">
                    <li v-for="o in dayXiongSha">{{ o }}</li>
                  </ul>
                </div>
              </div>
              <div class="row col bg">
                <div class="label">本月胎神</div>
                <div>{{ monthTaiShen }}</div>
              </div>
              <div class="row col bg border-bottom">
                <div class="label">今日胎神</div>
                <div>{{ dayTaiShen }}</div>
              </div>

              <div class="row col">
                <div class="label">岁煞</div>
                <div>岁煞{{ daySha }}</div>
              </div>
              <div class="row col">
                <div class="label">六曜</div>
                <div>{{ liuYao }}</div>
              </div>
              <div class="row col">
                <div class="label">日禄</div>
                <div>{{ dayLu }}</div>
              </div>

            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-card class="box-card" v-for="(time, timeIdx) in timesList" :key="timeIdx">
            <div class="lunar-time">
              <span data-v-739fc6a6="" class="red">{{ time.ganZhi }}时</span>
              <span data-v-739fc6a6="" class="red">冲{{ time.shengXiao }} 煞{{ time.sha }}</span>
              <span data-v-739fc6a6="" class="red">{{ time.minHh }} - {{ time.maxHh }}</span>
            </div>
            <div class="caixi">喜神{{ time.positionXiDesc }} 财神{{ time.positionCaiDesc }} 福神{{ time.positionFuDesc }}
            </div>
            <div class="yiJi">
              <div class="yj yi">
                <img src="../../../assets/images/yi.f13b8ef.png" alt="">
                <div><span v-for="(yi, yiIdx) in time.yi" :key="yiIdx">{{ yi }}</span></div>
              </div>
              <div class="yj ji">
                <img src="../../../assets/images/ji.bc4ebad.png" alt="">
                <div><span v-for="(ji, jiIdx) in time.ji" :key="jiIdx">{{ ji }}</span></div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
// @import '../../../assets/styles/ruoyi.scss';

.main {

  justify-content: center;
}

.col-left {
  display: flex;
  justify-content: flex-end
}

.calendar * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.calendar {
  .pl20 {
    padding-left: 20px;
  }

  .mr5 {
    margin-right: 5px;
  }

  .ml10 {
    margin-left: 10px;
  }

  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  color: #222222;
  width: 1000px;
  border: 2px solid #F6D07B;
  display: flex;
  flex-direction: row;

  >div {
    flex: 1;
    overflow: hidden;
  }

  div.lang {
    position: absolute;
    right: 20px;
    top: 20px;
    border: 1px solid #646cff;
    border-radius: 6px;

    a {
      padding: 5px;
      cursor: pointer;
    }

    a.active {
      background: #646cff;
      color: #ffffff;
    }
  }

  .center {
    flex: 2;
  }

  .border-bottom {
    border-bottom: 1px solid #F4C493;
  }

  .border-right {
    border-right: 1px solid #F4C493;
  }

  .bg {
    background-color: #FCF8EF;
  }

  .lunar {
    display: flex;
    height: 60px;
    line-height: 60px;

    .daysSince {}
  }


  .row {
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    >div {
      flex: 1;
    }
  }

  .col {
    flex-direction: row;
  }

  div.label {
    font-size: 16px;
    font-weight: bold;
    color: #BC2F3F;
    width: 80px;
    text-align: left;
    flex: none;
    text-indent: 10px;
  }

  .grid {
    height: 182px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .col2 {
      flex: 1;
      width: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      >div {
        flex: auto;
      }

      >div.bar {
        flex: none;
        width: 30px;
        margin-left: 20px;
      }

      div.label {
        color: #000000;
      }
    }
  }

  .jq {
    margin-left: 6px;
  }

  .yj-container {
    height: 180px;
    overflow: hidden;

    .yj {
      margin: 20px auto;
      position: relative;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 50%;
      color: #FFFFFF;
    }

    .yj::before,
    .yj::after {
      position: absolute;
      content: '';
      left: -2px;
      top: -2px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      z-index: -1;
    }

    .yj::after {
      width: 44px;
      height: 44px;
      z-index: -2;

      img {
        width: 36px;
      }
    }

    .yi {
      background: #5CB85C;
    }

    .ji {
      background: #D9534F;
    }

    .yi::before,
    .ji::before {
      background: #FFFFFF;
    }

    .yi::after,
    .ji::after {
      left: -4px;
      top: -4px;
    }

    .yi::after {
      background: #5CB85C;
    }

    .ji::after {
      background: #D9534F;
    }
  }

  .js {
    height: 165px;
    overflow: hidden;

    .label {
      margin-top: 10px;
    }
  }

  .yj-container,
  .js {
    ul {
      li {
        list-style: none;
        float: left;
        width: 25%;
        height: 32px;
        line-height: 32px;
        white-space: nowrap;
      }
    }
  }

  .today {
    margin: 0 auto;
    width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 120px;
    font-weight: bold;
    color: #BC2F3F;
    line-height: 177px;
    align-items: center;

    a {
      width: 0;
      height: 0;
      border: 30px solid transparent;
      font-size: 0;
      line-height: 0;
    }

    a.prev {
      border-right-color: #BC2F3F;
    }

    a.next {
      border-left-color: #BC2F3F;
    }
  }

  .bar {
    position: relative;
    width: 30px;
    height: 120px;
    color: #FFFFFF;
    text-align: center;
    background: #BC2F3F;
    display: flex;
    align-items: center;
    border-radius: 6px;
  }

  .bar::before,
  .bar::after {
    content: '';
    position: absolute;
    left: 50%;
    top: -6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #BC2F3F;
    margin-left: -8px;
  }

  .bar::after {
    top: auto;
    bottom: -6px;
  }

  .inputs {
    position: relative;
    display: flex;
    padding: 20px;

    div {
      position: relative;
      flex: 1;
    }

    input,
    select {
      border: 1px solid #D7D9E0;
      box-sizing: border-box;
      padding: 7px;
      border-radius: 6px;
      line-height: 1;
      position: relative;
      background: #FFFFFF;
      width: 80px;
      margin-right: 6px;
      text-align: center;
      font-size: 20px;
      outline: none;
    }

    select {
      appearance: none;
    }

    .el-select-year {
      width: 80px;

      ::v-deep .el-input {
        width: 80px;
      }

      ::v-deep .el-input__inner {
        border: 1px solid #D7D9E0;
        box-sizing: border-box;
        padding: 7px;
        border-radius: 6px;
        line-height: 1;
        position: relative;
        background: #FFFFFF;
        width: 80px;
        margin-right: 6px;
        text-align: center;
        font-size: 20px;
        outline: none;
      }

      ::v-deep .el-select__caret {
        display: none;
      }
    }

  }

}

.box-card {
  margin-bottom: 22px;

  span {
    margin-right: 8px;
  }

  .lunar-time {
    margin-bottom: 14px;
    font-size: 16px;


  }

  .caixi {
    margin-bottom: 28px;
  }

  .yj {
    display: flex;
    margin-bottom: 8px;

    img {
      width: 36px;
      margin-right: 14px;
    }
  }

  .yi {
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>
