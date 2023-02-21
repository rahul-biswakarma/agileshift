import React, { ChangeEvent, useState } from 'react';


const OrganizationList: React.FunctionComponent = () => {
    const [jsonFileContent, setFileContent] = useState<any>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const contents = event.target?.result as string;
            setFileContent(contents);
          };
          reader.readAsText(file);
        }
    };


    console.log(jsonFileContent);

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
        </div>
    )
}

export default OrganizationList