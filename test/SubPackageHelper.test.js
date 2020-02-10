const SubPackageHelper = require('../core/SubPackageHelper');

test('_getSubPackageName', () => {
    const value = SubPackageHelper.getSubPackageName('/data/pro/domino/subpack/dn/d1/di/1.png', '/data/pro/domino/subpack/');
    expect(value).toBe('dn');
});