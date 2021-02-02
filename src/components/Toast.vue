<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['message']
}
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toactMessage: ''
  })
  const showToast = (message) => {
    toastData.show = true
    toastData.toactMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toactMessage = ''
    }, 2000)
  }
  const { show, toactMessage } = toRefs(toastData)
  return { show, toactMessage, showToast }
}
</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0,0,0,.35);
    padding: .1rem;
    border-radius: .05rem;
    color: #fff;
}
</style>
