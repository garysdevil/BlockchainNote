---
created_date: 2022-09-29
---

[TOC]


## 变量
### 概览
1. 变量赋值后是可以被改变的。
2. 变量的传递，是直接传递变量的值。
3. 变量没有 undefined 或者 null 值。
4. 变量的类型必须被指定。
5. 没有全局变量。


### 变量类型
- Booleans 布尔类型
- Integers 整型
- 有符号整型 i8, i16, i32, i64, i128
- 无符号整型 u8, u16, u32, u64, u128
    - 变量的bit越长，需要circuit的约束越多，计算时间越长。
- field 域类型
- Char 字符类型
- Group 组/坐标对
- Address 地址

- Array 数组
- tuple 元组 

```rust
// 要声明变量，必须使用 let 关键字。
let var_name1: u32 = 9;
let var_name2 = 4u32;

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

// 坐标对
let b = 0group; // the zero of the group
let a = 1group; // the group generator
let c = 2group; // 2 * the group generator
let d = (0, 1)group; // coordinate notation

// 地址
let receiver: address = aleo1qnr4dkkvkgfqph0vzc3y6z2eu975wnpz2925ntjccd5cfqxtyu8sta57j8;
```

```rust
// 数组
let c: [2; char] = "у́"; // correct, same as "\u{443}\u{301}"
let e: [char; 5] = "🤷🏿‍♀️"; // correct, same as "\u{1F937}\u{1F3FF}\u{200D}\u{2640}\u{FE0F}"

// 元组
let a = (true, true);
let b: (bool, bool) = (true, true);
let first = a.0;
let second = b.1;
```

## 算数操作
```rust
let a = 4u32;
let result = (a + 1) * 2; 
```

## 流程控制
```rust
let is_valid = true;
let b: u8 = is_valid ? 1 : 0;

if a {
    res = 1;
} else if b {
    res = 2;
} else {
    res = 3;
}

for i in 0..4 {
    a += 1;
}
```

## 函数
```rust
function call(a: u32) {
    a = 0; // the copied value of `a` is set to 0
}

function main() -> u32 {
    let a = 1u32;
    call(a); // the `call` function receives a copy of `a`

    return a; // returns 1
}
```

## 模块
- vi src/bar.leo

```rust
circuit Bar {
    b: u32
}

function baz() -> u32 {
    return 1u32;
}
```

- src/main.leo
```rust
import bar.(
    Bar,
    baz
);

function main() {
    const bar = Bar { b: 1u32};
    const z = baz();
}
```

## 程序输入参数
- 程序输入参数可以被main函数使用。
- 程序输入参数被定义在这个文件里 inputs/${project_name}.in
```conf
[main] // <- section header
a: u32 = 1;

[constants] // 定义main函数的输入参数里面的常量
b: u32 = 2;

[registers] 
r0: u32 = 0;
```

```rust
function main(a: u32, const b: u32) -> u32 {
    let c: u32 = a + b;
    return c;
}
```

## Circuits 电路器
```rust
// circuit 关键字类似于java中的class
circuit Point {
    x: u32,
    y: u32,

    // 返回Self的方法是静态方法，不需要实例化circuit就可以调用。 调用方式 Point::new()
    function new() -> Self {
        return Self { 
            x: 0, 
            y: 0, 
        };
    }

    // 调用方式 实例.add()
    function add(self) -> u32 {
        return self.x + self.y;
    }
}
```

```rust
circuit Foo {
    a: u32,

    // Instantiates a new Foo circuit with a = 0u32.
    function new() -> Self { // Self resolves to circuit type Foo
        return Self { a: 0u32 };
    }

    // Logs the self circuit variable to console.
    function log(self) {
        console.log("{}", self.a); // Errors if "self" keyword is not present.
    }

    // Mutates the self circuit variable a = 1u32.
    function mutate(mut self) {
        self.a = 1u32; // Errors if "mut self" keyword is not present.
    }
}

function main() {
    let f = Foo::new(); 

    f.mutate(); // Errors if "f" is not mutable.
    f.log(); // Prints "1"
}
```