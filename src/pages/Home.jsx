import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

function Home() {

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  //первый рендер пицц 
  React.useEffect(() => {
    fetch('https://64514a17a3221969116010b4.mockapi.io/items')
    .then((res) => res.json())
    .then((arr) => {
      setItems(arr);
      setIsLoading(false);
    });
  }, []);

  return (
    <>  
      <div className="content__top">
        {/* категории */}
        <Categories />
          {/* сортировка */}
          <Sort />
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
    </>
  );
}

export default Home