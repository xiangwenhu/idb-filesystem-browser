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
import CMDHandles from "./CMDHandle";
import type { EnumContextMenCmd, EnumContextMenuType } from "@/types";

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

async function onHandleCmd(data: {
  type: EnumContextMenuType;
  cmd: EnumContextMenCmd;
  fullPath: string;
  params: unknown[];
}) {
  const handle = list.value?.find(
    (item) => item.fullPath === data.fullPath
  ) as IDBFileSystemFileHandle;
  console.log("onHandleCmd:", data);

  const handleParams = {
    ...data,
    handle,
  };

  const cmdHandles = CMDHandles[data.type];
  if (!cmdHandles) return;

  const cmdHandle = cmdHandles[data.cmd];
  if (!cmdHandle) return;

  await cmdHandle.call(null, handleParams);

  console.log("handleParams:", handleParams);

  init();
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
