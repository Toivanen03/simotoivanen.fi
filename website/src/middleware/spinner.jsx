const Spinner = ({ text }) => {
    return (
        <div className="loader-container flex-column">
            <span className="loader" />
            <span className="text-white mt-5">{text}</span>
        </div>
    )
}

export default Spinner