<template>
  <div class="upload-file">
    <el-upload
      ref="upload"
      :action="uploadUrl"
      :file-list="fileList"
      multiple
      :limit="limit"
      :accept="accept"
      :disabled="disabled"
      :on-preview="handleDownload"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload"
      :before-remove="handleBeforeRemove">
      <slot v-if="!disabled">
        <el-button type="primary" size="small">点击上传</el-button>
      </slot>
    </el-upload>
  </div>
</template>

<script>
/**
 * 要实现的功能
 * 1，文件上传到专门的文件服务器，并返回该文件在文件服务的url和id。后续结合表单其他字段提交url和id。
 * 2，上传组件要支持查看时的回显，为保证扩展性，在外面将返回的附件字段处理成符合格式的fileList，传入组件回显。
 * 3，上传组件有默认的uploadUrl,downloadUrl,deleteUrl，同时，也支持外部传入以支持不同文件服务的扩展。
 * 4，支持限制文件数量limit，文件类型限制fileType，文件大小限制fileSize。
 * 5，支持回显时禁用上传操作。
 * 6，由于支持不同文件类型的上传，所以暂不支持预览；使用默认的文件列表样式，原有的预览钩子用于文件下载。
 * 7，扩展：我们可以自定义文件列表，列表中的每一项由区分文件类型的图标，名字，预览按钮，删除按钮和下载按钮组成。
 *    同时，可以优化图片的预览功能，缓存附件中的所有图片，预览时只针对图片的上下翻页等。两种不同的组件展现形式，
 *    取决于业务需要。
 */
export default {
  props: {
    uploadUrl: {
      type: String,
      default: 'https://jsonplaceholder.typicode.com/posts/'
    },
    downloadUrl: {
      type: String,
      default: ''
    },
    deleteUrl: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 1
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png'
    },
    fileType: {
      type: Array,
      default: () => {
        return ['image/jpg', 'image/jpeg']
      }
    },
    // 文件大小限制 默认10M
    fileSize: {
      type: Number,
      default: 10
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
    handleBeforeUpload (file) {
      const validType = this.fileType.includes(file.type)
      const validSize = file.size / 1024 / 1024 < this.fileSize
      if (!validType) {
        this.$message.error('上传的文件类型不符合')
      }
      if (!validSize) {
        this.$message.error(`上传的文件大小不能超过${this.fileSize}M`)
      }
      return validType && validSize
    },
    handleSuccess (response, file, fileList) {
      // response 是文件服务返回的数据。整理成fileList数组对象的格式，同步fileList属性。
    },
    handleDownload (file) {
      this.$confirm(`确定要下载${file.name}? `).then(() => {
        console.log(file)
        // 执行下载操作
      }).catch()
    },
    handleBeforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`).then(() => {
        console.log(file)
        // 调用删除接口，删除文件服务上的文件
        // 更新fileList列表
      }).catch()
    }
  }
}
</script>

<style scoped>

</style>
