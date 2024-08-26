import { useState } from 'react'
import { Switch } from "@nextui-org/react";

const Switch = ({ isSelected }) => {
    const [isSelected, setIsSelected] = useState(true);
    return (
        <div className="flex flex-col gap-2">
            <Switch isSelected={isSelected} onValueChange={setIsSelected}>

            </Switch>

        </div>
    )
}

export default Switch
