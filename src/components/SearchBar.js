import "../css/Dashboard.css"
import { useState } from 'react';

function SearchBar({ client, refreshList }) {
	const [searchFilters, changeSearchFilters] = useState(client?.getFilters() || {})

	function handleFilterChange(e) {
		function updateFilters(searchFilters) {
			const newFilters = { ...searchFilters, [e.target.name]: e.target.value };
			if (!e.target.value) delete (newFilters[e.target.name]);
			return newFilters;
		}
		client.setFilters(updateFilters(searchFilters));
		changeSearchFilters(updateFilters);
		refreshList();
	}

	return (
		<div className="my-search-bar">
			<input name="title" value={searchFilters.title || ''} onChange={handleFilterChange} placeholder="Event Title" className="me-3" />
			<input name="location" value={searchFilters.location || ''} onChange={handleFilterChange} placeholder="Event Location" />
		</div>
	)
}

export default SearchBar