import test from 'node:test';
import assert from 'node:assert';

test('synchronous test', () => {
  assert.strictEqual(1, 1);
});

test('asynchronous test', async () => {
  assert.strictEqual(1, 1);
});
