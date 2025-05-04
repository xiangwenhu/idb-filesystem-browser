<template>
  <ul
    class="context-menu-container"
    ref="container"
    @mouseleave="onMouseLeave"
    @contextmenu="onSelfContextMenu"
    v-show="state.show"
  >
    <li v-for="item in menuItems" :key="item.cmd" @click="onClickMenuItem(item)">
      {{ item.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ContextMenuItems } from "@/const";
import { EnumContextMenuType, type ContextMenuItem } from "@/types";
import { dispatch } from "@/util/message";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";

const state = reactive<{
    show: boolean;
    menuType?: EnumContextMenuType;
    fullPath?: string
}>({
    show: false
})

const container = ref<HTMLElement>();

const props = defineProps<{
  target: string | HTMLElement | undefined;
}>();


const containerEl = ref<HTMLElement | undefined>();

const menuItems = computed(() => {
    if(state.menuType == undefined) return [];
  return ContextMenuItems.filter((c) => c.types.includes(state.menuType!));
});

function onClickMenuItem(item: ContextMenuItem) {
  console.log(`${item.cmd} clicked`);

  if(!state.menuType) return;
  dispatch("handle-cmd", {
    type: state.menuType,
    cmd: item.cmd,
    fullPath: state.fullPath
  })
}

function getMenuType(el: HTMLElement) {
  const menuType = el.dataset.type;
  if(!menuType) return EnumContextMenuType.DEFAULT
    return menuType as EnumContextMenuType;
}

function onContextMenu(ev: MouseEvent) {
    ev.stopPropagation();
    ev.preventDefault();

    // debugger;
    const el = ev.target as HTMLElement;
    state.menuType = getMenuType(el);
    state.fullPath = el.dataset.path;
    state.show = true;

    if(container.value){
        container.value.style.left = ev.pageX + 'px';
        container.value.style.top = ev.pageY + 'px'
    }

    return false;
}

function onDocumentClick(ev:MouseEvent){
    const el = ev.target as HTMLElement;
    if(state.show && container.value){
        if(!container.value.contains(el)){
           state.show = false;
           state.fullPath = undefined;
           state.menuType = undefined;
        }
    }
}

function init() {

    if(props.target === undefined) return;

  containerEl.value =
    typeof props.target === "string"
      ? (document.querySelector(props.target) as HTMLElement)
      : props.target;

    containerEl.value.oncontextmenu = onContextMenu;
//   containerEl.value.addEventListener("mouseleave")

    document.addEventListener("click", onDocumentClick )
}

function onSelfContextMenu(ev: MouseEvent){
    ev.preventDefault();
    ev.stopPropagation();
    return false;
}

function onMouseLeave(){
    if(container.value){
        // container.value.style.display = 'none';
    }
}

onMounted(init);

onBeforeUnmount(()=> {
    document.removeEventListener("click", onDocumentClick)
})
</script>

<style lang="css">
.context-menu-container {
  position: absolute;
  border: 1px solid #666;
  border-radius: 0.2rem;
  padding: 0.5rem;
  z-index: 2;
  background-color: #fff;
}

.context-menu-container li {
  border: 0.1rem solid #fff;
  border-radius: 0.2rem;
  min-width: 6rem;
  list-style: none;
  cursor: pointer;
}
.context-menu-container li:hover {
  border: 0.1rem solid #afd;
  border-radius: 0.2rem;
}
</style>
