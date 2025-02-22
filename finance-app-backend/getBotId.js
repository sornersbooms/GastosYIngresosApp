import fetch from 'node-fetch';

const token = '7246121187:AAGEZSAYGv-3VNhn4B4ld0btMcKJMUSYyw4'; // Reemplaza con tu token de API de Telegram
const TELEGRAM_API_URL = `https://api.telegram.org/bot${token}/getMe`;

const getBotId = async () => {
    const response = await fetch(TELEGRAM_API_URL);
    const data = await response.json();
    if (data.ok) {
        console.log('Bot ID:', data.result.id);
    } else {
        console.error('Error fetching bot info:', data);
    }
};

getBotId();
