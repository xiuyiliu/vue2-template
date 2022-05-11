<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <app-upload></app-upload>
    <app-upload-plus></app-upload-plus>
    <app-staff :staff-id="staffId" style="width: 270px;"></app-staff>
    <!--<div>
      <el-table :data="tableList">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
      </el-table>
      <app-pagination :pager.sync="pager" @change="pagerChange"></app-pagination>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      disabled: true,
      staffId: null,
      tableList: [
        { name: 'a', age: 11 },
        { name: 'b', age: 12 },
        { name: 'c', age: 13 },
        { name: 'd', age: 14 },
        { name: 'e', age: 15 },
        { name: 'f', age: 16 },
        { name: 'g', age: 17 },
        { name: 'h', age: 18 },
        { name: 'i', age: 19 },
        { name: 'j', age: 20 },
        { name: 'k', age: 21 },
        { name: 'l', age: 22 },
        { name: 'm', age: 23 },
        { name: 'n', age: 24 }
      ],
      pager: {
        pageIndex: 1,
        pageSize: 10,
        total: 26
      }
    }
  },
  methods: {
    pagerChange (pager) {
      console.log(pager)
      const _this = this
      setTimeout(function () {
        _this.tableList = [
          { name: 'o', age: 11 },
          { name: 'p', age: 12 },
          { name: 'q', age: 13 },
          { name: 'r', age: 14 },
          { name: 's', age: 15 },
          { name: 't', age: 16 },
          { name: 'u', age: 17 },
          { name: 'v', age: 18 },
          { name: 'w', age: 19 },
          { name: 'x', age: 20 },
          { name: 'y', age: 21 },
          { name: 'z', age: 22 }
        ]
        _this.pager.total = 26
      }, 400)
    }
  }
}
</script>
