function HeaderMore(props) {
    
    return (
    <div className="header-more-panel">
        <div className="header-more-panel-header">Style</div>
        <div className="header-more-panel-container">
            <div className="header-more-panel-font-item">
                <div style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Ag</div>
                <div>Default</div>
            </div>
            <div className="header-more-panel-font-item">
                <div style={{fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>Ag</div>
                <div>Serif</div>
            </div>
            <div className="header-more-panel-font-item">
                <div style={{fontFamily: "'Courier New', Courier, monospace"}}>Ag</div>
                <div>Mono</div>
            </div>
        </div>
    </div>
    )
}

export default HeaderMore