import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

function Home() {
	const { searchValue } = React.useContext(SearchContext);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [sortType, setSortType] = React.useState({
		name: 'популярности',
		sortType: 'rating',
	});

	//первый рендер пицц
	//добавили сортировки и выбор категории в запросе
	React.useEffect(() => {
		setIsLoading(true);

		const sortBy = sortType.sortProperty;
		const order = sortType.name.includes('по убыв.') ? 'desc' : 'asc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		fetch(
			`https://64514a17a3221969116010b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		)
			.then((res) => res.json())
			.then((arr) => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items
		.filter((obj) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			}
			return false;
		})
		.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				{/* категории */}
				<Categories value={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
				{/* сортировка */}
				<Sort value={sortType} onChangeSort={(index) => setSortType(index)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{/* pizza block */}
				{/*добавляем рендер скелетонов во время загрузки страницы с фейковым массивом из шести скелетонов */}
				{isLoading ? skeletons : pizzas}
			</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
}

export default Home;
