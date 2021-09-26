console.log("hello node");       
    
function sum(param){
    let ans=0;
    for(let i=1; i<=param; i++){
        ans+=i;
    }
    // console.log(ans)
    return ans;
} ;
// sum(10)
 
console.log(sum(6)); 
console.log(sum(100));
