import {ORDER_STATUS} from "../constants/constants.js";

export class ClassUtil {
    
    static showColorClass(status) {
        let className = "";
        switch (status) {
            case ORDER_STATUS.ORDER_PLACED :
                className = "bg-green-200 text-green-800";
                break;
            case ORDER_STATUS.PACKING :
                className = "bg-orange-200 text-orange-800";
                break;
            case ORDER_STATUS.DISPATCHED :
                className = "bg-blue-200 text-blue-800";
                break;
            case ORDER_STATUS.SHIPPING :
                className = "bg-purple-200 text-purple-800";
                break;
            case ORDER_STATUS.DELIVERED :
                className = "bg-amber-200 text-amber-800";
                break;
            case ORDER_STATUS.CANCELLED :
                className = "bg-red-200 text-red-800";
                break;
            case ORDER_STATUS.COMPLETED :
                className = "bg-pink-200 text-pink-800";
                break;
            default:
                className = "bg-green-200 text-green-800";
                break;
        }
        return className;
    }
}