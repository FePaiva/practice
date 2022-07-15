import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import SearchItem from './SearchItem';

function App() {

  const API_URL = 'http://localhost:3500/items';

  // using localStorage OR empty array, so the filter can work in case of empty shoppinglist for brand new users.
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);

  // to use the fetch, we remove the localStorage from the state having it as an empty array.
  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState('true')


  // useEffect will run its code when the dependency changes. Info in brackets after the coma.
  useEffect(() => {
    // at load time, we set the items to the shopping list in the local storage. For that to work, need an empty array in the useState and useEffect dependency. Ideal if working with API.
    // setItems(JSON.parse(localStorage.getItem('shoppinglist')))

    // the below saves the local storage inside the useEffect, passing items as current state, and items as dependency inside the brackets.
    // localStorage.setItem('shoppinglist', JSON.stringify(items));

    // Using useEffect to fetch data from db.json
    const fetchItems = async () => {
        try {
          const response = await fetch(API_URL)
          if (!response.ok) throw Error('Somthing failed to fetch')
          const listItems = await response.json();
          // console.log(listItems);
          setItems(listItems)
          setFetchError(null)
        } catch (error) {
          // console.log(error.message)
          setFetchError(error.message);
        } finally {
          setIsLoading(false);
        }
    }
    // since API may not be as fast as a REST API running in our local environment, using setTimeout to simulate the time (2 seconds in this case) the API takes to load the listItems. And add a loading message to the users.
    setTimeout(() => {
        fetchItems()
    }, 2000)

  }, [])

  // transferring the localStorage to the useEffect above. Converting all the setAndSaveItems in other functions to setItems(listItems). We can then remove this entire function.
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
          <main> 
              {isLoading && <p>Loading Items ...</p>}
              {fetchError && <p style={{ color: "red" }} >{`Error: ${fetchError}`}</p> }
              {!fetchError && !isLoading && <Content  
                  items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
                  handleCheck={handleCheck}
                  handleDelete={handleDelete}
              />}             
          </main>
          <Footer 
              length={items.length}
          />
      </div>
    );
}

export default App;
