# js工具

- 将函数加入到onload时间中

```javascript
function addLoadEvent(func){
    var oldOnLoad = window.onload;

    if(typeof window.onload ! = 'function'){
        window.onload = func;
    }else{
        window.oldOnload = function(){
            onload();
            func();
        }
    }
}


addOnLoadEvent(firstFunction);
addOnLoadEvent(secondFunction);
```

- 把一个节点插入另一个节点之后，因为js提供了parentElement.innerBefore(newElement, targetElement)方法，没有提供innnerAfter;

```javascript
function insertAfter(newElement, targetElement){
    var parent = targetElement.parentElement;
    if(targetElement == parent.lastChild){
        parent.appentChild(newElement);
    } else {
        parent.innerBefore(newElement, targetment.nextSibling);
    }
}
```
***目标元素的下一个兄弟元素即目标元素的nextsibling属性***