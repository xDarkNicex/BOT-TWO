require("dotenv").config(); // Загружаем переменные из .env
const { Bot } = require("grammy");

const bot = new Bot(process.env.BOT_TOKEN);

// Сохраняем загаданное число для каждого пользователя
const userGames = new Map();

bot.command("start", (ctx) => {
    ctx.reply("Привет! Напиши /play чтобы начать игру!");
});

bot.command("play", (ctx) => {
    const secretNumber = Math.floor(Math.random() * 100) + 1; // число от 1 до 100
    userGames.set(ctx.chat.id, secretNumber);
    ctx.reply("Я загадал число от 1 до 100. Попробуй угадать!");
});

bot.on("message:text", (ctx) => {
    const userNumber = parseInt(ctx.message.text);
    const secret = userGames.get(ctx.chat.id);

    if (!secret) {
        ctx.reply("Сначала начни игру с помощью команды /play");
        return;
    }

    if (isNaN(userNumber)) {
        ctx.reply("Пожалуйста, введи число");
        return;
    }

    if (userNumber < secret) {
        ctx.reply("Больше!");
    } else if (userNumber > secret) {
        ctx.reply("Меньше!");
    } else {
        ctx.reply("🎉 Вы угадали! Хотите сыграть ещё раз? Напишите /play");
        userGames.delete(ctx.chat.id);
    }
});

bot.start();
console.log("Бот запущен!");

