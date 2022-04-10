<template>
  <div>note</div>
</template>

<script>
import { findAllNote } from '@/api/note'

export default {
  name: 'Note',
  data () {
    return {}
  },
  created () {
    this.getNoteList()
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
