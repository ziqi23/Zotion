import div from "../../../assets/div.png"
import h1 from "../../../assets/h1.png"
import h2 from "../../../assets/h2.png"
import h3 from "../../../assets/h3.png"
import ol from "../../../assets/ol.png"
import ul from "../../../assets/ul.png"



const BlockOptionsToolbar = ({blockOption}) => {
    function handleClick(e) {
        switch (e.currentTarget.className) {
            case ('text-option-div'):
                blockOption('div')
                break
            case ('text-option-h1'):
                blockOption('h1')
                break
            case ('text-option-h2'):
                blockOption('h2')
                break
            case ('text-option-h3'):
                blockOption('h3')
                break
            case ('text-option-ul'):
                blockOption('ul')
                break
            case ('text-option-ol'):
                blockOption('ol')
                break   
        }
    }
    return (
        <>
            <div className="text-option-div" onClick={handleClick}>
                <div className="text-option-img-block">
                    <img src={`${div}`}></img>
                </div>
                <div className="text-option-description">
                    <div className="text-option-short-description">Text</div>
                    <div className="text-option-long-description">Just start writing with plain text.</div>
                </div>
            </div>
            <div className="text-option-h1" onClick={handleClick}>
                <div className="text-option-img-block">
                    <img src={`${h1}`}></img>
                </div>
                <div className="text-option-description">
                    <div className="text-option-short-description">Heading 1</div>
                    <div className="text-option-long-description">Big section heading.</div>
                </div>
            </div>
            <div className="text-option-h2" onClick={handleClick}>
                <div className="text-option-img-block">
                    <img src={`${h2}`}></img>
                </div>
                <div className="text-option-description">
                    <div className="text-option-short-description">Heading 2</div>
                    <div className="text-option-long-description">Medium section heading.</div>
                </div>
            </div>
            <div className="text-option-h3" onClick={handleClick}>
                <div className="text-option-img-block">
                    <img src={`${h3}`}></img>
                </div>
                <div className="text-option-description">
                    <div className="text-option-short-description">Heading 3</div>
                    <div className="text-option-long-description">Small section heading.</div>
                </div>
            </div>
            <div className="text-option-ul" onClick={handleClick}>
                <div className="text-option-img-block">
                    <img src={`${ul}`}></img>
                </div>
                <div className="text-option-description">
                    <div className="text-option-short-description">Bulleted list</div>
                    <div className="text-option-long-description">Create a simple bulleted list.</div>
                </div>
            </div>
            <div className="text-option-ol" onClick={handleClick}>
                <div className="text-option-img-block">
                    <img src={`${ol}`}></img>
                </div>
                <div className="text-option-description">
                    <div className="text-option-short-description">Numbered list</div>
                    <div className="text-option-long-description">Create a list with numbering.</div>
                </div>
            </div>
        </>
    )
}

export default BlockOptionsToolbar