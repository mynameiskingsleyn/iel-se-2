export default {

    async fetchQuestions(){
        const response = await fetch('https://opentdb.com/api.php?amount=5');
        const json = await response.json();
        return json;
    }
}