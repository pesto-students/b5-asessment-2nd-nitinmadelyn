const isOpen  = (openBrace) =>  (openBrace === '[' || openBrace == '{' || openBrace == '(');
const isClose = (closeBrace) => (closeBrace == ']' ||  closeBrace == '}' || closeBrace == ')');
const isBoth = (firstBrace, secondBrace) => ((firstBrace == '[' && secondBrace == ']') 
                                    || (firstBrace == '{' && secondBrace == '}') 
                                    || (firstBrace == '(' && secondBrace == ')'));

const balancedBraces = (args) => {
  let stack = new Array();
  for(let brace of args) {
    if(isOpen(brace)) {
      stack.push(brace);
    } else if(isClose(brace)) {
      if(stack.length == 0)
        return false;

      const open = stack.pop();
      if(!isBoth(open,brace))
        return false;
    }
  }
  return (stack.length == 0);
}

exports = { balancedBraces };
