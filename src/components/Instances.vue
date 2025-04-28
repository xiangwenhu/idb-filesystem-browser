<template>
  <div v-if="instances && instances.length > 0" class="idb-fs-list">
    <div
      :class="{ 'idb-fs-item': true, active: index === activeIndex }"
      v-for="(item, index) in instances"
      :key="item.name"
      @click="onSelect(index)"
    >
      {{ item.name }}
    </div>
  </div>
  <div v-else>暂无实例</div>
</template>

<script setup lang="ts">
import { getAllInstances, type InstanceInformation } from "idb-filesystem-api";
import { onMounted, ref } from "vue";

const instances = ref<InstanceInformation[] | undefined>();
const activeIndex = ref<number>(0);

async function init() {
  instances.value = await getAllInstances();
}

function onSelect(index: number){
  if(index === activeIndex.value) return;
  activeIndex.value = index;
}

onMounted(init);
</script>

<style scoped>
.idb-fs-list {
  display: flex;
  flex-wrap: nowrap;
}

.idb-fs-item {
  font-size: 16px;
  line-height: 30px;
  display: inline-block;
  padding: 6px;
  cursor: pointer;
}

.idb-fs-item.active {
  background-color: rgb(64, 128, 255);
}
</style>
