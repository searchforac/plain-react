const { useEffect, useState, useRef } = React;

const Accordion = ({item}) => {
  const [show, setShow] = useState(false)
  return (
    <div>
      <h1 onClick={() => setShow(!show)} style={{padding: '2px', margin: '0', backgroundColor: 'gray'}}>{item.name}</h1>
      <div style={{height: show ? '80px' : '0px', overflowY: 'hidden', transition: 'height 0.2s linear'}}>
        <li>{item.username}</li>
        <li>{item.website}</li>
        <li>{item.email}</li>
        <li>{item.phone}</li>
      </div>
    </div>
  )
}

// const Accordion = ({items}) => {
//   return (
//     items.map(item => <Panel item={item} key={item.id}/>)
//   )
// }

const Layout = () => {
  const [users, setUsers] = useState([])
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleBtnClick = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    setUsers(data)
  }

  return (
    <>
      <h3>Enter the number of users you would like to see</h3>
      <input 
        type="number" 
        max={10}
        ref={inputRef} 
        placeholder="must be equal or less than 10"
        onChange={handleInputChange}
        value={inputValue}
      />
      <button onClick={handleBtnClick}>go</button>
      { users.map(item => <Accordion item={item}/>) }
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Layout />);
