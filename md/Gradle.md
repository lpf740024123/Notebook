## Gradle

和Maven一样，Gradle只是提供了构建项目的一个框架，真正起作用的是Plugin。Gradle在默认情况下为我们提供了许多常用的Plugin，
其中包括有构建Java项目的Plugin，还有War，Ear等。与Maven不同的是，Gradle不提供内建的项目生命周期管理，
只是java Plugin向Project中添加了许多Task，这些Task依次执行，为我们营造了一种如同Maven般项目构建周期。

Gradle本身的领域对象主要有Project和Task。Project为Task提供了执行上下文，
所有的Plugin要么向Project中添加用于配置的Property，要么向Project中添加不同的Task。
一个Task表示一个逻辑上较为独立的执行过程，比如编译Java源代码，拷贝文件，打包Jar文件，
甚至可以是执行一个系统命令或者调用Ant。另外，一个Task可以读取和设置Project的Property以完成特定的操作。

最简单的Task，创建一个build.gradle文件

    task helloWorld << {
       println "Hello World!"
    }
    
这里的“<<”表示向helloWorld中加入执行代码——其实就是groovy代码。Gradle向我们提供了一整套DSL，
所以在很多时候我们写的代码似乎已经脱离了groovy，但是在底层依然是执行的groovy。比如上面的task关键字，
其实就是一个groovy中的方法，而大括号之间的内容则表示传递给task()方法的一个闭包。除了“<<”之外，
我们还很多种方式可以定义一个Task。

