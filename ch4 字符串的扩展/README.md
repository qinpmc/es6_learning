## 字符串的扩展
 
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

* at
* fromCodePoint
* codePointAt

```
	 // 针对码点大于0xFFFF的字符的一些方法
	 //at  es5:charAt
	 '𠮷'.at(0) // "𠮷"


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
* repeat
* padStart()
* padEnd()

```
	// 新增的方法
	let s = "Hello world";
	s.startsWith("Hello");//true
	s.endsWith("world"); //true
	s.includes("o"); //true

	//支持第二个参数，表示开始搜索的位置
	s.startsWith('world', 6) // true
	s.endsWith('Hello', 5) // true
	s.includes('Hello', 6) // false
	
	//repeat 
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

