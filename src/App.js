import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  //call another useeffect to make filteredMonsters more efficient
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    //convert the typed string to lowercase
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className="app-title">Monsters App</h1>

      <SearchBox className='monsters-search-box' onChangeHandler={onSearchChange} placeholder='search monsters' />
      <CardList monsters={filteredMonsters} /> 
    </div>
  );
}

/*
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(() => {
        return {monsters: users}
      },
      () => {
        //console.log(this.state);
      }))
  }

  onSearchChange = (event) => {
    //convert the typed string to lowercase
    const searchField = event.target.value.toLocaleLowerCase();
    //setState to rerender and store the filtered monsters
    this.setState(() => {
      return { searchField };
    })
  }

  render() {
    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters App</h1>

        <SearchBox className='monsters-search-box' onChangeHandler={this.onSearchChange} placeholder='search monsters' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
  */

export default App;
