import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getXpRequiredForLevel, LEVEL_TITLES } from '../data/rpgData';
import { ALL_EXERCISES, WORKOUT_DAYS, TRAINING_STAGES_INFO } from '../data/exercisesData';

describe('Neon Fitness RPG Core Logic', () => {
  test('XP required for level increases exponentially and smoothly', () => {
    const lvl1 = getXpRequiredForLevel(1);
    const lvl2 = getXpRequiredForLevel(2);
    const lvl5 = getXpRequiredForLevel(5);

    assert.equal(lvl1, 100);
    assert.ok(lvl2 > lvl1);
    assert.ok(lvl5 > lvl2);
  });

  test('All 7 days of the training program exist with correct focus', () => {
    assert.equal(WORKOUT_DAYS.length, 7);
    const mon = WORKOUT_DAYS.find(d => d.id === 'mon');
    const tue = WORKOUT_DAYS.find(d => d.id === 'tue');
    const wed = WORKOUT_DAYS.find(d => d.id === 'wed');
    const sun = WORKOUT_DAYS.find(d => d.id === 'sun');

    assert.ok(mon && mon.focusRu.includes('Ноги'));
    assert.ok(tue && tue.focusRu.includes('хват'));
    assert.ok(wed && wed.focusRu.includes('Подвижность'));
    assert.ok(sun && sun.isRestDay === true);
  });

  test('All referenced exercise IDs exist in ALL_EXERCISES database', () => {
    WORKOUT_DAYS.forEach(day => {
      day.exerciseIds.forEach(id => {
        const found = ALL_EXERCISES.find(e => e.id === id);
        assert.ok(found, `Exercise ID ${id} referenced in ${day.id} must exist in ALL_EXERCISES`);
      });
    });
  });

  test('Every exercise grants positive XP, Credits, and Stat XP', () => {
    ALL_EXERCISES.forEach(ex => {
      assert.ok(ex.rewards.xp > 0, `${ex.name} must grant positive XP`);
      assert.ok(ex.rewards.credits > 0, `${ex.name} must grant positive credits`);
      assert.ok(ex.rewards.statXp > 0, `${ex.name} must grant positive statXp`);
      assert.ok(['strength', 'endurance', 'mobility', 'grip', 'vitality', 'recovery'].includes(ex.rewards.statType));
    });
  });

  test('Training stages progression multipliers are monotonic', () => {
    assert.equal(TRAINING_STAGES_INFO.length, 4);
    assert.ok(TRAINING_STAGES_INFO[0].repsMultiplier < TRAINING_STAGES_INFO[1].repsMultiplier);
    assert.ok(TRAINING_STAGES_INFO[1].repsMultiplier < TRAINING_STAGES_INFO[2].repsMultiplier);
    assert.ok(TRAINING_STAGES_INFO[2].repsMultiplier < TRAINING_STAGES_INFO[3].repsMultiplier);
  });

  test('Titles cover full range of levels', () => {
    assert.ok(LEVEL_TITLES.length >= 8);
    assert.equal(LEVEL_TITLES[0].minLevel, 1);
  });
});
