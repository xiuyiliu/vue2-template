<template>
  <div>
    <h2>css学习</h2>
    <h4>使用writing-mode排版竖文</h4>
    <div class="writing-mode">
      <p>东坡</p>
      <p>雨洗东坡月色清，<br>市人行尽野人行。<br>莫嫌荦确坡头路，<br>自爱铿然曳杖声。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CssStudy'
}
</script>

<style scoped lang="scss">
.writing-mode {
  writing-mode: vertical-rl;
}
</style>
