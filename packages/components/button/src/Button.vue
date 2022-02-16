<template>
  <button
    :class="[btnClass, {'active': active}]"
    :style="btnStyle"
    @click="onClick">
    <slot name="start">
      <!-- tex前面 -->
      <span v-if="showLoading" class="action-loading">
        <i class="iconfont icon-loading"></i>
      </span>
    </slot>
    <slot></slot>
    <slot name="end">
      <!-- text后面 -->
    </slot>

    <div class="base-wave" :class="{'base-wave--active': isActive}"></div>
  </button>
</template>

<script lang="ts">
import { computed, nextTick, defineComponent } from 'vue'
import { namespace } from '../../../utils/config'
export default defineComponent({
  name: 'ElButton',
})
</script>

<script setup lang="ts">
  const props = defineProps({
    size:{ // 按钮尺寸
      type: String,
      default: 'medium',
      validator(val: string) {
        return ['lg', 'medium', 'sm'].includes(val)
      }
    },
    shape: { // 按钮形状
      type: String,
      default: '',
      validator(val: string) {
        return ['circle', 'round', ''].includes(val)
      }
    },
    attrType: {
      type: String,
      default: 'button',
      validator(val: string) {
        return ['button', 'submit', 'reset'].includes(val)
      }
    },
    type: { // 按钮类型
      type: String,
      default: 'default',
      validator(val: string) {
        return  ['default', 'primary', 'success', 'info', 'warning', 'error'].includes(val)
      }
    },
    active: Boolean,
    showLoading: Boolean, // 是否显示loading icon
    block: Boolean, // 按钮显示为blok
    bordered: { // 是否显示边框
      type: Boolean,
      default: true,
    },
    textColor: { // 文本颜色
      type: String,
      default: ''
    }
  })

  let isActive = $ref(false)
  let timer: NodeJS.Timeout
  function onClick() {
    nextTick(() => {
      isActive = false
      clearTimeout(timer)
      setTimeout(() => {
        isActive = true
        timer = setTimeout(() => {
          isActive = false
        }, 1000)
      })
    })
  }

  const btnSize = computed(() => ['lg', 'medium', 'sm'].includes(props.size) ? props.size : 'default')
  const btnClass = computed(() => {
    const btnName = `${namespace}-button`
    const classs = [btnName, `${btnName}-${props.size}`, `${btnName}-${props.type}`]

    if (props.shape) {
      classs.push(`${btnName}-${props.shape}`)
    }
    if (!props.bordered) {
      classs.push('none-border')
    }
    if (props.block) {
      classs.push('block')
    }
    
    return classs
  })

  const btnStyle = computed(() => {
    let styleStr = ''
    if (props.textColor) {
      styleStr += `color: ${props.textColor}`
    }
    return styleStr
  })

</script>