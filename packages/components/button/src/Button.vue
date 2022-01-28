<template>
  <button
    class="fh-button"
    :class="[btnClass]">
    <slot name="pre">
      <span v-if="showLoading" class="action-loading">
        <i class="iconfont icon-loading"></i>
      </span>
    </slot>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'ElButton',
})
</script>


<script setup lang="ts">
  const props = defineProps({
    size:{
      default: 'default',
      validator(val: string) {
        return ['lg', 'default', 'sm'].includes(val)
      }
    },
    shape: {
      default: '',
      validator(val: string) {
        return ['circle', 'round', ''].includes(val)
      }
    },
    showLoading: Boolean
  })

  const btnSize = computed(() => ['lg', 'default', 'sm'].includes(props.size) ? props.size : 'default')
  const btnClass = computed(() => {
    const classs = []
    const btnName = 'fh-button'
    if (props.size && ['lg', 'sm'].includes(props.size)) {
      classs.push(`${btnName}-${props.size}`)
    }
    if (props.shape && ['circle', 'round'].includes(props.shape)) {
      classs.push(`${btnName}-${props.shape}`)
    }
    return classs
  })

</script>