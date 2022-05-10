<template>
  <div class="pagination">
    <el-pagination
      :current-page.sync="pager.pageIndex"
      :page-size.sync="pager.pageSize"
      :total="pager.total"
      :hide-on-single-page="true"
      layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页" @size-change="sizeChange" @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script>
/**
 *
 */
export default {
  name: 'index',
  props: {
    pager: {
      type: Object,
      default: () => {
        return {
          pageIndex: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50, 100]
      }
    }
  },
  watch: {
    'pager.total' (total) {
      /**
       * 删除当前页所有数据后需要回退到上一页。例如，total=302，实际上最后的页码应该是31，但传入的页码为32。
       * 当川渝的页码32超过数据列表最后一页的页码31时，组件虽然显示的是最后一页31，
       * 但实际上请求接口的参数还是32，导致正常显示最后一页31，但却没有数据
       */
      // eslint-disable-next-line eqeqeq
      if (total != 0) {
        const isExceedLastPageIndex = Math.ceil(total / this.pager.pageSize) < this.pager.pageIndex
        const realLastPageIndex = Math.ceil(total / this.pager.pageSize)
        if (isExceedLastPageIndex) {
          this.pager.pageIndex = realLastPageIndex
          this.pageChange()
        }
      }
    }
  },
  methods: {
    sizeChange (size) {
      this.pager.pageSize = size
      this.pageChange()
    },
    currentChange (index) {
      this.pager.pageIndex = index
      this.pageChange()
    },
    pageChange () {
      this.$emit('change', this.pager)
    }
  }
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
