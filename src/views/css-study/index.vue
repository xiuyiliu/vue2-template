<template>
  <div>
    <h2>css学习</h2>
    <h4>使用writing-mode排版竖文</h4>
    <div class="writing-mode">
      <p>东坡</p>
      <p>雨洗东坡月色清，<br>市人行尽野人行。<br>莫嫌荦确坡头路，<br>自爱铿然曳杖声。</p>
    </div>
    <h4>使用text-align-last对齐两端文本</h4>
    <ul class="justify-text">
      <li>账号</li>
      <li>密码</li>
      <li>电子邮件</li>
      <li>通讯地址</li>
    </ul>
    <h4>object-fit 属性指定元素的内容应该如何去适应指定容器的高度与宽度</h4>
    <div>object-fit: fill|contain|cover|scale-down|none</div>
    <h4>使用text-overflow控制溢出文本</h4>
    <div>
      <p class="ellipsis-text s-line sl-ellipsis">CSS非常有趣和搞怪，可以做一些JS也能做的事情</p>
      <p class="ellipsis-text m-line ml-ellipsis">层叠样式表(CSS)是一种用来表现HTML(标准通用标记语言的一个应用)或XML(标准通用标记语言的一个子集)等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。</p>
      <p class="ellipsis-text m-line mls-ellipsis">层叠样式表(CSS)是一种用来表现HTML(标准通用标记语言的一个应用)或XML(标准通用标记语言的一个子集)等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。</p>
    </div>
    <h4>使用transform描绘像素边框</h4>
    <div class="onepx-border normal">1px</div>
    <div class="onepx-border thin">0.5px</div>
    <h4>使用margin排版凸显布局</h4>
    <ul class="highlight-list left">
      <li>Alibaba</li>
      <li>Tencent</li>
      <li>Baidu</li>
      <li>Jingdong</li>
      <li>Ant</li>
      <li>Netease</li>
    </ul>
    <ul class="highlight-list right">
      <li>Alibaba</li>
      <li>Tencent</li>
      <li>Baidu</li>
      <li>Jingdong</li>
      <li>Ant</li>
      <li>Netease</li>
    </ul>
    <h4>使用:valid和:invalid校验表单内容</h4>
    <form class="form-validation">
      <div>
        <label>名字</label>
        <input type="text" placeholder="请输入你的名字(1到10个中文)" pattern="^[\u4e00-\u9fa5]{1,10}$" required>
      </div>
      <div>
        <label>手机</label>
        <input type="text" placeholder="请输入你的手机" pattern="^1[3456789]\d{9}$" required>
      </div>
      <div>
        <label>简介</label>
        <textarea required></textarea>
      </div>
    </form>
    <h4>使用pointer-events禁用事件触发</h4>
    <a class="disabled-trigger" href="https://www.baidu.com">点我</a>
    <h4>使用:focus-within分发冒泡响应，表单控件触发focus和blur事件后往父元素进行冒泡，在父元素上通过:focus-within捕获该冒泡事件来设置样式</h4>
    <div class="focus-within">
      <input type="text">
    </div>
    <h4>使用max-height切换自动高度</h4>
    <ul class="auto-height">
      <li>
        <h3>列表1</h3>
        <p>内容1<br>内容2<br>内容3<br>内容4</p>
      </li>
      <li>
        <h3>列表2</h3>
        <p>内容1<br>内容2<br>内容3<br>内容4</p>
      </li>
      <li>
        <h3>列表3</h3>
        <p>内容1<br>内容2<br>内容3<br>内容4</p>
      </li>
    </ul>
    <h4>使用animation-delay保留动画首帧</h4>
    <ul class="initial-keyframe">
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <h4>使用filter开启悼念模式</h4>
    <img class="mourning-mode" src="http://www.baidu.com/img/bdlogo.png">
    <h4>使用::selection改变选中颜色</h4>
    <div class="select-color">
      <p>全局选择文字颜色</p>
      <p>全局选择文字颜色</p>
      <p class="special">局部选择文字颜色</p>
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

  .justify-text {
    li {
      padding: 0 10px;
      width: 100px;
      height: 40px;
      background-color: #f66;
      line-height: 40px;
      text-align-last: justify;
      color: #fff;
      & + li {
        margin-top: 5px;
      }
    }
  }

  .ellipsis-text {
    line-height: 30px;
    font-size: 20px;
    &.s-line {
      width: 400px;
    }
    &.m-line {
      width: 400px;
      margin-top: 10px;
      text-align: justify;
    }
    &.sl-ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &.ml-ellipsis {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    &.mls-ellipsis {
      overflow: hidden;
      position: relative;
      max-height: 90px;
      &::after {
        content: '...';
        position: absolute;
        bottom: 0;
        right: 0;
        padding-left: 40px;
        background: linear-gradient(to right, transparent, #fff 50%);
      }
    }
  }

  .onepx-border {
    width: 200px;
    height: 80px;
    cursor: pointer;
    line-height: 80px;
    text-align: center;
    font-weight: bold;
    font-size: 50px;
    color: #f66;
    & + .onepx-border {
      margin-top: 10px;
    }
    &.normal {
      border: 1px solid #f66;
    }
    &.thin {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid #f66;
        width: 200%;
        height: 200%;
        transform: scale(.5);
        transform-origin: left top;
      }
    }
  }

  .highlight-list {
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 600px;
    height: 60px;
    background-color: #3c9;
    & + .highlight-list {
      margin-top: 10px;
    }
    li {
      padding: 0 10px;
      height: 40px;
      line-height: 40px;
      background-color: #3c9;
      font-size: 16px;
      color: #fff;
    }
    &.left li {
      margin-left: 10px;
      &:last-child {
        margin-left: auto;
      }
    }
    &.right li {
      margin-left: 10px;
      /*&:first-child {
        margin-right: auto;
      }*/
      &:nth-of-type(-n + 2) {
        margin-right: auto;
      }
    }
  }

  .form-validation {
    width: 500px;
    div + div {
      margin-top: 10px;
    }
    label {
      display: block;
      padding-bottom: 5px;
      font-weight: bold;
      font-size: 16px;
    }
    input,
    textarea {
      display: block;
      padding: 0 20px;
      border: 1px solid #ccc;
      width: 100%;
      height: 40px;
      outline: none;
      caret-color: #09f;
      transition: all 300ms;
      &:focus:valid {
        border-color: #3c9;
      }
      &:focus:invalid {
        border-color: #f66;
      }
    }
    textarea {
      height: 122px;
      resize: none;
      line-height: 30px;
      font-size: 16px;
    }
  }

  .disabled-trigger {
    padding: 0 20px;
    border-radius: 10px;
    height: 40px;
    line-height: 40px;
    background-color: #66f;
    color: #fff;
    cursor: pointer;
    pointer-events: none;
  }

  .focus-within {
    padding: 10px;
    &:focus-within {
      background-color: #3c9;
    }
  }

  .auto-height {
    width: 300px;
    li {
      cursor: pointer;
      & + li {
        margin-top: 5px;
      }
      &:hover p {
        border-bottom-width: 1px;
        max-height: 600px;
      }
    }
    h3 {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      background-color: #f66;
      font-size: 16px;
      color: #fff;
    }
    p {
      overflow: hidden;
      padding: 0 20px;
      border: 1px solid #f66;
      border-top: none;
      border-bottom-width: 0;
      line-height: 30px;
      max-height: 0;
      transition: all 500ms;
    }
  }

  .initial-keyframe {
    position: relative;
    width: 100px;
    height: 100px;
    li {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 100%;
      background-color: #3c9;
      transform: rotate(0) translate(-80px, 0);
      animation: rotate 3s linear infinite;
      &:nth-child(2) {
        animation-delay: -1s;
      }
      &:nth-child(3) {
        animation-delay: -2s;
      }
    }
  }
  @keyframes rotate {
    to {
      transform: rotate(1turn) translate(-80px, 0);
    }
  }

  .mourning-mode {
    filter: grayscale(100%);
  }

  ::selection {
    background-color: #66f;
    color: #fff;
  }
  .select-color {
    line-height: 50px;
    font-weight: bold;
    font-size: 30px;
    color: #f66;
    p.special::selection {
      background-color: #3c9;
    }
  }
</style>
