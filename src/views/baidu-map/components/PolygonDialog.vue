<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    top="10vh"
    width="95%"
    :close-on-click-modal="false"
    :before-close="handleClose"
    append-to-body
    class="map-dialog"
  >
    <baidu-map
      id="map"
      :scroll-wheel-zoom="true"
      :center="center"
      @ready="handler"
      @mousemove="syncPolygon"
      @click="paintPolygon"
      @rightclick="toggleClose"
    >
      <!-- 按钮 -->
      <bm-control v-if="(type === 'add' || type === 'edit') &&  polygonPath.paths.length === 0" anchor="BMAP_ANCHOR_TOP_RIGHT">
        <el-button type="primary"  :disabled="polygonPath.editing" @click="start">开始绘制</el-button>
      </bm-control>
      <bm-control v-if="type === 'add' || type === 'edit'" anchor="BMAP_ANCHOR_BOTTOM_RIGHT">
        <div style="cursor: pointer;background: rgb(46, 141, 237);color: white;border-radius: 2px;padding: 5px;">
          <div>点击开始绘制后，单击左键确定开始点</div>
          <div>单击左键绘制下一个点，单击右键完成绘制</div>
          <div>在绘制区域内右键编辑或删除</div>
        </div>
      </bm-control>
      <!-- 自定义扩展多边形组件 -->
      <ex-polygon
        :path="polygonPath.paths[0]"
        stroke-color="blue"
        :stroke-opacity="0.5"
        :stroke-weight="2"
        :editing="editing"
        :clicking="true"
        @rightclick="showMenu"
        @click="showInfo"></ex-polygon>
      <!--多边形信息窗口-->
      <bm-info-window :show="infoWindow.show" :position="infoWindow.position" :width="300" title="编辑信息" @close="infoWindowClose" @open="infoWindowOpen">
        <div style="padding: 10px 0;">
          <div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 10px;">
            <div style="width: 60px;">名称</div>
            <el-input v-model="infoWindowForm.name" style="width: 180px" size="mini"></el-input>
          </div>
          <div style="display: flex;justify-content: flex-start;align-items: center;padding-bottom: 10px;">
            <div style="width: 60px;">简介</div>
            <el-input v-model="infoWindowForm.description" style="width: 180px" size="mini" type="textarea"></el-input>
          </div>
          <div style="display: flex;justify-content: center;align-items: center;padding-bottom: 10px;">
            <el-button size="mini" @click="saveInfo">保存</el-button>
          </div>
        </div>
      </bm-info-window>
      <!-- 查看详情时点击左键显示详情-->
      <bm-info-window
        :show="detailWindow.show"
        :position="detailWindow.position"
        :width="300"
        @close="detailWindowClose"
        @open="detailWindowOpen">
          <div style="padding: 15px;min-height: 80px;">
            <div>
              <span style="margin-right: 6px;">名称：</span>
              <span>{{ infoWindowForm.name }}</span>
            </div>
            <div>
              <span style="margin-right: 6px;">备注：</span>
              <span>{{ infoWindowForm.description }}</span>
            </div>
          </div>
      </bm-info-window>
      <!--比例尺控件-->
      <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-scale>
      <!--缩放控件-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
      <!--检索-->
      <bm-control anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{width: 80, height: 20}">
        <div class="flex-start">
          <div style="width: 100px;">关键字</div>
          <el-input v-model="searchParams" size="mini"></el-input>
          <el-button size="mini" style="margin-left: 15px;" @click="search">区域搜索</el-button>
        </div>
      </bm-control>
    </baidu-map>
    <div slot="footer">
      <el-button v-if="type === 'add' || type === 'edit'" size="mini" type="primary" @click="mapConfirm">确定</el-button>
      <el-button size="mini" type="default" @click="handleClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ExPolygon from './ExPolygon'
