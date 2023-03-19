let chapterData = [];
let dragDrop0ata = [];

fetch(chrome.extension.getURL('/data.json'))
    .then((resp) => resp.json())
    .then(function (jsonData) {
        console.table(jsonData);
        chapterData = jsonData;
    });

fetch(chrome.extension.getURL('/drag-drop.json'))
.then((resp) => resp.json())
.then(function (jsonData) {
    console.table(jsonData);
    dragDropData = jsonData;
});


function matchText(textA, textB) {
    const replaceRegex = /[^\w]/gi;
    textA = textA.replace(replaceRegex, "");
    textB = textB.replace(replaceRegex, "");
    return (textA === textB);
}


function findAnswerFinal(questionText, answers) {
    if (chapterData === null) {
        alert("No Data provided");
        return [];
    }
    const correctAnswer = [];
   
    
    

    chapterData.forEach((entry) => {
        let myQuestion = entry.question.replace( /\b\d+\./g ,'')
        if (questionText.includes("PT")){
            let sentences = questionText.split(".");
            let newQuestion = sentences.filter(s => !sentences.includes("PT"))
            newQuestion = questionText
        }



        if (matchText(questionText.trim(), myQuestion)) {
            for(let availableAnswer of answers){
                entry.answers.forEach((possibleAnswer) => {
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
    let questionText = questionTextDom.textContent.trim();

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

function processDragAndDrop(activeAnswer, activeDrop, title) {
    console.log(title)
    // Todo - Drag and drop commands
    activeAnswer.forEach((item) => {
        console.log(item.innerText)
    })

    activeDrop.forEach(item => {
        console.log(item.innerText)
    })

    dragDropData.forEach(item => {
        console.log(item.question)
        item.answers.forEach(entry => {
            console.log(entry.answer + " : " + entry.drop)
        })
    })

    // TODO - If anzahl auswahl mehr als antworten mache etwas

}



function clickNext() {
    document.getElementById("next").click();
}




window.addEventListener("keydown", event => {
    if (event.key === "a") {
        const activeQuestion = document.querySelector(".question:not(.hidden)");
        if (activeQuestion) {
            processQuestion(activeQuestion);
        }

    } else if (event.key === "n") {
        clickNext();

    } else if (event.key === 'p') {
        chrome.runtime.sendMessage("Code Running")
    } else if (event.key === 'l') {
        const activeAnswer = document.querySelectorAll(".option-title span")
        const activeDrop = document.querySelectorAll(".target-title span")
        const title = document.querySelector(".label-container span")
        if(activeAnswer && activeDrop) {
            //processDragAndDrop(activeAnswer, activeDrop, title)
        }
        
    }


    // else if (event.key === "p") {
    //     chrome.storage.local.get(["lastUrl"], result => {
    //         answerUrl = prompt("Please input the answer url (itexamanswers.net)", result.lastUrl);
    //         chrome.storage.local.set({lastUrl: answerUrl});
    //         fetchChapterData();
    //     })
    // }
});


