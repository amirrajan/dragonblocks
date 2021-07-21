/**
 * @fileoverview Helper functions for generating Ruby for blocks.
 * @author Rabia Alhaffar (steria773@gmail.com)
 */
'use strict';

Blockly.Ruby = new Blockly.Generator('Ruby');

Blockly.Ruby.addReservedWords(
    // Special character
    'HTTP,' +
    '__ENCODING__,__LINE__,__FILE__,BEGIN,END,alias,and,begin,break,case,class,' +
    'def,defined?,do,else,elsif,end,ensure,false,for,if,in,module,next,' +
    'nil,not,or,redo,rescue,require,retry,return,self,super,then,' +
    'true,undef,unless,until,when,while,yield,' +
    "__ary_cmp,__ary_eq,__ary_index,__case_eqq,__coerce_step_counter,__delete,__lines,__method__,__printstr__,__sub_replace,__svalue,__to_int,__to_str,_check_readable,_inspect,_is_socket=,_read_buf,_recvfrom,_setnonblock,_sockaddr_in,_to_array,`,abs,abs2,accept,accept_nonblock,addr,afamily,alive?,all?,any?,arg,arity,asctime,assoc,at,attr_accessor,backtrace,between?,bind,bind_call,block_given?,bool,bsearch,bsearch_index,bytes,bytesize,byteslice,call,canonname,capitalize,capitalize!,casecmp,casecmp?,ceil,chain,chars,chomp,chomp!,chop,chop!,chr,clamp,class,clear,clone,close,close_on_exec=,close_on_exec?,close_write,closed?,codepoints,collect,collect!,combination,compact,compact!,concat,concat_path,conjugate,connect,connect_nonblock,count,cover?,ctime,curry,cycle,data,day,default,default=,default_proc,default_proc=,define_singleton_method,delete,delete!,delete_at,delete_if,delete_prefix,delete_prefix!,delete_suffix,delete_suffix!,detect,difference,dig,div,divmod,do_not_reverse_lookup,downcase,downcase!,downto,drop,drop_while,dst?,dump,dup,each,each_byte,each_char,each_cons,each_index,each_key,each_line,each_pair,each_slice,each_value,each_with_index,each_with_object,empty?,end_with?,entries,eof?,eql?,exception,extend,family,fdiv,feed,fetch,fetch_values,fib,fileno,fill,filter_map,find_all,find_index,finite?,first,flat_map,flatten,flatten!,flock,floor,flush,format,freeze,friday?,frozen?,getbyte,getc,getgm,getlocal,getnameinfo,getpeereid,getpeername,gets,getsockname,getsockopt,getutc,global_variables,gmt?,gmtime,grep,group_by,gsub,gsub!,has_key?,has_value?,hash,hex,hour,id2name,include,include?,index,infinite?,initialize,initialize_copy,inject,insert,inspect,inspect_sockaddr,instance_of?,instance_variable_defined?,instance_variable_get,instance_variable_set,instance_variables,int,intern,intersection,invert,ip?,ip_address,ip_port,ip_unpack,ipv4?,ipv6?,is_a?,isatty,iterator?,join,keep_if,key,key?,keys,kind_of?,last,lazy,length,level,lines,linger,listen,ljust,local_address,local_variables,localtime,loop,lstrip,lstrip!,map,max,max_by,mday,member?,members,merge,merge!,message,meth,method_missing,methods,min,min_by,minmax,minmax_by,mon,monday?,month,mtime,name,nan?,negative?,next,next!,next_values,nil?,none?,nonzero?,obj,object_id,oct,one?,open,optname,ord,owner,p,parameters,partition,path,peek,peek_values,peeraddr,permutation,pfamily,pid,polar,pop,pos,pos=,positive?,prepend,print,printf,private_methods,protected_methods,protocol,public_methods,push,puts,quo,raise,rand,rassoc,read,readchar,readline,readlines,real?,receiver,rectangular,recv,recv_nonblock,recvfrom,recvfrom_nonblock,rehash,reject,reject!,remote_address,remove_instance_variable,replace,respond_to?,result,resume,reverse,reverse!,reverse_each,rewind,rindex,rjust,rotate,rotate!,round,rpartition,rstrip,rstrip!,saturday?,sec,seek,select,select!,send,set_backtrace,setbyte,setsockopt,shift,shutdown,singleton_class,singleton_method,singleton_methods,size,slice,slice!,socktype,sort,sort!,sort_by,source_location,split,sprintf,squeeze,squeeze!,srand,start_with?,step,store,strip,strip!,sub,sub!,succ,succ!,sunday?,super_method,swapcase,swapcase!,sync,sync=,sysaccept,sysread,sysseek,syswrite,take,take_while,tally,tap,thursday?,times,to_a,to_enum,to_f,to_h,to_i,to_int,to_proc,to_r,to_s,to_sockaddr,to_str,to_sym,tr,tr!,tr_s,tr_s!,transfer,transform_keys,transform_keys!,transform_values,transform_values!,transpose,truncate,tuesday?,unbind,ungetc,union,uniq,uniq!,unix?,unix_path,unpack,unshift,upcase,upcase!,upto,usec,utc,utc?,value?,values,values_at,wday,wednesday?,with_index,with_object,write,yday,year,yield,yield_self,zero?,zip,zone," +
    "A,A::B,Addrinfo,ArgumentError,Array,Base,BasicSocket,BinTest_MrubyBinDebugger,CRubyExtension,Comparable,Complex,ComplexLikeNumeric,CustomExp,Derived,EOFError,Enumerable,Enumerator,Enumerator::Chain,Enumerator::Generator,Enumerator::Lazy,Enumerator::Yielder,Errno,File,File::Constants,File::FileError,File::NoFileError,File::PermissionError,File::UnableToStat,Fixnum,Float,FloatDomainError,Foo,FrozenError,Hash,HellRaiser,IO,IOError,IPSocket,IndexError,InlineStructTest,Integer,Integral,Interpreter,Isect,Kernel,KeyError,KlassWithSecret,LocalJumpError,MRuby,Math,Method,MiniRake → MiniRake,MiniRake::DSL,MiniRake::FileTask,MiniRake::Task,Module,NameError,NoMethodError,NotImplementedError,Numeric,Object,Outer,Outer::Inner,Plane,Proc,Rake,RakeApp,Rand,Range,RangeError,Rational,Ray,RegexpError,RubyExtension,Scene,SetOuter,Socket,Socket::Option,SocketError,Sphere,StopIteration,String,Struct,Symbol,TCPServer,TCPSocket,Test4ClassVariableDefined,Test4ClassVariableGet,Test4ClassVariableSet,Test4ClassVariables1,Test4ClassVariables2,Test4InstanceMethodsA,Test4InstanceMethodsB,Test4InstanceMethods,Test4ModuleNesting,Test4ModuleNesting::Test4ModuleNesting2,Test4RemoveClassVariable,Test4RemoveMethod,Test4RemoveMethod::Child,Test4RemoveMethod::Parent,Test4includedModules,Test4includedModules2,TestA,TestB,TestEvalConstScope,Time,ToplevelTestModule1,ToplevelTestModule2,TypeError,UDPSocket,UNIXServer,UNIXSocket,UserDefinedNumeric,Vec,"
    // TBA: DragonRuby stuff
);

