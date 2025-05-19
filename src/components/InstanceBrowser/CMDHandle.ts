import { EnumContextMenCmd, EnumContextMenuType } from "@/types";
import { IDBFileSystemFileHandle, type IDBFileSystemDirectoryHandle, type IFileSystemHandle } from "idb-filesystem-api";

interface CMDHandleParams {
    type: EnumContextMenuType;
    cmd: EnumContextMenCmd;
    fullPath: string;
    params: unknown[];
    handle: IFileSystemHandle
}

interface CMDHandler {
    (params: CMDHandleParams): void;
}


const CMDFileHandles: Record<string, CMDHandler> = {
    async [EnumContextMenCmd.DOWNLOAD]({ handle }) {
        if (handle instanceof IDBFileSystemFileHandle) {
            handle.getFile().then((file) => {
                const url = URL.createObjectURL(file);
                const a = document.createElement("a");
                a.href = url;
                a.download = file.name;
                a.click();
                URL.revokeObjectURL(url);
            });
        }
    },
    async [EnumContextMenCmd.DELETE]({ handle }) {
        if (handle instanceof IDBFileSystemFileHandle) {
            await handle.remove();
        }
    }
}

const CMDFolderHandles: Record<string, CMDHandler> = {
}


export default {
    [EnumContextMenuType.FILE]: CMDFileHandles,
    [EnumContextMenuType.FOLDER]: CMDFolderHandles
} as Record<EnumContextMenuType, Record<string, CMDHandler>>;