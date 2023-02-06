let fs = require('fs')
let data = require('./data/ccna2.json')
let finisedList = []
let path = '../extension/data.json'
let index = -1;

data.forEach((key) => {
    index++
    if(key.item.includes("?")){
        answer = []
        question = key.item
        if(data.length > index){
            j = index + 1
        } else {
            j = index
        }
        
        check = true
        while(check){
            if (data[j].item.includes("Explanation:") || data[j].item.includes("?") || data[j].item.includes("Match") || data[j].item.includes("Explain:") || data[j].item.includes("PT")){
                check = false
            } else {
                answer.push({answer : data[j].item})
                if(j < data.length - 1){
                    j++
                } else{
                    check = false
                }
            } 
        }
        finisedList.push({question: question, answers : answer})
    }
})




fs.writeFile(path, JSON.stringify(finisedList), (err) => { if(err) throw error})




