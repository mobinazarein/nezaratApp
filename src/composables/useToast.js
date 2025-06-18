import {ref, readonly} from "vue";
import {Exception} from "sass";

let toasts = ref([]);

const useToast = () => {
    const addToast = ({type, message, timer = null}) => {
        if (!['success', 'error', 'info', 'warning'].includes(type))
            throw new Exception(`Toast type must be in ['success', 'error', 'info', 'warning'] : ${type} given.`);

        let id = Date.now()
        toasts.value.push({
            id,
            type,
            message,
            timer,
        })
console.log('useToast',toasts);

        return id;
    }

    const removeToast = (id) => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    return {toasts: readonly(toasts), addToast, removeToast};
}
export default useToast;