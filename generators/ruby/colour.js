'use strict';

Blockly.Ruby['colour_picker'] = function(block) {
  var code = Blockly.Ruby.quote_(block.getFieldValue('COLOUR'));
  return [code, Blockly.Ruby.ORDER_ATOMIC];
};

Blockly.Ruby['colour_random'] = function(block) {
  var code = 'format("#%06x", rand(0, 2 ** 24 - 1))';
  return [code, Blockly.Ruby.ORDER_HIGH];
};

Blockly.Ruby['colour_rgb'] = function(block) {
  var functionName = Blockly.Ruby.provideFunction_(
      'colour_rgb',
      ['def ' + Blockly.Ruby.FUNCTION_NAME_PLACEHOLDER_ + '(r, g, b)',
       '  r = ([100, [0, r].max].min * 2.55 + 0.5).floor',
       '  g = ([100, [0, g].max].min * 2.55 + 0.5).floor',
       '  b = ([100, [0, b].max].min * 2.55 + 0.5).floor',
       '  return format("#%02x%02x%02x", r, g, b)',
       'end']);
  var r = Blockly.Ruby.valueToCode(block, 'RED',
      Blockly.Ruby.ORDER_NONE) || 0;
  var g = Blockly.Ruby.valueToCode(block, 'GREEN',
      Blockly.Ruby.ORDER_NONE) || 0;
  var b = Blockly.Ruby.valueToCode(block, 'BLUE',
      Blockly.Ruby.ORDER_NONE) || 0;
  var code = functionName + '(' + r + ', ' + g + ', ' + b + ')';
  return [code, Blockly.Ruby.ORDER_HIGH];
};

Blockly.Ruby['colour_blend'] = function(block) {
  var functionName = Blockly.Ruby.provideFunction_(
      'colour_blend',
      ['def ' + Blockly.Ruby.FUNCTION_NAME_PLACEHOLDER_ +
           '(colour1, colour2, ratio)',
       '  r1 = colour1[1 .. 2].to_i(16)',
       '  r2 = colour2[1 .. 2].to_i(16)',
       '  g1 = colour1[3 .. 4].to_i(16)',
       '  g2 = colour2[3 .. 4].to_i(16)',
       '  b1 = colour1[5 .. 6].to_i(16)',
       '  b2 = colour2[5 .. 6].to_i(16)',
       '  ratio = [1, [0, ratio].max].min',
       '  r = (r1 * (1 - ratio) + r2 * ratio + 0.5).floor',
       '  g = (g1 * (1 - ratio) + g2 * ratio + 0.5).floor',
       '  b = (b1 * (1 - ratio) + b2 * ratio + 0.5).floor',
       '  return format("#%02x%02x%02x", r, g, b)',
       'end']);
  var colour1 = Blockly.Ruby.valueToCode(block, 'COLOUR1',
      Blockly.Ruby.ORDER_NONE) || '\'#000000\'';
  var colour2 = Blockly.Ruby.valueToCode(block, 'COLOUR2',
      Blockly.Ruby.ORDER_NONE) || '\'#000000\'';
  var ratio = Blockly.Ruby.valueToCode(block, 'RATIO',
      Blockly.Ruby.ORDER_NONE) || 0;
  var code = functionName + '(' + colour1 + ', ' + colour2 + ', ' + ratio + ')';
  return [code, Blockly.Ruby.ORDER_HIGH];
};
