
<template functional>
  <div>
    <tr>
      <td width="7%" rowspan="5" bgcolor="#FFFFFF"
          :style="{ 'line-height': item.name.length > 4 ? 1.5 : 2 }" class=" new no-internal-borders
                          vertical-text"
      >
        <b v-if="item.name.length < 3">
          <template v-for="(str, idx) in item.name">
            {{ str }}<br><br v-if="idx < 1">
          </template>
        </b>
        <b v-else>
          <template v-for="(str) in item.name">
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
          class="new no-internal-borders"
      >{{ item.solarYear }}
      </td>
      <td style=" width:10%" bgcolor="#FFFFFF"
          :style="{ paddingBottom: randomOffsets[index].solarMonth + 'px', paddingLeft: randomOffsets[index].solarMonth + 'px' }"
          class="new no-internal-borders"
      >{{ item.solarMonth }}
      </td>
      <td style=" width:12%" bgcolor="#FFFFFF"
          :style="{ paddingBottom: randomOffsets[index].solarDay + 'px', paddingLeft: randomOffsets[index].solarDay + 'px' }"
          class="new no-internal-borders"
      >{{ item.solarDay }}
      </td>
      <td style=" width:11%" bgcolor="#FFFFFF"
          :style="{ paddingBottom: randomOffsets[index].solarHh + 'px', paddingLeft: randomOffsets[index].solarHh + 'px' }"
          class="new no-internal-borders"
      >
        {{ item.closeSolarH ? item.solarHh : '' }}
      </td>
      <td style=" width:30%;padding-left:4px;padding-right:4px;" rowspan="5" bgcolor="#FFFFFF"
          class="new no-internal-borders"
      >
        {{ item.gaiYao }}
      </td>
    </tr>
    <tr>
      <td bgcolor="#FFFFFF" class="new no-internal-borders">农历</td>
      <td bgcolor="#FFFFFF"
          :style="{ paddingBottom: randomOffsets[index].lunarYear + 'px', paddingLeft: randomOffsets[index].lunarYear + 'px' }"
          class="new no-internal-borders"
      >{{ item.lunarYear }}
      </td>
      <td bgcolor="#FFFFFF"
          :style="{ paddingBottom: randomOffsets[index].lunarMonth + 'px', paddingLeft: randomOffsets[index].lunarMonth + 'px' }"
          class="new no-internal-borders"
      >{{ item.lunarMonth }}
      </td>
      <td bgcolor="#FFFFFF"
          :style="{ paddingBottom: randomOffsets[index].lunarDay + 'px', paddingLeft: randomOffsets[index].lunarDay + 'px' }"
          class="new no-internal-borders"
      >{{ item.lunarDay }}
      </td>
      <td bgcolor="#FFFFFF"
          :style="{ paddingBottom: randomOffsets[index].lunarHh + 'px', paddingLeft: randomOffsets[index].lunarHh + 'px' }"
          class="new no-internal-borders"
      >{{ item.closeLunarH ? item.lunarHh : '' }}
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  functional: true, // 声明为功能性组件
  props: {
    item: {
      type: Object,
      default: () => ({
        name: String,
        age: 0
      }) ,

    },
    randomOffsets: [],
    index: null
  }
};
</script>

<style scoped lang="scss">

</style>
