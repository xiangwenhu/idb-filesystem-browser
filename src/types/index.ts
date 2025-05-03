/**
 * 右键菜单类型
 */
export enum EnumContextMenuType {
    Default = 0,
    File = 1,
    Folder = 2
}

export enum EnumContextMenCmd {
    /**
     * 创建文件夹
     */
    CREATE_FOLDER = 1,
    /**
     * 创建文件
     */
    CREATE_FILE = 2,
    /**
     * 刷新
     */
    REFRESH = 3,
    /**
     * 查看
     */
    PREVIEW = 4,
    /**
     * 打印
     */
    PRINT = 5,
    /**
     * 重命名
     */
    RENAME = 6,
    /**
     * 下载
     */
    DOWNLOAD = 7,
    /**
     * 删除
     */
    DELETE = 8,
    /**
     * 查看属性
     */
    VIEW_PROPERTY = 9
}