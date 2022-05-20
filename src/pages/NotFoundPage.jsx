export const NotFoundPage = () => {
    function handleClick() {
        window.location.href = "/login";
    }

    return(
        <div>
            <div className="notfoundPage">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Oops! This Page Could Not Be Found</h2>
                    <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
                    <button onClick={handleClick}>Go To Homepage</button>
                </div>
            </div>
        </div>
    )
}
