import { IMyTable } from "../component/Mytable";
import { IUpFileName } from "../pages/uploadPage";

export interface IUpFileHandle {
    fileName: IUpFileName;
    setFileName: React.Dispatch<React.SetStateAction<IUpFileName>>
}

export interface IDisplayHandle {
    form: IMyTable;
    setForm: React.Dispatch<React.SetStateAction<IMyTable>>
}

export interface IDisplayUploadHooks {
    upFileHandle: IUpFileHandle
    displayHandle: IDisplayHandle
}