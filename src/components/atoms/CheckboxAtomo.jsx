import React from 'react'
import { Checkbox } from "@nextui-org/react";
const CheckboxAtomo = ({ data, valor, items }) => {
    return (
        <div>
            {
                data.map((item, index) => (
                    <div key={index}>
                        <input type="checkbox" id={item.id} name={item.name} />
                        <Checkbox defaultSelected size="md" >{item[valor]}</Checkbox>
                    </div>
                ))
            }

        </div>
    )
}

export default CheckboxAtomo
