import React from "react";
import SideBarInputs from "./SideBarInputs";

type Type_SidebarState = {
    field: string;
    color: string;
    data: any;
    schema: any;
    index: number;
};

type Type_DetailsProps = {
    state: Type_SidebarState;
    setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const DataForm = (props: Type_DetailsProps) => {
    console.log(props.state.schema, "**");

    const [tabs, setTabs] = React.useState({});

    React.useEffect(() => {
        let tempTabData: any = {};
        Object.keys(props.state.schema).forEach((key) => {
        tempTabData[props.state.schema[key]] = [];
        });
        Object.keys(props.state.schema).forEach((key) => {
        tempTabData[props.state.schema[key]].push(key);
        });
        setTabs(tempTabData);
    }, [props.state.schema]);

    console.log(tabs, "**tabs");

    return (
        <div className="h-[70%] border-y border-primary_font_color text-white p-2 grow">
        {Object.keys(props.formData).map((item: any) =>
            item !== "id" && props.state.schema[item] !== "title" ? (
            <SideBarInputs
                key={item}
                type={props.state.schema[item]}
                defaultValue={props.formData[item]}
                label={item}
                fieldData={props.formData}
                setFunction={props.setFormData}
            />
            ) : (
            ""
            )
        )}
        </div>
    );
};

export { DataForm };
