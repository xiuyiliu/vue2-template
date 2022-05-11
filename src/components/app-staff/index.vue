<template>
  <div class="relative" v-clickoutside="handleClose">
    <el-input v-model.trim="value"
              placeholder="请输入员工姓名或编号，回车键查询"
              clearable @keyup.enter.native="query"></el-input>
    <ul v-if="visible" class="select-wrap">
      <li class="select-option" v-for="item in options" :key="item.id">{{item.name}} / {{ item.id }}</li>
    </ul>
  </div>
</template>

<script>
/**
 * 员工的模糊查询，在输入框内输入员工姓名或者员工编号，按回车查询
 * 如果按员工姓名查询，可能会有多条数据，需要将其以下拉列表的方式展示，用户选择后将其姓名/员工编号显示在输入框中
 * 如果按员工ID查询，则一般只会有一条精确匹配的数据，这个时候无需下拉框展示，直接将其姓名/员工编号显示在输入框中
 * 在输入框中的内容没有发生改变时，多次按下enter键不会触发查询。只有输入的内容发生变化才会触发查询
 * 最终我们会把查询到的员工编号抛出去，在父组件中作为一个查询或者提交参数
 * 同时，要支持回显
 */
import Clickoutside from 'element-ui/src/utils/clickoutside'
export default {
  name: 'index',
  directives: { Clickoutside },
  props: {
    // 员工id，父子组件通信的值，用户外面条件查询，表单提交等
    staffId: {
      required: true
    },
    // 员工姓名，正常情况下只需要抛出staffId即可，如果需要回显时使用。
    staffName: {
      type: String
    }
  },
  data () {
    return {
      value: '', // 该值用来接收用户的输入，及展示选中的结果 员工姓名/员工编号。不用来像父组件传递
      options: [], // 查询结果
      visible: false
    }
  },
  created () {
    // this.query()
  },
  methods: {
    query () {
      const _this = this
      setTimeout(function () {
        // 模拟精确查询
        // _this.options = [{ id: '00550040', name: '小明' }]
        // 模拟模糊查询
        _this.options = [
          { id: '00550040', name: '小明' },
          { id: '00270567', name: '小雨1' },
          { id: '00270561', name: '小雨2' },
          { id: '00270562', name: '小雨3' },
          { id: '00270563', name: '小雨4' },
          { id: '00270564', name: '小雨5' },
          { id: '00270565', name: '小雨6' },
          { id: '00270566', name: '小雨7' },
          { id: '00270569', name: '小雨8' }
        ]
        _this.visible = true
      }, 400)
    },
    handleClose () {
      this.visible = false
    }
  }
}
</script>

<style scoped lang="scss">
.select-wrap {
  position: absolute;
  width: 110%;
  max-height: 300px;
  z-index: 100;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  box-sizing: border-box;
  margin: 5px 0;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar-track {  /*滚动条的轨道（里面装有Thumb）*/
    display: none;
  }
  &::-webkit-scrollbar{    /*滚动条整体样式，可设置width, height*/
    width: 8px;
    background: #fff;
  }
  &::-webkit-scrollbar-thumb{   /*设置滚动条内小方块   background-color*/
    width: 8px;
    height: 30px;
    background: #D8D8D8;
    border-radius: 4px;
  }
  .select-option {
    font-size: 14px;
    padding: 0 20px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>
