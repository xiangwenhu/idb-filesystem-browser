import { EnumContextMenCmd, EnumContextMenuType, type ContextMenuItem } from "@/types";

export const ContextMenuItems: ContextMenuItem[] = [{
    cmd: EnumContextMenCmd.CREATE_FOLDER,
    name: '创建文件夹',
    types: [EnumContextMenuType.DEFAULT]
}, {
    cmd: EnumContextMenCmd.CREATE_FILE,
    name: '创建文件',
    types: [EnumContextMenuType.DEFAULT]
}, {
    cmd: EnumContextMenCmd.REFRESH,
    name: '刷新',
    types: [EnumContextMenuType.DEFAULT]
}, {
    cmd: EnumContextMenCmd.PREVIEW,
    name: '预览',
    types: [EnumContextMenuType.FILE]
}, {
    cmd: EnumContextMenCmd.PRINT,
    name: '打印',
    types: [EnumContextMenuType.FILE]
}, {
    cmd: EnumContextMenCmd.RENAME,
    name: '重命名',
    types: [EnumContextMenuType.FILE, EnumContextMenuType.FOLDER]
}, {
    cmd: EnumContextMenCmd.DOWNLOAD,
    name: '下载',
    types: [EnumContextMenuType.FILE]
}, {
    cmd: EnumContextMenCmd.DELETE,
    name: '删除',
    types: [EnumContextMenuType.FILE, EnumContextMenuType.FOLDER]
}, {
    cmd: EnumContextMenCmd.VIEW_PROPERTY,
    name: '属性',
    types: [EnumContextMenuType.FILE, EnumContextMenuType.FOLDER]
}]