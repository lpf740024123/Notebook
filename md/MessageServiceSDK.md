# Message Service SDK

- 项目依赖

msg-svc-api-1.0.1.0.jar

msg-svc-common-1.0.1.0.jar

msg-svc-core-1.0.1.0.jar

spring-boot-start-msgsvc.jar (可选,如在spring boot环境下该jar包可实现自动配置)

rocketmq-client-4.2.0.jar

### 简介

MsgSdk具有如下功能

- 1.消息异步发送

生产者向消息发送器注册监听，消息发送时程序不会阻塞，当消息发送完毕或出现异常时会回调注册的监听接口。

- 2.消息同步发送

生产者消息发送时程序阻塞，待发送完毕后程序继续执行。

- 3.消息Pull式接收

    消费者定时从队列中拉取消息。

- 4.消息Push式接收

    消费者监听队列，当队列中被压入新消息后会自动推送到消费者。

- 5.发送事务性消息

- 6.支持原生rocketMq调用

- 7.创建主题查询队列偏移量

- 8.消息查询

- 9.通过获取原生对象的方式可支持RocketMq客户端的所有功能。

### 生产者

- 简单生产者

具有最简单的消息发送功能

|     |方法名|描述|参数|参数类型|参数描述|
|:---:|---|---|---|---|---|
|1|sendAsync|异步发送消息|1.msg 2.topic 3.tag 4.keys 5.flag 6.waitStoreMsgOK 7.retryTimesWhenSendAsyncFailed 8.sendMsgHandler
|


简介
MsgSdk具有如下功能

1.消息异步发送

生产者向消息发送器注册监听，消息发送时程序不会阻塞，当消息发送完毕或出现异常时会回调注册的监听接口。

2.消息同步发送

生产者消息发送时程序阻塞，待发送完毕后程序继续执行。

3.消息Pull式接收

消费者定时从队列中拉取消息。

4.消息Push式接收

消费者监听队列，当队列中被压入新消息后会自动推送到消费者。

5.发送事务性消息

6.支持原生rocketMq调用

7.创建主题查询队列偏移量

8.消息查询

9.通过获取原生对象的方式可支持RocketMq客户端的所有功能。

生产者
1.简单生产者

具有最简单的消息发送功能


方法名	描述	参数	参数类型	参数描述
1	sendAsync	异步发送消息	
1.msg

2.topic

3.tag

4.keys

5.flag

6.waitStoreMsgOK

7.retryTimesWhenSendAsyncFailed

7.sendMsgHandler

String

String

String

String

Integer

Boolean

Integer

Interface

消息内容

推送主题

标签

关键字

用户自定义标志位（消费者可接收）

是否等待broker回送结果

当消息发送失败后生产者内部自动重试次数

回调接口

2	sendSync	同步发送消息	
1.msg

2.topic

3.tag

4.keys

5.flag

6.waitStoreMsgOK

String

String

String

String

Integer

Boolean

消息内容

推送主题

标签

关键字

用户自定义标志位（消费者可接收

是否等待broker回送结果

3	start	启动生产者	


4	shutdown	停止生产者	




2.代理生产者

    具有比简单生产者更全面的功能


方法名	描述	参数	参数类型	参数描述
1	sendAsync	异步发送消息	
1.msg

2.topic

3.tag

4.keys

5.flag

6.waitStoreMsgOK

7.retryTimesWhenSendAsyncFailed

7.sendMsgHandler



String

String

String

String

Integer

Boolean

Integer

ISendMsgHandler


消息内容

推送主题

标签

关键字

用户自定义标志位（消费者可接收） 

是否等待broker回送结果

当消息发送失败后生产者内部自动重试次数

回调接口

2	sendSync	同步发送消息	
1.msg

2.topic

3.tag

4.keys

5.flag

6.waitStoreMsgOK

String

String

String

String

Integer

Boolean

消息内容

推送主题

标签

关键字

用户自定义标志位（消费者可接收

是否等待broker回送结果

3	start	启动生产者	


4	shutdown	停止生产者	


5	sendMessageInTransaction	
发送事务性消息

msg
tranExecuter
arg
String

