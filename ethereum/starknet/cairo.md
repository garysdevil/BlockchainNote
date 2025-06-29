## Cairo
- Field elements = felt
- 默认数据类型是 felt252
- felt 可以表示的直 0 < X < p
- Cairo 1.0编译器依赖Rust


## 安装环境
### 方式一
```sh
git clone https://github.com/starkware-libs/cairo.git
cd cairo
# 使用rust编译构建cairo的编译器
cargo build --release
# target/release/
```
```rust
fn main() -> felt252 {
    'Hello, World!'
}
```
```sh
# 编译
cairo-compile hello.cairo --output hello_compiled.json
# 运行
cairo-run --program=hello_compiled.json
```

### 方式二
```sh

```