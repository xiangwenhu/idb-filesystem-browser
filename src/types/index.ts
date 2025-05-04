/**
 * 右键菜单类型
 */
export enum EnumContextMenuType {
    DEFAULT = 'DEFAULT',
    FILE = 'FILE',
    FOLDER = 'FOLDER'
}

export enum EnumContextMenCmd {
    /**
     * 创建文件夹
     */
    CREATE_FOLDER = 'CREATE_FOLDER',
    /**
     * 创建文件
     */
    CREATE_FILE = 'CREATE_FILE',
    /**
     * 刷新
     */
    REFRESH = 'REFRESH',
    /**
     * 查看
     */
    PREVIEW = 'PREVIEW',
    /**
     * 打印
     */
    PRINT = 'PRINT',
    /**
     * 重命名
     */
    RENAME = 'RENAME',
    /**
     * 下载
     */
    DOWNLOAD = 'DOWNLOAD',
    /**
     * 删除
     */
    DELETE = 'DELETE',
    /**
     * 查看属性
     */
    VIEW_PROPERTY = 'VIEW_PROPERTY'
}


export interface ContextMenuItem {
    cmd: EnumContextMenCmd;
    name: string;
    types: EnumContextMenuType[];
}