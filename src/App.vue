<template>
  <Instances @change="onSelectInstance" />
  <!-- <Test /> -->
  <InstanceBrowser v-if="!state.loading && rootDir" :root="rootDir" />
</template>

<script setup lang="ts">
import Instances from "./components/Instances.vue";
import InstanceBrowser from "./components/InstanceBrowser/index.vue";
import { reactive, ref } from "vue";
import {
getInstance,
  type IDBFileSystemDirectoryHandle,
  type InstanceInformation,
} from "idb-filesystem-api";
const state = reactive<{
  loading: boolean;
}>({
  loading: false,
});

const rootDir = ref<IDBFileSystemDirectoryHandle | undefined>();

async function onSelectInstance(data: InstanceInformation) {
  state.loading = true;
  rootDir.value = (await getInstance({name: data.name}));
  state.loading = false;
}
</script>

<style scoped></style>
