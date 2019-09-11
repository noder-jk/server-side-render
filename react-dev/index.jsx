import React from 'react';

import {BasicSettings} from 'nodereactor/react';

const fields=
{
    ss_regex:
    {
        title:'User Agent JS Regex', 
        type:'textarea', 
        hint:
        [
            'Separate by new line, without delimiter.',
            'Case insensitive by default.'
        ]
    }
}

const SettingPage=()=>
{
    return <BasicSettings
                title="User Agent JS Regex"
                fields={fields}
                package_name="server-side-render"/>
}

export {SettingPage}