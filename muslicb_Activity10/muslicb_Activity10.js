// function sleep (t) {
// return new Promise((resolve, reject) =>
// {
// console.log("running promise");
// setTimeout(() => {
// console.log("running timer");
// resolve()
// }, t)
// })
// }
// sleep(3000);
// function nosleep(t){
// return new Promise((resolve, reject) => {
// console.log("running promise");
// setTimeout(() => {
// console.log("running timer");
// reject(new Error("Whoops!"));
// }, t);
// });
// }
// nosleep(3000);
// function myresolve(t){
//     return "Sucess!! Promise waited ["+t+"]ms";
//     }
//     function sleep (t) {
//     let mypromise = new Promise((resolve, reject) => {
//     setTimeout(() => {resolve(myresolve(t))}, t)
//     });
//     mypromise.then(
//     result => alert(result),
//     error => alert(error)
//     );
//     }
//     sleep(3000);

// function myreject(t) {
//     return new Error("Whoops! after "+t+"ms");
//     }
//     function nosleep(t){
//     let mypromise = new Promise((resolve, reject) => {
//     setTimeout(() => {reject(myreject(t));}, t);
//     });
//     mypromise.then(
//     result => alert(result),
//     error => alert("Ultra-"+error)
//     );
//     }
//     nosleep(3000);

function myresolve(t){
    return "Sucess!! Promise waited ["+t+"] ms";
    }
    function sleep (t) {
    let mypromise = new Promise((resolve, reject) => {
    setTimeout(() => {resolve(myresolve(t))}, t)
    });
    mypromise.then(
    result => {
    let container = document.getElementById("promisehere");
    let div = document.createElement("div");
    div.innerHTML= result;
    container.appendChild(div);
    },
    error => alert(error)
    );
    }
    sleep(3000);
