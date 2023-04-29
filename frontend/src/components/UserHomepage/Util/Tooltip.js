import { useEffect, useRef } from "react";

const Tooltip = ({props}) => {
    // let ele;

    // useEffect(()=>{
    //     if (!ele) {
    //         ele = document.getElementsByClassName("tooltip")[0]
    //         console.log("?")
    //     }
    // }, [ele])

    // console.log(ele)
    // const inputRef = useRef(null)

    // console.log(inputRef)
    // let shiftDistance;
    // if (inputRef) {
    //     const windowWidth = window.innerWidth
        // const eleXLocation = inputRef.getBoundingClientRect().x
        // // console.log(windowWidth,eleXLocation)
        // if (windowWidth - eleXLocation < 300) {
        //     // console.log("here")
        //     shiftDistance = 300 - (windowWidth - eleXLocation)
        //     // console.log(shiftDistance)
        // }
    // }
    // console.log(window.innerWidth)

    let top, left;
    if (props.relativePosition) {
        left = props.relativePosition[0] //|| shiftDistance
        top = props.relativePosition[1]
    }

    return (
        <div className="tooltip" style={{top, left}}>
            {props.text}
        </div>
    )
}

export default Tooltip