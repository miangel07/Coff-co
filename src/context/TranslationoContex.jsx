import { useEffect, createContext, useState } from "react";
import i18n from "../utils/Idioms";
export const TraslateContex = createContext()

export const TranslateProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem("lenguague") || "es"
    })

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem("lenguague", language)
    }, [language])
    const changeLanguage = (lang) => {
        setLanguage(lang)
    }
    const value = {
        changeLanguage,
        language,
    }

    return (
        <TraslateContex.Provider value={value}>
            {children}
        </TraslateContex.Provider>
    )
}