export default {
  name: 'PolygonDialog',
  components: {
    ExPolygon
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String
    },
    type: {
      type: String,
      required: true // add edit view
    },
    mapInfo: {
      type: Object
    }
  },
  data () {
    return {
      center: { lng: 123.457297, lat: 41.679304 }, // 初始化中心坐标
      BMap: null, // 缓存ready回调函数中暴露出来的BMap类
      map: null, // 缓存ready回调函数中暴露出来的map实例
      editing: false, // 是否启用线编辑？编辑状态下路径上有可拉动的“点”
      polygonPath: {
        editing: false, // 是否开始绘制多边形
        paths: []
      },
      polygon: null, // 缓存的polygon的overlay实例
      polMenu: null, // 缓存菜单实例
      infoWindow: {
        show: false,
        position: {} // InfoWindow位置，区多边形第二个点
      },
      infoWindowForm: {
        name: '',
        description: ''
      },
      detailWindow: {
        show: false,
        position: {} // detailWindow位置，鼠标左键点击的位置
      },
      searchParams: ''
    }
  },
  methods: {
    // 地图初始化
    handler ({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      // 如果是编辑或者查看，需要将传入的信息赋值
      if (this.type === 'edit' || this.type === 'view') {
        this.center.lng = this.mapInfo.centerX
        this.center.lat = this.mapInfo.centerY
        this.infoWindowForm.name = this.mapInfo.name
        this.infoWindowForm.description = this.mapInfo.description
        const tempList = this.mapInfo.lattice.split(';')
        this.polygonPath.paths[0] = tempList.map(item => {
          return {
            lat: item.split(',')[0],
            lng: item.split(',')[1]
          }
        })
      }
      this.refreshMap()
    },
    // 刷新地图
    refreshMap () {
      // 选择一个经纬度作为中心点
      const point = new this.BMap.Point(
        this.center.lng,
        this.center.lat
      )
      this.map.centerAndZoom(point, 17)
      if (this.type === 'edit') {
        this.editing = true
      }
    },
    // 绘制开关
    start () {
      this.polygonPath.editing = true
      this.editing = false
      // 在这里做一步判断，如果有路径且开启绘制就把原来的路径清空
      // if (this.polygonPath.paths && this.polygonPath.editing) {
      //   this.polygonPath.paths = []
      // }
    },
    // 当开始绘制状态时，单击地图事件,定点当前坐标
    paintPolygon (e) {
      if (!this.polygonPath.editing) {
        return
      }
      const { paths } = this.polygonPath
      !paths.length && paths.push([])
      paths[paths.length - 1].push(e.point)
    },
    // 鼠标移动事件
    syncPolygon (e) {
      if (!this.polygonPath.editing) {
        return
      }
      const { paths } = this.polygonPath
      if (!paths.length) {
        return
      }
      const path = paths[paths.length - 1]
      if (!path.length) {
        return
      }
      if (path.length === 1) {
        path.push(e.point)
      }
      this.$set(path, path.length - 1, e.point)
    },
    // 右键停止绘制
    toggleClose () {
      if (this.type === 'view') return
      if (this.polygonPath.paths[0].length <= 3) {
        this.$message.warning('请至少标记三个坐标点')
        return
      }
      this.polygonPath.editing = false
      this.editing = true
    },
    showMenu (e) {
      // 查看详情下不支持编辑，不展示菜单
      if (this.type === 'view') {
        return
      }
      this.polygon = e.currentTarget
      this.polMenu = new this.BMap.ContextMenu()
      this.polMenu.addItem(new this.BMap.MenuItem('编辑', this.editPolygon.bind(this.polygon)))
      this.polMenu.addItem(new this.BMap.MenuItem('删除', this.deletePolygon.bind(this.polygon)))
      this.polygon.addContextMenu(this.polMenu)
      this.infoWindowClose()
    },
    showInfo (e) {
      // 查看详情时，在多边形内点击左键弹出信息弹窗
      if (this.type === 'view') {
        this.detailWindow.position = e.point
        this.detailWindowOpen()
      }
    },
    saveInfo () {
      if (!this.infoWindowForm.name) {
        this.$confirm('请输入名称')
        return false
      }
      this.infoWindowClose()
    },
    editPolygon () {
      this.polygon.removeContextMenu(this.polMenu)
      if (this.polygonPath.paths[0] && this.polygonPath.paths[0].length > 1) {
        this.infoWindow.position = this.polygonPath.paths[0][1]
        this.infoWindow.show = true
      }
    },
    deletePolygon () {
      this.$confirm('您确定要删除吗？').then(() => {
        this.polygonPath.paths = []
        this.infoWindowClose()
        this.infoWindowForm.name = ''
        this.infoWindowForm.description = ''
      })
    },
    infoWindowClose () {
      this.infoWindow.show = false
    },
    infoWindowOpen () {
      this.infoWindow.show = true
    },
    detailWindowClose () {
      this.detailWindow.show = false
    },
    detailWindowOpen () {
      this.detailWindow.show = true
    },
    // 区域搜索
    search () {
      const localSearch = new this.BMap.LocalSearch(this.map, {
        renderOptions: { map: this.map }
      })
      localSearch.search(this.searchParams)
    },
    mapConfirm () {
      if (this.polygonPath.paths.length > 1) {
        this.$confirm('每次只能追加一个围栏!')
        return false
      }
      if (this.polygonPath.paths.length === 0 || (this.polygonPath.paths[0] && this.polygonPath.paths[0].length === 0)) {
        this.$confirm('请绘制围栏!')
        return false
      }
      if (!this.infoWindowForm.name) {
        this.$confirm('请输入围栏名称!')
        return false
      }
      // 组装列表数据项
      const mapPathArray = this.polygonPath.paths[0].map(item => {
        return `${item.lat},${item.lng}`
      })
      if (this.type === 'add') {
        const mapListItem = {
          modifyStatus: '1',
          name: this.infoWindowForm.name,
          description: this.infoWindowForm.description,
          centerX: this.center.lng,
          centerY: this.center.lat,
          lattice: mapPathArray.join(';')
        }
        this.$emit('addMap', mapListItem)
      } else if (this.type === 'edit') {
        // 修改操作时，无法使用有效的字段去在外面判断，比如修改新增加的未保存的数据时，是没有id可以判断的。所以这里利用mapInfo是引用类型的特点，更新他的属性，父级的列表项同步更新实现。
        const editInfo = {
          name: this.infoWindowForm.name,
          description: this.infoWindowForm.description,
          centerX: this.center.lng,
          centerY: this.center.lat,
          lattice: mapPathArray.join(';')
        }
        Object.assign(this.mapInfo, editInfo)
        this.$emit('update:mapInfo', this.mapInfo)
      }
      this.handleClose()
    },
    handleClose () {
      this.$emit('update:mapInfo', {})
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped lang="scss">
#map {
  width: calc(100% - 10px);
  height: 70vh;
  float: left;
  background: white;
  border-radius: 5px;
}
</style>
