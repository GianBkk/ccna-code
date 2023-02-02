
let chapterData = [];

fetch(chrome.extension.getURL('/data.json'))
    .then((resp) => resp.json())
    .then(function (jsonData) {
        console.table(jsonData);
        chapterData = jsonData;

        chapterData.forEach((entry) => {
            entry.answers.forEach((item) => {
                console.log(item.answer)
            })
        })

    
    });


function matchText(textA, textB) {
    const replaceRegex = /[^\w]/gi;
    textA = textA.replace(replaceRegex, "");
    textB = textB.replace(replaceRegex, "");
    return (textA === textB);
}


function findAnswers(questionText, answers) {
    if (chapterData === null) {
        alert("No chapter data loaded. Maybe the fetch failed?!");
        return [];
    }

    const correctAnswers = [];

    


    return correctAnswers;
}

function findAnswerFinal(questionText, answers) {
    if (chapterData === null) {
        alert("No Data provided");
        return [];
    }
    const correctAnswer = [];
   
    
    

    chapterData.forEach((entry) => {
        //console.log(entry.question)
        
        let myQuestion = entry.question.replace( /\b\d+\./g ,'')
        console.log(myQuestion)



        if (matchText(questionText.trim(), myQuestion)) {
            for(let availableAnswer of answers){
                entry.answers.forEach((possibleAnswer) => {
                    console.log(availableAnswer.textContent.trim())
                    console.log(possibleAnswer.answer)
                    if(matchText(availableAnswer.textContent.trim(), possibleAnswer.answer)) {
                        correctAnswer.push(availableAnswer);
                    }
                })
            }
        }
    })
    return correctAnswer;
}




function processQuestion(question) {
    const questionTextDom = question.querySelector(".questionText .mattext");
    if (!questionTextDom) return;
    const questionText = questionTextDom.textContent.trim();

    const answersDom = question.querySelector("ul.coreContent");
    if (!answersDom) return;
    const answers = answersDom.children;

    for (let answer of answers) {
        const input = answer.querySelector("input");
        if (!input) continue;
        input.checked = false;
    }

    const correctAnswers = findAnswerFinal(questionText, answers);
    if (correctAnswers.length === 0) {
        console.log("No answers found for this question. ;(");
        return;
    }

    for (const answer of correctAnswers) {
        const input = answer.querySelector("input");
        if (!input) continue;
        input.checked = true;
    }
}


function clickNext() {
    document.getElementById("next").click();
}



window.addEventListener("keydown", event => {
    if (event.key === "a") {
        // Inactive questions have the hidden class
        const activeQuestion = document.querySelector(".question:not(.hidden)");
        if (activeQuestion) {
            processQuestion(activeQuestion);
        }

    } else if (event.key === "n") {
        clickNext();

    } else if (event.key === 'p') {
        chrome.runtime.sendMessage(prompt("Code is running! "))
    }
    // else if (event.key === "p") {
    //     chrome.storage.local.get(["lastUrl"], result => {
    //         answerUrl = prompt("Please input the answer url (itexamanswers.net)", result.lastUrl);
    //         chrome.storage.local.set({lastUrl: answerUrl});
    //         fetchChapterData();
    //     })
    // }
});