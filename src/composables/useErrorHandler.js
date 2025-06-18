import useToast from "./useToast";

const useErrorHandler = (response) => {
  // console.log('error handler'.response);
    if (!response) return;

    const {addToast} = useToast();

    switch (response.status) {
        case 400:
            addToast({
                type : 'error',
                message: response.data?.message ?? response.data?.entity?.message ?? 'خطا در عملیات مورد نظر .',
                timer: 3000
            });
            console.clear();
            console.log(response)
            break;
        case 401:
            // addToast({type : 'error', message: 'دسترسی غیرمجاز', timer: 3000});
            console.clear();
            break;
        case 404:
            addToast({
                type : 'error',
                message: response.data?.message ?? response.data?.entity?.message ?? 'یافت نشد .',
                timer: 3000,
            });
            console.clear();
            break;
        case 403:
            // addToast({type : 'error', message: 'دسترسی غیر مجاز .', timer: 3000});
            console.clear();
            break;
        default:
            return;
    }
}
export default useErrorHandler;