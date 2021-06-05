import React, { Component } from 'react';
import {processData, myQuestions} from './data/helpers';

class App extends Component  {

    constructor(){
        super();
        var squestions = myQuestions();
        this.state = {questions:squestions, score:0, currentQuestion:0,showScore:false}
    }

    async componentDidMount(){
        const data = await processData();
        this.setState({questions:data});
    }

    handleAnswerButtonClick(isCorrect){
        if(isCorrect===true){
            const newScore = this.state.score + 1;
            this.setState({score:newScore});
            alert("correct!!!");
        }else{
            alert("Wrong answer");
        }
        const nextQuestion = this.state.currentQuestion + 1;
        if(nextQuestion < this.state.questions.length){
            this.setState({currentQuestion:nextQuestion});
        }else{
            this.setShowScore(true);
        }

    }

    setShowScore(value){
        this.setState({showScore:value});
    }


    async resetQuestions(){
        var data = await processData();
        this.setState({questions:data});
    }

    restartTest(){
        this.setState({score:0, currentQuestion:0,showScore:false});
        this.resetQuestions();
    }


    render(){
        return (
            <div className='app'>
                {this.state.showScore ? (
                    <div>
                        <div className='score-section'>You scored {this.state.score} out of {this.state.questions.length}

                        </div>
                        <div className='re-test'>
                            <button onClick={()=>this.restartTest()} className="restart-button"> Try again </button>
                        </div>
                    </div>

                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {this.state.currentQuestion + 1}</span>/{this.state.questions.length}
                            </div>
                            <div className='question-text'>{this.state.questions[this.state.currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section'>
                            {this.state.questions[this.state.currentQuestion].answerOptions.map((answerOption)=><button
                                onClick={()=>this.handleAnswerButtonClick(answerOption.isCorrect)} className="answer-button"
                                key={answerOption.id}>
                                {answerOption.answerText}
                                </button>

                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }

}

export default App;
