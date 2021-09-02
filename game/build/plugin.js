class FileListPlugin {
    apply(compiler) {
        // emit 是异步 hook，使用 tapAsync 触及它，还可以使用 tapPromise/tap(同步)
        compiler.hooks.afterCompile.tapAsync('AfterCompile', (compilation, callback) => {
            console.log('编译完成')

            callback();
        });
    }
}

module.exports = FileListPlugin;