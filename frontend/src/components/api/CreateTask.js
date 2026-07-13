async function createTaskAPI(values, handleResponse, handleErrors, setLoading) {
  setLoading(true);

  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/task";

    const url = `${baseUrl}${endpoint}`;
    console.log(url);

    const requestBody = JSON.stringify({
      // title: values.taskTile,
      // description: values.taskDescription,
      // due_date: values.taskDueDtae?.toISOString(),
      title: values.title,
      description: values.description,
      due_date: values.due_date,
    });
    console.log("POST URL:", url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "Unknown Error occured";
      throw new Error(errorMessage);
    }
    handleResponse(jsonData);
  } catch (error) {
    handleErrors(error.message);
  } finally {
    setLoading(false);
  }
}

export default createTaskAPI;
