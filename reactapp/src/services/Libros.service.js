export const GetAllBooks = async () => {
  try {
    const resp = await fetch("http://localhost:5289/Libros/GetAllBooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetBookByName = async (name) => {
  try {
    const resp = await fetch(`http://localhost:5289/Libros/GetBookByName/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetBookByAuthor = async (author) => {
  try {
    const resp = await fetch(`http://localhost:5289/Libros/GetBookByAuthor/${author}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetBookByCategory = async (category) => {
  try {
    const resp = await fetch(`http://localhost:5289/Libros/GetBookByCategory/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const GetAllCategories = async () => {
  try {
    const resp = await fetch(`http://localhost:5289/Categories/GetAllCategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};