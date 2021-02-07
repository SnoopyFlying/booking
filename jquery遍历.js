let skuArray = [];
let skuReg = /item\.jd\.com\/(\d+)/;
$(".mc .cont-box").each(function () {
    let date = 0;
    let i = 0;
    $(this).find("a").each(function () {
        if (i === 0) {
            let skuHref = $(this).attr("href");
            let sku = skuReg.exec(skuHref)[1].trim();
            let strTime = $("#" + sku + "_buystime").val();// 2021-01-15 11:00:00
            date = new Date(Date.parse(strTime.replace(/-/g, "/"))).getTime();}
        if (i > 0) {
            let skuHref = $(this).attr("href");
            if (skuReg.test(skuHref)) {
                let sku = skuReg.exec(skuHref)[1].trim();
                skuArray.push({
                    skuId: sku,
                    date: date,
                    areaId: '2_2824_51913',
                    detail_date: new Date(date).toLocaleString()
                });
            }
        }
        i = i + 1;
    });

})
skuArray.sort(function (a, b) {
    return a.date - b.date;//数组中两两比较，结果为正(a>b)，则互换位置,小的在前面(从索引0开始，分别和后面元素比较) 升序排序后的数组
});
let timeArray = [];
for(let sku of skuArray){
    if (timeArray.indexOf(sku.date)===-1) {
        timeArray.push(sku.date);
    }
}
let taskPool = [];
for (let i of timeArray){
    let skuIDs = [];
    for (let sku of skuArray){
        if (sku.date===i){
            skuIDs.push(sku.skuId);
        }
    }
    let task = {
        skuId:skuIDs,
        date: i-100,
        areaId: '2_2824_51913',
        detail_date: new Date(i).toLocaleString()
    }
    taskPool.push(task)
}
console.log(taskPool);

