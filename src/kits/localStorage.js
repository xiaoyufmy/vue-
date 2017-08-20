/**
 * Created by xiaoyu on 2017/8/17.
 */
export const KEY = "goodsdata";
export var valueObj = {goodsid: 0, count: 0};

export function setItem(value) {
    var jsonString = localStorage.getItem(KEY);
    jsonString = jsonString || "[]";
    var arr = JSON.parse(jsonString);
    arr.push(value);
    localStorage.setItem(KEY, JSON.stringify(arr));
}
export function getItem() {
    var jsonString = localStorage.getItem(KEY);
    jsonString = jsonString || "[]";
    return JSON.parse(jsonString)

}
export function removeItem(goodsid) {
    var arr = getItem();
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].goodsid == goodsid) {
            arr.splice(i, 1);
        }
    }
    localStorage.setItem(KEY, JSON.stringify(arr));
}

//购物车

// 获取 数组
export function getgoodsObject() {
    var arr = getItem();
    var resObj = {};
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (!resObj[item.goodsid]) {
            //    如果没有当前商品的数据，则添加一个数据
            resObj[item.goodsid] = item.count;
        } else {
            //    已经有当前商品的数据了，则将cont追加
            var count = resObj[item.goodsid];
            resObj[item.goodsid] = count + item.count;
        }
    }
    return resObj;
}

export function updateData(obj) {
    var arr = getItem();

    var count = 1;
    if (obj.type == 'add') {
        //加
        arr.push({goodsid: obj.goodsid, count: count});
    } else {
        //减
        for (var i = 0; i < arr.length; i++) {
            //如果这个对象中的count值等于1，则删除这个对象，否则将这个对象的count减1以后保存回去
            if (arr[i].goodsid == obj.goodsid) {
                if (arr[i].count > 1) {
                    arr[i].count = arr[i].count - 1;
                    break;
                } else {
                    //删除此对象
                    arr.splice(i, 1);
                    break;
                }
            }
        }
    }
//    将最新的arr保存回localStorage中
    localStorage.setItem(KEY, JSON.stringify(arr));
}