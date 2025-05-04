<template>
  <div class="directory-container">
    <template v-for="item in list" :key="item.fullPath">
      <DirectoryHandleItem v-if="item.kind === 'directory'" :handle="item" />
      <FileHandleItem v-if="item.kind === 'file'" :handle="item" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type {
  IDBFileSystemDirectoryHandle,
  IDBFileSystemFileHandle,
} from "idb-filesystem-api";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import DirectoryHandleItem from "./DirectoryHandleItem.vue";
import FileHandleItem from "./FileHandleItem.vue";
import { asyncIteratorToArray } from "@/util";
import { addEvent } from "@/util/message";

const state = reactive<{
  loading: boolean;
}>({
  loading: true,
});

const list = ref<(IDBFileSystemDirectoryHandle | IDBFileSystemFileHandle)[]>();

const props = defineProps<{
  handle: IDBFileSystemDirectoryHandle;
}>();

let unsubscribe: () => void | undefined;

function onHandleCmd(data: {
  type: string;
  cmd: string;
  fullPath: string;
  params: unknown[];
}) {
  console.log("onHandleCmd:", data);
}

async function init() {
  const handles = await props.handle.values();
  list.value = await asyncIteratorToArray(handles);
  console.log("handles:", list.value);

  unsubscribe = addEvent("handle-cmd", onHandleCmd);
}

onMounted(init);

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
</script>

<style scoped>
.directory-container {
  display: flex;
  flex-wrap: nowrap;
}
</style>
