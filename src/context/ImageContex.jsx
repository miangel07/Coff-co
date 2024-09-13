import { useEffect, createContext, useState } from "react";
export const ImageContex = createContext()

export const ImageContexProvider = ({ children }) => {
    const [Image64, setImage64] = useState(null)
    const value = {
        setImage64,
        Image64,
    }

    return (
        <ImageContex.Provider value={value}>
            {children}
        </ImageContex.Provider>
    )
}