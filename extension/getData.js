let answers = require('./data.json')


answers.map((item) => {
    console.log(item.data)
})






// chrome.runtime.onMessage.addListener((data, sender, onSuccess) => {
//     if (data.type !== "getData") return;

// });