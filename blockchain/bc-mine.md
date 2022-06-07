## POW
1. 通过对等节点，下载最新的块高（网络资源）
2. 完成下载一个块高后，进行块高的验证（CPU资源）

3. 判断是否？？？？

4. 计算数学题，获取出块资格（CPU资源）
5. 生成一个块高（CPU资源）
6. 将块高进行广播（网络资源）

## 术语
- Difficulty Target: 当计算出来的值小于等于这个值，则可以将交易封装成块高。
- weight: 当前block的weight，往往和POW所付出的计算量相关，取决于项目的具体实现细节。
- Cumulative Weight: 链上所有weight总合。当出现分叉时，最终会选择Cumulative Weight更大的一条链。

- 比特币的出块时间
```python
出块时间(单位：秒) ≈ difficulty_当前 * 2^32 / 全网算力（单位：H/s）
```