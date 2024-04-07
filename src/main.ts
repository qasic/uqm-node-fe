import './styles.css';
import axios from 'axios';
import '@alenaksu/json-viewer';
import '@ui5/webcomponents/dist/BusyIndicator.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/MessageStrip.js';
import '@ui5/webcomponents/dist/Title.js';

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function queryBackend() {
  const query = document.getElementById('query');
  const busy = document.getElementById('busy');
  const errorStrip = document.getElementById('error');
  const result = document.getElementById('result');

  if (!query || !busy || !errorStrip || !result) {
    return;
  }

  const queryText = (query as any).value;
  await axios
    .post('/', {
      queryText,
    })
    .catch((err) => {
      console.log(err);
    });

  // hide all elements
  [busy, errorStrip, result].forEach((el) => {
    if (el) {
      el.style.display = 'none';
    }
  });

  try {
    busy.style.display = 'block';
    await delay(2500);

    const res = getRandomInt(2);
    if (res === 0) {
      errorStrip.style.display = 'inherit';
      errorStrip.innerText =
        'Received error from backend. Are your authentication credentials correct?';
    } else {
      result.style.display = 'inherit';
      (result as any).data = {
        quiz: {
          sport: {
            q1: {
              question: 'Which one is correct team name in NBA?',
              options: [
                'New York Bulls',
                'Los Angeles Kings',
                'Golden State Warriros',
                'Huston Rocket',
              ],
              answer: 'Huston Rocket',
            },
          },
          maths: {
            q1: {
              question: '5 + 7 = ?',
              options: ['10', '11', '12', '13'],
              answer: '12',
            },
            q2: {
              question: '12 - 8 = ?',
              options: ['1', '2', '3', '4'],
              answer: '4',
            },
          },
        },
      };
    }
  } finally {
    busy.style.display = 'none';
  }
}

const btn = document.getElementById('submit');
btn?.addEventListener('click', () => {
  queryBackend();
});
