<!--
 * @Author: Peihua
 * @Date: 2024-12-22 22:22:14
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-22 23:45:23
 * @FilePath: \fe\src\pages\logistics\components\TrackDrawer.vue
 * @Description: 
-->
<template>
  <t-drawer
    :visible="visible"
    :onConfirm="copyContent"
    :cancelBtn="'关闭'"
    :confirmBtn="'复制轨迹链接'"
    :preventScrollThrough="false"
    :header="orderCode"
    size="400px"
    @close="handleClose"
  >
    <t-timeline mode="same" theme="default">
      <t-timeline-item dotColor="primary" :label="track.time" v-for="track in trackInfo">
        <div>{{ track.desc }}</div>
        <div class="timeline-custom-content">{{ track.mergeDescription }}</div>
      </t-timeline-item>
    </t-timeline>
  </t-drawer>
</template>

<script setup lang="ts">
import { TrackResultData } from '@/api/model/logisticsModel';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';
import type { Ref } from 'vue';

const orderCode: Ref<string | undefined> = ref();
const trackInfo: Ref<TrackResultData['traceDetailList']> = ref([]);

const visible = ref(false);
const setVisible = (state) => {
  visible.value = state;
};

const handleShow = (_orderCode: string, _trackInfo: TrackResultData['traceDetailList']) => {
  trackInfo.value = _trackInfo;
  orderCode.value = _orderCode;
  setVisible(true);
};
const handleClose = () => {
  setVisible(false);
};

const copyContent = async () => {
  const text = `https://t.17track.net/#nums=${orderCode.value}`
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
    MessagePlugin.success('复制成功')
  } catch (err) {
    console.error('Failed to copy: ', err);
    MessagePlugin.error('复制失败')
  }
};

defineExpose({
  handleShow,
});
</script>

<style lang="less" scoped>
.timeline-custom-content {
  font-size: 12px;
  color: var(--td-text-color-secondary);
}
</style>
