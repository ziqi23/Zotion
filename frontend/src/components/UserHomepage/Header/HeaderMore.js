function HeaderMore(props) {
    function handleClick(e) {
        e.preventDefault()
        let header = document.getElementsByClassName('main-title-text')[0]
        let content = document.getElementById('user-homepage-main-textarea')
        header.style.fontFamily = e.currentTarget.firstChild.style.fontFamily
        content.style.fontFamily = e.currentTarget.firstChild.style.fontFamily
    }

    return (
    <div className="header-more-panel">
        <div className="header-more-panel-header">Style</div>
        <div className="header-more-panel-container">
            <div className="header-more-panel-font-item" onClick={handleClick}>
                <div style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Ag</div>
                <div>Default</div>
            </div>
            <div className="header-more-panel-font-item" onClick={handleClick}>
                <div style={{fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Ag</div>
                <div>Serif</div>
            </div>
            <div className="header-more-panel-font-item" onClick={handleClick}>
                <div style={{fontFamily: "'Courier New', Courier, monospace"}}>Ag</div>
                <div>Mono</div>
            </div>
        </div>
    </div>
    )
}

export default HeaderMore