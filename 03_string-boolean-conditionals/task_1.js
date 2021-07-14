let password = "@-test";
if (password.length >=4 && (password.includes("_") || password.includes("-"))) {
    console.log("Пароль надежный");
}
else {
    console.log("Пароль недостаточно надежный");
}
