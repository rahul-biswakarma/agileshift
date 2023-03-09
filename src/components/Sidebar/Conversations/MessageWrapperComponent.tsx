import React, { useEffect } from 'react';
import { getNoOfDays } from '../../../Utils/HelperFunctions';
import { MessageComponent } from './MessageComponent';

interface TYPE_MessageWrapperComponentProps {
    index:number,
    day:string,
    chat: TYPE_MESSAGE[]
}

const MessageWrapperComponent =({index, day, chat}:TYPE_MessageWrapperComponentProps) => {
    const [daysCount, setDaysCount] = React.useState<number>()

    const getDaysCount = async (day:string) => {
        const noOfDays = await getNoOfDays(day)
        setDaysCount(noOfDays)
        console.log(noOfDays);
        
    }

    useEffect(() => {
        getDaysCount(day)
    }, [day])

    return (
        <div
            className="w-full"
        >
            <section 
                className="flex justify-between items-center gap-2 w-full text-[10px]"
            >
                <span 
                    className="border border-[#444444] flex flex-1 h-0 w-full"
                >
                </span>
                <span 
                    className="p-2"
                >
                    {daysCount===0 ? "Today" : (daysCount===1 ? "Yesterday" : day)}
                </span>
                <span 
                    className="border border-[#444444] flex flex-1 h-0 w-full"
                >
                </span>
            </section>
            <section 
                className="flex flex-col gap-3"
            >
                {chat.map((message: any, index: number) => {
                    return (
                        <MessageComponent
                            key={index}
                            message = {message}
                        />
                    );
                })}
            </section>
        </div>
    )
}

export { MessageWrapperComponent }