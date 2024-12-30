let quizQuestions={
    "subject":{
        "Science":[
            {
                "question": "1. What is the chemical formula for table salt?",
                "options": ["NaCl", "KCl", "MgCl2", "CaCl2"],
                "answer": 0
            },
            {
                "question": "2. What part of the plant conducts photosynthesis?",
                "options": ["Root", "Stem", "Leaf", "Flower"],
                 "answer": 2
            },
            {
                "question": "3. Which gas is most abundant in Earth's atmosphere?",
                "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
                "answer": 2
            }
        ],
        "Programming": [
            {
              question: "1. What does HTML stand for?",
              options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Tool Multi Language"],
              answer: 0
            },
            {
              question: "2. Which language is used for web apps?",
              options: ["PHP", "Python", "JavaScript", "All of the above"],
              answer: 3
            }
        ],
        "Politics": [
            {
              question: "1. Who is known as the Father of the Nation in India?",
              options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhash Chandra Bose", "Dr. B.R. Ambedkar"],
              answer: 1
            },
            {
              question: "2. What is the highest law-making body in India?",
              options: ["Supreme Court", "Parliament", "President", "Prime Minister"],
              answer: 1
            }
        ]
    }
}
function findSubject(event){
   event.preventDefault();
   document.getElementById("questionWrapper").style.display="flex";
   const quizForm=document.getElementById("quiz");
   quizForm.style.display="none";
   const subjectOption=document.getElementById("subject").value;
   loadQuestions(subjectOption);
}
function loadQuestions(subjectOption){
    const dynamicQuestions=document.getElementById("questions");
    const heading=document.createElement("h3");
    heading.textContent=subjectOption+" questions";
    dynamicQuestions.appendChild(heading);
    const questionForm=document.createElement("form");
    const items=quizQuestions.subject[subjectOption];
    var nameID=0;
    items.forEach(item=>{
        const div=document.createElement("div");
        const paragraph=document.createElement("p");
        paragraph.textContent=item.question;
        div.appendChild(paragraph);
        const questionOptions=item.options;
        const optionsDiv=document.createElement("div");
        optionsDiv.setAttribute("id","optionDiv");
        var optionID=0
        questionOptions.forEach(questionOption=>{
            const radioButton=document.createElement("input");
            radioButton.setAttribute("type","radio");
            radioButton.setAttribute("name","question"+nameID);
            
            radioButton.setAttribute("value",optionID);
            if(optionID==0){
                radioButton.setAttribute("required","true");
            }
            const label=document.createElement("label");
            label.textContent=questionOption;
            optionsDiv.appendChild(radioButton);
            //console.log(radioButton);
            optionsDiv.appendChild(label);
            optionID++;
        });
        div.appendChild(optionsDiv);
        questionForm.appendChild(div);
        //dynamicQuestions.appendChild(div);
        nameID++;
    });
    const submitButton=document.createElement("input");
    submitButton.setAttribute("type","submit");
    submitButton.setAttribute("class","submit");
    // submitButton.setAttribute("onclick", `evaluateTotal('${subjectOption}')`);
    questionForm.appendChild(submitButton);
    dynamicQuestions.appendChild(questionForm);
    questionForm.setAttribute("onsubmit",`evaluateTotal('${subjectOption}',event)`);
}
function evaluateTotal(subjectOption,event){
    event.preventDefault();
   const parent=document.getElementById("questionWrapper");
   parent.style.display="none";
   const currentParent=document.getElementById("scores");
   currentParent.style.height="100vh";
   currentParent.style.backgroundColor="white";
   const answers=[];
   for(let i=0;i<quizQuestions.subject[subjectOption].length;i++){
    const selectedOption=document.querySelector(`input[name="question${i}"]:checked`);
    answers.push(parseInt(selectedOption.value));
   }
   var totalMarks=0;
   for(let i=0;i<quizQuestions.subject[subjectOption].length;i++){
    if(quizQuestions.subject[subjectOption][i].answer===answers[i])
        totalMarks+=10;;
   }
   const scoreDisplay=document.createElement("div");
   const text=document.createElement("h3");
   if(totalMarks===answers.length*10){
    text.textContent="Congratulations.You passed all questions.";
    // congrats gif added
    const congratsImage=document.createElement("img");
    congratsImage.setAttribute("src","./gif/congratulations-7600_256.gif");
    congratsImage.style.position = "fixed"; // Make the image cover the viewport
    congratsImage.style.top = "0";
    congratsImage.style.left = "0";
    congratsImage.style.width = "100vw"; // Full viewport width
    congratsImage.style.height = "100vh"; // Full viewport height
    congratsImage.style.zIndex = "1000";
    scoreDisplay.appendChild(congratsImage);
   }
   else{
    text.textContent=`You have scored ${totalMarks} marks.`;
   }
   scoreDisplay.appendChild(text);
   currentParent.appendChild(scoreDisplay);
}