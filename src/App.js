import React from "react";

import './scss/app.scss';

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

function App() {
  return (
    <div class="wrapper">
      {/* header */}
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            {/* categories */}
            <Categories />
            {/* sort */}
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {/* pizza block */}
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Мексиканская" price={500} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
