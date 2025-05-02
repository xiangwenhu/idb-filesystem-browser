<template>
  <Breadcrumb :items="breadcrumbData" @change="onBreadcrumbChange"></Breadcrumb>
  <div>
    <DirectoryHandle :handle="currentDirHandle" :key="currentDirHandle.fullPath" />
  </div>
</template>

<script setup lang="ts">
import { computed,  onMounted, provide, ref } from "vue";
import { IDBFileSystemDirectoryHandle } from "idb-filesystem-api";
import Breadcrumb, { type BreadcrumbDataItem } from "../Breadcrumb.vue";
import DirectoryHandle from "./DirectoryHandle.vue";

const props = defineProps<{
  root: IDBFileSystemDirectoryHandle;
}>();

const handles = ref<IDBFileSystemDirectoryHandle[]>([props.root]);
const currentDirHandle = ref<IDBFileSystemDirectoryHandle>(props.root);

async function init() {}

onMounted(init);


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
</script>
