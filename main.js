let GA_el;
let TA_el;
let Quiz1_el;
let Quiz2_el;
let OPPE1_el;
let OPPE2_el;
let F_el;
let Bonus_el;
let StatisticsBonus_el;
let Course_el;

document.addEventListener('DOMContentLoaded', e => {
  GA_el = document.querySelector('.GA-label input');
  TA_el = document.querySelector('.TA-label input');
  Quiz1_el = document.querySelector('.Quiz1-label input');
  Quiz2_el = document.querySelector('.Quiz2-label input');
  OPPE1_el = document.querySelector('.OPPE1-label input');
  OPPE2_el = document.querySelector('.OPPE2-label input');
  F_el = document.querySelector('.F-label input');
  Bonus_el = document.querySelector('.Bonus-label input');
  StatisticsBonus_el = document.querySelector('.StatisticsBonus-label input');
  Course_el = document.querySelector('.Course-select');

  function switchCourse() {
    let Course = Course_el.value;
    document.querySelector('.TA-label').style.display =
      Course === 'python' ? 'flex' : 'none';
    document.querySelector('.OPPE1-label').style.display =
      Course === 'python' ? 'flex' : 'none';
    document.querySelector('.OPPE2-label').style.display =
      Course === 'python' ? 'flex' : 'none';

    document.querySelector('.Quiz2-label').style.display =
      Course != 'python' ? 'flex' : 'none';

    document.querySelector('.Bonus-label').style.display =
      Course != 'statistics' ? 'flex' : 'none';
    document.querySelector('.StatisticsBonus-label').style.display =
      Course === 'statistics' ? 'flex' : 'none';
  }

  document.querySelectorAll('input').forEach(el => {
    el.addEventListener('keyup', calculateT);
    el.addEventListener('change', calculateT);
  });

  Course_el.addEventListener('change', switchCourse);

  switchCourse();
  calculateT();
});

function calculateT() {
  let GA = Number(GA_el.value);
  let TA = Number(TA_el.value) * 20;
  let Quiz1 = Number(Quiz1_el.value);
  let Quiz2 = Number(Quiz2_el.value);
  let OPPE1 = Number(OPPE1_el.value);
  let OPPE2 = Number(OPPE2_el.value);
  let F = Number(F_el.value);
  let Bonus = Number(Bonus_el.value);
  let StatisticsBonus = Number(StatisticsBonus_el.value);
  let Course = Course_el.value;

  let T;
  if (Course === 'python') {
    T =
      0.1 * GA +
      0.1 * Quiz1 +
      Math.max(
        0.4 * F + 0.2 * Math.max(OPPE1, OPPE2),
        0.4 * F + 0.25 * Math.max(OPPE1, OPPE2) + 0.15 * Math.min(OPPE1, OPPE2)
      ) +
      0.05 * TA; // capped to 100
  } else {
    if (Course === 'statistics') Bonus = StatisticsBonus;
    T =
      0.1 * GA +
      Math.max(
        0.6 * F + 0.2 * Math.max(Quiz1, Quiz2),
        0.4 * F + 0.2 * Quiz1 + 0.3 * Quiz2
      );
  }

  T += Bonus;
  T = T > 100 ? 100 : T;

  let grade, gradePoints;
  if (T >= 90) {
    grade = 'S';
    gradePoints = 10;
  } else if (T >= 80) {
    grade = 'A';
    gradePoints = 9;
  } else if (T >= 70) {
    grade = 'B';
    gradePoints = 8;
  } else if (T >= 60) {
    grade = 'C';
    gradePoints = 7;
  } else if (T >= 50) {
    grade = 'D';
    gradePoints = 6;
  } else if (T >= 40) {
    grade = 'E';
    gradePoints = 4;
  } else {
    grade = 'F';
    gradePoints = 0;
  }

  document.querySelector('.T').textContent = T.toFixed(2);
  document.querySelector('.grade').textContent = grade;
  document.querySelector('.gradePoints').textContent = gradePoints;
}
