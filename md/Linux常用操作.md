查看日志命令#### 查看系统编码
```
locale
```
#### 修改系统编码
```
LANG=zh.CN.UTF-8
```
#### 查看端口占用情况

```
netstat -nlp |grep :8707
```
#### 查看运行的jar包
```
ps -ef | grep java
```
#### 关闭正在运行的进程
```
kill  + 进程号 或
kill -s + 进程号
kill -9 + 进程号

不所有进程都可以
kill+进程编号结束掉
对于结束不掉的进程可以使用：
kill -s 9 进程编号
强制结束   
```
#### 运行jar包 打印控制台信息到文件中
```
java -jar server.jar &> 文件名 
nohup java -jar com.zrqx.repertory-1.0.0.SNAPSHOT.jar >repertory.log 2>&1 &
```
#### 查看日志命令
```
tail -f -n 20 repertory.log 
1. tail -f filename
   说明：监视filename文件的尾部内容
  （默认10行，相当于增加参数 -n 10），刷新显示在屏幕上。退出，按下CTRL+C。
2. tail -n 20 filename
    说明：显示filename最后20行。
3. tail -n +20 filename
    说明：显示filename前面20行。
4. tail -r -n 10 filename
    说明：逆序显示filename最后10行。
    补充：
    跟tail功能相似的命令还有：
    cat 从第一行开始显示档案内容。
    tac 从最后一行开始显示档案内容。
    more 分页显示档案内容。
    less 与 more 相似，但支持向前翻页
    head 仅仅显示前面几行
    tail 仅仅显示后面几行
    n 带行号显示档案内容
    od 以二进制方式显示档案内容 
```
#### 查看开放的端口
```
more /etc/sysconfig/iptables
```
#### 编辑端口配置
```
vi /etc/sysconfig/iptables
-A INPUT -p tcp -m tcp --dport 3306 -m state --state NEW -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT
```

#### 重启端口服务
```
service iptables restart
```


#### centos7
CentOS7的开放关闭查看端口都是用防火墙来控制的.<br>
查看已经开放的端口：
```
firewall-cmd --list-ports  
```
开启端口
```
firewall-cmd --zone=public --add-port=80/tcp --permanent  
```
命令含义：

–zone #作用域

–add-port=80/tcp #添加端口，格式为：端口/通讯协议

–permanent #永久生效，没有此参数重启后失效

重启防火墙

```
#重启firewall  
firewall-cmd --reload  
#停止firewall  
systemctl stop firewalld.service  
#禁止firewall开机启动  
systemctl disable firewalld.service  
```

ssh 无法连接
```
    chmod 711 /var/empty/sshd
```


mysql重启失败报错ibdata1 Can't determine file permissions

1. 查看配置文件内容指定的pid-file
```
cat /etc/my.cnf
pid-file=/var/run/mysqld/mysqld.pid
```
查看该目录是否存在。如没有，则创建，并修改属主属组。
```
ll /var/run/mysqld/
#不存在
mkdir -p /var/run/mysqld/
chown -R mysql:mysql /var/run/mysqld
```
2. 关闭selinux.并重启。
```
setenforce 0
 service mysqld restart
 systemctl status mysqld.service
```

查看当前目录下文件大小
```
du -h --max-depth=1
```

### 磁盘分区 格式化 检验与挂载

1. 列出系统上所有磁盘列表
```
lsblk [-dfimpt] [device]
选项与参数：
-d ：仅列出磁盘本身，并不会列出该磁盘的分区数据 
-f ：同时列出该磁盘内的文件系统名称 UUID
-i ：使用 ASCII 的线段输出，不要使用复杂的编码 (再某些环境下很有用) 
-m ：同时输出该装置在 /dev 底下的权限数据 (rwx 的数据) 
-p ：列出该装置的完整文件名！而不是仅列出最后的名字而已。 
-t ：列出该磁盘装置的详细数据，包括磁盘队列机制、预读写的数据量大小等

[root@localhost zzf]# lsblk
NAME            MAJ:MIN RM   SIZE RO TYPE MOUNTPOINT
sda               8:0    0   500G  0 disk 
├─sda1            8:1    0    20G  0 part /boot
└─sda2            8:2    0   480G  0 part 
  ├─centos-root 253:0    0 395.2G  0 lvm  /
  ├─centos-swap 253:1    0  64.8G  0 lvm  [SWAP]
  └─centos-home 253:2    0    20G  0 lvm  /home
sr0              11:0    1   792M  0 rom  

列表参数说明:
- NAME ：就是装置的文件名啰！会省略 /dev 等前导目录！
- MAJ:MIN ：其实核心认识的装置都是透过这两个代码来熟悉的！分别是主要：次要装置代码
- RM ：是否为可卸除装置 (removable device)，如光盘、 USB 磁盘等等
- SIZE ：当然就是容量啰
- RO ：是否为只读装置的意思
- TYPE ：是磁盘 ( 、 分区 槽 (partition) 还是只读存储器 (rom) 等输出
- MOUTPOINT ：就是前一章谈到的挂载点
```
2. 列出装置的 UUID 等参数
```
[root@localhost zzf]# blkid 
/dev/sda1: UUID="0a311ec7-b2fa-4302-8130-b87708473819" TYPE="xfs" 
/dev/sda2: UUID="22gFEh-1GJe-CB78-4uRf-mFp0-VFfu-8I4OqH" TYPE="LVM2_member" 
/dev/sr0: UUID="2017-09-05-14-14-50-00" LABEL="CentOS 7 x86_64" TYPE="iso9660" PTTYPE="dos" 
/dev/mapper/centos-root: UUID="964808f3-dfd6-47b8-898d-a81be230567f" TYPE="xfs" 
/dev/mapper/centos-swap: UUID="c155f922-2433-49c1-97cf-4a9c07b4e3ba" TYPE="swap" 
/dev/mapper/centos-home: UUID="8c5c89a6-a277-4ca2-9c34-1e7d816f7ccb" TYPE="xfs"
```