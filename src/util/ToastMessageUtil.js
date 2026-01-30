import {toast} from 'react-toastify';

export class ToastMessageUtil {

    static showToastMessageSuccess(text) {
        toast.success(text);
    }

    static showToastMessageInfo(text) {
        toast.info(text);
    }

    static showToastMessageWarning(text) {
        toast.warn(text);
    }

    static showToastMessageError(text) {
        toast.error(text);
    }
}