# 常用操作以及概念

## 快捷键

- Tab：命令和文件名补全；
- Ctrl+C：中断正在运行的程序；
- Ctrl+D：结束键盘输入（End Of File，EOF）

## 目录

![目录1](../img/目录_1.jpg)
![目录2](../img/目录_2.jpg)
![目录3](../img/目录_3.jpg)

## 求助

### --help

指令的基本用法与选项介绍。

### man

man 是 manual 的缩写，将指令的具体信息显示出来。

当执行`man date`时，有 DATE(1) 出现，其中的数字代表指令的类型，常用的数字及其类型如下：

| 代号 | 类型 |
| :---: | --- |
| 1 | 用户在 shell 环境中可以操作的指令或者可执行文件 |
| 5 | 配置文件 |
| 8 | 系统管理员可以使用的管理指令 |

### info

info 与 man 类似，但是 info 将文档分成一个个页面，每个页面可以进行跳转。

### doc

/usr/share/doc 存放着软件的一整套说明文件。

## 关机

### who

在关机前需要先使用 who 命令查看有没有其它用户在线。

### sync

为了加快对磁盘文件的读写速度，位于内存中的文件数据不会立即同步到磁盘上，因此关机之前需要先进行 sync 同步操作。

### shutdown

```html
# shutdown [-krhc] 时间 [信息]
-k ： 不会关机，只是发送警告信息，通知所有在线的用户
-r ： 将系统的服务停掉后就重新启动
-h ： 将系统的服务停掉后就立即关机
-c ： 取消已经在进行的 shutdown 指令内容
```

## PATH

可以在环境变量 PATH 中声明可执行文件的路径，路径之间用 : 分隔。

```html
/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/dmtsai/.local/bin:/home/dmtsai/bin
```

env 命令可以获取当前终端的环境变量。

## sudo

sudo 允许一般用户使用 root 可执行的命令，不过只有在 /etc/sudoers 配置文件中添加的用户才能使用该指令。

## 包管理工具

RPM 和 DPKG 为最常见的两类软件包管理工具。RPM 全称为 Redhat Package Manager，最早由 Red Hat 公司制定实施，随后被 GNU 开源操作系统接受并成为很多 Linux 系统 (RHEL) 的既定软件标准。与 RPM 进行竞争的是基于 Debian 操作系统 (UBUNTU) 的 DEB 软件包管理工具 DPKG，全称为 Debian Package，功能方面与 RPM 相似。

YUM 基于 RPM，具有依赖管理功能，并具有软件升级的功能。

## 发行版

Linux 发行版是 Linux 内核及各种应用软件的集成版本。

| 基于的包管理工具 | 商业发行版 | 社区发行版 |
| :---: | :---: | :---: |
| RPM | Red Hat | Fedora / CentOS |
| DPKG | Ubuntu | Debian |

## VIM 三个模式

- 一般指令模式（Command mode）：VIM 的默认模式，可以用于移动游标查看内容；
- 编辑模式（Insert mode）：按下 "i" 等按键之后进入，可以对文本进行编辑；
- 指令列模式（Bottom-line mode）：按下 ":" 按键之后进入，用于保存退出等操作。

<div align="center"> <img src="../pics//5942debd-fc00-477a-b390-7c5692cc8070.jpg" width="400"/> </div><br>

在指令列模式下，有以下命令用于离开或者保存文件。

| 命令 | 作用 |
| :---: | :---: |
| :w | 写入磁盘|
| :w! | 当文件为只读时，强制写入磁盘。到底能不能写入，与用户对该文件的权限有关 |
| :q | 离开 |
| :q! | 强制离开不保存 |
| :wq | 写入磁盘后离开 |
| :wq!| 强制写入磁盘后离开 |

## 时间
******
mtime(modification time)

    当该文件的『内容数据』变更时，就会更新这个时间！内容数据指的是文件的内容，而不是文件的属性或权限

ctime(status time)

    当该文件的『状态(』改变时，就会更新这个时间，举例来说，像是权限与属性被更改了，都会更新这个时间啊。

atime(access time)

    当『该文件的内容被取用』时，就会更新这个读取时间(access)。举例来说，我们使用cat去读取/etc/man_db.conf就会更新该文件的 atime 了。