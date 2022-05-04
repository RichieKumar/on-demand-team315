import React, {useState} from 'react'


const SearchBar = () => {
 const [searchInput, setSearchInput] = useState("");
 const countries = [
  { name: "Annette", continent: "annette@gmail.com" },
  { name: "Richie", continent: "richie@gmail.com" },
  { name: "Carter", continent: "carter@gmail.com" },
  { name: "John", continent: "john@gmail.com" },
  { name: "Sam", continent: "sam@gmail.com" },
  { name: "Ashley", continent: "ashley@gmail.com" },
];
const handleChange = (e) => {
  e.preventDefault();
  setSearchInput(e.target.value);
};
if (searchInput.length > 0) {
    countries.filter((country) => {
    return country.name.match(searchInput);
});
}
return (<div>
<input
   type="search"
   placeholder="Search here"
   onChange={handleChange}
   value={searchInput} />
<table>
  <tr>
    <th>Country</th>
    <th>Continent</th>  
  </tr>
{countries.map((country, index) => {
<div>
  <tr>
    <td>{country.name}</td>
    <td>{country.continent}</td>
  </tr>
</div>
})}
</table>
</div>
)};
export default SearchBar;