"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LanguageSwitcher() {
    const router = useRouter()
    const [currentLocale, setCurrentLocale] = useState("en")

    const toggleLocale = async () => {
        const newLocale = currentLocale === "en" ? "bn" : "en"
        setCurrentLocale(newLocale)
        document.cookie = `locale=${newLocale}; path=/; max-age=31536000`
        router.refresh()
    }

    return (
        <button
            onClick={toggleLocale}
            aria-label={`Switch to ${currentLocale === "en" ? "Bengali" : "English"}`}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full px-2 py-0 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none w-[60px]"
        >
            <span className="text-base" role="img" aria-hidden="true">
                {currentLocale === "en" ? "🇬🇧" : "🇧🇩"}
            </span>
            <span className="text-xs font-semibold">{currentLocale === "en" ? "EN" : "BN"}</span>
        </button>
    )
}