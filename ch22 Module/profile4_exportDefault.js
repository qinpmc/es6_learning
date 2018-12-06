export default function (msg){
    console.log(msg);
}

export function each(arr){
    for(let i of arr){
        console.log(i);
    }
}
export {each as forEach};

/*export default var a = -99; // 错误   Unexpected token var*/

