import ItemList from './ItemList';

const Content = ({ items, handleCheck, handleDelete }) => {

  // const [name, setName] = useState('Joe')
  // const [count, setCount] = useState(0)



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

  

  return (
      <main>
        {items.length ? ( 
               <ItemList 
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
          ) : (
              <p style={{ marginTop: '2rem' }}>Your list is empty.</p>

          )}
      </main>
  )
}

export default Content