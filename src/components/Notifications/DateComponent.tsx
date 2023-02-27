import React from 'react'

interface TYPE_DateComponentProps {
    daysAgo : number
}

const DateComponent = (props: TYPE_DateComponentProps) =>{
    return (
        <span className="text-xs text-primary_font_color">
            {props.daysAgo === 0 ? "Today" : props.daysAgo === 1 ? "Yesterday" : `${props.daysAgo} days ago`}
        </span>
    )
}

export { DateComponent }