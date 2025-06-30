import { useNavigate } from "react-router-dom"

const NewContentNotification = ({ visible, onClose }) => {
    const navigate = useNavigate()

    if (!visible) return null

    const handleNavigate = () => {
        navigate('/blogs')
        onClose()
    }

    return (
        <div className="newBlogNotificationDiv">
            <span className="newBlogNotificationText">Uusi blogi saatavilla</span>
            <button className="btn btn-primary" onClick={() => handleNavigate()} style={{ marginLeft: '10px' }}>Lue</button>
            <button className="btn btn-primary" onClick={onClose} style={{ marginLeft: '10px' }}>Sulje</button>
        </div>
    )
}

export default NewContentNotification