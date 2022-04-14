<template>
  <div>
    <div>百度地图画多边形。考虑到新增，编辑和查看等功能，封装成一个组件</div>
    <el-button @click="add">新增</el-button>
    <polygon-dialog v-if="visible" :visible.sync="visible" :type="type"></polygon-dialog>
  </div>
</template>

<script>
import PolygonDialog from './components/PolygonDialog'
export default {
  name: 'DrawPolygon',
  components: {
    PolygonDialog
  },
  data () {
    return {
      visible: false,
      type: ''
    }
  },
  methods: {
    add () {
      this.type = 'add'
      this.visible = true
    }
  }
}
</script>

<style scoped>

</style>
