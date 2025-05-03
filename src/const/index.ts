

export const ContextMenuItems = [{
    cmd: FSCMD.CREATE_FOLDER,
    name: '创建文件夹',
    types: [0]
}, {
    cmd: FSCMD.CRETAE_FILE,
    name: '创建文件',
    types: [0]
}, {
    cmd: FSCMD.REFRESH,
    name: '刷新',
    types: [0]
}, {
    cmd: FSCMD.PREVIEW,
    name: '预览',
    types: [1]
}, {
    cmd: FSCMD.PRINT,
    name: '打印',
    types: [1]
}, {
    cmd: FSCMD.RENAME,
    name: '重命名',
    types: [1, 2]
}, {
    cmd: FSCMD.DOWNLOAD,
    name: '下载',
    types: [1]
}, {
    cmd: FSCMD.DELETE,
    name: '删除',
    types: [1, 2]
}, {
    cmd: FSCMD.PROPERTY,
    name: '属性',
    types: [1, 2]
}]