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

        const fileHandle = handle as IDBFileSystemFileHandle;
        fileHandle.getFile().then((file) => {
            const url = URL.createObjectURL(file);
            const a = document.createElement("a");
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
        });

    },
    async [EnumContextMenCmd.DELETE]({ handle }) {
        const fileHandle = handle as IDBFileSystemFileHandle;
        await fileHandle.remove();
    },
    async [EnumContextMenCmd.PREVIEW]({ handle }) {
        const fileHandle = handle as IDBFileSystemFileHandle;
        const file = await fileHandle.getFile();
        const url = URL.createObjectURL(file);
        window.open(url, "_blank");
    }
}

const CMDFolderHandles: Record<string, CMDHandler> = {
    async [EnumContextMenCmd.DELETE]({ handle }) {
        const fileHandle = handle as IDBFileSystemDirectoryHandle;
        await fileHandle.remove()
    }
}


export default {
    [EnumContextMenuType.FILE]: CMDFileHandles,
    [EnumContextMenuType.FOLDER]: CMDFolderHandles
} as Record<EnumContextMenuType, Record<string, CMDHandler>>;