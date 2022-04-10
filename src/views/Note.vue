<template>
  <div class="padding-10">
    <el-button type="primary">提交</el-button>
  </div>
</template>

<script>
import { findAllNote } from '@/api/note'
import { theme } from '@/style/variables.scss'

export default {
  name: 'Note',
  data () {
    return {}
  },
  created () {
    this.getNoteList()
    console.log(theme)
  },
  methods: {
    getNoteList () {
      findAllNote().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
