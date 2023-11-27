import {setOptionSelected, setShowConfigGpt} from "@redux/diarySlice";
import {useAppDispatch} from "@redux/hooks";

export function ResetGPT() {
    const dispatch = useAppDispatch()
    
    dispatch(setShowConfigGpt(false))
    dispatch(setOptionSelected(null))
}