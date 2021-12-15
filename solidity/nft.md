## 交易平台
1. opensea
    - 以太坊 公链
    - https://opensea.io/
    - Rinkeby测试网络       
        - https://testnets.opensea.io/assets/<contract_address>/<token_id>

2. Axie Marketplace
    - Axie 公链
    - https://marketplace.axieinfinity.com/

3. CryptoPunks
    - 以太坊 公链
    - https://www.larvalabs.com/cryptopunks

4. NBA Top Shot
    - 中国大陆区域内无法访问，打开vpn也无法访问
    - https://nbatopshot.com/

5. Binance NFT Marketplace
    - 币安智能 公链
    - https://www.binance.com/en/nft/home

6. Solanart
    - solana 公链
    - https://solanart.io/

## 图片存储方式
- 不存储
    -  CryptoPunks 只存储了一个图片的验证码
    - CryptoKitties 在元数据里存储猫咪的特征基因，前端获取元数据，并按照既定规则生成展示猫咪图片。
- 链上存储  将图片组件化，将组件存储在链上，最后组合生成图片
    - Autoglyphs
    - Uniswap V3 Position NFT
- 去中心化存储
    - Bored Ape Yacht Club
- 中心化存储
    - Pudgy Penguins

## OpenSea
- 开发者文档 https://docs.opensea.io/docs/developer-tutorials

- OpenSea元数据模版 https://docs.opensea.io/docs/metadata-standards

- OpenSea NFT合约例子   https://github.com/ProjectOpenSea/opensea-creatures

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
    - 查看元数据所在的位置 https://testnets-api.opensea.io/api/v1/assets/<contract_address>/<token_id>/validate
    - 查看元数据的具体信息 https://testnets-api.opensea.io/api/v1/asset/<contract_address>/<token_id>
    - 刷新缓存 https://testnets-api.opensea.io/api/v1/asset/<contract_address>/<token_id>/?force_update=true

## 智能合约
1. Loot
    - Github https://github.com/NFTLootBox/contracts
    - 部署位置 https://etherscan.io/address/0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7
    - 创始人 Dom Hofmann
    - 官网 https://www.lootproject.com/
    - opensea https://opensea.io/collection/lootproject

2. TheSandbox/SAND
    - 买地皮

3. Dragon
    - Github https://github.com/nourharidy/LairOfWisdom/
    - 部署位置/FTM
        -  Lair https://ftmscan.com/address/0x83633dca596e741c80f4fa032c75518cc251b09b
        - Egg https://ftmscan.com/address/0xbde7bdcf886a7bf769b3e92b405013bd1969e840
        - Dragon https://ftmscan.com/address/0x6b121793d1cB8936BAC7135e8532BfBf3e694166

4. Genesis Mana
    - 部署位置 https://etherscan.io/address/0xf4b6040a4b1b30f1d1691699a8f3bf957b03e463#code
    - opensea   https://opensea.io/collection/genesis-mana

5. Decentraland/MANA
    - Decentraland是一个基于区块链的虚拟世界平台，在去中心化的世界里内容创作者和游戏玩家之间可以自由交易，没有中介费。用户在平台里可以创建自己的区块链身份，用区块链记录所有权。任何用户都可以在平台里创造自己的虚拟空间，发布应用，创作、交易，获取价值。MANA在里面可以用来创建领地，购买商品和服务等。

6. LootCrate
    - https://stupendous-antique-90e.notion.site/Loot-Crate-as-an-ERC1155-ba9ae485f5784e498d85d488b54ec1e7

## NFT拆分项目
1. ShardingDAO/SHD
    - NFT分解合成协议
    - https://github.com/ShardingDAOProject/ShardingDAOMining
    - https://www.chainnews.com/articles/185788003789.htm

2. K21/K21
    - 是Kanon旗下的一个封闭型艺术品藏品库

3. Fractional
    - 将单个 NFT 或 NFT 的集合碎片化
    - 必须有一定比例的 token 总供应量赞成解锁集合，以便将 NFT 分配给竞标者。
    - NFT作品持有者可以在Fractional平台铸造NFT保险库来保管NFT作品，保险库将向持有者发放所有的所有权代币，代币可以出售或者赠与。

4. Unicly/UNIC
    - 将单个 NFT 或 NFT 的集合碎片化，分解成一定数量的ERC20代币 uToken
    - 必须有一定比例的 uToken 总供应量赞成解锁集合，以便将 NFT 分配给竞标者。这个比例是由 uToken 的创造者在分化过程开始时设定的。
    - 代币在中心化交易所MEXC上有流通

5. NFTX/NFTX
    -  将同等价值的 NFT 汇集成指数基金，vTOken




##
3. cryptozombie 学习资料
    - Github https://github.com/loomnetwork/cryptozombie-lessons
    - 官网 https://cryptozombies.io/

