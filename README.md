# helper.js

## delay(fn, duration=0)
setTimeout shortcut
```js
  delay(function(){
    //...
  }, 5000)
```

## wait(obj, resolved=true, duration)
test async function

```js
async function fetch(){
  try{
    let data = await wait({
      code: 0
    });
  }catch(e){
    console.error(e)  
  }
}
```

## queuer()
simple queue manager
```js
  let queue = queuer();
  
  queue.exec(()=>{
    console.log(1)
  })
  queue.exec(()=>{
    console.log(2)
  });
  
  wait().then(()=>{
    queue.ready();
  })
  
  queue.exec(()=>{
    console.log(3)
  })
  
  //result: 1, 2, 3
```
