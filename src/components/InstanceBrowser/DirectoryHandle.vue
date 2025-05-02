<template>
  <div class="directory-container">
    <template v-for="(item, index) in list" :key="index">
      <DirectoryHandleItem v-if="item.kind === 'directory'" :handle="item" />
      <FileHandleItem v-if="item.kind === 'file'" :handle="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type {
  IDBFileSystemDirectoryHandle,
  IIDBFileSystemFileHandle,
} from "idb-filesystem-api";
import { onMounted, reactive, ref } from "vue";
import DirectoryHandleItem from "./DirectoryHandleItem.vue";
import FileHandleItem from "./FileHandleItem.vue";
import { asyncIteratorToArray } from "@/util";

const state = reactive<{
  loading: boolean;
}>({
  loading: true,
});

const list = ref<IIDBFileSystemFileHandle[]>();

const props = defineProps<{
  handle: IDBFileSystemDirectoryHandle;
}>();

async function init() {
  const handles = await props.handle.values();
  list.value = await asyncIteratorToArray(handles);
  console.log("handles:", list.value);
}

onMounted(init);
</script>

<style scoped>
.directory-container {
  display: flex;
  flex-wrap: nowrap;
}
</style>
