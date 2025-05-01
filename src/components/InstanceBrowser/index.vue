<template>
  <Breadcrumb :items="breadcrumbData" @change="onBreadcrumbChange"></Breadcrumb>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { IDBFileSystemDirectoryHandle } from "idb-filesystem-api";
import Breadcrumb, { type BreadcrumbDataItem } from "../Breadcrumb.vue";

type DirHandle = IDBFileSystemDirectoryHandle;

const props = defineProps<{
  root: DirHandle;
}>();

const handles = ref<DirHandle[]>([props.root]);
const currentDirHandle = ref<DirHandle>(props.root);

async function init() {}

onMounted(init);


const breadcrumbData = computed(()=> {
  return handles.value.map(v=> ({
    name: v.fullPath == "/" ? "root" : v.name,
  }))
})

function onBreadcrumbChange(data: BreadcrumbDataItem, index: number){

}
</script>
