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

const emits = defineEmits<{
  (event: "change", data: InstanceInformation, index: number): void;
}>();

const instances = ref<InstanceInformation[] | undefined>();
const activeIndex = ref<number>(0);

async function init() {
  instances.value = await getAllInstances();
  if(instances.value){
    emits("change",  instances.value[activeIndex.value], activeIndex.value);
  }
}

function onSelect(index: number){
  if(index === activeIndex.value) return;
  activeIndex.value = index;
  if(instances.value){
    emits("change",  instances.value[index], index);
  }
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
  font-weight: bold;
}

.idb-fs-item.active {
  /* background-color: rgb(64, 128, 255); */
  /* background-color: #18a058; */
  color: #18a058;
}
</style>
