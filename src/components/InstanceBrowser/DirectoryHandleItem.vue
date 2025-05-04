<template>
  <figure
    @dblclick="onEnterDirectory"
    class="handle-tem-container"
    :data-path="handle.fullPath"
    :data-type="menuType"
  >
    <img
      src="../../assets/images/folder.png"
      class="folder"
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
import type { IDBFileSystemDirectoryHandle } from "idb-filesystem-api";
import { onMounted, reactive, inject } from "vue";

const menuType = EnumContextMenuType.FOLDER;

const state = reactive<{
  showContextMenu: boolean;
  loading: boolean;
}>({
  showContextMenu: false,
  loading: true,
});

const enterDirectory:
  | ((handle: IDBFileSystemDirectoryHandle) => void)
  | undefined = inject("enterDirectory");

const props = defineProps<{
  handle: IDBFileSystemDirectoryHandle;
}>();

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
  height: 4rem;
  width: 4rem;
  cursor: pointer;
}
</style>
