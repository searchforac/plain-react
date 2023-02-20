const { useEffect, useState, useRef } = React

const Accordion = ({title, titleStyle, itemStyle, children, ...otherProps}) => {
  const [show, setShow] = useState(false)
  const backgroundColor = '#DCC7AA';
  const fontColor = '#6B7A8F'
  
  // Default styles
  const defaultTitleStyles = {margin: '0', padding: '.5rem', backgroundColor, color: fontColor}
  const getDefaultItemStyles = show => ({ 
    height: show ? 'fit-content' : '0px', 
    border: show ? `2px solid ${backgroundColor}` : '0px', 
    overflowY: 'hidden', 
    transition: 'height 0.2s linear',
    margin: '0',
    color: fontColor,
  })
  
  return (
    <div style={{maxWidth: '25%', marginBottom: '1px'}} {...otherProps} >
      <h3 
        onClick={() => setShow(!show)}
        style={{...defaultTitleStyles, ...titleStyle}}>
          {title}
      </h3>
      <div style={{...getDefaultItemStyles(show), ...itemStyle}}>
        <div style={{padding: '.5rem'}}>
          {children}
        </div>
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
  const [posts, setPosts] = useState([])
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleBtnClick = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    setPosts(data)
  }

  useEffect(() => {
    const doit = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    setPosts(data)
    }

    doit()

  }, )

  return (
    <>
      <label htmlFor="no-items-input" style={{display: 'block'}}>Enter the number of users you would like to see</label>
      <input
        id="no-items-input"
        type="number" 
        max={10}
        ref={inputRef} 
        placeholder="must be equal or less than 10"
        onChange={handleInputChange}
        value={inputValue}
      />
      <button onClick={handleBtnClick}>go</button>
      { posts.map(item =>
        <Accordion title={item.title} key={item.id} className='accordion'>
          <p>{item.body}</p>
        </Accordion>
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Layout />);
