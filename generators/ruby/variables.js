'use strict';

Blockly.Ruby['variables_get'] = function(block) {
  var code = Blockly.Ruby.nameDB_.getName(block.getFieldValue('VAR'),
      Blockly.VARIABLE_CATEGORY_NAME);
  return [code, Blockly.Ruby.ORDER_ATOMIC];
};

Blockly.Ruby['variables_set'] = function(block) {
  var argument0 = Blockly.Ruby.valueToCode(block, 'VALUE',
      Blockly.Ruby.ORDER_NONE) || '0';
  var varName = Blockly.Ruby.nameDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  return varName + ' = ' + argument0 + '\n';
};
