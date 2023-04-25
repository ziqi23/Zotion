import { useState } from "react";
import Tooltip from "./Tooltip";

const HeaderItem = ({props}) => {
    const identifier = props.name
    const [tooltipVisible, setTooltipVisible] = useState(false)
    let text;
    switch (identifier) {
        case ("share"):
            text = "Share or publish to the web"
            break
        case ("comment"):
            text = "View all comments"
            break
        case ("notifications"):
            text = "View all updates"
            break
        case ("favorite"):
            text = "Pin this page in your sidebar"
            break
        case ("more"):
            text = "Style, export, and more..."
            break
        default:
            break
    }
    return (
        <div className={`header-icon-${identifier}`} onMouseEnter={() => setTooltipVisible(true)} onMouseLeave={() => setTooltipVisible(false)}>
            <button>{identifier}</button>
            {tooltipVisible && (
                <Tooltip props={{"text": text, "relativePosition": [0, 50]}}></Tooltip>
            )}
        </div>
    )
}

export default HeaderItem