import React from 'react'
import { formatDateToFullDate } from '../../Utils/HelperFunctions'

type TYPE_DateComponentProps = {
    date: string
}

const DateComponent = (props:TYPE_DateComponentProps) => {
    return (
        <div>{formatDateToFullDate(props.date)}</div>
    )
}

export {DateComponent}