LocalTransactionExecuter
Object

消息内容

本地事务执行器

参数与本地事务执行器一起使用

6	createTopic	创建主题	
key
newTopic
queueNum
String

String

Integer

访问秘钥

新的主题

主题的队列数

7	searchOffset	搜索给定时间戳的消耗队列偏移量	
mq
timestamp
MessageQueue 
Long
队列实例

时间戳

8	maxOffset	查询给定消息队列的最大偏移量	
mq
MessageQueue
队列实例
9	minOffset	查询给定消息队列的最小偏移量	
mq
MessageQueue
队列实例
10	earliestMsgStoreTime	查询最早的消息存储时间	
mq
MessageQueue
队列实例
11	viewMessage	根据给定的偏移量id查找消息	
offsetMsgId
String	偏移量ID
12	queryMessage	根据给定的消息ID查找消息	
topic
key
maxNum
begin
end
String

String

Integer

Long

Long

主题

关键字

消息数量

起始偏移量

结束偏移量


3.原生生产者

    直接返回没有经过封装的原生生产者，原生生产者的使用方式请参考RocketMq官方文档http://rocketmq.apache.org/

消费者
1.Pull模式消费者

    此模式的消费者模式会定期从RocketMq中拉取消息。

2.Push模式消费者

    此模式的消费者会监听RocketMq中的队列变化，RocketMq会推送消息至当前消费者。

生产者/消费者的获取方式
1.原生方式获取。

    原生获取方式，你需要构造一个具有AbsMsgSvcConfig类型的配置对象，通过调用工厂方法获取。

2.基于SpringBoot的方式获取。

    基于SpringBoot的方式你不需要构造配置对象，只需将配置信息写入application.properties，Sdk会自动解析你的配置文件并将工厂对象注入到你的程序中。

原生方式获取示例（生产者）
// 构造配置文件
DefaultMsgSvcConfig defaultMsgSvcConfig = new DefaultMsgSvcConfig();
defaultMsgSvcConfig.setNameServerAddresses("nameServerAddresses");

// 获取工厂实例
IProducerFactory producerFactory = ProducerFactory.getInstance();

// 使用工厂实例获取生产者实例
ISimpleProducer iMsgProducer = producerFactory.getSimpleProducer("ProducerGroup", defaultMsgSvcConfig);

// 启动生产者
iMsgProducer.start();

// 使用生产者实例发送消息
iMsgProducer.sendSync("Msg", "Topic", "Tag");

// 关闭生产者
iMsgProducer.shutdown();
原生方式获取示例（消费者 - Pull模式）
	// 构造配置对象
	AbsMsgSvcConfig msgSvcConfig = new DefaultMsgSvcConfig();
    msgSvcConfig.setNameServerAddresses("nameServerAddresses");
	
	// 获取工厂实例
    IConsumerFactory consumerFactory = ConsumerFactory.getInstance();
    DefaultMQPullConsumer consumer = consumerFactory.getOriginalPullConsumer("ConsumerGroup", msgSvcConfig);
    
    // 启动消费者
    consumer.start();
    
    //拉取订阅主题的队列，默认队列大小是4
    Set<MessageQueue> mqs = consumer.fetchSubscribeMessageQueues("Topic");
    for (MessageQueue mq : mqs) {
        System.out.println("Consume from the queue: " + mq);
        SINGLE_MQ:while(true){
            try {

                PullResult pullResult = consumer.pullBlockIfNotFound(mq, "Tag", getMessageQueueOffset(mq), 32);
                List<MessageExt> list=pullResult.getMsgFoundList();
                if(list!=null && list.size() < 100){
                    for(MessageExt msg:list){
                        System.out.printf(Thread.currentThread().getName() + " Receive New Messages: " + new String(msg.getBody()) + "%n");
                    }
                }
                System.out.println(pullResult.getNextBeginOffset());
                putMessageQueueOffset(mq, pullResult.getNextBeginOffset());

                switch (pullResult.getPullStatus()) {
                    case FOUND:
                        break;
                    case NO_MATCHED_MSG:
                        break;
                    case NO_NEW_MSG:
                        break SINGLE_MQ;
                    case OFFSET_ILLEGAL:
                        break;
                    default:
                        break;
                }
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    consumer.shutdown();
}
原生方式获取示例（消费者 - Push模式）
	// 构造配置对象
    AbsMsgSvcConfig msgSvcConfig = new DefaultMsgSvcConfig();
    msgSvcConfig.setNameServerAddresses("nameServerAddresses");
    
    // 获取工厂实例
    IConsumerFactory consumerFactory = ConsumerFactory.getInstance();
    
    // 通过工厂实例获取消费者实例
    DefaultMQPushConsumer pushConsumer = consumerFactory.getOriginalPushConsumer("ConsumerGroup", msgSvcConfig);

    pushConsumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET);

    pushConsumer.subscribe("Topic", "Tag");

    pushConsumer.registerMessageListener(new MessageListenerOrderly() {

        AtomicLong consumeTimes = new AtomicLong(0);

        @Override
        public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs, ConsumeOrderlyContext context) {
            context.setAutoCommit(true);
            System.out.printf(Thread.currentThread().getName() + " Receive New Messages: " + new String(msgs.get(0).getBody()) + "%n");
            return ConsumeOrderlyStatus.SUCCESS;

        }

    });
    
    // 启动消费者
    pushConsumer.start();

}
SpringBoot方式获取示例（生产者）
// 注入工厂实例
@Autowired
private SpringMsgSvcProducerFactory springMsgSvcProducerFactory;

