import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const Content = () => {

  // const [name, setName] = useState('Joe')
  // const [count, setCount] = useState(0)

  const [items, setItems] = useState([
      {
        id: 1,
        checked: false,
        item: "Cocoa Covered Almonds Unsalted"
      },
      {
        id: 2,
        checked: false,
        item: "Item 2"
      },
      {
        id: 3,
        checked: false,
        item: "Item 3"
      },
  ])

  // const handleNameChange = () => {
  //     const names = [ 'Bod', 'Kevin', 'Dave'];
  //     const int = Math.floor(Math.random()*3);
  //     setName(names[int])
  // }

  // const handleClick = () => {
  //   setCount(count + 1)
  //   setCount(count + 1)
  //   console.log(count)
  // }
  // const handleClick2 = () => {
  //   console.log(count)
  // }
  // const handleClick3 = (e) => {
  //   console.log(e.target.innerText)
  // }

  const handleCheck = (id) => {
    // console.log(`key: ${id}`)
    const listItems = items.map((item)=> item.id === id ? { ...item, checked: !item.checked } : item );
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    console.log(id)
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems)
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));

  }

  return (
      <main>
        {items.length ? ( 
                <ul>
                    {items.map((item) =>(
                      <li className="item" key={item.id} >
                            <input 
                                type="checkbox"
                                onChange={()=> handleCheck(item.id)}
                                checked={item.checked} 
                            />
                            <label
                                style={(item.checked) ? { textDecoration: 'line-through' } : null }
                                onDoubleClick={()=> handleCheck(item.id)}
                            >{item.item}</label>
                            <FaTrashAlt 
                                role="button" 
                                tabIndex="0" 
                                onClick={()=> handleDelete(item.id)}
                            />
                      </li>
                    ))}
                 </ul>
          ) : (
              <p style={{ marginTop: '2rem' }}>Your list is empty.</p>

              )}
      </main>
  )
}

export default Content