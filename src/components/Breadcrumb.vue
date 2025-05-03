<template>
  <div>
    <slot></slot>
    <span v-for="(item, index) in items" :key="index" class="breadcrumb-item">
      <span class="name" @click="onClickItem(item, index)">{{
        item.label || item.name
      }}</span>
      <span> {{ index === items.length - 1 ? "" : separator || "/" }} </span>
    </span>
  </div>
</template>

<script setup lang="ts">
export interface BreadcrumbDataItem {
  label?: string;
  name?: string;
}

const emits = defineEmits<{
  (event: "change", data: BreadcrumbDataItem, index: number): void;
}>();

interface Props {
  separator?: string;
  items: BreadcrumbDataItem[];
}

const props = defineProps<Props>();

function onClickItem(item: BreadcrumbDataItem, index: number) {
  emits("change", item, index);
}
</script>

<style lang="css">
.breadcrumb-item {
  cursor: pointer;
}

.breadcrumb-item .name {
  cursor: pointer;
  /* color: cadetblue; */
  color: rgb(0, 0, 238);
  font-size: 16px;
}
</style>
