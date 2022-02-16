<template>
  <div v-show="isShow" class="fh-excess-dialog" ref="boxRef" :style="boxStyle">
    <div class="expand-selecter selecter-top" @mousedown="selecterMouseDown($event, 'top')"></div>
    <div class="expand-selecter selecter-left" @mousedown="selecterMouseDown($event, 'left')"></div>
    <div class="expand-selecter selecter-right" @mousedown="selecterMouseDown($event, 'right')"></div>
    <div class="expand-selecter selecter-bottom" @mousedown="selecterMouseDown($event, 'bottom')"></div>
    <div class="expand-selecter selecter-left-top" @mousedown="selecterMouseDown($event, 'left_top')"></div>
    <div class="expand-selecter selecter-right-top" @mousedown="selecterMouseDown($event, 'right_top')"></div>
    <div class="expand-selecter selecter-left-bottom" @mousedown="selecterMouseDown($event, 'left_bottom')"></div>
    <div class="expand-selecter selecter-right-bottom" @mousedown="selecterMouseDown($event, 'right_bottom')"></div>

    <div class="header" @mousedown="selecterMouseDown($event, 'move')">
      <span class="title">{{ title }}</span>
      <i class="iconfont icon-kuoda full-screen" @click="fullScreen"></i>
      <i class="iconfont icon-shrink recovery-screen" @click="recoveryScreen"></i>
      <i class="iconfont icon-expand expand-top" @click="fullHeight"></i>
      <i class="iconfont icon-guanbi" @click="close"></i>
    </div>
    <div class="content no-scrollbar">
      <div v-show="mouseIsDown" class="content-mask"></div>
      <iframe :src="url" frameborder="0"></iframe>
    </div>
    <div class="footer">
      <div class="newview-btn" @click="openInNewWindow">新页面查看</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FhExcessDialog',
})
</script>

<script setup lang="ts">
import { computed, onMounted, ref, onBeforeUnmount, defineProps, defineExpose } from 'vue';

const TYPE_TOP = 'top';
const TYPE_BOTTOM = 'bottom';
const TYPE_LEFT = 'left';
const TYPE_RIGHT = 'right';
const TYPE_MOVE = 'move';
const TYPE_LEFT_TOP = 'left_top';
const TYPE_RIGHT_TOP = 'right_top';
const TYPE_LEFT_BOTTOM = 'left_bottom';
const TYPE_RIGHT_BOTTOM = 'right_bottom';

const mouseIsDown = ref(false); // 鼠标是否按下
let lastMovePositionX = 0; // 鼠标上次移动的位置x
let lastMovePositionY = 0; // 鼠标上次移动的位置y
let handleType = ''; // 操作类型

const isShow = ref(false);
function close() {
  isShow.value = false;
}
function show() {
  isShow.value = true;
}
defineExpose({
  show,
  close,
});

const boxRef = ref(null);
const style = ref({
  transformX: 0,
  transformY: 0,
  width: 400,
  height: 600,
});

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '详情',
  },
});

function selecterMouseDown(el: MouseEvent, type: string) {
  const { clientX, clientY } = el;
  // 初始x
  lastMovePositionX = clientX;
  // 初始y
  lastMovePositionY = clientY;
  // 点击移动方向
  handleType = type;
  mouseIsDown.value = true;
}

let timer = 0;
function selecterMouseMove(el: MouseEvent) {
  const newTimer = new Date().getTime();
  if (!mouseIsDown.value || newTimer - timer < 16) {
    return;
  }
  timer = newTimer;
  const { clientX, clientY } = el;
  // 左右伸缩, 左上、右上、左下、右下伸缩
  if ([TYPE_LEFT, TYPE_RIGHT, TYPE_LEFT_TOP, TYPE_RIGHT_TOP, TYPE_LEFT_BOTTOM, TYPE_RIGHT_BOTTOM].includes(handleType)) {
    // 左，左上
    const offsetX = clientX - lastMovePositionX;
    let width = style.value.width - offsetX;

    // 右
    if ([TYPE_RIGHT, TYPE_RIGHT_TOP, TYPE_RIGHT_BOTTOM].includes(handleType)) {
      width = style.value.width + offsetX;
      // 宽度最小150px
      if (width > 150) {
        style.value.transformX += offsetX;
      }
    }
    style.value.width = width;
  }

  // 上下伸缩, 左上、右上、左下、右下伸缩
  if ([TYPE_TOP, TYPE_BOTTOM, TYPE_LEFT_TOP, TYPE_RIGHT_TOP, TYPE_LEFT_BOTTOM, TYPE_RIGHT_BOTTOM].includes(handleType)) {
    const offsetY = clientY - lastMovePositionY;
    let height = style.value.height - offsetY;
    if ([TYPE_BOTTOM, TYPE_LEFT_BOTTOM, TYPE_RIGHT_BOTTOM].includes(handleType)) {
      height = style.value.height + offsetY;
      // 高度最小250px
      if (height > 250) {
        style.value.transformY += offsetY;
      }
    }
    style.value.height = height;
  }

  // 移动
  if ([TYPE_MOVE].includes(handleType)) {
    style.value.transformY += clientY - lastMovePositionY;
    style.value.transformX += clientX - lastMovePositionX;
  }

  // 最后设置上次移动位置
  lastMovePositionX = clientX;
  lastMovePositionY = clientY;
}
function selecterMouseUp() {
  mouseIsDown.value = false;
}
function fullScreen() {
  const { innerWidth, innerHeight } = window;
  const width = Math.min(1024, innerWidth * 0.8);
  style.value = {
    width,
    height: innerHeight * 0.6,
    transformX: -(innerWidth - width) / 2 + 40,
    transformY: -innerHeight * 0.3 + 40,
  };
}
function recoveryScreen() {
  style.value = {
    transformX: 0,
    transformY: 0,
    width: 400,
    height: 600,
  };
}
function fullHeight() {
  const { innerHeight } = window;
  style.value.height = innerHeight;
  style.value.transformY = 40;
}

function openInNewWindow() {
  window.open(props.url);
}

onMounted(() => {
  document.addEventListener('mousemove', selecterMouseMove);
  document.addEventListener('mouseup', selecterMouseUp);
});
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', selecterMouseMove);
});

const boxStyle = computed(() => {
  let styleStr = `min-width:150px;max-width:${window.innerWidth * 0.8}px;min-height:250px;transform:translate3d(${style.value.transformX}px,${style.value.transformY}px, 0);`;
  if (style.value.width) {
    styleStr += `width:${style.value.width}px;`;
  }
  if (style.value.height) {
    styleStr += `height:${style.value.height}px;`;
  }
  return styleStr;
});
</script>
