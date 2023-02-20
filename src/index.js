const { useEffect, useState, useRef } = React

const Accordion = ({item, titleStyle, itemStyle, ...otherProps}) => {
  const [show, setShow] = useState(false)
  
  // Default styles
  const defaultTitleStyles = {padding: '2px', margin: '0', backgroundColor: 'gray'}
  const getDefaultItemStyles = show => ({ 
    height: show ? '80px' : '0px', 
    overflowY: 'hidden', 
    transition: 'height 0.2s linear' 
  })
  
  return (
    <div {...otherProps}>
      <h1 
        onClick={() => setShow(!show)}
        style={{...defaultTitleStyles, ...titleStyle}}>
          {item.name}
      </h1>
      <div style={{...getDefaultItemStyles(show), ...itemStyle}}>
        <li>{item.username}</li>
        <li>{item.website}</li>
        <li>{item.email}</li>
        <li>{item.phone}</li>
      </div>
    </div>
  )
}

Accordion.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  })
}


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
      { users.map(item => <Accordion item={item} key={item.id} titleStyle={{backgroundColor: 'blue'}} className='accordion'/>) }
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Layout />);