Blockly.Ruby.ORDER_ATOMIC = 0;          // literals
Blockly.Ruby.ORDER_HIGH = 1;            // Function calls, Arrays
Blockly.Ruby.ORDER_EXPONENTIATION = 2;  // **
Blockly.Ruby.ORDER_UNARY = 3;           // ! # - ~
Blockly.Ruby.ORDER_MULTIPLICATIVE = 4;  // * / %
Blockly.Ruby.ORDER_ADDITIVE = 5;        // + -
Blockly.Ruby.ORDER_CONCATENATION = 6;   // #{}
Blockly.Ruby.ORDER_RELATIONAL = 7;      // < > <=  >= ~= ==
Blockly.Ruby.ORDER_AND = 8;             // &&
Blockly.Ruby.ORDER_OR = 9;              // ||
Blockly.Ruby.ORDER_NONE = 99;

Blockly.Ruby.isInitialized = false;

Blockly.Ruby.init = function(workspace) {
  Object.getPrototypeOf(this).init.call(this);

  if (!this.nameDB_) {
    this.nameDB_ = new Blockly.Names(this.RESERVED_WORDS_);
  } else {
    this.nameDB_.reset();
  }
  this.nameDB_.setVariableMap(workspace.getVariableMap());
  this.nameDB_.populateVariables(workspace);
  this.nameDB_.populateProcedures(workspace);

  this.isInitialized = true;
};

Blockly.Ruby.finish = function(code) {
  var definitions = Blockly.utils.object.values(this.definitions_);
  code = Object.getPrototypeOf(this).finish.call(this, code);
  this.isInitialized = false;

  this.nameDB_.reset();
  return definitions.join('\n\n') + '\n\n\n' + code;
};

Blockly.Ruby.scrubNakedValue = function(line) {};

Blockly.Ruby.quote_ = function(string) {
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return "\"" + string + "\"";
};

Blockly.Ruby.multiline_quote_ = function(string) {
  var lines = string.split(/\n/g).map(this.quote_);
  return lines.join('#{\'\\n\'}\n');
};

Blockly.Ruby.scrub_ = function(block, code, opt_thisOnly) {
  var commentCode = '';
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    var comment = block.getCommentText();
    if (comment) {
      comment = Blockly.utils.string.wrap(comment, this.COMMENT_WRAP - 3);
      commentCode += this.prefixLines(comment, '# ') + '\n';
    }
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.inputTypes.VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = opt_thisOnly ? '' : this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
