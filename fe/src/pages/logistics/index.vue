<!--
 * @Author: Peihua
 * @Date: 2024-12-09 11:49:04
 * @LastEditors: Peihua
 * @LastEditTime: 2024-12-09 18:06:51
 * @FilePath: \fe\src\pages\logistics\index.vue
 * @Description: 物流管理列表页
-->
<template>
  <logistics-table />
</template>
<script lang="ts">
export default {
  name: 'LogisticsIndex',
};
</script>
<script setup lang="ts">
import LogisticsTable from './components/LogisticsTable.vue';
</script>
