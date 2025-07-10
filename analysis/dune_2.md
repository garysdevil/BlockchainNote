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


## 实例 三

```sql
-- 分析 dx-terminal NFT的交易状况
-- NFT平均交易次数=当日交易的总量/当日被交易过的NFT，
WITH dxterminal AS (
  SELECT
    evt_block_date as block_date,
    COUNT(DISTINCT tokenId) AS total_tokenId,
    COUNT(evt_tx_hash) AS total_tx
  FROM dxterminal_base.dxterminal_evt_transfer
  GROUP BY evt_block_date
)
SELECT
  block_date as "日期",
  total_tokenId as "NFT交易数量",
  total_tx as "交易总量",
  total_tokenId/CAST(36651 as double) AS "NFT交易数量占总量的比例",
  total_tx/CAST(total_tokenId as double) AS "NFT平均交易次数"
FROM dxterminal
ORDER BY block_date DESC
```

```sql
WITH nft AS (
    SELECT 
        block_date, 
        COUNT(DISTINCT token_id) AS total_tokenId,
        COUNT(tx_hash) AS total_tx
    FROM nft.transfers 
    WHERE blockchain = 'base' AND contract_address = 0xf20a43f8396f8e28100d6d454e34483d78094c29 
    GROUP BY block_date
    ORDER BY block_date DESC
    LIMIT 100
)
SELECT
  block_date as "日期",
  total_tokenId as "NFT交易数量",
  total_tx as "交易总量",
  total_tokenId/CAST(36651 as double) AS "NFT交易数量占总量的比例",
  total_tx/CAST(total_tokenId as double) AS "NFT平均交易次数"
FROM nft
ORDER BY block_date DESC
```