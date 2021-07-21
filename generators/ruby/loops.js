'use strict';

Blockly.Ruby['controls_repeat_ext'] = function(block) {
  if (block.getField('TIMES')) {
    var repeats = String(Number(block.getFieldValue('TIMES')));
  } else {
    var repeats = Blockly.Ruby.valueToCode(block, 'TIMES',
        Blockly.Ruby.ORDER_NONE) || '0';
  }
  if (Blockly.isNumber(repeats)) {
    repeats = parseInt(repeats, 10);
  } else {
    repeats = '(' + repeats + ').floor';
  }
  var branch = Blockly.Ruby.statementToCode(block, 'DO');
  branch = Blockly.Ruby.addLoopTrap(branch, block);
  var code = repeats + ".times {\n" + branch + "}\n";
  return code;
};

Blockly.Ruby['controls_repeat'] = Blockly.Ruby['controls_repeat_ext'];

Blockly.Ruby['controls_whileUntil'] = function(block) {
  var until = block.getFieldValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Ruby.valueToCode(block, 'BOOL',
      until ? Blockly.Ruby.ORDER_UNARY :
      Blockly.Ruby.ORDER_NONE) || 'false';
  var branch = Blockly.Ruby.statementToCode(block, 'DO');
  branch = Blockly.Ruby.addLoopTrap(branch, block);
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while ' + argument0 + '\n' + branch + 'end\n';
};

Blockly.Ruby['controls_for'] = function(block) {
  var variable0 = Blockly.Ruby.nameDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var startVar = Blockly.Ruby.valueToCode(block, 'FROM',
      Blockly.Ruby.ORDER_NONE) || '0';
  var endVar = Blockly.Ruby.valueToCode(block, 'TO',
      Blockly.Ruby.ORDER_NONE) || '0';
  var increment = Blockly.Ruby.valueToCode(block, 'BY',
      Blockly.Ruby.ORDER_NONE) || '1';
  var branch = Blockly.Ruby.statementToCode(block, 'DO');
  branch = Blockly.Ruby.addLoopTrap(branch, block);
  var code = '';
  var incValue;
  
  if (Blockly.isNumber(startVar) && Blockly.isNumber(endVar) &&
      Blockly.isNumber(increment)) {
    var up = Number(startVar) <= Number(endVar);
    var step = Math.abs(Number(increment));
    incValue = (up ? '' : '-') + step;
  } else {
    code = '';
    incValue = Blockly.Ruby.nameDB_.getDistinctName(
        variable0 + '_inc', Blockly.VARIABLE_CATEGORY_NAME);
    code += incValue + ' = ';
    if (Blockly.isNumber(increment)) {
      code += Math.abs(increment) + '\n';
    } else {
      code += '(' + increment + ').abs\n';
    }
    code += 'if (' + startVar + ') > (' + endVar + ')\n';
    code += Blockly.Ruby.INDENT + incValue + ' = -' + incValue + '\n';
    code += 'end\n';
  }
  var incVar = Blockly.Ruby.nameDB_.getDistinctName(
        variable0, Blockly.VARIABLE_CATEGORY_NAME);
        
  code += startVar + ".step(" + endVar + "," + incValue + ") { |" + variable0 + "|\n" + branch + "}\n";
  
  return code;
};

Blockly.Ruby['controls_forEach'] = function(block) {
  var variable0 = Blockly.Ruby.nameDB_.getName(
      block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  var argument0 = Blockly.Ruby.valueToCode(block, 'LIST',
      Blockly.Ruby.ORDER_NONE) || '[]';
  var branch = Blockly.Ruby.statementToCode(block, 'DO');
  branch = Blockly.Ruby.addLoopTrap(branch, block);
  var code = argument0 + ".each do |" + variable0 + "|\n" +
      branch + 'end\n';
  return code;
};

Blockly.Ruby['controls_flow_statements'] = function(block) {
  var xfix = '';
  if (Blockly.Ruby.STATEMENT_PREFIX) {
    xfix += Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_PREFIX, block);
  }
  if (Blockly.Ruby.STATEMENT_SUFFIX) {
    xfix += Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_SUFFIX, block);
  }
  if (Blockly.Ruby.STATEMENT_PREFIX) {
    var loop = Blockly.Constants.Loops
        .CONTROL_FLOW_IN_LOOP_CHECK_MIXIN.getSurroundLoop(block);
    if (loop && !loop.suppressPrefixSuffix) {
      xfix += Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_PREFIX, loop);
    }
  }
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return xfix + "break\n";
    case 'CONTINUE':
      return xfix + "continue\n";
  }
  throw Error('Unknown flow statement.');
};
