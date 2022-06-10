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

## 变量
- 变量赋值后是可以被改变的。
- 变量的传递，是直接传递变量的值。
- 变量没有undefined 或者 null 值。
- 变量的类型必须被指定。
  
- 变量类型
  - Booleans 布尔类型
  - Integers 整型
    - 有符号整型 i8, i16, i32, i64, i128
    - 无符号整型 u8, u16, u32, u64, u128
    - 变量的bit越长，需要circuit的约束越多，计算时间越长。
  - field 域类型
  - Char 字符类型

```rust
// 要声明变量，必须使用 let 关键字。
let var_name1: u32 = 9;

// 布尔类型的变量
let var_name2 = true;
let var_name3: bool = false;


// 声明常量，必须使用 const 关键字。
const var_name4: u32 = 9;

// 域类型的变量
let var_field_1 = 1field; 
let var_field_2: field = 21888242871839275222246405745257275088548364400416034343698204186575808495617;

// 字符类型
let var_char:char = 'c';
```