<template>
  <svg :class="svgClass" :width="width" :height="height" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    width: {
      default: '1em'
    },
    height: {
      default: '1em'
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .svg-icon {
    /*width: 1em;*/
    /*height: 1em;*/
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
