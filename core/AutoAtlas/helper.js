/**
 * 判断本地资源是否存在
 * @param {string} nativePath 
 * @param {string} subpackagesRoot 
 */
function isExitNativePath(nativePath, subpackagesRoot) {
    return nativePath && nativePath.startsWith(subpackagesRoot);
}

/**
 * 自动图集帮助类
 */
module.exports = {
    /**
     * 获取 自动图集 资源对应的本地文件路径
     * @param {string} uuid 资源 uuid
     * @param {Editor.BuildResults} buildResult 编译结果
     * @param {string} subpackagesRoot 子包的根路径
     * 
     * @returns {string} 如果是自动图集，则返回本地文件路径。否则返回 null
     */
    loadNativePath(uuid, buildResult, subpackagesRoot) {
        const fspath = Editor.assetdb.uuidToFspath(uuid);

        if (fspath) {
            // 自动图集 的资源 fspath 应该为 null
            return null;
        }

        const nativePath = buildResult.getNativeAssetPath(uuid);
        if (isExitNativePath(nativePath, subpackagesRoot)) {
            return nativePath;
        }

        return null;
    }


}