<template>
  <div class="card">
    <Breadcrumb :items="breadcrumbData" @change="onBreadcrumbChange" :key="root.fullPath">
      目录：
    </Breadcrumb>
  </div>
  <div class="card" ref="container">
    <DirectoryHandle :handle="currentDirHandle" :key="currentDirHandle.fullPath" />
  </div>
  <ContextMenu :target="container" v-if="container" />
</template>

<script setup lang="ts">
import { computed,  onMounted, provide, ref } from "vue";
import { IDBFileSystemDirectoryHandle } from "idb-filesystem-api";
import Breadcrumb, { type BreadcrumbDataItem } from "../Breadcrumb.vue";
import DirectoryHandle from "./DirectoryHandle.vue";
import ContextMenu from "../ContextMenu/index.vue"

const props = defineProps<{
  root: IDBFileSystemDirectoryHandle;
}>();

const handles = ref<IDBFileSystemDirectoryHandle[]>([props.root]);
const currentDirHandle = ref<IDBFileSystemDirectoryHandle>(props.root);


const container = ref<HTMLElement>();

async function init() {

}

const breadcrumbData = computed(()=> {
  return handles.value.map(v=> ({
    name: v.fullPath == "/" ? "root" : v.name,
  }))
})

function onBreadcrumbChange(data: BreadcrumbDataItem, index: number){
 handles.value = handles.value.slice(0 ,index + 1);
 currentDirHandle.value = handles.value[index]
}

provide('enterDirectory', (handle: IDBFileSystemDirectoryHandle)=> {
  handles.value.push(handle);
  currentDirHandle.value = handle;
});


onMounted(init);
</script>

<style lang="css">
.handle-tem-container {
  width: 6rem;
  text-align: center;
  cursor: pointer;
}

.handle-tem-container .name {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
