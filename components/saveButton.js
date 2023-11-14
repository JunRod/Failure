'use client'

import Diary from "@styles/diary.module.css";
import {memo} from "react";
import {toast} from "sonner";

const SaveButton = memo(function SaveButton({setSaveGenerate, showButtonSave}) {

    function controllerOnClick() {
        setSaveGenerate(true)
        toast.success('Generación guardada')
    }

    return (
        <button
            onClick={controllerOnClick}
            className={`${Diary.buttonSave} ${showButtonSave ? Diary.saveButtonActive : Diary.saveButtonOff}`}
            disabled={!showButtonSave}
        >
            Guardar generación
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-device-floppy" width="24"
                 height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                 strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M14 4l0 4l-6 0l0 -4"></path>
            </svg>
        </button>

    );
})

export default SaveButton;