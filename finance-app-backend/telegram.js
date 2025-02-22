import fetch from 'node-fetch';

const TELEGRAM_API_URL = 'https://api.telegram.org/bot';

const token = '7246121187:AAGEZSAYGv-3VNhn4B4ld0btMcKJMUSYyw4'; // Reemplaza con tu token de API de Telegram
const chatId = '6432018838'; // Reemplaza con tu chat ID de Telegram

const sendTelegramMessage = async (message) => {
    const url = `${TELEGRAM_API_URL}${token}/sendMessage`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        console.error('Error sending message:', error);
    } else {
        const data = await response.json();
        console.log('Message sent:', data);
    }
};

export default sendTelegramMessage;
