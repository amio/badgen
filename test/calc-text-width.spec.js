const tap = require('tap')
const calcWidth = require('../lib/calc-text-width.js').Verdana110

tap.test('basic functions', t => {
  t.ok(typeof calcWidth === 'function', 'export calcWidth function')
  t.ok(Number.isFinite(calcWidth('')), 'result is a number')
  t.ok(calcWidth('') === 0, 'return 0 for empty string')
  t.end()
})

tap.test('calc width for "npm"', t => {
  t.matchSnapshot(calcWidth('npm'), 'result is correct')
  t.end()
})

tap.test('calc width for unicode', t => {
  t.matchSnapshot(calcWidth('壹佰贰拾叁'), 'result is correct')
  t.end()
})

tap.test('calc width for accented characters', t => {
  t.ok(calcWidth('i') === calcWidth('ï'), 'i and ï have the same width')
  t.ok(calcWidth('e') === calcWidth('é'), 'e and é have the same width')
  t.ok(calcWidth('s') === calcWidth('ṣ'), 's and ṣ have the same width')
  t.end()
})

tap.test('calc width for emojis', t => {
  t.matchSnapshot(calcWidth('💩🤱🦄', true), 'result is correct')
  t.end()
})

tap.test('calc width for (not really) emojis', t => {
  t.matchSnapshot(calcWidth('', true), 'result is correct')
  t.end()
})
