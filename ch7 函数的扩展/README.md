# 函数的扩展

## 1 函数默认值
```
	// 函数默认值
	function Point(x=0,y=0){
		this.x = x;
		this.y = y;
	}
	const p = new Point();
	console.log(p);
```

## 函数参数变量为默认声明，不能用let和const再次声明  
   使用参数默认值时，函数不能有同名参数
```
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}

// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context

```

## 与解构赋值默认值值结合使用













   
   
   
   