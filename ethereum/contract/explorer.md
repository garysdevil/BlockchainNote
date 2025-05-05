---
created_date: 2022-10-13
---

[TOC]

## 开源区块链游览器

01. https://github.com/blockscout/blockscout 可行。2012年12月继续更新中，功能齐全版。
02. https://github.com/etherparty/explorer 可行。2017年停止更新，轻量版，nodev8.17.0运行成功 nodev16.9.1运行失败。
03. https://github.com/metaspartan/explorer 不可行。2018年停止更新，轻量版，编译运行成功，没报错，但页面未查到任何内容。
04. https://github.com/gobitfly/etherchain-light 不可行。2018年停止更新，轻量版，运行失败。
05. https://github.com/ismaelbej/mini-eth-browser
06. https://github.com/curvegrid/toy-block-explorer
07. https://github.com/ethnamed/eth-explorer
08. https://github.com/Magicking/Clixplorer
09. https://github.com/ethereumproject/explorer
10. http://ethscan.hubwiz.com/ 可行。轻量版，直接运行一个html文件即可。

## blockscout/blockscout

- 由POA Network开源的一款以太坊区块链游览器，基于Erlang VM的Elixir语言开发。

- 部署方式 https://hub.docker.com/repository/docker/garysdevil/blockscout/general

### 报错与解决办法

1. yum install inotify-tools
   - https://github.com/inotify-tools/inotify-tools/wiki
   ```log
   2022-01-04T09:17:03.601 application=que [info] [Que] Booting Server Supervisor for Workers
   2022-01-04T09:17:03.965 application=explorer [warn] Failed to get exchange rates with reason 'Source URL is nil'.
   2022-01-04T09:17:04.010 application=file_system [error] `inotify-tools` is needed to run `file_system` for your system, check https://github.com/rvoicilas/inotify-tools/wiki for more information about how to install it. If it's already installed but not be found, appoint executable file with `config.exs` or `FILESYSTEM_FSINOTIFY_EXECUTABLE_FILE` env.
   2022-01-04T09:17:04.010 application=phoenix_live_reload [warn] Could not start Phoenix live-reload because we cannot listen to the file system.
   You don't need to worry! This is an optional feature used during development to
   refresh your browser when you save files and it does not affect production.
   ```
2. 没有连接到正确的ws地址端口上（以下报错是因为笔者连接到RPC端口导致的）
   ```log
   2022-01-05T06:10:49.336 fetcher=block_realtime [error] GenServer Indexer.Block.Realtime.Fetcher terminating
   ** (stop) exited in: GenServer.call(Indexer.Block.Realtime.WebSocket, {:subscribe, "newHeads", []}, 5000)
       ** (EXIT) time out
       (elixir 1.12.3) lib/gen_server.ex:1024: GenServer.call/3
       (indexer 0.1.0) lib/indexer/block/realtime/fetcher.ex:150: Indexer.Block.Realtime.Fetcher.subscribe_to_new_heads/2
       (indexer 0.1.0) lib/indexer/block/realtime/fetcher.ex:73: Indexer.Block.Realtime.Fetcher.handle_continue/2
       (stdlib 3.16.1) gen_server.erl:695: :gen_server.try_dispatch/4
       (stdlib 3.16.1) gen_server.erl:437: :gen_server.loop/7
       (stdlib 3.16.1) proc_lib.erl:226: :proc_lib.init_p_do_apply/3
   Last message: {:continue, {:init, [transport: EthereumJSONRPC.WebSocket, transport_options: %EthereumJSONRPC.WebSocket{url: "ws://localhost:8545", web_socket: EthereumJSONRPC.WebSocket.WebSocketClient, web_socket_options: %EthereumJSONRPC.WebSocket.WebSocketClient.Options{event: nil, params: nil, web_socket: Indexer.Block.Realtime.WebSocket}}]}}
   State: %Indexer.Block.Realtime.Fetcher{block_fetcher: %Indexer.Block.Fetcher{broadcast: :realtime, callback_module: Indexer.Block.Realtime.Fetcher, json_rpc_named_arguments: [transport: EthereumJSONRPC.HTTP, transport_options: [http: EthereumJSONRPC.HTTP.HTTPoison, url: "http://localhost:8545", http_options: [recv_timeout: 60000, timeout: 60000, hackney: [pool: :ethereum_jsonrpc]]], variant: EthereumJSONRPC.Geth], receipts_batch_size: 250, receipts_concurrency: 10}, max_number_seen: nil, previous_number: nil, subscription: nil, timer: nil}
   ```

## etherparty/explorer

- 部署
  ```bash
  git clone https://github.com/etherparty/explorer 
  cd explorer 
  npm install -g bower -y 
  bower init
  bower install --allow-root
  bower install angular --save-dev  --allow-root
  npm start
  ```
