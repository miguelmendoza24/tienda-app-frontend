export const apiUrl = window.location.origin;

export const apiRequest = async ({
  endpoint,
  method = "GET",
  token = null,
  body = null,
}) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${apiUrl}/${endpoint}`, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log(response);
    console.log(errorData);
    
    throw new Error(errorData.message || "Error en la solicitud");
  }

  return response.json();
};
