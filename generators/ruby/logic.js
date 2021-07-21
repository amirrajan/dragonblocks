'use strict';

Blockly.Ruby['controls_if'] = function(block) {
  var n = 0;
  var code = '', branchCode, conditionCode;
  if (Blockly.Ruby.STATEMENT_PREFIX) {
    code += Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_PREFIX, block);
  }
  do {
    conditionCode = Blockly.Ruby.valueToCode(block, 'IF' + n,
        Blockly.Ruby.ORDER_NONE) || 'false';
    branchCode = Blockly.Ruby.statementToCode(block, 'DO' + n);
    if (Blockly.Ruby.STATEMENT_SUFFIX) {
      branchCode = Blockly.Ruby.prefixLines(
          Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_SUFFIX, block),
          Blockly.Ruby.INDENT) + branchCode;
    }
    code += (n > 0 ? 'else' : '') +
        'if ' + conditionCode + ' \n' + branchCode;
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.Ruby.STATEMENT_SUFFIX) {
    branchCode = Blockly.Ruby.statementToCode(block, 'ELSE');
    if (Blockly.Ruby.STATEMENT_SUFFIX) {
      branchCode = Blockly.Ruby.prefixLines(
          Blockly.Ruby.injectId(Blockly.Ruby.STATEMENT_SUFFIX, block),
          Blockly.Ruby.INDENT) + branchCode;
    }
    code += 'else\n' + branchCode;
  }
  return code + 'end\n';
};

Blockly.Ruby['controls_ifelse'] = Blockly.Ruby['controls_if'];

Blockly.Ruby['logic_compare'] = function(block) {
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var argument0 = Blockly.Ruby.valueToCode(block, 'A',
      Blockly.Ruby.ORDER_RELATIONAL) || '0';
  var argument1 = Blockly.Ruby.valueToCode(block, 'B',
      Blockly.Ruby.ORDER_RELATIONAL) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, Blockly.Ruby.ORDER_RELATIONAL];
};

Blockly.Ruby['logic_operation'] = function(block) {
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == 'and') ? Blockly.Ruby.ORDER_AND :
      Blockly.Ruby.ORDER_OR;
  var argument0 = Blockly.Ruby.valueToCode(block, 'A', order);
  var argument1 = Blockly.Ruby.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    argument0 = 'false';
    argument1 = 'false';
  } else {
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Ruby['logic_negate'] = function(block) {
  var argument0 = Blockly.Ruby.valueToCode(block, 'BOOL',
      Blockly.Ruby.ORDER_UNARY) || 'true';
  var code = '!' + argument0;
  return [code, Blockly.Ruby.ORDER_UNARY];
};

Blockly.Ruby['logic_boolean'] = function(block) {
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Ruby.ORDER_ATOMIC];
};

Blockly.Ruby['logic_null'] = function(block) {
  return ['nil', Blockly.Ruby.ORDER_ATOMIC];
};

Blockly.Ruby['logic_ternary'] = function(block) {
  var value_if = Blockly.Ruby.valueToCode(block, 'IF',
      Blockly.Ruby.ORDER_AND) || 'false';
  var value_then = Blockly.Ruby.valueToCode(block, 'THEN',
      Blockly.Ruby.ORDER_AND) || 'nil';
  var value_else = Blockly.Ruby.valueToCode(block, 'ELSE',
      Blockly.Ruby.ORDER_OR) || 'nil';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.Ruby.ORDER_OR];
};
