- 开源区块链游览器
    - https://github.com/blockscout/blockscout 2012年12月继续更新中，功能齐全版
    - https://github.com/etherparty/explorer 2017年停止更新，轻量版，nodev8.17.0运行成功 nodev16.9.1运行失败
    - https://github.com/EthVM/EthVM 只开源了前端代码
    - https://github.com/metaspartan/explorer 2018年停止更新，轻量版，可能不兼容最新的以太坊接口，运行失败
    - http://ethscan.hubwiz.com/

## 开源区块链游览器

### blockscout
- 由POA Network开源的一款以太坊区块链游览器，基于Erlang VM的Elixir语言开发

- 
- 
```bash
# https://hub.docker.com/_/postgres?tab=description
docker pull postgres:13
docker run -d --name postgres -p ${IP}:5432:5432 -e POSTGRES_PASSWORD=15777866613 postgres:13
iptables -I INPUT -s 172.17.0.1/16 -p tcp --dport 5432 -j ACCEPT
docker exec -it postgres /bin/bash
psql -h 173.82.143.63 -U postgres -W
```

- yum install inotify-tools
    - https://github.com/inotify-tools/inotify-tools/wiki
    ```log
    2022-01-04T09:17:03.601 application=que [info] [Que] Booting Server Supervisor for Workers
    2022-01-04T09:17:03.965 application=explorer [warn] Failed to get exchange rates with reason 'Source URL is nil'.
    2022-01-04T09:17:04.010 application=file_system [error] `inotify-tools` is needed to run `file_system` for your system, check https://github.com/rvoicilas/inotify-tools/wiki for more information about how to install it. If it's already installed but not be found, appoint executable file with `config.exs` or `FILESYSTEM_FSINOTIFY_EXECUTABLE_FILE` env.
    2022-01-04T09:17:04.010 application=phoenix_live_reload [warn] Could not start Phoenix live-reload because we cannot listen to the file system.
    You don't need to worry! This is an optional feature used during development to
    refresh your browser when you save files and it does not affect production.
    ```

### etherparty/explorer
- https://github.com/etherparty/explorer

```bash
git clone https://github.com/etherparty/explorer 
cd explorer 
npm install -g bower -y 
bower init
bower install --allow-root
bower install angular --save-dev  --allow-root
npm start
```

- https://github.com/blockscout/blockscout
    - https://docs.blockscout.com/for-developers/information-and-settings/docker-integration-local-use-only
```
```