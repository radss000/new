// const url = "https://hammadayub34.pagekite.me/"
const url = "http://localhost:8080";
// const herokuUrl = "https://test-minah-6b1a807102f0.herokuapp.com/"
const herokuUrl = "https://768f-154-80-18-104.ngrok-free.app/";

// TODO : resolve the server issue
export async function postToken(token) {
  console.log("Post the data");
  var requestOptions = {
    method: "POST", // headers: {
    //     "Content-Type": "multipart/form-data",
    // },
    body: JSON.stringify(token), // Assuming formData is an object, convert it to JSON string
    redirect: "follow",
  };
  try {
    console.log("here is the token pushed :", JSON.stringify(token));

    const response = await fetch(herokuUrl + "user/login", requestOptions);
    console.log(response);
    const result = await response.text();

    return {
      responseCode: response.status,
      result: result,
    };
  } catch (error) {
    return {
      responseCode: null,
      result: null,
      error: error,
    };
  }
}

export async function updateProfile(formData, issuer) {
  var requestOptions = {
    method: "PUT", // headers: {
    body: formData,
    redirect: "follow",
  };
  try {
    const response = await fetch(herokuUrl + `user/${issuer}`, requestOptions);
    const result = await response.json();

    return {
      responseCode: response.status,
      result: result,
    };
  } catch (error) {
    return {
      responseCode: null,
      result: null,
      error: error,
    };
  }
}

export async function getProjects() {
  var requestOptions = {
    method: "GET", // headers: {
    redirect: "follow",
  };
  try {
    const response = await fetch(herokuUrl + "project", requestOptions);
    const result = await response.json();

    return {
      responseCode: response.status,
      result: result,
    };
  } catch (error) {
    return {
      responseCode: null,
      result: null,
      error: error,
    };
  }
}

export async function deleteProfile(formData) {
  var requestOptions = {
    method: "DELETE", // headers: {
    redirect: "follow",
  };
  try {
    const response = await fetch(
      herokuUrl + `user/delete/${formData}`,
      requestOptions
    );
    const result = await response.text();

    return {
      responseCode: response.status,
      result: result,
    };
  } catch (error) {
    return {
      responseCode: null,
      result: null,
      error: error,
    };
  }
}

export async function postInvestment(investedAmount, userId) {
  const JSONBody = JSON.stringify({
    investAmount: investedAmount,
  });
  var requestOptions = {
    method: "POST", // headers: {
    body: JSONBody,
    headers: {
      "Content-Type": "application/json",
    },

    redirect: "follow",
  };
  try {
    const response = await fetch(
      herokuUrl + `project/investAmount/${userId}`,
      requestOptions
    );
    const result = await response.json();

    return {
      responseCode: response.status,
      result: result,
    };
  } catch (error) {
    return {
      responseCode: null,
      result: null,
      error: error,
    };
  }
}
