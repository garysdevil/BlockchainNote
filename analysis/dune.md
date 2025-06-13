## 链接

1. 官网 https://dune.com/

## 实例一

```sql
-- 创建 Arbitrum 和 Optimism 最近 90 天的链上交易数和地址数分析
WITH optimism_data AS (
    SELECT
        block_date,
        COUNT(hash) AS optimism_trades,
        COUNT(DISTINCT "from") AS optimism_address
    FROM optimism.transactions
    WHERE block_date >= now() - INTERVAL '91' day
      AND block_date < current_date
    GROUP BY block_date
),
arbitrum_data AS (
    SELECT
        block_date,
        COUNT(hash) AS arbitrum_trades,
        COUNT(DISTINCT "from") AS arbitrum_address
    FROM arbitrum.transactions
    WHERE block_date >= now() - INTERVAL '91' day
      AND block_date < current_date
    GROUP BY block_date
)
SELECT
  COALESCE(a.block_date, o.block_date) AS "日期",
  COALESCE(a.arbitrum_trades, 0) AS "arb交易量",
  COALESCE(a.arbitrum_address, 0) AS "arb交易地址数量",
  COALESCE(o.optimism_trades, 0) AS "op交易量",
  COALESCE(o.optimism_address, 0) AS "op交易地址数量"
FROM arbitrum_data a
FULL OUTER JOIN optimism_data o
ON a.block_date = o.block_date
ORDER BY "日期" DESC;  
```

1. WITH 子句 = 公用表表达式 = Common Table Expressio = CTE
2. CTE 的作用是提供了一种定义临时结果集的方式，这些结果集在单个查询中可以被重复引用。

## 实例二

```sql
-- 创建 Ethereum 最近90天的 Gas 使用量分析
SELECT
    block_date,
    SUM(gas_used / POW(10, 9) ) AS total_gas_used_billion,
    SUM(CAST(gas_used AS DECIMAL) * gas_price / POW(10, 18)) AS total_gas_fee_eth
FROM ethereum.transactions
WHERE
    block_date >= CURRENT_TIMESTAMP - INTERVAL '91' DAY
    AND block_date < CURRENT_DATE
GROUP BY block_date
ORDER BY block_date DESC;
```
