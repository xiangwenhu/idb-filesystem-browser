<template>
  <figure @dblclick="onEnterDirectory">
    <img src="../../assets/images/folder.png" class="folder" />
    <p>{{ handle.name }}</p>
  </figure>
</template>

<script setup lang="ts">
import type { IDBFileSystemDirectoryHandle } from "idb-filesystem-api";
import { onMounted, reactive, inject } from "vue";

const enterDirectory:
  | ((handle: IDBFileSystemDirectoryHandle) => void)
  | undefined = inject("enterDirectory");

const props = defineProps<{
  handle: IDBFileSystemDirectoryHandle;
}>();

const state = reactive<{
  loading: boolean;
}>({
  loading: true,
});

async function init() {}

defineOptions({
  name: "DirectoryHandleItem",
});

onMounted(init);

function onEnterDirectory() {
  if (enterDirectory) {
    enterDirectory(props.handle);
  }
}
</script>

<style scoped>
.folder {
  height: 3rem;
  width: 3rem;
  cursor: pointer;
}
</style>
