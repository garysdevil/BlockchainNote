## 链接
1. 官网 https://dune.com/
## 实例一
```sql
-- 创 建 Arbitrum 和 Optimism 最 近 90 天 的 链 上 交 易 数 和 地 址 数 分 析 , 并 将 他 们 形 成 对 比
WITH optimism_data AS (
    SELECT
        block_date AS "日期",
        COUNT(hash) AS "交易数",
        COUNT(DISTINCT "from") AS "交易地址数",
        'Optimism' AS "链"
    FROM optimism.transactions
    WHERE block_date >= now() - INTERVAL '91' day
      AND block_date < current_date
    GROUP BY block_date
),
arbitrum_data AS (
    SELECT
        block_date AS "日期",
        COUNT(hash) AS "交易数",
        COUNT(DISTINCT "from") AS "交易地址数",
        'Arbitrum' AS "链"
    FROM arbitrum.transactions
    WHERE block_date >= now() - INTERVAL '91' day
      AND block_date < current_date
    GROUP BY block_date
)
SELECT * FROM optimism_data
UNION ALL
SELECT * FROM arbitrum_data;
```

1. WITH 子句 = 公用表表达式 = Common Table Expressio
2. CTE 的作用是提供了一种定义临时结果集的方式，这些结果集在单个查询中可以被重复引用。

