import React from 'react';
import Header from './Header';
import Search from './Search';
import StatusBar from './StatusBar';
import List from './List';
import Footer from './Footer';


class App extends React.Component {

	state= {
		todoData: [
			{ id: 0, title: 'Выпить кофе', important: false, done: false },
			{ id: 1, title: 'Сделать React приложение', important: true, done: false },
			{ id: 2, title: 'Позавтракать', important: false, done: true },
		],
		term: '',
		status: 'all',//all, active, done
	}

	onToggleImportant = (id) => {

		this.setState((state) => {
			//1. Находим индекс задачи в массиве todoData
			const index = state.todoData.findIndex((el) => {return el.id === id})

			//2. Сформировать новый {}, но с новым значением important
			const oldItem = state.todoData[index]; 
			const newItem = {...oldItem, important: !oldItem.important};

			//3. Формируем новый [] toDos, внедряя в него новый  {} с задачей на то же место, где был предыдущий
			const part1 = state.todoData.slice(0, index);
			const part2 = state.todoData.slice(index + 1);
			const newArray = [...part1, newItem, ...part2];

			return{
				todoData: newArray,
			}
		})
	}

	onToggleDone = (id) => {
		this.setState((state) => {
			const index = state.todoData.findIndex((el) => {return el.id === id})

			const oldItem = state.todoData[index]; 
			const newItem = {...oldItem, important:false, done: !oldItem.done};

			const part1 = state.todoData.slice(0, index);
			const part2 = state.todoData.slice(index + 1);
			const newArray = [...part1, newItem, ...part2];

			return{
				todoData: newArray,
			}
		})
	}

	deleteItem = (id) => {
		console.log('Delete', id);

		this.setState((state) => {
			const index = state.todoData.findIndex((el) => {return el.id === id})

			const part1 = state.todoData.slice(0, index);
			const part2 = state.todoData.slice(index + 1);
			const newArray = [...part1, ...part2];

			return{
				todoData: newArray,
			}
		})


	}

	addItem = (title) => {
		this.setState((state) => {
			const ID = state.todoData[state.todoData.length - 1]['id'] + 1;
			console.log(ID);
			const newItem = {id: ID, title: title, important: false, done: false };
			const newArray = [...state.todoData, newItem];
			return{
				todoData: newArray,
			}
		})

	}

	search = (items, term) => {
		if(term.trim().length === 0){
			return items;
		}

		return items.filter((item) => {
			if(item.title.toLowerCase().indexOf(term.toLowerCase().trim()) > -1){
				return true;
			}
		})
	}

	changeTerm = (term) => {
		this.setState({
			term:term,
		})
	}

	changeStatus = (status) => {
		this.setState({status: status})
	}

	filterByStatus = (items, status) => {
		switch(status){
			case 'all':
				return items;
			case 'active':
				return items.filter((item) => {return item.done === false});
			case 'done':
				return items.filter((item) => {return item.done === true});
			default:
				return items;
		}
	}

	render() {

		const filteredBySearchItems = this.search(this.state.todoData, this.state.term);
		const filteredByStatusItems = this.filterByStatus(filteredBySearchItems,this.state.status)

		return (
			<div>
				<Header />
				<div className="search">
					<Search changeTerm={this.changeTerm} term={this.state.term}/>
					<StatusBar changeStatus={this.changeStatus} status={this.state.status}/>
				</div>
				<List 
					data={filteredByStatusItems} 
					onToggleImportant={this.onToggleImportant} 
					onToggleDone={this.onToggleDone}
					deleteItem ={this.deleteItem}/>
				<Footer addItem ={this.addItem}/>
			</div>
		);
	}
}

export default App;
