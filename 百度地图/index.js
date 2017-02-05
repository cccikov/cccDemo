window.onload = function() {
    var map = new BMap.Map("map"); // 创建地图实例 map为地图所在div 的 id
    var point = new BMap.Point(113.115038, 22.991109); // 创建点坐标 坐标可通过百度api获取 http://api.map.baidu.com/lbsapi/getpoint/index.html
    map.centerAndZoom("point",15); // 初始化地图，设置中心点坐标和地图级别

    /*缩放*/
    !function(){
        map.disablePinchToZoom() //禁止双指缩放
        map.disableDoubleClickZoom() //禁用双击缩放
    }();

    /*标注*/
    ! function() {
        /*开始创建标注*/
        var markPoint = new BMap.Point(113.113762, 22.989986); //创建点坐标
        var marker = new BMap.Marker(markPoint); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        //标注信息点击操作
        var opts = {
            width: 80, // 信息窗口宽度
            height: 20, // 信息窗口高度
            title: "标注信息" // 信息窗口标题
        }
        var infoWindow = new BMap.InfoWindow("澜石地铁站", opts); // 创建信息窗口对象
        marker.addEventListener("click", function() {
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        });

        /*无点击操作的标注*/
        var marker2 = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker2); // 将标注添加到地图中
    }();


    /* 随机标注*/
    function randomMarker() {
        // 编写自定义函数,创建标注
        function addMarker(point) {
            var marker = new BMap.Marker(point);
            map.addOverlay(marker);
        }
        // 随机向地图添加25个标注
        var bounds = map.getBounds();
        var sw = bounds.getSouthWest();
        var ne = bounds.getNorthEast();
        var lngSpan = Math.abs(sw.lng - ne.lng); //纬度范围
        var latSpan = Math.abs(ne.lat - sw.lat); //经度范围
        for (var i = 0; i < 25; i++) {
            var point = new BMap.Point(sw.lng + lngSpan * Math.random(), ne.lat - latSpan * Math.random());
            addMarker(point);
        }
    }

    /*添加控件*/
    ! function() {

        // // 添加带有定位的导航控件
        // var navigationControl = new BMap.NavigationControl({
        //     // 靠左上角位置
        //     anchor: BMAP_ANCHOR_TOP_RIGHT,
        //     // LARGE类型
        //     type: BMAP_NAVIGATION_CONTROL_LARGE,
        //     // 启用显示定位
        //     enableGeolocation: true
        // });
        // map.addControl(navigationControl);


        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            // offset:new BMap.Size(10, 10),
            showAddressBar:false,
        });
        geolocationControl.addEventListener("locationSuccess", function(e) {
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;

            map.setZoom(15);
        });
        geolocationControl.addEventListener("locationError", function(e) {
            // 定位失败事件
            alert(e.message);
        });
        map.addControl(geolocationControl);
    }();


    /*定位*/
    !function(){
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){

                /*将地图的中心点设置为定位点*/
                // map.panTo(r.point);
                // map.setCenter(r.point);


                /*自定义图标样式*/
                var myIcon = new BMap.Icon("ding.png", new BMap.Size(20,20),{
                    imageSize:new BMap.Size(20,20)//设置缩放大小
                });
                // myIcon.imageSize = new BMap.Size(15,15);//设置缩放大小
                var marker2 = new BMap.Marker(r.point,{icon:myIcon});  // 创建标注
                map.addOverlay(marker2);


                // alert('您的位置：'+r.point.lng+','+r.point.lat);
            }
            else {
                alert('failed'+this.getStatus());
            }
        },{enableHighAccuracy: true});
    }();


}
