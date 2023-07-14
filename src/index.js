const { useEffect, useState, useRef } = React;

const Accordion = ({
	title,
	titleStyle,
	itemStyle,
	children,
	...otherProps
}) => {
	const [show, setShow] = useState(false);
	const backgroundColor = "orange";
	const fontColor = "gray";

	// Default styles
	const defaultTitleStyles = {
		margin: "0",
		padding: ".5rem",
		backgroundColor,
		color: fontColor,
		cursor: "pointer",
	};
	const getDefaultItemStyles = (show) => ({
		height: show ? "fit-content" : "0px",
		border: show ? `2px solid ${backgroundColor}` : "0px",
		overflowY: "hidden",
		transition: "height 0.2s linear",
		margin: "0",
		padding: show ? "1rem" : 0,
		color: fontColor,
	});

	return (
		<div style={{ maxWidth: "25%", marginBottom: "1px" }} {...otherProps}>
			<h3
				onClick={() => setShow(!show)}
				style={{ ...defaultTitleStyles, ...titleStyle }}
			>
				{title}
			</h3>
			<div style={{ ...getDefaultItemStyles(show), ...itemStyle }}>
				{children}
			</div>
		</div>
	);
};

Accordion.propTypes = {
	item: PropTypes.shape({
		name: PropTypes.string.isRequired,
		username: PropTypes.string,
		website: PropTypes.string,
		email: PropTypes.string,
		phone: PropTypes.string,
	}),
};

const Layout = () => {
	const [posts, setPosts] = useState([]);
	const [inputValue, setInputValue] = useState(0);
	const inputRef = useRef(null);
	const baseUrl =
		"https://jsonplaceholder.typicode.com/photos?_start=0&_limit=";

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	const handleInputChange = (e) => {
		const value = e.target.value;
		if (value > 10) return;
		setInputValue(value);
	};

	const handleBtnClick = async () => {
		if (inputValue === 0) return;
		const response = await fetch(baseUrl + inputValue);
		const data = await response.json();
		setPosts(data);
	};

	return (
		<>
			<label htmlFor="no-items-input" style={{ display: "block" }}>
				Enter the number of users you would like to see between 1-10
			</label>
			<input
				id="no-items-input"
				type="number"
				max={10}
				ref={inputRef}
				// placeholder="must be equal or less than 10"
				onChange={handleInputChange}
				value={inputValue}
			/>
			<button onClick={handleBtnClick}>go</button>
			{posts.map((item) => (
				<Accordion
					title={item.title}
					key={item.id}
					className="accordion"
				>
					<img src={item.thumbnailUrl} />
				</Accordion>
			))}
		</>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(<Layout />);
