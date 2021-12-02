# IPFS
- 下载 https://dist.ipfs.io/
- https://www.jianshu.com/p/6d40c7330f72
- 集成IPFS的第三方服务 https://app.pinata.cloud/ 

- 第三方网关 https://gateway.pinata.cloud/ipfs/${cid}
- 公共网关 https://ipfs.io/ipfs/${cid}
## IPFS
- IPFS 初始化
    ```bash
    # IPFS 初始化
    ipfs init
    ```
    ```log
    generating ED25519 keypair...done
    peer identity: 12D3KooWQXdv5A4etj6ndvjMFrdCn2e1JSjugeiGzeBrc6cojThN
    initializing IPFS node at ～/.ipfs
    to get started, enter:

        ipfs cat /ipfs/QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc/readme
    ```
- 本地启动IPFS节点
    ```bash
    # IPFS 监控
    ipfs daemon
    # http://127.0.0.1:5001/webui
    ```

- 上传文件
    ```bash
    # 将文件上传到IPFS平台，上传后记录文件的 哈希值
    # 默认状况下通过“ipfs add”的文件会被循环地“pin”住，以保证它们不被清理。
    ipfs add ${filepath}
    # -r 上传目录
    ```

- 查看文件
    ```bash
    # 查看文件
    cid=QmXM8wZCE4AiBWpsv6qctwbtbb1e9cniMoJvjP2AYzm5PL # 父亲
    cid=QmWoAqLcN4X7vcvdmBJCJ6YoBf4iJ4BP2789ieHT2qja19
    # 通过命令行方式
    ipfs cat ${cid}
    ipfs get ${cid}
    # 通过游览器方式
    https://ipfs.io/ipfs/${cid}
    ```
- pin
```bash
# 列出所有pin了的数据
ipfs pin ls --type=all

ipfs pin ls

# 列出 pin 为指定状态的块
ipfs pin ls -t direct

# 递归 pin 文件，pin 的作用是保证文件在本地不被垃圾清理时清理掉
ipfs pin add ${ci d}
# 直接 pin(只 pin 指定 hash 的文件块)
ipfs pin add --recursive=fals ${cid}
```

- 文件块 的 5 种 Pin 状态
    - Recursive 状态
        - 文件块树被递归添加到 pin 中，根文件块的状态是 Recursive，非根文件块的状态是 Indirect
    - Direct 状态
        - 只有目标文件块添加到 pin 中, 子孙块不做处理，目标文件块的状态就是 Direct
    - Indirect 状态
        - 文件块树被递归添加到 pin 中，根文件块的状态是 Recursive，非根文件块的状态是 Indirect
    - Internal 状态
        - ipfs 使用文件块来保存 pinner 状态，这些文件块的状态就是 Internal
    - NotPinned 状态
        - 文件块没有被 pin，在 GC 时会被删除
