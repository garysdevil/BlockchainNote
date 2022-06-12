[TOC]

## 链接
- 包管理中心 https://aleo.pm/
- Leo文档 https://developer.aleo.org/developer/language/flying_tour


## 概览
- Leo是Aleo项目的零知识编程语言
- Leo不同于传统的语言，Leo编写的程序会被编译成零知识证明的电路。
- RFC 是Leo编程语言的提案

## 安装
```bash
# 安装编译器 Leo
cargo install leo-lang

leo
```

## Hello
```bash
# 创建一个项目
project_name="hello-world"
leo new ${project_name}
cd ${project_name}

# 运行
leo run

# 引入一个包
leo add 
```