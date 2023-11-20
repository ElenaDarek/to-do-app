function Search(props) {
    return (		
			<input  
				onChange={(e)=>{props.changeTerm(e.target.value)}}
				value={props.term}
				type="text" 
				placeholder="введите фразу для поиска" 
				className="form-control me-2" 
			/>
	);
}

export default Search;