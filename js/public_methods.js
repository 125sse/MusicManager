// 插入榜单歌曲数据
function insertData(arr,tx,tableName,listName){
    // 插入数据
    for(var i=0;i<arr.length;i++){
        var songname = arr[i]["SingName"];
        var singer = arr[i]["Player"];
        var album = arr[i]["Album"];
        tx.executeSql('insert into '+tableName+' values (?,?,?,?)',[songname,singer,album,listName],function () {
        },function () {
            console.log("插入失败");
        });
    }
    if(listName === "NewSong"){
        createTbody($("#table_body"),"NewSong","酷我新歌榜");
    }
}
// 创建歌曲表格(主页)
function createTbody(obj,list_type,title) {
    if($("#content_header").css("display") === "block"){
        // 查询数据库
        db.transaction(function (tx) {
            tx.executeSql('select SongName,Singer,Album from list_table where List_Name=?',[list_type],function (tx,res) {
                $("#content_title").html(title);
                obj.html("");
                var dataString;
                for(var i=0;i<res.rows.length;i++){
                    dataString = "<tr>"
                        +   "<td>" + (i+1) + "</td>"
                        +   "<td>" + res.rows.item(i).SongName + "</td>"
                        +   "<td>" + res.rows.item(i).Singer + "</td>"
                        +   "<td>" + res.rows.item(i).Album + "</td>"
                        + "</tr>";
                    obj.append($(dataString));
                }
            },function (tx,err) {
                console.log(err);
            });
        });
    }else{
        // 清空right_content，初始化
        $("#right_content").children().each(function () {
            $(this).css("display","none");
        });
        $("#content_title").html(title);
        // 查询数据库
        db.transaction(function (tx) {
            tx.executeSql('select SongName,Singer,Album from list_table where List_Name=?',[list_type],function (tx,res) {
                obj.html("");
                var dataString;
                for(var i=0;i<res.rows.length;i++){
                    dataString = "<tr>"
                        +   "<td>" + (i+1) + "</td>"
                        +   "<td>" + res.rows.item(i).SongName + "</td>"
                        +   "<td>" + res.rows.item(i).Singer + "</td>"
                        +   "<td>" + res.rows.item(i).Album + "</td>"
                        + "</tr>";
                    obj.append($(dataString));
                }
                $("#content_header,#content_title,#songInfo").css("display","block");
            },function (tx,err) {
                console.log(err);
            });
        });
    }
}
// 创建标签表格
function createLabelList(obj,currenty_page){
    $("#search_list_label").val("");
    // 查询数据库
    db.transaction(function (tx) {
        tx.executeSql('select * from label_table',[],function (tx,res) {
            var start,end,info,item_count,each_page_count,page_count,cur_page;
            var dataString;
            var operation = "<button class=\"btn btn-danger label_delete\">删除</button>\n" +
                "        <button class=\"btn btn-success\">导出</button>";
            item_count = res.rows.length;
            each_page_count = parseInt($("#page_number option:selected").val());
            page_count = Math.ceil(item_count / each_page_count);
            if(currenty_page === "last"){
                cur_page = page_count;
            }else{
                if(currenty_page > page_count){
                    cur_page = page_count;
                }else if(currenty_page < 1){
                    cur_page = 1;
                }else{
                    cur_page = currenty_page;
                }
            }
            // 3.根据最新的信息构建表格
            // 3.1 如果仅有一页或为最后一页,确定起止位置
            if(cur_page == page_count){
                start = (cur_page - 1) * each_page_count + 1;
                end = item_count;
            }else{
                start = (cur_page - 1) * each_page_count + 1;
                end = cur_page * each_page_count;
            }
            obj.html("");
            for(var i=start-1;i<end;i++){
                dataString = "<tr>"
                    +   "<td class='song_type'>" + res.rows.item(i).label_type + "</td>"
                    +   "<td class='song_count'>" + res.rows.item(i).count + "</td>"
                    +   "<td style='width:300px'>" + operation + "</td>"
                    + "</tr>";
                obj.append($(dataString));
            }

            // 4.构建底部左侧显示信息
            info = "显示 " + start + " 到 " + end + " 项，共 " + item_count + " 项";
            $("#label_footer_info").html("");
            $("#label_footer_info").html(info);

            $("#label_footer_nav").html("");
            var pageString;
            // 5.构建页码导航
            $("#label_footer_nav").append($("<li id=\"pre_page\" class='label_nav_li'>上一页</li>"));
            $("#label_footer_nav").append($("<li id=\"next_page\" class='label_nav_li'>下一页</li>"));
            if(page_count <= 7){
                for(var i=1;i<=page_count;i++){
                    if(i === cur_page){
                        pageString = "<li class='num_page page_active label_nav_li'>" + i + "</li>";
                    }else{
                        pageString = "<li class='num_page label_nav_li'>" + i + "</li>";
                    }
                    $("#next_page").before($(pageString));
                }
            }else{
                if(cur_page < 5){
                    for(var i=1;i<=5;i++){
                        if(i === cur_page){
                            pageString = "<li class='num_page page_active label_nav_li'>" + i + "</li>";
                        }else{
                            pageString = "<li class='num_page label_nav_li'>" + i + "</li>";
                        }
                        $("#next_page").before($(pageString));
                    }
                    pageString = "<li class='num_page label_nav_li'>...</li>";
                    $("#next_page").before($(pageString));
                    pageString = "<li class='num_page label_nav_li'>" + page_count + "</li>";
                    $("#next_page").before($(pageString));
                }else{
                    if(page_count - cur_page > 3){
                        pageString = "<li class='num_page label_nav_li'>" + 1 + "</li>";
                        $("#next_page").before($(pageString));
                        pageString = "<li class='num_page label_nav_li'>...</li>";
                        $("#next_page").before($(pageString));
                        pageString = "<li class='num_page label_nav_li'>" + (cur_page - 1) + "</li>";
                        $("#next_page").before($(pageString));
                        pageString = "<li class='num_page page_active label_nav_li'>" + cur_page + "</li>";
                        $("#next_page").before($(pageString));
                        pageString = "<li class='num_page label_nav_li'>" + (cur_page + 1) + "</li>";
                        $("#next_page").before($(pageString));
                        pageString = "<li class='num_page label_nav_li'>...</li>";
                        $("#next_page").before($(pageString));
                        pageString = "<li class='num_page label_nav_li'>" + page_count + "</li>";
                        $("#next_page").before($(pageString));
                    }else{
                        pageString = "<li class='num_page label_nav_li'>" + 1 + "</li>";
                        $("#next_page").before($(pageString));
                        pageString = "<li class='num_page label_nav_li'>...</li>";
                        $("#next_page").before($(pageString));
                        for(var i = page_count - 4;i<=page_count;i++){
                            if(i === cur_page){
                                pageString = "<li class='num_page page_active label_nav_li'>" + i + "</li>";
                            }else{
                                pageString = "<li class='num_page label_nav_li'>" + i + "</li>";
                            }
                            $("#next_page").before($(pageString));
                        }
                    }
                }
            }

        },function (tx,error) {
            console.log(error);
        });
    });
}
// 创建歌曲表格
function createSongList(obj,currenty_page){
    $("#search_list_song").val("");
    db.transaction(function (tx) {
        var type = $("#song_list_type_select option:selected").val();
        var sql = "select * from "+type;
        tx.executeSql(sql,[],function (tx,res) {
            var start,end,pageString,song_count,each_page_count,page_count,cur_page;
            // 2.1 获得歌曲表格信息
            song_count = res.rows.length;
            // 检查该表中是否有数据
            if(song_count === 0){
                obj.html("");
                obj.append($("<tr><td style='padding-top: 0px;padding-bottom: 0px' colspan='6'>哎呀 , 暂时没有歌曲 , 快去添加吧</td></tr>"));

                $("#song_footer_info").html("");
                $("#song_footer_info").html("显示 0 项");

                $("#song_footer_nav").html("");
                // 2.5.2 添加上一页和下一页
                pageString = "<li id=\"song_pre_page\" class='song_nav_li'>上一页</li>\n" +
                    "<li id=\"song_next_page\" class='song_nav_li'>下一页</li>";
                $("#song_footer_nav").append($(pageString));
            }else{
                each_page_count = parseInt($("#song_page_number option:selected").val());
                page_count = Math.ceil(song_count / each_page_count);
                if(currenty_page > page_count){
                    cur_page = page_count;
                }else if(currenty_page < 1){
                    cur_page = 1;
                }else if(currenty_page === "last"){
                    cur_page = page_count;
                }else{
                    cur_page = currenty_page;
                }

                // 2.2 获得该页的起止位置
                start = (cur_page-1) * each_page_count + 1;
                if(cur_page === page_count){
                    end = song_count;
                }else{
                    end = cur_page * each_page_count;
                }
                // 2.3 创建表格
                obj.html("");
                for(var i=start;i<=end;i++){
                    var song_name = res.rows.item(i-1).SongName;
                    var song_player = res.rows.item(i-1).Player;
                    // 添加进表格
                    var songDataString = "<tr>\n" +
                        "<td>"+i+"</td>\n" +
                        "<td>"+type+"</td>\n" +
                        "<td>"+song_name+"</td>\n" +
                        "<td>"+song_player+"</td>\n" +
                        "<td>\n" +
                        "   <button class=\"song_delete\">删除</button>\n" +
                        "   <button class=\"song_amend\">修改</button>\n" +
                        "</td>\n" +
                        "<td>\n" +
                        "<input type=\"checkbox\" class=\"song_checkbox\">\n" +
                        "</td>\n" +
                        "</tr>";
                    obj.append($(songDataString));
                }

                // 2.4 构建左侧显示信息
                $("#song_footer_info").html("");
                $("#song_footer_info").html("显示 "+start+" 到 "+end+" 项，共 "+song_count+" 项");

                // 2.5 构建页码导航
                $("#song_footer_nav").html("");
                pageString = "<li id=\"song_pre_page\" class='song_nav_li'>上一页</li>\n" +
                    "<li id=\"song_next_page\" class='song_nav_li'>下一页</li>";
                $("#song_footer_nav").append($(pageString));
                if(page_count <= 7){
                    for(var i=1;i<=page_count;i++){
                        if(i === cur_page){
                            pageString = "<li class='num_page page_active song_nav_li'>" + i + "</li>";
                        }else{
                            pageString = "<li class='num_page song_nav_li'>" + i + "</li>";
                        }
                        $("#song_next_page").before($(pageString));
                    }
                }else{
                    if(cur_page < 5){
                        for(var i=1;i<=5;i++){
                            if(i === cur_page){
                                pageString = "<li class='num_page page_active song_nav_li'>" + i + "</li>";
                            }else{
                                pageString = "<li class='num_page song_nav_li'>" + i + "</li>";
                            }
                            $("#song_next_page").before($(pageString));
                        }
                        pageString = "<li class='num_page song_nav_li'>...</li>";
                        $("#song_next_page").before($(pageString));
                        pageString = "<li class='num_page song_nav_li'>" + page_count + "</li>";
                        $("#song_next_page").before($(pageString));
                    }else{
                        if(page_count - cur_page > 3){
                            pageString = "<li class='num_page song_nav_li'>" + 1 + "</li>";
                            $("#song_next_page").before($(pageString));
                            pageString = "<li class='num_page song_nav_li'>...</li>";
                            $("#song_next_page").before($(pageString));
                            pageString = "<li class='num_page song_nav_li'>" + (cur_page - 1) + "</li>";
                            $("#song_next_page").before($(pageString));
                            pageString = "<li class='num_page page_active song_nav_li'>" + cur_page + "</li>";
                            $("#song_next_page").before($(pageString));
                            pageString = "<li class='num_page song_nav_li'>" + (cur_page + 1) + "</li>";
                            $("#song_next_page").before($(pageString));
                            pageString = "<li class='num_page song_nav_li'>...</li>";
                            $("#song_next_page").before($(pageString));
                            pageString = "<li class='num_page song_nav_li'>" + page_count + "</li>";
                            $("#song_next_page").before($(pageString));
                        }else{
                            pageString = "<li class='num_page song_nav_li'>" + 1 + "</li>";
                            $("#song_next_page").before($(pageString));
                            pageString = "<li class='num_page song_nav_li'>...</li>";
                            $("#song_next_page").before($(pageString));
                            for(var i = page_count - 4;i<=page_count;i++){
                                if(i === cur_page){
                                    pageString = "<li class='num_page page_active song_nav_li'>" + i + "</li>";
                                }else{
                                    pageString = "<li class='num_page song_nav_li'>" + i + "</li>";
                                }
                                $("#song_next_page").before($(pageString));
                            }
                        }
                    }
                }
            }
        },function (tx,error) {
            console.log(error);
        });
    });
}
// 搜索标签列表
function searchLabel(obj,keyword,currentPage){
    if(keyword.length === 0){
        createLabelList($("#label_table_body"),1);
        return;
    }
    db.transaction(function (tx) {
        var sql = "select * from label_table where label_type like "+ "\"%" + keyword + "%\"";
        tx.executeSql(sql,[],function (tx,res) {
            var len = res.rows.length;
            if(len === 0){
                console.log("没找到结果");
                obj.html("");
                obj.append($("<tr><td style='padding-top: 0px;padding-bottom: 0px' colspan='3'>没有找到符合条件的记录</td></tr>"));

                $("#label_footer_info").html("");
                $("#label_footer_info").html("显示 0 项");

                $("#label_footer_nav").html("");
                // 2.5.2 添加上一页和下一页
                var noData = "<li id=\"pre_page\" class='label_nav_li'>上一页</li>\n" +
                    "<li id=\"next_page\" class='label_nav_li'>下一页</li>";
                $("#label_footer_nav").append($(noData));
                return;
            }else{
                var each_page_count = parseInt($("#page_number option:selected").val());
                var page_count = Math.ceil(len / each_page_count);
                var start,end;
                if(currentPage == page_count){
                    start = (currentPage - 1) * each_page_count + 1;
                    end = len;
                }else{
                    start = (currentPage - 1) * each_page_count + 1;
                    end = currentPage * each_page_count;
                }
                var dataString;
                var operation = "<button class=\"btn btn-danger label_delete\">删除</button>\n" +
                    "        <button class=\"btn btn-success\">导出</button>";
                obj.html("");
                for(var i=start;i<=end;i++){
                    dataString = "<tr>"
                        +   "<td class='song_type'>" + res.rows.item(i-1).label_type + "</td>"
                        +   "<td class='song_count'>" + res.rows.item(i-1).count + "</td>"
                        +   "<td style='width:300px'>" + operation + "</td>"
                        + "</tr>";
                    obj.append($(dataString));
                }
                var info = "显示 " + start + " 到 " + end + " 项，共 " + len + " 项";
                $("#label_footer_info").html("");
                $("#label_footer_info").html(info);

                // 5.构建页码导航
                $("#label_footer_nav").html("");
                var pageString;
                $("#label_footer_nav").append($("<li id=\"pre_page\" class='label_nav_li'>上一页</li>"));
                $("#label_footer_nav").append($("<li id=\"next_page\" class='label_nav_li'>下一页</li>"));

                if(page_count <= 7){
                    for(var i=1;i<=page_count;i++){
                        if(i === currentPage){
                            pageString = "<li class='num_page page_active label_nav_li'>" + i + "</li>";
                        }else{
                            pageString = "<li class='num_page label_nav_li'>" + i + "</li>";
                        }
                        $("#next_page").before($(pageString));
                    }
                }else{
                    if(currentPage < 5){
                        for(var i=1;i<=5;i++){
                            if(i === currentPage){
                                pageString = "<li class='num_page page_active label_nav_li'>" + i + "</li>";
                            }else{
                                pageString = "<li class='num_page label_nav_li'>" + i + "</li>";
                            }
                            $("#next_page").before($(pageString));
                        }
                        pageString = "<li class='num_page label_nav_li'>...</li>";
                        $("#next_page").before($(pageString));
                        pageString = "<li class='num_page label_nav_li'>" + page_count + "</li>";
                        $("#next_page").before($(pageString));
                    }else{
                        if(page_count - currentPage > 3){
                            pageString = "<li class='num_page label_nav_li'>" + 1 + "</li>";
                            $("#next_page").before($(pageString));
                            pageString = "<li class='num_page label_nav_li'>...</li>";
                            $("#next_page").before($(pageString));
                            pageString = "<li class='num_page label_nav_li'>" + (currentPage-1) + "</li>";
                            $("#next_page").before($(pageString));
                            pageString = "<li class='num_page page_active label_nav_li'>" + currentPage + "</li>";
                            $("#next_page").before($(pageString));
                            pageString = "<li class='num_page label_nav_li'>" + (currentPage+1) + "</li>";
                            $("#next_page").before($(pageString));
                            pageString = "<li class='num_page label_nav_li'>...</li>";
                            $("#next_page").before($(pageString));
                            pageString = "<li class='num_page label_nav_li'>" + page_count + "</li>";
                            $("#next_page").before($(pageString));
                        }else{
                            pageString = "<li class='num_page label_nav_li'>" + 1 + "</li>";
                            $("#next_page").before($(pageString));
                            pageString = "<li class='num_page label_nav_li'>...</li>";
                            $("#next_page").before($(pageString));
                            for(var i = page_count-4;i<=page_count;i++){
                                if(i === currentPage){
                                    pageString = "<li class='num_page page_active label_nav_li'>" + i + "</li>";
                                }else{
                                    pageString = "<li class='num_page label_nav_li'>" + i + "</li>";
                                }
                                $("#next_page").before($(pageString));
                            }
                        }
                    }
                }
            }
        },function (tx,error) {
            console.log(error);
        });
    });
}
// 搜索歌曲列表
function searchSong(obj,keyword,currentPage){
    if(keyword.length === 0){
        createSongList($("#song_table_body"),1);
        return;
    }
    db.transaction(function (tx) {
        var type = $("#song_list_type_select option:selected").val();
        var sql = "select * from "+type+" where SongName like "+"\"%"+keyword+"%\" or Player like \"%"+keyword+"%\"";
        tx.executeSql(sql,[],function (tx,res) {
            var len = res.rows.length;
            if(len === 0){
                console.log("没找到结果");
                obj.html("");
                obj.append($("<tr><td style='padding-top: 0px;padding-bottom: 0px' colspan='6'>没有找到符合条件的记录</td></tr>"));

                $("#song_footer_info").html("");
                $("#song_footer_info").html("显示 0 项");

                $("#song_footer_nav").html("");
                // 2.5.2 添加上一页和下一页
                var noData = "<li id=\"pre_page\" class='song_nav_li'>上一页</li>\n" +
                    "<li id=\"next_page\" class='song_nav_li' style='cursor: not-allowed'>下一页</li>";
                $("#song_footer_nav").append($(noData));
                return;
            }

            var each_page_count = parseInt($("#song_page_number option:selected").val());
            var page_count = Math.ceil(len / each_page_count);
            var start,end;
            if(currentPage == page_count){
                start = (currentPage - 1) * each_page_count + 1;
                end = len;
            }else{
                start = (currentPage - 1) * each_page_count + 1;
                end = currentPage * each_page_count;
            }

            // 构建表格
            obj.html("");
            var song_name,song_player;
            for(var i=start;i<=end;i++){
                song_name = res.rows.item(i-1).SongName;
                song_player = res.rows.item(i-1).Player;
                // 添加进表格
                var songDataString = "<tr>\n" +
                    "<td>"+i+"</td>\n" +
                    "<td>"+type+"</td>\n" +
                    "<td>"+song_name+"</td>\n" +
                    "<td>"+song_player+"</td>\n" +
                    "<td>\n" +
                    "   <button class=\"song_delete\">删除</button>\n" +
                    "   <button class=\"song_amend\">修改</button>\n" +
                    "</td>\n" +
                    "<td>\n" +
                    "<input type=\"checkbox\" class=\"song_checkbox\">\n" +
                    "</td>\n" +
                    "</tr>";
                obj.append($(songDataString));
            }


            var info = "显示 " + start + " 到 " + end + " 项，共 " + len + " 项";
            $("#song_footer_info").html("");
            $("#song_footer_info").html(info);

            // 5.构建页码导航
            $("#song_footer_nav").html("");
            var pageString;
            $("#song_footer_nav").append($("<li id=\"song_pre_page\" class='song_nav_li'>上一页</li>"));
            $("#song_footer_nav").append($("<li id=\"song_next_page\" class='song_nav_li'>下一页</li>"));

            if(page_count <= 7){
                for(var i=1;i<=page_count;i++){
                    if(i === currentPage){
                        pageString = "<li class='num_page page_active song_nav_li'>" + i + "</li>";
                    }else{
                        pageString = "<li class='num_page song_nav_li'>" + i + "</li>";
                    }
                    $("#song_next_page").before($(pageString));
                }
            }else{
                if(currentPage < 5){
                    for(var i=1;i<=5;i++){
                        if(i === currentPage){
                            pageString = "<li class='num_page page_active song_nav_li'>" + i + "</li>";
                        }else{
                            pageString = "<li class='num_page song_nav_li'>" + i + "</li>";
                        }
                        $("#song_next_page").before($(pageString));
                    }
                    pageString = "<li class='num_page song_nav_li'>...</li>";
                    $("#song_next_page").before($(pageString));
                    pageString = "<li class='num_page song_nav_li'>" + page_count + "</li>";
                    $("#song_next_page").before($(pageString));
                }else{
                    if(page_count - currentPage > 3){
                        pageString = "<li class='num_page song_nav_li'>" + 1 + "</li>";
                        $("#song_next_page").before($(pageString));
                        pageString = "<li class='num_page song_nav_li'>...</li>";
                        $("#song_next_page").before($(pageString));
                        pageString = "<li class='num_page song_nav_li'>" + (currentPage-1) + "</li>";
                        $("#song_next_page").before($(pageString));
                        pageString = "<li class='num_page page_active song_nav_li'>" + currentPage + "</li>";
                        $("#song_next_page").before($(pageString));
                        pageString = "<li class='num_page song_nav_li'>" + (currentPage+1) + "</li>";
                        $("#song_next_page").before($(pageString));
                        pageString = "<li class='num_page song_nav_li'>...</li>";
                        $("#song_next_page").before($(pageString));
                        pageString = "<li class='num_page song_nav_li'>" + page_count + "</li>";
                        $("#song_next_page").before($(pageString));
                    }else{
                        pageString = "<li class='num_page song_nav_li'>" + 1 + "</li>";
                        $("#song_next_page").before($(pageString));
                        pageString = "<li class='num_page song_nav_li'>...</li>";
                        $("#song_next_page").before($(pageString));
                        for(var i = page_count-4;i<=page_count;i++){
                            if(i === currentPage){
                                pageString = "<li class='num_page page_active song_nav_li'>" + i + "</li>";
                            }else{
                                pageString = "<li class='num_page song_nav_li'>" + i + "</li>";
                            }
                            $("#song_next_page").before($(pageString));
                        }
                    }
                }
            }
        },function (tx,error) {
            console.log("语句执行错误");
            console.log(error);
        });
    });
}
// 歌曲列表批量删除
function batchDeleteSong() {
    var song_type = $("#song_list_type_select option:selected").val();
    var delete_count = 0;
    var song_count = 0;
    $(".song_checkbox:checked").each(function () {
        var delete_item =  $(this).parent().prevAll().slice(1,3);
        var Player = $(delete_item[0]).html();
        var SongName = $(delete_item[1]).html();
        var sql = "delete from " + song_type + " where SongName=? and Player=?";
        db.transaction(function (tx) {
            tx.executeSql(sql, [SongName, Player], function (tx, res) {
                // 从歌曲列表中删除该行
                $(delete_item[0]).parent().remove();
                ++delete_count;
            }, function (tx, error) {
                console.log(error);
            });
        });
    });

    db.transaction(function (tx) {
        tx.executeSql('select count from label_table where label_type=?',[song_type],function (tx,res) {
            song_count = res.rows.item(0).count;
            var sqlString = "update label_table set count=" + (song_count - delete_count) + " where label_type=?";
            tx.executeSql(sqlString, [song_type], function (tx, res) {
                // 关闭
                $("#delete_list_cancel").triggerHandler("click");
                // 显示删除成功的提示
                showInfo("删除成功",true);
            }, function (tx, error) {
                showInfo("删除失败",false);
                console.log(error);
            });
        },function (tx,error) {
            console.log(error);
        });
    })

    // 重新加载歌曲列表
    createSongList($("#song_table_body"), parseInt($("#song_footer_nav .page_active").html()));
}
// 执行结果的反馈
function showInfo(info,isSuccess){
    $("#song_verify").css("display","none");
    $("#song_verify").html(info);
    if(isSuccess){
        $("#song_verify").css({"background-color":"#28A745","display":"block"});
        $("#song_verify").addClass("swing");
        setTimeout(function () {
            $("#song_verify").addClass("fadeOut");
            setTimeout(function () {
                $("#song_verify").css("display","none");
                $("#song_verify").removeClass("fadeOut swing");
            },1900);
        },1500)
    }else{
        $("#song_verify").css({"background-color":"#D84C31","display":"block"});
        $("#song_verify").addClass("shake");
        setTimeout(function () {
            $("#song_verify").addClass("fadeOut");
            setTimeout(function () {
                $("#song_verify").css("display","none");
                $("#song_verify").removeClass("shake fadeOut");
            },1900);
        },1500);
    }
}