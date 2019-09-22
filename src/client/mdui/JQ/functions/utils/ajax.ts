import AjaxOptions from "../../interfaces/AjaxOptions"
import {EventName} from "../../types/JQAjax"

const globalOptoins: AjaxOptions = {}

const ajaxEvents: {
    [name: string]: EventName
} = {
    ajaxStart: 'start.mdui.ajax',
    ajaxSuccess: 'success.mdui.ajax',
    ajaxError: 'error.mdui.ajax',
    ajaxComplete: 'complete.mdui.ajax'
}

export {globalOptoins, ajaxEvents}