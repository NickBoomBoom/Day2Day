<template>
  <div class="vnc-viewer">
    <div
      ref="vncContainer"
      class="vnc-container"
      :style="{ backgroundColor: backgroundColor }"
    ></div>

    <div v-if="!connected" class="vnc-status">
      <p v-if="connecting">🔌 正在连接 VNC 服务器...</p>
      <p v-else>❌ 已断开连接</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import RFB from '@novnc/novnc/lib/rfb'
// let RFB: any

// const loadRFB = async () => {
//   const module = await import('@novnc/novnc/lib/rfb.js')
//   RFB = module.default
// }

interface Props {
  url?: string // WebSocket 地址，如 ws://localhost:6080
  username?: string
  password?: string
  backgroundColor?: string
  autoConnect?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: '#000000',
  autoConnect: true,
  url: 'wss://virtvnc.dev.tiusolution.com/k8s/apis/subresources.kubevirt.io/v1alpha3/namespaces/sd-webui-dev/virtualmachineinstances/win-dcb8997c-c7e9-4c68-8565-579ac57e2ba4/vnc'
})

const vncContainer = ref<HTMLDivElement | null>(null)
let rfb: any
const connected = ref(false)
const connecting = ref(false)

const connectVNC = () => {
  if (!vncContainer.value) return
  disconnectVNC()
  connecting.value = true

  try {
    rfb = new RFB(vncContainer.value, props.url, {
      credentials: {
        username: props.username,
        password: props.password
      }
    })

    console.log(334444, props.url, rfb)
    // 基础配置
    rfb.scaleViewport = true
    rfb.resizeSession = true
    rfb.background = props.backgroundColor

    // 事件监听
    rfb.addEventListener('connect', () => {
      connected.value = true
      connecting.value = false
      console.log('✅ 已连接 VNC 服务器')
    })

    rfb.addEventListener('disconnect', (e: any) => {
      connected.value = false
      connecting.value = false
      console.warn('❌ 连接断开：', e.detail)
    })

    rfb.addEventListener('credentialsrequired', () => {
      console.log('🔒 服务器需要认证')
    })
  } catch (err) {
    console.error('VNC 连接错误：', err)
    connecting.value = false
  }
}

const disconnectVNC = () => {
  if (rfb) {
    rfb.disconnect()
    rfb = null
    connected.value = false
  }
}

onMounted(async () => {
  // await loadRFB()
  if (props.autoConnect) connectVNC()
})

onBeforeUnmount(() => {
  disconnectVNC()
})

// 如果 URL 改变则重新连接
watch(
  () => props.url,
  (newVal, oldVal) => {
    if (newVal !== oldVal && props.autoConnect) connectVNC()
  }
)
</script>

<style scoped>
.vnc-viewer {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.vnc-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.vnc-status {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
</style>
