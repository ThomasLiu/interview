# interview
web 前端面试题目

[使用css实现一个持续的动画效果](https://thomasliu.github.io/interview/animation.html)


[使用js实现一个持续的动画效果](https://thomasliu.github.io/interview/requestAnimationFrame.html)


[对Flex的应用了解](https://thomasliu.github.io/interview/flex.html)

### 四种定位的区别
+ static 是默认值
+ relative 相对定位 相对于自身原有位置进行偏移，仍处于标准文档流中
+ absolute 绝对定位 相对于最近的已定位的祖先元素, 有已定位(指 - position不是static的元素)祖先元素, 以最近的祖先元素为参考标准。如果无已定位祖先元素, 以body元素为偏移参照基准, 完全脱离了标准文档流。
+ fixed 固定定位的元素会相对于视窗来定位,这意味着即便页面滚动，它还是会停留在相同的位置。一个固定定位元素不会保留它原本在页面应有的空隙。


### 移动端适配怎么做的？
使用媒体查询做的响应式布局，根据不同屏幕宽度加载不同css. 
[详解](https://www.jianshu.com/p/536acc447d22)

[让浏览器支持es6](https://thomasliu.github.io/interview/babel.html)

### let与var的区别？
+ var 声明的变量，其作用域为该语句所在的函数内，且存在变量提升现象
+ let 为 ES6 新添加申明变量的命令，它类似于 var，但是有以下不同：
+ let 声明的变量，其作用域为该语句所在的代码块内，不存在变量提升
+ let 不允许重复声明.


### 为什么 var 可以重复声明？

因为编辑器会在判断有已经声明的同名变量时忽略var，然后直接赋值

#### 原理
在JS代码运行过程中：

+ 引擎负责整个代码的编译以及运行
+ 编译器则负责词法分析、语法分析、代码生成等工作
+ 作用域负责维护所有的标识符（变量）。
```
var a = 2;
var a = 3;
a = 4;
alert(a); // 4
```
当我们执行上面的代码时，我们可以简单的理解为新变量分配一块儿内存，命名为a，并赋值为2，但在运行的时候编译器与引擎还会进行两项额外的操作：判断变量是否已经声明

- 重复声明时：首先编译器对代码进行分析拆解，从左至右遇见var a，则编译器会询问作用域是否已经存在叫a的变量了。如果不存在，则在作用域声明一个新的变量a；若已经存在，则忽略 var 继续向下编译，这时 a = 2被编译成可执行的代码供引擎使用。
- 赋值时：引擎遇见a=2时同样会询问在当前的作用域下是否有变量a。若存在，则将a赋值为2（由于第一步编译器忽略了重复声明的var，且作用域中已经有a，所以重复声明会发生值的覆盖而不会报错）；若不存在，则顺着作用域链向上查找，若最终找到了变量a则将其赋值2，若没有找到，则在作用域声明一个变量a并赋值为2（这就是为什么第二段代码可以正确执行且a变量为全局变量的原因，当然，在严格模式下JS会直接抛出异常：a is not defined）。

### Promise 的使用
封装一个函数，参数是定时器的时间，.then执行回调函数。
```
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
```
[promise](https://thomasliu.github.io/interview/promise.html)