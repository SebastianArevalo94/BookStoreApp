export const LoginAPI = async (dataLogin) => {
  try {
    const resp = await fetch("http://localhost:5289/Users/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetUserById = async (user) => {
  try {
    const resp = await fetch(
      `http://localhost:5289/Users/GetUserById/${user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const RegisterAPI = async (user) => {
  try {
    const resp = await fetch(`http://localhost:5289/Users/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};