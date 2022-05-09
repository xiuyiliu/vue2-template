<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <app-upload></app-upload>
    <app-upload-plus></app-upload-plus>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      disabled: true
    }
  }
}
</script>
