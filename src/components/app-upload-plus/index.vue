<template>
  <div class="upload-file">
    <el-upload
      ref="upload"
      :action="uploadUrl"
      :file-list="fileList"
      :show-file-list="false"
      multiple
      :limit="limit"
      :accept="accept"
      :disabled="disabled"
      :on-success="handleSuccess"
      :before-upload="handleBeforeUpload">
      <slot v-if="!disabled">
        <el-button type="primary" size="small">点击上传</el-button>
      </slot>
    </el-upload>
    <div class="attachment-list">
      <div class="attachment-item" v-for="(item, index) in fileList" :key="index">
        <div class="attachment-item-section">
          <div class="attachment-item-icon">
            <svg-icon class-name="icon" :icon-class="getIconImage(item.suffix)"></svg-icon>
          </div>
          <div class="attachment-item-name">{{ item.name }}</div>
        </div>
        <div class="attachment-item-section">
          <div class="attachment-item-operate">
            <a @click="handleDownload(item)">下载</a>
          </div>
          <div class="attachment-item-operate">
            <a @click="handleDelete(item)">删除</a>
          </div>
          <div class="attachment-item-operate"
               v-if="
                item.suffix == 'jpg' ||
                item.suffix == 'png' ||
                item.suffix == 'jpeg' ||
                item.suffix == 'doc' ||
                item.suffix == 'xlsx' ||
                item.suffix == 'ppt' ||
                item.suffix == 'xls'||
                item.suffix == 'docx'||
                item.suffix == 'pptx'||
                item.suffix == 'pdf'
              "
          >
            <a @click="handleImagePreview(item)">预览</a>
          </div>
        </div>
      </div>
    </div>
    <el-image-viewer
      v-if="imagePreviewVisible"
      :initialIndex="imagePreviewIndex"
      :on-close="handleImageViewerClose"
      :url-list="imagePreviewList"/>
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
 * 6，自定义文件列表，列表中的每一项由区分文件类型的图标，名字，预览按钮，删除按钮和下载按钮组成。
 *    同时，优化图片的预览功能，缓存附件中的所有图片，预览时只针对图片的上下翻页等。
 */
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  components: {
    ElImageViewer
  },
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
          suffix: 'jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.png',
          suffix: 'png',
          url: 'http://www.baidu.com/img/bdlogo.png'
        }
      ],
      // 优化需求：当随便点开某一条图片类型的数据预览时，支持缩放，顺逆时针旋转，上下一张。其中上下一张是在所有已上传的附件列表中，只需要过滤出图片类型的数据上下翻页，忽略非图片类型的附件。
      imagePreviewVisible: false, // 图片预览visible
      imagePreviewList: [], // 图片预览数组
      imagePreviewIndex: 0, // 被预览的图片在数组中的索引。保证预览时第一张显示的是被预览的图片
      acceptImageType: ['.png', '.tif', '.jpg', '.jpeg', '.gif', '.bmp', '.svg'], // 通过图片的后缀来从附件列表中筛选出图片
      acceptImageSuffix: ['png', 'tif', 'jpg', 'jpeg', 'gif', 'bmp', 'svg']
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      // 将图片类型的数据筛选出来单独缓存，用来图片预览时的上下翻页。
      this.fileList.forEach(file => {
        this.acceptImageType.forEach(suffix => {
          if (file.name.endsWith(suffix)) {
            this.imagePreviewList.push(file.url)
          }
        })
      })
    },
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
      // 将图片类型的数据筛选出来单独缓存，用来图片预览时的上下翻页。
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
    },
    getIconImage (suffix) {
      if (this.accept.match(suffix)) {
        return suffix
      } else {
        return 'file'
      }
    },
    handleImagePreview (file) {
      console.log(file)
      if (this.acceptImageSuffix.includes(file.suffix)) {
        this.imagePreviewIndex = this.imagePreviewList.findIndex(url => {
          return url === file.url
        })
        if (this.imagePreviewIndex !== -1) {
          this.imagePreviewVisible = true
        }
      } else if (
        file.suffix === 'doc' ||
        file.suffix === 'xlsx' ||
        file.suffix === 'ppt' ||
        file.suffix === 'xls' ||
        file.suffix === 'xlsx' ||
        file.suffix === 'docx' ||
        file.suffix === 'pptx'
      ) {
        window.open(
          'https://view.officeapps.live.com/op/view.aspx?src=' + file.url
        )
      } else if (file.suffix === 'pdf') {
        window.open(
          file.url
        )
      }
    },
    /** 关闭图片预览 */
    handleImageViewerClose () {
      this.imagePreviewVisible = false
      this.imagePreviewIndex = 0
    }
  }
}
</script>

<style scoped lang="scss">
  .icon {
    width: 100%;
    height: 100%;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .detail-info-attachment-title {
    font-size: 16px;
    color: #000;
    padding-bottom: 10px;
  }
  .attachment-list {
    width: 100%;
    padding: 15px 0;
  }
  .attachment-item {
    display: flex;
    justify-content: space-between;
    height: 70px;
    border-radius: 12px;
    background-color: #f7f7f7;
    padding: 0 18px;
    .attachment-item-section {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .attachment-item-icon {
      width: 48px;
      height: 48px;
      line-height: 48px;
      margin-right: 5px;
      border-radius: 12px;
      font-size: 14px;
      text-align: center;
    }
    .attachment-item-name {
      margin-left: 24px;
      color: #383d4a;
      font-size: 18px;
      font-weight: bold;
    }
    .attachment-item-operate {
      width: 40px;
      cursor: pointer;
    }
  }
</style>
