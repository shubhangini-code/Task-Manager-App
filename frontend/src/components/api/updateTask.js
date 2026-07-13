async function updateTaskAPI(
  values,
  taskId,
  handleResponse,
  handleError,
  setLoading,
) {
  setLoading(false);
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/task/${taskId}`;
    // const endpoint = `/task/${id}`;
    const url = `${baseUrl}${endpoint}`;
    const requestBody = JSON.stringify({
      // title: values.taskDescription,
      title: values.taskTitle,
      description: values.taskDescription,
      due_date: values.taskDueDate?.toISOString(),
    });
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: requestBody,
    });
    //handle incoming data
    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "Unknown Error Occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "unknown Error";
    // handleError(new Error(errorMessage));
    handleError(errorMessage);
  } finally {
    setLoading(false);
  }
}
export default updateTaskAPI;
