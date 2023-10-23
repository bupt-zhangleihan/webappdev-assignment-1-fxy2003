// script.js
// 所有的报价
const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
    'I never make exceptions. An exception disproves the rule.',
    'What one man can invent another can discover.',
    'Nothing clears up a case so much as stating it to another person.',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];

  // 存储单词列表和玩家当前正在键入的单词的索引
  let words = [];
  let wordIndex = 0;
  
  // 开始时间
  let startTime;
  
  // 页面元素
  const quoteElement = document.getElementById('quote');
  const messageElement = document.getElementById('message');
  const typedValueElement = document.getElementById('typed-value');
  
  // 添加按钮点击事件监听器
  document.getElementById('start').addEventListener('click', () => {
    // 获取报价
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    
    // 将引号放入单词数组中
    words = quote.split(' ');
    
    // 重置单词索引以进行跟踪
    wordIndex = 0;
    
    // 用户界面更新
    // 创建一个 span 元素数组，以便我们可以设置一个类
    const spanWords = words.map(function(word) {
      return `<span>${word} </span>`;
    });
    
    // 转换为字符串并在引号显示上设置为内部HTML
    quoteElement.innerHTML = spanWords.join('');
    
    // 突出显示第一个单词
    quoteElement.childNodes[0].className = 'highlight';
    
    // 清除任何先前的消息
    messageElement.innerText = '';
    
    // 设置文本框
    // 清除文本框
    typedValueElement.value = '';
    // 设置焦点
    typedValueElement.focus();
    
    // 设置事件处理程序
    typedValueElement.addEventListener('input', handleTyping);
    
    // 启动计时器
    startTime = new Date().getTime();
  });
  
  // 处理输入的函数
  function handleTyping() {
    // 获取当前单词
    const currentWord = words[wordIndex];
    // 获取当前值
    const typedValue = typedValueElement.value;
    
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // 句尾，显示成功
      const elapsedTime = new Date().getTime() - startTime;
      const message = `恭喜！您在 ${elapsedTime / 1000} 秒内完成。`;
      messageElement.innerText = message;
      
      // 禁用事件侦听器
      typedValueElement.removeEventListener('input', handleTyping);
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // 词尾，清除新单词的类型化值元素
      typedValueElement.value = '';
      // 移至下一个词
      wordIndex++;
      // 重置引号中所有元素的类名
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // 突出显示新单词
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // 当前正确，突出显示下一个单词
      typedValueElement.className = '';
    } else {
      // 错误状态
      typedValueElement.className = 'error';
    }
  }
  