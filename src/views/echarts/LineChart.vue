<template>
  <div id="main" style="height: 100vh"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'LineChart',
  data () {
    return {
      chartDom: null,
      myChart: null,
      option: {}
    }
  },
  created () {
    console.log(111)
  },
  mounted () {
    this.chartDom = document.getElementById('main')
    this.myChart = echarts.init(this.chartDom)
    this.init()
  },
  methods: {
    init () {
      this.option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
      this.myChart.setOption(this.option)
    }
  }
}
</script>

<style scoped>

</style>
