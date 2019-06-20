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

### 倒排索引

Elasticsearch 使用一种称为 倒排索引 的结构，它适用于快速的全文搜索。一个倒排索引由文档中所有不重复词的列表构成，对于其中每个词，有一个包含它的文档列表。

- The quick brown fox jumped over the lazy dog
- Quick brown foxes leap over lazy dogs in summer

为了创建倒排索引，我们首先将每个文档的 content 域拆分成单独的 词（我们称它为 词条 或 tokens ），创建一个包含所有不重复词条的排序列表，然后列出每个词条出现在哪个文档。

***
|Term|Doc_1|Doc_2|
|---|---|---|
Quick   |       |  X
The     |   X   |
brown   |   X   |  X
dog     |   X   |
dogs    |       |  X
fox     |   X   |
foxes   |       |  X
in      |       |  X
jumped  |   X   |
lazy    |   X   |  X
leap    |       |  X
over    |   X   |  X
quick   |   X   |
summer  |       |  X
the     |   X   |
***

### 分析与分析器

分析 包含下面的过程：

- 首先，将一块文本分成适合于倒排索引的独立的 词条 ，
- 之后，将这些词条统一化为标准格式以提高它们的“可搜索性”，或者 recall

分析器 实际上是将三个功能封装到了一个包里：

- 字符过滤器

  首先，字符串按顺序通过每个 字符过滤器 。他们的任务是在分词前整理字符串。一个字符过滤器可以用来去掉HTML，或者将 & 转化成 `and`。

- 分词器

  其次，字符串被 分词器 分为单个的词条。一个简单的分词器遇到空格和标点的时候，可能会将文本拆分成词条。

- Token 过滤器

  最后，词条按顺序通过每个 token 过滤器 。这个过程可能会改变词条（例如，小写化 Quick ），删除词条（例如， 像 `a`， `and`， `the` 等无用词），或者增加词条（例如，像 jump 和 leap 这种同义词）。

### 内置分析器

"Set the shape to semi-transparent by calling set_trans(5)"

- 标准分析器

  标准分析器是Elasticsearch默认使用的分析器。它是分析各种语言文本最常用的选择。它根据 Unicode 联盟 定义的 单词边界 划分文本。删除绝大部分标点。最后，将词条小写。它会产生

  set, the, shape, to, semi, transparent, by, calling, set_trans, 5

- 简单分析器

  简单分析器在任何不是字母的地方分隔文本，将词条小写。它会产生

  set, the, shape, to, semi, transparent, by, calling, set, trans

- 空格分析器

  空格分析器在空格的地方划分文本。它会产生

  Set, the, shape, to, semi-transparent, by, calling, set_trans(5)

- 语言分析器

