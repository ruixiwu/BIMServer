/**
 * Created by chenhaoact on 16/8/16.
 */
/**
 * 1.字典
 * 一种以键 - 值对形式存储数据的数据结构，
 * 键是指你用来查找的东西， 值是查找得到的结果
 *
 * 适用:
 * 电话本,!!按键值对进行存储查询的结构!!,因为C++中没有固定的按键值对查询的结构(js有对象),
 * 所以遇到这种情况要用 字典结构,
 * 再如:存储一段文本中各个单词出现的次数。该程序显示每个单词出现的次数，
 * 但每个单词只显示一次(只显示一次可以用作字典,因为字典里的键也是不能重复出现的)
 *
 * add 新增一个键值对
 * find 以键作为参数， 返回和其关联的值
 * remove 删除一个键 - 值对
 * showAll 显示字典中所有的键 - 值对
 * count 得到字典中的元素个数
 * clear 清空所有键值对
 * showAllBySortKey 按键排序后显示字典所有键值对的
 * */
var DictionaryDef = function () {
    this.add = add;
    this.datastore = [];
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
    this.showAllBySortKey = showAllBySortKey
};
DictionaryDef.prototype.add = function (a, b) {
    this.datastore[a] = b
};
DictionaryDef.prototype.find = function (a) {
    return this.datastore[a]
};
DictionaryDef.prototype.remove = function (a) {
    delete this.datastore[a]
};
DictionaryDef.prototype.showAll = function () {
    for (var a in this.datastore) print(a + " -\x3e " + this.datastore[a])
};
DictionaryDef.prototype.count = function () {
    var a = 0, b;
    for (b in Object.keys(this.datastore)) ++a;
    return a
};
DictionaryDef.prototype.clear = function () {
    for (var a in Object.keys(this.datastore)) delete this.datastore[a]
};
DictionaryDef.prototype.showAllBySortKey = function () {
    for (var a in Object.keys(this.datastore).sort()) {
        var b = Object.keys(this.datastore).sort()[a];
        print(b + " -\x3e " + this.datastore[b])
    }
};