@Test
public void runTest() throws Exception {
    
    // 通过工厂实例获取生产者实例
    ISimpleProducer iSimpleProducer = springMsgSvcProducerFactory.getSimpleProducer("ProducerGroup");
    
    // 启动生产者
    iSimpleProducer.start();
    SendResult sendResult = iSimpleProducer.sendSync("Msg", "Topic");
    iSimpleProducer.shutdown();

    System.out.println(sendResult);

}
SpringBoot方式获取示例（消费者 - Push模式）
@Autowired
private SpringMsgSvcConsumerFactory springMsgSvcConsumerFactory;

@Test
public void runTest() throws Exception {

    DefaultMQPushConsumer pushConsumer = springMsgSvcConsumerFactory.getOriginalPushConsumer("ConsumerGroup");

    pushConsumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_LAST_OFFSET);

    pushConsumer.subscribe("Topic", "Tag");

    pushConsumer.registerMessageListener(new MessageListenerOrderly() {

        AtomicLong consumeTimes = new AtomicLong(0);

        @Override
        public ConsumeOrderlyStatus consumeMessage(List<MessageExt> msgs, ConsumeOrderlyContext context) {
            context.setAutoCommit(true);
            System.out.printf(Thread.currentThread().getName() + " Receive New Messages: " + new String(msgs.get(0).getBody()) + "%n");
            return ConsumeOrderlyStatus.SUCCESS;

        }

    });

    pushConsumer.start();

}

配置说明
####################################### 客户端通用配置 #######################################

# 必填
# 默认值:无
# Name Server 地址列表，多个 NameServer 地址用分号隔开
msgsvc.nameServerAddresses.def = 192.168.1.254:9876

# 默认值:本机IP
# 客户端本机 IP 地址，某些机器会发生无法识别客户端IP 地址情况，需要应用在代码中强制指定
msgsvc.clientIp.def = 192.168.1.2

# 默认值:DEFAULT
# 客户端实例名称，客户端创建的多个 Producer、Consumer 实际是共用一个内部实例（这个实例包含网络连接、线程资源等）
msgsvc.instanceName.def = DEFAULT

# 默认值:4
# 通信层异步回调线程数
msgsvc.clientCallbackExecutorThreads.def = 4

# 默认值:30000
# 轮询 Name Server 间隔时间，单位毫秒
msgsvc.pollNameServerInterval.def = 30000

# 默认值:30000
# 向 Broker 发送心跳间隔时间，单位毫秒
msgsvc.heartbeatBrokerInterval.def = 30000

# 默认值:5000
# 持久化 Consumer 消费进度间隔时间，单位毫秒
msgsvc.persistConsumerOffsetInterval.def = 5000

