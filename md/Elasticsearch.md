# Elasticsearch

## 基本概念

### Node和Cluster

Elastic本质上时一个分布式数据库，允许多态服务器协同工作，每台服务器上可以运行多个Elastic实例，每个Elastic实例都是一个Node节点，一组节点构成集群（cluster）

### Index(Database)

Elastic会索引所有字段，经过处理后写入一个反向索引。查询数据的时候，直接查找该索引。所以Elastic数据库的顶层单位叫做Index，他是单个数据库的同义词，每个Index（即数据库）的名字必须小写

***索引含义的区分***

- 索引（名词） 如上文所述，一个索引(index)就像是传统关系数据库中的数据库，它是相关文档存储的地方，index的复数是indices 或indexes。
- 索引（动词） 「索引一个文档」表示把一个文档存储到索引（名词）里，以便它可以被检索或者查询。这很像SQL中的INSERT关键字，差别是，如果文档已经存在，新的文档将覆盖旧的文档。
- 倒排索引 传统数据库为特定列增加一个索引，例如B-Tree索引来加速检索。Elasticsearch和Lucene使用一种叫做倒排索引(inverted index)的数据结构来达到相同目的。

### Type(Table)

Document可以分组，Type相当于Database中的Table

### Document(Row)

Index里面的单条记录成为document，多条docunment构成一个Index。同一个Index里面不要求所有的document结构相同，但是相同结构有利于提高搜索效率。

***
Relational DB -> Databases -> Tables -> Rows -> Columns

Elasticsearch -> Indices   -> Types  -> Documents -> Fields
***

### Elasticsearch发出的请求组成部分

```http
curl -X<VERB> '<PROTOCOL>://<HOST>:<PORT>/<PATH>?<QUERY_STRING>' -d '<BODY>'
```

- VERB HTTP方法：GET, POST, PUT, HEAD, DELETE
- PROTOCOL http或者https协议（只有在Elasticsearch前面有https代理的时候可用）
- HOST Elasticsearch集群中的任何一个节点的主机名，如果是在本地的节点，那么就叫localhost
- PORT Elasticsearch HTTP服务所在的端口，默认为9200
- PATH API路径（例如_count将返回集群中文档的数量），PATH可以包含多个组件，例如_cluster/stats或者_nodes/stats/jvm
- QUERY_STRING 一些可选的查询请求参数，例如?pretty参数将使请求返回更加美观易读的JSON数据
- BODY 一个JSON格式的请求主体（如果请求需要的话）

### 完成请求实例

```http
curl -XGET 'http://localhost:9200/_count?pretty' -d '
{
    "query": {
        "match_all": {}
    }
}
```