import { foo} from "./profile3_export.js";
console.log(foo);

setTimeout(()=>{
    console.log(foo);
},2500)