import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { SearchContext } from '../App';

import axios from 'axios';

function Home() {
	const dispatch = useDispatch();
	const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

	const { searchValue } = React.useContext(SearchContext);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	//убрал стейты заменив все на редакс тулкит
	// const [categoryId, setCategoryId] = React.useState(0);
	// const [currentPage, setCurrentPage] = React.useState(1);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	//первый рендер пицц
	//добавили сортировки и выбор категории в запросе
	React.useEffect(() => {
		setIsLoading(true);

		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		// fetch(
		// )
		// 	.then((res) => res.json())
		// 	.then((arr) => {
		// 		setItems(arr);
		// 		setIsLoading(false);
		// 	});
		axios
			.get(
				`https://64514a17a3221969116010b4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
			)
			.then((res) => {
				setItems(res.data);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

	const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				{/* категории */}
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				{/* сортировка */}
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{/* pizza block */}
				{/*добавляем рендер скелетонов во время загрузки страницы с фейковым массивом из шести скелетонов */}
				{isLoading ? skeletons : pizzas}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
}

export default Home;
