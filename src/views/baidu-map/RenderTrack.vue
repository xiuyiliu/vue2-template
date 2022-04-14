<template>
  <div class="container">
    <baidu-map
      id="map"
      :scroll-wheel-zoom="true"
      :center="center"
      @ready="mapReady"
    >
      <!--比例尺控件-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!--缩放控件-->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-navigation>
    </baidu-map>
    <div class="panel">
      <div class="panel-header">神的轨迹</div>
      <div style="margin: 10px 0;">
        <el-date-picker
          v-model="dateRange"
          type="datetimerange"
          format="yyyy-MM-DD HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange">
        </el-date-picker>
      </div>
      <div style="max-height: 300px;overflow: auto">
        <el-scrollbar ref="scroll">
          <el-table :data="polylinePath" @sort-change="sortChange" @row-click="rowClick">
            <el-table-column label="序号" prop="index" width="70" sortable=""></el-table-column>
            <el-table-column label="点位" sortable>
              <template slot-scope="scope">
                <span v-if="scope.row.index == 1">开始</span>
                <span v-else-if="scope.row.index == polylinePath.length">结束</span>
                <span v-else>记录点</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" prop="recordTime" sortable>
              <template slot-scope="scope">{{ dateFormat(scope.row.recordTime) }}</template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import startPoint from './icon/startPoint.png'
import endPoint from './icon/endPoint.png'
import recordPoint from './icon/recordPoint.png'
import nowPoint from './icon/nowPoint.png'

export default {
  name: 'RenderTrack',
  data () {
    return {
      BMap: null,
      map: null,
      center: { lng: 113.763924, lat: 22.938634 }, // 初始化中心坐标
      polylinePath: [
        { lng: 113.763924, lat: 22.938634, index: 1, recordTime: '2022-03-01' },
        { lng: 113.759621, lat: 22.933625, index: 2, recordTime: '2022-03-02' },
        { lng: 113.76654, lat: 22.934174, index: 3, recordTime: '2022-03-03' },
        { lng: 113.766558, lat: 22.932916, index: 4, recordTime: '2022-03-04' },
        { lng: 113.766558, lat: 22.932916, index: 5, recordTime: '2022-03-05' },
        { lng: 113.768745, lat: 22.93173, index: 6, recordTime: '2022-03-06' },
        { lng: 113.76945, lat: 22.930731, index: 7, recordTime: '2022-03-07' },
        { lng: 113.772022, lat: 22.93014, index: 8, recordTime: '2022-03-08' }
      ],
      dateRange: [moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), moment(new Date()).format('YYYY-MM-DD HH:mm:ss')],
      tableList: [],
      nowPointMarker: null // 缓存高亮显示的marker
    }
  },
  methods: {
    mapReady ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      this.refreshMap()
      // todo 正式环境用getTrack()
      // this.getTrack()
    },
    // 绘制地图
    drawMap () {
      const pointList = []
      this.polylinePath.forEach(item => {
        pointList.push(new this.BMap.Point(item.lng, item.lat))
      })
      this.createPolyline(pointList)
    },
    // 添加折线
    createPolyline (pointList) {
      const polyline = new this.BMap.Polyline(pointList, {
        strokeColor: 'blue',
        strokeWeight: 5,
        strokeOpacity: 1
      })
      this.map.addOverlay(polyline)
      pointList.forEach((point, index) => {
        if (index === 0) {
          this.createMarker(point, startPoint, 24)
        }
        if (index === pointList.length - 1) {
          this.createMarker(point, endPoint, 24)
        }
        if (index !== (pointList.length - 1) && index !== 0) {
          this.createMarker(point, recordPoint, 12)
        }
      })
    },
    // 添加标注
    createMarker (point, img, size) {
      const icon = new this.BMap.Icon(img, new this.BMap.Size(size, size))
      const marker = new this.BMap.Marker(point, { icon })
      this.map.addOverlay(marker)
    },
    refreshMap () {
      const point = new this.BMap.Point(
        this.center.lng,
        this.center.lat
      )
      this.map.centerAndZoom(point, 15)
      if (this.polylinePath.length > 0) {
        this.drawMap()
      }
    },
    // getTrack () {
    //   // 先重置上一次的中心点,将上一次的轨迹清空
    //   this.center = { lng: 123.457297, lat: 41.679304 }
    //   this.map.clearOverlays()
    //   const params = {
    //     userRosterId: this.userRosterId,
    //     geRecordTime: this.dateRange[0],
    //     leRecordTime: this.dateRange[1]
    //   }
    //   personTrack(params).then(res => {
    //     if (res.data.success) {
    //       const tempPathList = res.data.data
    //       if (tempPathList.length > 0) {
    //         // 将最后一个数据作为地图的中心点
    //         this.center = { lng: tempPathList[tempPathList.length - 1].centerX, lat: tempPathList[tempPathList.length - 1].centerY }
    //         // 将路径字符串改成路径数组
    //         this.polylinePath = tempPathList.map((item, index) => {
    //           item.lat = item.location.mapLatitude
    //           item.lng = item.location.mapLongitude
    //           item.index = index + 1
    //           return item
    //         })
    //       } else {
    //         this.polylinePath = []
    //       }
    //       this.refreshMap()
    //     } else {
    //       // 如果接口请求失败，就用默认的中心点绘制地图
    //       const point = new this.BMap.Point(
    //         this.center.lng,
    //         this.center.lat
    //       )
    //       this.map.centerAndZoom(point, 15)
    //       this.$message.error(res.data.msg)
    //     }
    //   })
    // },
    dateChange () {
      // this.getTrack()
    },
    dateFormat (val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD')
      }
    },
    rowClick (row) {
      // 当点击表格中的某一行时，地图上需要高亮显示该行对应的点
      // 清除之前标记的高亮的点
      if (this.nowPointMarker) {
        this.map.removeOverlay(this.nowPointMarker)
      }
      const point = new this.BMap.Point(row.lng, row.lat)
      const myIcon = new this.BMap.Icon(nowPoint, new this.BMap.Size(24, 24))
      this.nowPointMarker = new this.BMap.Marker(point, { icon: myIcon }) // 创建标注
      this.map.addOverlay(this.nowPointMarker) // 将标注添加到地图中
      this.map.centerAndZoom(point, 17) // 初始化地图,设置中心点坐标和地图级别
    },
    sortChange ({ column, prop, order }) {
      console.log(column)
      console.log(prop)
      console.log(order)
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    #map {
      height: 90vh;
    }
    .panel {
      position: absolute;
      top: 20px;
      right: 0;
      width: 350px;
      min-height: 520px;
      padding: 15px 10px;
      background: #fff;
      z-index: 100;
      .panel-header {
        font-weight: 700;
        height: 30px;
        line-height: 30px;
      }
      .panel-input {
        margin: 10px 0;
      }
    }
  }
</style>
