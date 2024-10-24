/**
 * loading indicator component
 *
 * loading animation that would popup when the user
 * is being verified in the login
 *
 *@update excluded the loading animation because it
 * did not complete its purpose when authentication errors appeared
 * 
 */
const LoadingIndicator = () => {
    return <div className="loading-container">
        <div className="loader"></div>
    </div>
}

export default LoadingIndicator
