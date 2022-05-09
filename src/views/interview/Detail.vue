<template>
  <div>
    <header>detail</header>
    <div>
      <el-button @click="toList">toList</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  methods: {
    toList () {
      this.$router.replace('/interview/list')
    }
  },
  beforeCreate () {
    console.log('detail-beforeCreate')
  },
  created () {
    console.log('detail-created')
  },
  beforeMount () {
    console.log('detail-beforeMount')
  },
  mounted () {
    console.log('detail-mounted')
  },
  beforeUpdate () {
    console.log('detail-beforeUpdate')
  },
  updated () {
    console.log('detail-updated')
  },
  activated () {
    console.log('detail-activated')
  },
  deactivated () {
    console.log('detail-deactivated')
  },
  beforeDestroy () {
    console.log('detail-beforeDestroy')
  },
  destroyed () {
    console.log('detail-destroyed')
  }
}
</script>

<style scoped>

</style>
