import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import SearchItem from './SearchItem';

function App() {

  // using localStorage OR empty array, so the filter can work in case of empty shoppinglist for brand new users.
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')



  // useEffect will run its code when the dependency changes. Info in brackets after the coma.
  useEffect(() => {
    // at load time, we set the items to the shopping list in the local storage. For that to work, need an empty array in the useState and useEffect dependency. Ideal if working with API.
    // setItems(JSON.parse(localStorage.getItem('shoppinglist')))

    // the below saves the local storage inside the useEffect, passing items as current state
    localStorage.setItem('shoppinglist', JSON.stringify(items));


  }, [items])

  // transferring the localStorageto the useEffect above. Converting all the setAndSaveItems in other functions to setItems(listItems). We can then remove this entire function.
  // const setAndSaveItems = (newItems) => {
  //   setItems(newItems);
  //   localStorage.setItem('shoppinglist', JSON.stringify(newItems));

  // }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = {
      id,
      checked: false,
      item
    }
    const listItems = [...items, myNewItem];
    // changing to setItmes(listItems)
    // setAndSaveItems(listItems);
    setItems(listItems)
  }

  const handleCheck = (id) => {
    // console.log(`key: ${id}`)
    const listItems = items.map((item)=> item.id === id ? { ...item, checked: !item.checked } : item );
    // changing to setItmes(listItems)
    // setAndSaveItems(listItems);
    setItems(listItems)
  };

  const handleDelete = (id) => {
    // console.log(id)
    const listItems = items.filter((item) => item.id !== id);
    // changing to setItmes(listItems)
    // setAndSaveItems(listItems);
    setItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;

    // add item function
    addItem(newItem);
    setNewItem('')
    // console.log(newItem)
  }
    return (
      <div className="App">
          <Header title="Grocery List" />
          <AddItem 
              newItem={newItem}
              setNewItem={setNewItem}  
              handleSubmit={handleSubmit}  
          />
          <SearchItem 
              search={search}
              setSearch={setSearch}
          />
          <Content  
              items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
          />
          <Footer 
              length={items.length}
          />
      </div>
    );
}

export default App;
