- leo

[TOC]

## 链接
1. Leo官网 https://leo-lang.org/
2. leo 文档 https://developer.aleo.org/leo/additional_material/tooling/
3. 包管理中心 https://aleo.pm/

- 相关文章
    - https://www.aleo.org/post/leo-programming-language

- leo编程实例
    1. ARC20 https://github.com/Entropy1729/ARC20_leo
    2. Bulls and Cows game  https://github.com/mlsmith/aleo-numbers
## 概览
- Leo是Aleo网络的零知识编程语言，不同于传统计算机语言，Leo编写的程序会被编译成零知识证明的电路。
- RFC 是Leo编程语言的提案。

- Leo引进了
  1. 测试框架 testing framework
  2. 包管理器 package registry
  3. resolver
  4. 通用定理生成器 theorem generator for general-purpose
  5. 零知识应用

- Leo通过构建证明电路来代表计算。

## 安装
```bash
# 安装编译器 Leo
cargo install leo-lang

leo --version
leo
```

## 指令
```bash
# 创建一个项目
project_name="hello-world"
leo new ${project_name}
cd ${project_name}

# 运行
leo run

# 引入一个包
leo add 

# 登入
leo login -u ${username} -p ${password}
```