async function deleteTaskAPI(taskId, handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/task/${taskId}`;
    // const endpoint = `/task/${id}`;
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, { method: "DELETE" });

    const jsonData = await response.json();
    if (!response.ok) {
      const errorMessage = jsonData.message || "Unkonwn Error Occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "unknown Error";
    handleError(errorMessage);
  } finally {
    setLoading(false);
  }
}
export default deleteTaskAPI;
