import React from 'react'
import { getNoOfDays } from '../../Utils/HelperFunctions'

interface TYPE_DateComponentProps {
    notificationDate:string
}

// Shows no of days ago
const DateComponent = (props: TYPE_DateComponentProps) =>{
    // Get no of days ago
    const noOfDays = getNoOfDays(props.notificationDate)

    return (
        <span className="text-xs text-primary_font_color font-dm_sans">
            {noOfDays === 0 ? "Today" : noOfDays === 1 ? "Yesterday" : `${noOfDays} days ago`}
        </span>
    )
}

export { DateComponent }