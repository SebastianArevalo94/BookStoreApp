import React, { Component, useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { BookCard } from "./BookCard";
import {
  GetAllBooks,
  GetAllCategories,
  GetBookByAuthor,
  GetBookByCategory,
  GetBookByName,
} from "../services/Libros.service";
import Detail from "./Detail";
import {
  GetReseniasByBook,
  GetReseniasByBookAndUser,
} from "../services/Resenias.service";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { setUserRedux } from "../redux/userSlice";

export const Home = () => {
  const user = useSelector((store) => store.user.user);
  const [libros, setLibros] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [bookDetail, setBookDetail] = useState([]);
  const [resenias, setResenias] = useState([]);
  const [ownResenia, setOwnResenia] = useState({});
  const [canEdit, setCanEdit] = useState(false);

  const dispatch = useDispatch();

  const handleSearchBookByName = (e) => {
    const bookName = e.target.value;
    if (bookName.length > 0) {
      GetBookByName(bookName).then((resp) => {
        setLibros(resp.data);
      });
    } else {
      GetAllBooks()
        .then((resp) => {
          setLibros(resp.data);
        })
        .catch();
    }
  };

  const handleSearchBookByAuthor = (e) => {
    const authorName = e.target.value;
    if (authorName.length > 0) {
      GetBookByAuthor(authorName).then((resp) => {
        setLibros(resp.data);
      });
    } else {
      GetAllBooks()
        .then((resp) => {
          setLibros(resp.data);
        })
        .catch();
    }
  };

  const handleGetBookByCategory = (e) => {
    const category = e.target.value;

    if (category == 0) {
      GetAllBooks()
        .then((resp) => {
          setLibros(resp.data);
        })
        .catch();
    } else {
      GetBookByCategory(category)
        .then((resp) => {
          setLibros(resp.data);
        })
        .catch();
    }
  };

  const handleOpenDetail = (libro) => {
    setShowDetail(true);
    setBookDetail(libro);
    GetReseniasByBook(libro.id).then((resp) => {
      setResenias(resp.data);
    });
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleUserResenia = () => {
    setCanEdit(true);
    try {
      GetReseniasByBookAndUser(bookDetail.id, user.id).then((resp) => {
        setResenias(resp.data);
      });
    } catch (error) {
      console.log(error);
      GetReseniasByBookAndUser(1, 1).then((resp) => {
        setResenias(resp.data);
      });
    }
  };

  const handleSetTypeAllResenias = () => {
    setCanEdit(false);
    GetReseniasByBook(bookDetail.id).then((resp) => {
      setResenias(resp.data);
    });
  };

  const blockEdit = () => {
    setCanEdit(false);
  };

  useEffect(() => {
    GetAllBooks()
      .then((resp) => {
        setLibros(resp.data);
      })
      .catch();
    GetAllCategories()
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch();
    const token = localStorage.getItem("token");
    if (!user) {
      dispatch(setUserRedux(jwt_decode(token)));
    }
  }, []);

  return (
    <div>
      <Form>
        <Form.Group
          className="d-flex m-4 gap-3 justify-content-center"
          controlId="formBasicEmail"
        >
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control
            className="search-input"
            type="text"
            placeholder="Nombre"
            onChange={handleSearchBookByName}
          />
          <Form.Control
            className="search-input"
            type="email"
            placeholder="Autor"
            onChange={handleSearchBookByAuthor}
          />
          <Form.Select
            className="select1"
            aria-label="Default select example"
            onChange={handleGetBookByCategory}
          >
            <option selected disabled>
              Categoria
            </option>
            <option value="0">Todas</option>
            {categories.map((category) => {
              return <option value={category.id}>{category.nombre}</option>;
            })}
          </Form.Select>
        </Form.Group>
      </Form>
      <Detail
        show={showDetail}
        close={handleCloseDetail}
        infoBook={bookDetail}
        resenias={resenias}
        handleOwnResenias={handleUserResenia}
        handleSetAllResenias={handleSetTypeAllResenias}
        canEdit={canEdit}
      />
      <div className="book-list">
        {libros.map((libro) => {
          return (
            <BookCard
              infoBook={libro}
              open={() => {
                setCanEdit(false)
                handleOpenDetail(libro);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
