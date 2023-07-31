export const GetReseniasByBook = async (id) => {
  try {
    const resp = await fetch(
      `http://localhost:5289/Resenias/GetReseniasByBook/${id}`,
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

export const GetReseniasByBookAndUser = async (book, user) => {
  try {
    const resp = await fetch(
      `http://localhost:5289/Resenias/GetReseniasByBookAndUser/${book}/${user}`,
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

export const CreateResenia = async (resenia) => {
  try {
    const resp = await fetch(
      `http://localhost:5289/Resenias/CreateResenia`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resenia),
      }
    );
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetReseniaById = async (resenia) => {
  try {
    const resp = await fetch(
      `http://localhost:5289/Resenias/GetReseniaById/${resenia}`,
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

export const DeleteResenia = async (resenia) => {
  try {
    const resp = await fetch(
      `http://localhost:5289/Resenias/DeleteResenia/${resenia}`,
      {
        method: "DELETE",
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