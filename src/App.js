import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

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
        <SearchBox className='search-box' onChangeHandler={this.onSearchChange} placeholder='search monsters' />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
