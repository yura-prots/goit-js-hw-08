import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

let feedback = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

populateInputs();

function onInput(e) {
  feedback[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (refs.input.value === '') {
    return alert('Please, insert email.');
  } else if (refs.textarea.value === '') {
    return alert('Please, insert message.');
  }

  console.log(feedback);

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  feedback = {};
}

function populateInputs() {
  const savedFeedback = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFeedback) {
    refs.input.value = savedFeedback.email || '';
    refs.textarea.value = savedFeedback.message || '';
  }
}
