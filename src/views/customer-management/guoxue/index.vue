<template>
  <div class="guoxue">
    <div class="search">
      <el-form :form="form" label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex">
                <el-radio label="0"></el-radio>
                <el-radio label="1"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GuoXue',
  data() {
    return {
      form: {},
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
      ]
    }
  },
  created() {
    // var originalString = "灵芝";
    // var gb2312EncodedString = encodeURIComponent(originalString);
    // console.log(gb2312EncodedString);
    function stringToGB2312(str) {
      var result = ''
      for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i)
        result += '%' + (0xD5 + (code >> 8)).toString(16).toUpperCase() +
          (0xD4 + (code & 0xFF)).toString(16).toUpperCase()
      }
      return result
    }

    var originalString = '赵'
    var originalString2 = '灵芝'
    var gb2312EncodedString = stringToGB2312(originalString)
    var gb2312EncodedString2 = stringToGB2312(originalString2)
    console.log(gb2312EncodedString, gb2312EncodedString2)
    this.test3()
  },
  methods: {
    test2() {
      axios.get("https://rili.ximizi.com/nonglichaxun.php?ref=1").then(res => {
        console.log(res)
      }).catch(err => console.log(err))

    },
    test3() {
      axios.get("https://www.dajiazhao.com/sm/scbz.asp").then(res => {
        console.log(res)
      }).catch(err => console.log(err))

    },
    test() {
      const headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'max-age=0',
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Cookie': 'Hm_lvt_1d379575d2847bbd3081e28d52c4633e=1703768926; laisuanming=sx=&mm1=&hh1=&hh2=&yue1=&xuexing=&nian1=&xingbie=&mm2=&yue2=&nian2=&ri1=&ming=&ri2=&xing=; ASPSESSIONIDQUTDCTDQ=FEBDMBKCODHMNMIDHPAIMKAF; Hm_lpvt_1d379575d2847bbd3081e28d52c4633e=1703781255',
        'Origin': 'https://www.dajiazhao.com',
        'Referer': 'https://www.dajiazhao.com/sm/scbz.asp',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        // 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }

      const data = {
        // 根据实际需求提供请求的数据
        xing: '%B6%EE',
        ming: '%CE%CA%CE%CA',
        xingbie: '%C5%AE',
        nian: 2004,
        yue: 12,
        ri: 29,
        hh: 0,
        mm: 0
      }

      axios.post('https://www.dajiazhao.com/sm/scbz.asp', data, { headers })
        .then(response => {
          // 处理响应
          console.log(response.data)
        })
        .catch(error => {
          // 处理错误
          console.error('Error:', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
