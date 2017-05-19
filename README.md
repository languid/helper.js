# helper.js

## wait(obj, resolved=true, duration)
test function

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
