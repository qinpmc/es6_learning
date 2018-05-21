# Module

## Module基本语法

```
//profile1_1.js
export var firstName = "Michael"; //导出方式1
var lastName = "Jondan";
var year = 1958;
export function divide(x,y){    //导出方式1
    return x/y;
}
export{lastName,year};   //导出方式2

//main1.js
import {firstName, lastName, year,divide}  from "./profile1_1.js";
let name = firstName+" "+lastName;
let res1 = divide(year,2);
console.log(name); //Michael Jondan
console.log(res1); //979

// module1.html
<script src="main1.js" type=module ></script>

```