####################################### Producer通用配置 #######################################

# 默认值:TBW102
# 在发送消息时，自动创建服务器不存在的topic，需要指定 Key。
msgsvc.createTopicKey.def = TBW102

# 默认值:4
# 在发送消息时，自动创建服务器不存在的topic，默认创建的队列数
msgsvc.defaultTopicQueueNum.def = 4

# 默认值:10000
# 发送消息超时时间，单位毫秒
msgsvc.sendMsgTimeout.def = 10000

# 默认值:4096
# 消息 Body 超过多大开始压缩（Consumer收到消息会自动解压缩），单位字节
msgsvc.compressMsgBodyWhenExceedBytes.def = 4096

# 默认值:FALSE
# 如果发送消息返回 sendResult，但是sendStatus!=SEND_OK，是否重试发送
msgsvc.retryAnotherBrokerWhenNotStoreOK.def = false

# 默认值:131072
# 客户端限制的消息大小，超过报错，同时服务端也会限制
msgsvc.maxMessageSize.def = 131072

####################################### TransProducer配置 #######################################

# 默认值:1
# Broker 回查 Producer 事务状态时，线程池大小
msgsvc.checkThreadPoolMinSize.def = 1

# 默认值:1
# Broker 回查 Producer 事务状态时，线程池大小
msgsvc.checkThreadPoolMaxSize.def = 1

# 默认值:2000
# Broker 回查 Producer 事务状态时，Producer 本地缓冲请求队列大小
msgsvc.checkRequestHoldMax.def = 2000

####################################### PushConsumer #######################################

# 默认值:CLUSTERING
# 消息模型，支持以下两种 1、集群消费（CLUSTERING） 2、广播消费（BROADCASTING）
msgsvc.pushMessageModel.def = BROADCASTING

# 默认值:CONSUME_FROM_LAST_OFFSET
# Consumer 启动后，默认从什么位置开始消费,支持以下两种
# 1.CONSUME_FROM_FIRST_OFFSET:第一次启动从队列初始位置消费，后续再启动接着上次消费
# 2.CONSUME_FROM_TIMESTAMP:第一次启动从指定时间点位置消费，后续再启动接着上次消费的进度开始消费
# 3.CONSUME_FROM_LAST_OFFSET:第一次启动从队列末尾位置消费，后续再启动接着上次消费
msgsvc.consumeFromWhere.def = CONSUME_FROM_LAST_OFFSET

# 默认值:10
# 消费线程池数量
msgsvc.consumeThreadMin.def = 10

# 默认值:20
# 消费线程池数量
msgsvc.consumeThreadMax.def = 20

# 默认值:2000
# 单队列并行消费允许的最大跨度
msgsvc.consumeConcurrentlyMaxSpan.def = 2000

# 默认值:1000
# 拉消息本地队列缓存消息最大数
msgsvc.pullThresholdForQueue.def = 1000

# 默认值:0
# 拉消息间隔，由于是长轮询，所以为 0，但是如果应用为了流控，也可以设置大于 0 的值，单位毫秒
msgsvc.pullInterval.def = 0

# 默认值:1
# 批量消费，一次消费多少条消息
msgsvc.consumeMessageBatchMaxSize.def = 1

# 默认值:32
# 批量拉消息，一次最多拉多少条
msgsvc.pullBatchSize.def = 32

####################################### PullConsumer #######################################

# 默认值:20000
# 长轮询，Consumer 拉消息请求在 Broker 挂起最长时间，单位毫秒
msgsvc.brokerSuspendMaxTimeMills.def = 20000

# 默认值:30000
# 长轮询，Consumer 拉消息请求在 Broker 挂起超过指定时间，客户端认为超时，单位毫秒
msgsvc.consumerTimeoutMillisWhenSuspend.def = 30000

# 默认值:10000
# 非长轮询，拉消息超时时间，单位毫秒
msgsvc.consumerPullTimeoutMillis.def = 10000

# 默认值:BROADCASTING
# 消息模型，支持以下两种 1、集群消费（CLUSTERING） 2、广播消费（BROADCASTING）
msgsvc.pullMessageModel.def = BROADCASTING