- 下载 https://dist.ipfs.io/
- https://www.jianshu.com/p/6d40c7330f72

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
    ```

- 上传文件
    ```bash
    # 将文件上传到IPFS平台，上传后记录文件的 哈希值
    ipfs add ${filepath}
    # -r 上传目录

    # Pin 文件，Pin 的作用是让其他节点知道这个文件可以在我这里找到
    ipfs pin add ${ipfshash}
    ```

- 查看文件
    ```bash
    # 查看文件
    ipfshash=QmXM8wZCE4AiBWpsv6qctwbtbb1e9cniMoJvjP2AYzm5PL # 父亲
    ipfshash=QmWoAqLcN4X7vcvdmBJCJ6YoBf4iJ4BP2789ieHT2qja19
    # 通过命令行方式
    ipfs cat ${ipfshash}
    ipfs get ${ipfshash}
    # 通过游览器方式
    https://ipfs.io/ipfs/${ipfshash}
    ```