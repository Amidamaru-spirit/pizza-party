import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

function Home() {

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortType: 'rating',
  });

  //первый рендер пицц 
  //добавили сортировки и выбор категории в запросе
  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    fetch(
      `https://64514a17a3221969116010b4.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,)
    .then((res) => res.json())
    .then((arr) => {
      setItems(arr);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">  
      <div className="content__top">
        {/* категории */}
        <Categories 
          value={categoryId} 
          onChangeCategory={(index) => setCategoryId(index)} />
          {/* сортировка */}
          <Sort 
            value={sortType}  
            onChangeSort={(index) => setSortType(index)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* pizza block */}
        {
          //добавляем рендер скелетонов во время загрузки страницы с фейковым массивом из шести скелетонов
          isLoading 
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />) 
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        }
      </div>
    </div>
  );
}

export default Home