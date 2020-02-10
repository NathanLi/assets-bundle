module.exports = {
    /**
     * 获取子包名
     * @param {string} nativeUrl 文件所在本地文件路径
     * @param {string} root 包根路径
     */
    getSubPackageName(nativeUrl, root) {
        const names = nativeUrl.replace(root, "").split('/');
        const name = names[0];
        return name;
    }
}