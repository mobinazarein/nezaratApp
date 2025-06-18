import { defineStore } from "pinia";
import { ref } from "vue";

export const useApiStore = defineStore("apiStore", () => {
  const isLoading = ref(false);
  const error = ref(null);

  function setLoading(value) {
    isLoading.value = value;
  }

  function setError(err) {
    error.value = err;
  }

  function clearError() {
    error.value = null;
  }

  return {
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
  };
});
