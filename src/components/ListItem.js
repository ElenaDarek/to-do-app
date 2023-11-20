import React from 'react';

class ListItem extends React.Component {

	// Метод для изменения свойства important в состоянии компонента
	// onImportantClick = () => {
	// 	this.setState((state) => {
	// 		return {
	// 			important: !state.important
	// 		}
	// 	})
	// }

	// onTitleClick = () => {
	// 	this.setState((state) => {
	// 		return {
	// 			important: false,
	// 			done: !state.done
	// 		}
	// 	})
	// }

	render() {
		let classNames = 'todo-item';

		if (this.props.task.important) {
			classNames += ' important';
		}

		if (this.props.task.done) {
			classNames += ' done';
		}

		return (
			<li className={classNames}>
				<span onClick={()=>{this.props.onToggleDone(this.props.task.id)}} className="todo-item-text">{this.props.task.title}</span>
				<div className="btn-group">
					<button 
						onClick={() => {this.props.onToggleImportant(this.props.task.id)}} 
						role="button" 
						className="btn btn-outline-dark btn-sm">
							Важное
					</button>
					<button 
						onClick={() => {this.props.deleteItem(this.props.task.id)}}  
						role="button" 
						className="btn btn-outline-danger btn-sm">
						Удалить
					</button>
				</div>
			</li>
		);
	}
}


export default ListItem;
