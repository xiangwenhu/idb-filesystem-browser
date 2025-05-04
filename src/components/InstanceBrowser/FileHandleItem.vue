<template>
  <figure class="handle-tem-container" :data-path="handle.fullPath" :data-type="menuType">
    <img
      src="../../assets/images/file.png"
      class="file"
      :data-path="handle.fullPath"
      :data-type="menuType"
    />
    <p
      class="name"
      :title="handle.name"
      :data-path="handle.fullPath"
      :data-type="menuType"
    >
      {{ handle.name }}
    </p>
  </figure>
</template>

<script setup lang="ts">
import { EnumContextMenuType } from "@/types";
import type { IDBFileSystemFileHandle } from "idb-filesystem-api";
import { onMounted, reactive } from "vue";

const menuType = EnumContextMenuType.FILE;

const props = defineProps<{
  handle: IDBFileSystemFileHandle;
}>();

const state = reactive<{
  loading: boolean;
}>({
  loading: true,
});

async function init() {}

onMounted(init);
</script>

<style scoped>
.file {
  height: 3rem;
  width: 3rem;
  cursor: pointer;
}
</style>
