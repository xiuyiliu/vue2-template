<template>
  <div>
    <header>list</header>
    <div>
      <el-input v-model="name"></el-input>
      <el-button @click="toDetail">toDetail</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      name: 'gg'
    }
  },
  watch: {
    name: {
      handler (val, oldVal) {
        console.log('watch')
      }
    }

  },
  methods: {
    toDetail () {
      this.$router.push('/interview/detail')
    }
  },
  beforeCreate () {
    console.log('list-beforeCreate')
  },
  created () {
    console.log('list-created')
  },
  beforeMount () {
    console.log('list-beforeMount')
  },
  mounted () {
    console.log('list-mounted')
  },
  beforeUpdate () {
    console.log('list-beforeUpdate')
  },
  updated () {
    console.log('list-updated')
  },
  activated () {
    console.log('list-activated')
  },
  deactivated () {
    console.log('list-deactivated')
  },
  beforeDestroy () {
    console.log('list-beforeDestroy')
  },
  destroyed () {
    console.log('list-destroyed')
  }
}
</script>

<style scoped>

</style>
