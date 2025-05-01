<template>
  <div>
    <span
      v-for="(item, index) in items"
      :key="index"
      @click="emits('change', item, index)"
    >
      {{ item.label || item.name }}
      {{ index === items.length - 1 ? "" : separator || "/" }}
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
</script>
