---
created_date: 2022-03-21
---

[TOC]

## NFT图片存储方式

- 不存储
  - CryptoPunks 只存储了一个图片的验证码
  - CryptoKitties 在元数据里存储猫咪的特征基因，前端获取元数据，并按照既定规则生成展示猫咪图片。
- 链上存储 将图片组件化，将组件存储在链上，最后组合生成图片
  - Autoglyphs
  - Uniswap V3 Position NFT
- 去中心化存储
  - Bored Ape Yacht Club
- 中心化存储
  - Pudgy Penguins

## OpenSea

- 开发者文档 https://docs.opensea.io/docs/developer-tutorials

- OpenSea元数据模版 https://docs.opensea.io/docs/metadata-standards

- OpenSea NFT合约例子 https://github.com/ProjectOpenSea/opensea-creatures

- 元数据模版

```json
{
    "name": "GG",
    "description": "GG where is a boxing world",
    "image_url": "https://garysdevil/1.png",
    // "external_url": "https://garysdevil/?token_id=1",
    "attributes": [
        {
            "trait_type":"weight",
            "value":"60"
        },
        {
            "trait_type":"height",
            "value":"170"
        }
    ]
}
```

- Rinkeby测试网络API
  - 查看元数据所在的位置 https://testnets-api.opensea.io/api/v1/assets/\<contract_address>/\<token_id>/validate
  - 查看元数据的具体信息 https://testnets-api.opensea.io/api/v1/asset/\<contract_address>/\<token_id>
  - 刷新缓存 https://testnets-api.opensea.io/api/v1/asset/\<contract_address>/\<token_id>/?force_update=true
