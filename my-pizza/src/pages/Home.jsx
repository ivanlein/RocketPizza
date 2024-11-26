import React from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Sort, { sortOptions } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../Pagination";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slises/filterSlise";
import { fetchPizzas, selectPizzaData } from "../redux/slises/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sort;

  const [show, setShow] = React.useState(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const limit = show === false ? `&limit=4` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        limit,
        currentPage,
      })
    );
  };

  //saving params in link

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortOptions.find((obj) => obj.sort === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage, show]);

  //i made link navigation with 'qs' lib abilities

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, navigate]);

  //i did it with js bcs API i used is bad at filtering

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div className="cart cart--empty">
          <h2>
            Error<span>🥺</span>
          </h2>
          <p>
            Unfortunately, we were unable to obtain
            <br />
            information about available products.
            <br />
            Try again later...
          </p>
          <img
            src="https://gb.ru/blog/wp-content/uploads/2022/11/01-5.jpg.webp"
            alt="ERROR 500"
          />
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        show={show}
        setShow={setShow}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;
