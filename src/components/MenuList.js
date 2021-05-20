import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveQuestions, createQuestion } from "../actions/questions";

const QuestionsList = () => {
  const questions = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveQuestions());
  }, []);

  const initialQuestionState = {
    name: "",
    description: "",
  };
  const [questionGroup, setQuestion] = useState(initialQuestionState);

  const nameInputRef = useRef();
  const descriptionInputRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setQuestion({ ...questionGroup, [name]: value });
  };

  const resetFields = () => {
    questionGroup.name = "";
    questionGroup.description = "";
  };

  const saveQuestion = () => {
    const { name, description } = questionGroup;

    dispatch(createQuestion(name, description))
      .then(retrieveQuestions())
      .then(resetFields());
  };

  return (
    <div className="list row">
      <div className="col-md-12">
        <h4>Questions List</h4>
        <ul className="list-group">
          {questions &&
            questions.map((question, index) => (
              <li className={"list-group-item"} key={index}>
                {question.name}
              </li>
            ))}
        </ul>

        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={questionGroup.name}
            onChange={handleInputChange}
            name="name"
            ref={nameInputRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            rows="10"
            cols="100"
            className="form-control"
            id="description"
            required
            value={questionGroup.description}
            onChange={handleInputChange}
            name="description"
            ref={descriptionInputRef}
          />
        </div>

        <button onClick={saveQuestion} className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuestionsList;
