<template>
  <figure>
    <img src="../../assets/images/file.png" class="file" />
    <p>{{ handle.name }}</p>
  </figure>
</template>

<script setup lang="ts">
import type { IDBFileSystemFileHandle } from "idb-filesystem-api";
import { onMounted, reactive } from "vue";

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
