
const Tooltip = ({props}) => {
    let top, left;
    if (props.relativePosition) {
        left = props.relativePosition[0]
        top = props.relativePosition[1]
    }
    console.log(left, top)
    return (
        <div className="tooltip" style={{top, left}}>
            {props.text}
        </div>
    )
}

export default Tooltip