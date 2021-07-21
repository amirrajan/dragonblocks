'use strict';

Blockly.Ruby['procedures_defreturn'] = function(block) {
  var funcName = Blockly.Ruby.nameDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var xfix1 = '';
  if (Blockly.Ruby.STATEMENT_PREFIX) {
    xfix1 += Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_PREFIX, block);
  }
  if (Blockly.Ruby.STATEMENT_SUFFIX) {
    xfix1 += Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_SUFFIX, block);
  }
  if (xfix1) {
    xfix1 = Blockly.Ruby.prefixLines(xfix1, Blockly.Ruby.INDENT);
  }
  var loopTrap = '';
  if (Blockly.Ruby.INFINITE_LOOP_TRAP) {
    loopTrap = Blockly.Ruby.prefixLines(
        Blockly.Ruby.injectId(Blockly.Ruby.INFINITE_LOOP_TRAP, block),
        Blockly.Ruby.INDENT);
  }
  var branch = Blockly.Ruby.statementToCode(block, 'STACK');
  var returnValue = Blockly.Ruby.valueToCode(block, 'RETURN',
      Blockly.Ruby.ORDER_NONE) || '';
  var xfix2 = '';
  if (branch && returnValue) {
    xfix2 = xfix1;
  }
  if (returnValue) {
    returnValue = Blockly.Ruby.INDENT + 'return ' + returnValue + '\n';
  } else if (!branch) {
    branch = '';
  }
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.Ruby.nameDB_.getName(variables[i],
        Blockly.VARIABLE_CATEGORY_NAME);
  }
  var code = 'def ' + funcName + '(' + args.join(', ') + ')\n' +
      xfix1 + loopTrap + branch + xfix2 + returnValue + 'end\n';
  code = Blockly.Ruby.scrub_(block, code);
  Blockly.Ruby.definitions_['%' + funcName] = code;
  return null;
};

Blockly.Ruby['procedures_defnoreturn'] =
    Blockly.Ruby['procedures_defreturn'];

Blockly.Ruby['procedures_callreturn'] = function(block) {
  var funcName = Blockly.Ruby.nameDB_.getName(
      block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
  var args = [];
  var variables = block.getVars();
  for (var i = 0; i < variables.length; i++) {
    args[i] = Blockly.Ruby.valueToCode(block, 'ARG' + i,
        Blockly.Ruby.ORDER_NONE) || 'nil';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Ruby.ORDER_HIGH];
};

Blockly.Ruby['procedures_callnoreturn'] = function(block) {
  var tuple = Blockly.Ruby['procedures_callreturn'](block);
  return tuple[0] + '\n';
};

Blockly.Ruby['procedures_ifreturn'] = function(block) {
  var condition = Blockly.Ruby.valueToCode(block, 'CONDITION',
      Blockly.Ruby.ORDER_NONE) || 'false';
  var code = 'if ' + condition + '\n';
  if (Blockly.Ruby.STATEMENT_SUFFIX) {
    code += Blockly.Ruby.prefixLines(
        Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_SUFFIX, block),
        Blockly.Ruby.INDENT);
  }
  if (block.hasReturnValue_) {
    var value = Blockly.Ruby.valueToCode(block, 'VALUE',
        Blockly.Ruby.ORDER_NONE) || 'nil';
    code += Blockly.Ruby.INDENT + 'return ' + value + '\n';
  } else {
    code += Blockly.Ruby.INDENT + 'return\n';
  }
  code += 'end\n';
  return code;
};
