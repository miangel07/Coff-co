import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import es from "../language/spanish.json";
import en from "../language/ english.json"; 

const i18n = i18next.use(initReactI18next).init({
    lng: "es",  
    interpolation: {
        escapeValue: false,  
    },
    resources: { 
        es: {
            translation: es,
        },
        en: {
            translation: en,
        }
    }
});

export default i18n;
