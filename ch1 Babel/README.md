
## ES6 ת��
* Window7������32λ  
* ��װbabel  
npm install babel-cli -g (ȫ�ְ�װbabel-cli);  
npm install babel-cli babel-preset-es2015 --save-dev(���ذ�װ);

�����Ŀ��û��.babelrc�ļ����Լ�����һ��.babelrc�ļ�����windows���ȴ���һ��txt�ļ���Ȼ�����޸�Ϊ.babelrc.�ļ���
����.babelrc�ļ�����Ϊ:
```
{
    "presets": [
        "es2015"
    ],
    "plugins": [

    ]
}
```  
* ����ES6����ΪES5    
1. ׼�������ļ�bableTest1.js��
```
	let fun = () => console.log('babel')
```

2. cmd���������babel bableTest1.js -o babled1.js

3. ת����ļ�babled1.js
```
	'use strict';

	var fun = function fun() {
	  return console.log('babel');
	};
```





