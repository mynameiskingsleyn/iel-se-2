import api from '../api/opentdb';

     export const processData = async()=>{
       var data = await api.fetchQuestions();
       var newData = [];
       var results = data.results;
       results.forEach( (element)=>{
          var quest = {};
          quest.questionText = cleanString(element.question);
          quest.answerOptions = [];
          var options = element.incorrect_answers;
          var correct_answer = cleanString(element.correct_answer);
          options.push(correct_answer);
          options.sort();
          var count =0;
          options.forEach((q)=>{
             var oneAnswer = {};
             var ans = cleanString(q);
             oneAnswer.answerText = ans;
             oneAnswer.id = count;
             count++;
             if(ans === correct_answer){
                oneAnswer.isCorrect = true;
             }else{
                 oneAnswer.isCorrect = false;
             }
             quest.answerOptions.push(oneAnswer);
          });
          newData.push(quest);
       });

       return newData;
    };

    const cleanString= (str)=>{
       return str.replace(/(&quot;)/g,'"').replace(/(&#039;)/g,'`').replace(/(&amp;)/g,'and');
    }

    export const myQuestions = ()=>{
       var q = [
           {
               questionText: 'I am the president of Noway ?' ,
               answerOptions: [
                   { id: 0, answerText: 'true', isCorrect: false },
                   { id: 1,answerText: 'false', isCorrect: true },

               ],
           },

       ];

       return q;
    }

   // var questions = myQuestions();
    //var rawData = getRawData();
    // var questions = processData();
    // return questions;