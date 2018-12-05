## 字符串的扩展
 
###  字符的 Unicode 表示法
 
- JavaScript 允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的 Unicode 码点。  
但是，这种表示法只限于码点在 **\u0000~\uFFFF**之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
 
- ES6以前，JS采用UTF-16字符编码，每16位序列是一个编码单元，代表一个字符。 后来又引入代理对（surrogate pair）,规定用2个   
16位 编码单元表示一个码位。  
 
 
```
"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"
```

ES6改进:只要将码点放入**大括号**，就能正确解读该字符。

```
"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"
```

 
 
### 1 字符串的遍历器接口 for of

```
	 //字符串的遍历器接口 
	 //遍历器最大的优点是可以识别大于0xFFFF的码点,传统的for循环不可以
	 let text = String.fromCodePoint(0x20BB7);
 
	for (let i of text) {
	  console.log(i);
	}
	// "𠮷"
```


### 2 针对码点大于0xFFFF的字符的一些方法
 
* fromCodePoint         从从码点返回对应字符   es5:fromCharCode
* codePointAt           根据字符下标返回一个字符的码点  es5: charCodeAt

```
 
	 //fromCodePoint  es5:fromCharCode
	String.fromCodePoint(0x20BB7)；// "𠮷"
	
	// codePointAt  es5: charCodeAt
	let s = '𠮷a';
	s.codePointAt(0) // 134071
``` 

### 3 新增的方法
* startsWith
* endsWith
* includes
* repeat   参数是负数或者Infinity，会报错 ； 果是小数，会被取整。
* padStart()        padStart()用于字符串头部补全
* padEnd()          padEnd()用于字符串尾部补全
* String.raw 



```
	// 新增的方法
	let s = "Hello world";
	s.startsWith("Hello");//true
	s.endsWith("world"); //true
	s.includes("o"); //true

	//支持第二个参数，表示开始搜索的位置；
	s.startsWith('world', 6) // true
	s.endsWith('Hello', 5) // true
	s.includes('Hello', 6) // false
	
	//repeat  参数是负数或者Infinity，会报错 ； 果是小数，会被取整。
	'x'.repeat(3) // "xxx"
	'hello'.repeat(2) // "hellohello"
	'na'.repeat(0) // ""
	'na'.repeat(Infinity);// RangeError
	'na'.repeat(-1);// RangeError
	'na'.repeat(2.9); //"nana"

	//padStart()，padEnd()
	'x'.padStart(5, 'ab') // 'ababx'
	'x'.padStart(4, 'ab') // 'abax'

	'x'.padEnd(5, 'ab') // 'xabab'
	'x'.padEnd(4, 'ab') // 'xaba'
```

String.raw   
往往用来充当模板字符串的处理函数,返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串,对应于替换变量后的模板字符串      
String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，应该是一个具有raw属性的对象，且raw属性的值应该是一个数组。   


```
String.raw`Hi\n${2+3}!`;
// 返回 "Hi\\n5!" 。  注意：控制台输出"Hi\n5，即 \n并非时换行了，为\\n

//对比
console.log(`Hi\n${2+3}!`)
输出：
Hi
5!


String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
// 't0e1s2t'


```


### 模板字符串 
 
- 模板字符串（template string）是增强版的字符串，用反引号（`）标识
- 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
- 模板字符串的空格和换行，都是被保留的
- 模板字符串的大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
- 模板字符串之中还能调用函数（`foo ${fn()} bar`）
- 模板字符串甚至还能嵌套

```
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;

const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];

console.log(tmpl(data));
// <table>
//
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
//
// </table>

```


### 标签模板
函数的第一个参数是一个数组，该数组的成员是模板字符串中**那些没有变量替换的部分**，    
也就是说，变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推

```
let a = 5;
let b = 10;


function tag(s, v1, v2) {  //
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return "OK";
}

tag`Hello ${ a + b } world ${ a * b}`; //第一个参数为数组，由模板字符串中的变量（此例中为 ${a+b}/${a*b}分割后的字符串数组
//即为[ "Hello "," world ",""];
//后续的参数为 模板字符串中的变量 ${a+b}、${a*b}
//Hello 
//world 
//""
// 15
// 50
// "OK"
```

