import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

const feedback = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

populateInputs();

function onInput(e) {
  feedback[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (!feedback.email) {
    return alert('Please, insert email.');
  } else if (!feedback.message) {
    return alert('Please, insert message.');
  }

  console.log(feedback);

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
}

function populateInputs() {
  if (feedback) {
    refs.input.value = feedback.email || '';
    refs.textarea.value = feedback.message || '';
  }
}
