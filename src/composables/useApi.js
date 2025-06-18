// useApp.js
import { ref } from "vue";
import apiClient from "../plugins/axios";
// import { useErrorHandler } from "./useErrorHandler";
import { useApiStore } from "../stores/apiStores";
import useToast from "../composables/useToast";
export function useApi() {
  // const { handleError } = useErrorHandler();
  const apiStore = useApiStore();

  const data = ref(null);
    const {addToast} = useToast();

  const makeRequest = async (method, url, payload = null) => {
    try {
      apiStore.setLoading(true);
      console.log("Loading set to true");
      const response = await apiClient[method](url, payload);
      data.value = response.data;
 console.log('resssssssss',response,method,url);
 if( response.data.message!==''){
      if (response.data.is_success==true ) {
      addToast({type: 'success', message: response.data.message[0], timer : 3000})
      console.log(response.data.message);
      
  }else{
     addToast({type: 'error', message: response.data.message, timer : 3000})
  }
}
      return response.data;
    } catch (error) {
      // handleError(error);
      console.log(error);
      
      throw error;
    } finally {

      apiStore.setLoading(false);
      console.log("Loading set to false");
    }
  };

  const get = (url) => makeRequest("get", url);
  const post = (url, payload) => makeRequest("post", url, payload);
  const put = (url, payload) => makeRequest("put", url, payload);
  const del = (url) => makeRequest("delete", url);

  return {
    data,
    get,
    post,
    put,
    delete: del,
    error: apiStore.error,
    isLoading: apiStore.isLoading,
  };
}
