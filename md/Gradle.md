## Gradle

### 基础

和Maven一样，·radle只是提供了构建项目的一个框架，真正起作用的是Plugin。Gradle在默认情况下为我们提供了许多常用的Plugin，
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
其实就是一个groovy中的方法，而大括号之间的内容则表示传递给task()方法的一个闭包。

拷贝文件的Task

    task copyFile(type: Copy) {
       from 'xml'
       into 'destination'
    }
    
Task之间可以存在依赖关系，比如taskA依赖于taskB，那么在执行taskA时，Gradle会先执行taskB，
然后再执行taskA。声明Task依赖关系的一种方式是在定义一个Task的时候：

    task taskA(dependsOn: taskB) {
       //do something
    }
    
Gradle在默认情况下为我们提供了几个常用的Task：

- gradle tasks  显示当前Project中定义的所有Task
- gradle properties  用于显示一个Project所包含的所有Property
- gradle dependencies  用于显示project的依赖信息
- gradle project 显示所有的project，包含根project和子project

### 创建Task的多种方法

Gradle的Project从本质上说只是含有多个Task的容器，一个Task与Ant的Target相似，
表示一个逻辑上的执行单元。我们可以通过很多种方式定义Task，所有的Task都存放在Project的TaskContainer中。

-------

**1. 调用project的task()方法创建Task**

- 创建Task最常见的方式：

```
task hello1 << {
   println 'hello1'
}
```
这里的“<<”表示追加的意思，即向hello中加入执行过程

- 使用doLast来达到同样的效果

```doLast
task hello2 {
   doLast {
      println 'hello2'}
}
```

- doFirst

```doFirst
task hello3 {
   doFirst {
      println 'hello3'}
}
```
**2. 通过TaskContainer的create()方法创建Task**

通过task()方法创建的Task都被存放在了TaskContainer中，而Project又维护了一个TaskContainer类型的属性tasks，可以直接向TaskContainer里面添加Task。

```html
tasks.create(name: 'hello4') << {
   println 'hello4'
}
```

**声明Task之间的依赖关系**

Task之间是可以存在依赖关系，比如TaskA依赖TaskB，那么在执行TaskA时，Gradle会先执行TaskB，再执行TaskA。

```html  在定义一个Task的同时声明他的依赖关系 dependsOn
task hello5(dependsOn:hello4) << {
    println 'hello5'
}
```
OR
```html  先定义Task，然后声明依赖
task hello6 << {
   println 'hello6'
}

hello6.dependsOn hello5
```

**4. 配置Task**

配置Task的property的三种方法：

- 定义Task的时候配置property
```html
task hello7 << {
   description = "this is hello7" 
   println description
}
```
- 通过闭包的方式来配置一个已有的Task
```html
task hello8 << {
println description
}

hello8 {
description = "this is hello8"
}
```
- 通过调用Task的configure()方法完成Property的设置

```html
task hello9 << {
   println description
}

hello9.configure {
   description = "this is hello9"
}
```

### Gradle语法

Gradle是一种声明式的构建工具。在执行时，Gradle并不会一开始便顺序执行build.gradle文件中的内容，
而是分为两个阶段，第一个阶段是配置阶段，然后才是实际的执行阶段。在配置阶段，
Gradle将读取所有build.gradle文件的所有内容来配置Project和Task等，比如设置Project和Task的Property，处理Task之间的依赖关系等。

```html
task showDescription1 << {
   description = 'this is task showDescription'
   println description
}

task showDescription2 << {
   println description
}
showDescription2.description = 'this is task showDescription'

task showDescription3 << {
   println description
}

showDescription3 {
   description = 'this is task showDescription'
}
```
以上3个Task完成的功能均相同，即先设置Task的description属性，在将其输出到命令行。
但是，他们对description的设置方式是不同的。对于showDescription1，我们在定义一个Task的同时便设置description；
对于showDescription2，其本身便是Project的一个Property；而对于showDescription3，我们是在一个和它同名的方法中设置description。

对于每一个Task，Gradle都会在Project中创建一个同名的Property，所以我们可以将该Task当作Property来访问，
showDescription2便是这种情况。另外，Gradle还会创建一个同名的方法，该方法接受一个闭包，
我们可以使用该方法来配置Task，showDescription3便是这种情况。

### Gradle手动创建Springboot项目（也可以使用Spring Initializr自动创建）

1. 新建一个工程目录 mkdir todo

2. 在此目录下使用gradle初始化 **gradle init**命令

这个命令建立一个使用gradle管理进行管理的项目模版：

- build.gradle : 管理和配置工程的核心文件

- gradlew ：用于linux、unix环境下的gradle wrapepr文件

- gradlew.bat ：用于windows环境下的gradle wrapper文件

- setting.gradle : 用于管理多项目的gradle工程时使用，但项目可以不使用。

- gradle目录 : wapper的jar和属性设置文件所在的文件夹

> 什么是gradle wrapple 不同系统环境下，都能保持相同的构建环境

- ./gradlew <task> : 在*nix平台上运行
- gradlew <task> : 在windows环境上运行