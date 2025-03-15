const apiUrl = "https://api.mymemory.translated.net/get";

const languages = {
    "en": "English",
    "uz": "Uzbek",
    "ru": "Russian",
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "zh": "Chinese",
    "ar": "Arabic"
};

// Заполняем списки языков
document.addEventListener("DOMContentLoaded", () => {
    const inputLang = document.getElementById("inputLang");
    const outputLang = document.getElementById("outputLang");

    Object.entries(languages).forEach(([code, name]) => {
        inputLang.innerHTML += `<option value="${code}">${name}</option>`;
        outputLang.innerHTML += `<option value="${code}">${name}</option>`;
    });
});

// Функция перевода
document.getElementById("translateBtn").addEventListener("click", async () => {
    const text = document.getElementById("inputText").value;
    const fromLang = document.getElementById("inputLang").value;
    const toLang = document.getElementById("outputLang").value;

    if (!text) return;

    try {
        const response = await fetch(`${apiUrl}?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`);
        const data = await response.json();
        document.getElementById("outputText").value = data.responseData.translatedText;
    } catch (error) {
        console.error("Ошибка при переводе:", error);
    }
});

function speakText(text, lang) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const langMap = {
        "en": "en-US",
        "uz": "uz-UZ",
        "ru": "ru-RU",
        "fr": "fr-FR",
        "de": "de-DE",
        "es": "es-ES",
        "zh": "zh-CN",
        "ar": "ar-SA"
    };

    utterance.lang = langMap[lang] || "en-US";
    speechSynthesis.speak(utterance);
}
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".speak-btn").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const text = document.getElementById(targetId).value;
            const lang = targetId === "inputText" ? document.getElementById("inputLang").value : document.getElementById("outputLang").value;

            speakText(text, lang);
        });
    });
});
