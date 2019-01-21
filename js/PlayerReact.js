var db = openDatabase("DataBase_A","1.0","SongInfo","2*1024*1024");
$(document).ready(function () {
    // 判断歌曲榜单表是否存在，不存在就创建表，存在就加载榜单歌曲
    db.transaction(function (tx) {
        tx.executeSql('select SongName from list_table',[],function (tx,res) {
            // 存在该表格
            createTbody($("#table_body"),"NewSong","酷我新歌榜");
            return;
        },function (tx,err) {
            // 不存在该表
            if(err["message"].indexOf("no such table")!=-1){
                // 创建数据表并导入数据
                db.transaction(function (tx) {
                    tx.executeSql('create table list_table(SongName,Singer,Album,List_Name)');
                    insertData(New_Song,tx,"list_table","NewSong");
                    insertData(Hot_Song,tx,"list_table","HotSong");
                    insertData(Rise_Song,tx,"list_table","RiseSong");
                    insertData(Chinese_Song,tx,"list_table","ChineseSong");
                    insertData(Trend_Song,tx,"list_table","TrendSong");
                });
            }
        });
    });

    // 构建数据库表
    {
        // 判断标签表是否存在，不存在就创建，并插入数据
        db.transaction(function (tx) {
            tx.executeSql('select label_type from label_table ',[],function (tx,res) {
                return;
            },function (tx,err) {
                // 不存在数据表
                if(err["message"].indexOf("no such table")!=-1){
                    tx.executeSql('create table label_table(label_type,count)',[],function (tx) {
                        for(var i=0;i<label_data.length;i++){
                            var type = label_data[i]["name"];
                            var count = label_data[i]["count"];
                            tx.executeSql('insert into label_table values (?,?)',[type,count],function () {
                            },function () {
                                alert("数据插入失败!");
                            });
                        }
                    },function (tx,err) {
                        alert("数据表创建失败!");
                        console.log(err);
                    });
                    // 判断电子表格是否存在，不存在就创建，并插入数据
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 电子',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 电子(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<电子.length;i++){
                                        var SongName = 电子[i]["SongName"];
                                        var Player = 电子[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 电子 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建民歌数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 民歌',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 民歌(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<民歌.length;i++){
                                        var SongName = 民歌[i]["SongName"];
                                        var Player = 民歌[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 民歌 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建儿歌数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 儿歌',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 儿歌(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<儿歌.length;i++){
                                        var SongName = 儿歌[i]["SongName"];
                                        var Player = 儿歌[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 儿歌 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建民谣数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 民谣',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 民谣(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<民谣.length;i++){
                                        var SongName = 民谣[i]["SongName"];
                                        var Player = 民谣[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 民谣 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建古风数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 古风',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 古风(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<古风.length;i++){
                                        var SongName = 古风[i]["SongName"];
                                        var Player = 古风[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 古风 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建怀旧数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 怀旧',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 怀旧(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<怀旧.length;i++){
                                        var SongName = 怀旧[i]["SongName"];
                                        var Player = 怀旧[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 怀旧 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建古典数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 古典',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 古典(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<古典.length;i++){
                                        var SongName = 古典[i]["SongName"];
                                        var Player = 古典[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 古典 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建广场舞数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 广场舞',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 广场舞(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<广场舞.length;i++){
                                        var SongName = 广场舞[i]["SongName"];
                                        var Player = 广场舞[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 广场舞 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建纯音乐数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 纯音乐',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 纯音乐(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<纯音乐.length;i++){
                                        var SongName = 纯音乐[i]["SongName"];
                                        var Player = 纯音乐[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 纯音乐 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建粤语数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 粤语',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 粤语(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<粤语.length;i++){
                                        var SongName = 粤语[i]["SongName"];
                                        var Player = 粤语[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 粤语 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建轻音乐数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 轻音乐',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 轻音乐(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<轻音乐.length;i++){
                                        var SongName = 轻音乐[i]["SongName"];
                                        var Player = 轻音乐[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 轻音乐 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建影视数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 影视',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 影视(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<影视.length;i++){
                                        var SongName = 影视[i]["SongName"];
                                        var Player = 影视[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 影视 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建钢琴曲数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 钢琴曲',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 钢琴曲(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<钢琴曲.length;i++){
                                        var SongName = 钢琴曲[i]["SongName"];
                                        var Player = 钢琴曲[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 钢琴曲 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建跨界歌王数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 跨界歌王',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 跨界歌王(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<跨界歌王.length;i++){
                                        var SongName = 跨界歌王[i]["SongName"];
                                        var Player = 跨界歌王[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 跨界歌王 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建快乐数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 快乐',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 快乐(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<快乐.length;i++){
                                        var SongName = 快乐[i]["SongName"];
                                        var Player = 快乐[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 快乐 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建伤感数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 伤感',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 伤感(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<伤感.length;i++){
                                        var SongName = 伤感[i]["SongName"];
                                        var Player = 伤感[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 伤感 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建爵士数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 爵士',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 爵士(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<爵士.length;i++){
                                        var SongName = 爵士[i]["SongName"];
                                        var Player = 爵士[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 爵士 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建说唱数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 说唱',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 说唱(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<说唱.length;i++){
                                        var SongName = 说唱[i]["SongName"];
                                        var Player = 说唱[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 说唱 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建情歌数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 情歌',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 情歌(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<情歌.length;i++){
                                        var SongName = 情歌[i]["SongName"];
                                        var Player = 情歌[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 情歌 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建乡村数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 乡村',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 乡村(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<乡村.length;i++){
                                        var SongName = 乡村[i]["SongName"];
                                        var Player = 乡村[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 乡村 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });

                    // 创建励志数据库
                    db.transaction(function (tx) {
                        tx.executeSql('select * from 励志',[],function () {
                            return;
                        },function (tx,err) {
                            if(err["message"].indexOf("no such table")!=-1){
                                tx.executeSql('create table 励志(ID,SongName,Player)',[],function (tx) {
                                    for(var i=0;i<励志.length;i++){
                                        var SongName = 励志[i]["SongName"];
                                        var Player = 励志[i]["Player"];
                                        if(SongName.length > 14){
                                            SongName = SongName.slice(0,14);
                                        }
                                        if(Player.length > 14){
                                            Player = Player.slice(0,14);
                                        }
                                        tx.executeSql('insert into 励志 values (1,?,?)',[SongName,Player],function () {
                                        },function () {
                                            alert("数据插入失败!");
                                        });
                                    }
                                },function (tx,err) {
                                    alert("数据表创建失败!");
                                    console.log(err);
                                });
                            }
                        });
                    });
                }
            })
        });
    }

    /***************修改个别元素的样式*************************************/
    $("#left_nav li:lt(3)").css({"border":"none"});
    $("#right_pick,#content_header>a").hover(function () {
        $(this).css({"background":"rgb(25,169,213)"});
    },function () {
        $(this).css({"background":"rgb(35,183,229)"});
    });
    /**-------------------------END--------------------------------------**/



    /***************左侧不含子菜单的菜单的鼠标移入移除事件*****************/
    $(".nav_item").hover(function () {
        $(this).css({"background-color":"rgb(19,30,38)","color":"white"});
    },function () {
        $(this).css({"background-color":"rgba(28,43,54,1)","color":"rgb(134,159,177)"});
    });
    /**-------------------------END--------------------------------------**/



    /******************监测各个子菜单的展开、闭合**************************/
    var label_sub_item_close = true;
    var file_sub_item_close = true;
    var song_sub_item_close = true;
    /**-------------------------END--------------------------------------**/


    /****************主菜单的鼠标移入移出事件******************************/
    $("#label").hover(function () {
        $(this).css({"background-color":"rgb(19,30,38)","color":"white","cursor":"pointer"});
        $("#label_img").css({
            "background":"url(./images/label_hover.png) no-repeat",
            "background-size":"100% 100%",
            "background-position-y":"1px"
        });
    },function () {
        if(label_sub_item_close) {
            $(this).css({"background-color": "rgba(28,43,54,1)", "color": "rgb(134,159,177)"});
            $("#label_img").css({
                "background":"url(./images/label.png) no-repeat",
                "background-size":"100% 100%",
                "background-position-y":"1px"
            });
        }
    });

    $("#file").hover(function () {
        $(this).css({"background-color":"rgb(19,30,38)","color":"white"});
        $("#file_img").css({
            "background":"url(./images/file_hover.png) no-repeat",
            "background-size":"100% 100%",
            "background-position-y":"1px"
        });
    },function () {
        if(file_sub_item_close){
            $(this).css({"background-color": "rgba(28,43,54,1)", "color": "rgb(134,159,177)"});
            $("#file_img").css({
                "background":"url(./images/file.png) no-repeat",
                "background-size":"100% 100%",
                "background-position-y":"1px"
            });
        }
    });

    $("#song").hover(function () {
        $(this).css({"background-color":"rgb(19,30,38)","color":"white"});
        $("#song_img").css({
            "background":"url(./images/song_hover.png) no-repeat",
            "background-size":"100% 100%",
            "background-position-y":"1px"
        });
    },function () {
        if(song_sub_item_close){
            $(this).css({"background-color": "rgba(28,43,54,1)", "color": "rgb(134,159,177)"});
            $("#song_img").css({
                "background":"url(./images/song.png) no-repeat",
                "background-size":"100% 100%",
                "background-position-y":"1px"
            });
        }
    });
    /**-------------------------END--------------------------------------**/


    /*******************各个主菜单的子菜单的鼠标移入移出**************/
    $("#label_content div").hover(function () {
        if(label_sub_item_close === false){
            $(this).css({"color":"white"});
        }
    },function () {
        $(this).css({"color":"rgb(134,159,177)"});
    });

    $("#file_sub_menu").hover(function () {
        if(file_sub_item_close === false){
            $(this).css("color","white");
        }
    },function () {
        $(this).css("color","rgb(134,159,177)");
    });

    $("#song_sub_one,#song_sub_two").hover(function () {
        if(song_sub_item_close === false){
            $(this).css("color","white");
        }
    },function () {
        $(this).css("color","rgb(134,159,177)");
    });
    /**--------------------------END-------------------------------------*/


    /**********************顶部菜单展开******************************/
    {
        var one_Nav_IsShow = true;
        $("#right_pick").click(function () {
            if (one_Nav_IsShow) {
                // 确保已关闭所有的子菜单
                if (label_sub_item_close === false) {
                    $("#label").triggerHandler("click");
                }
                if (file_sub_item_close === false) {
                    $("#file").triggerHandler("click");
                }
                if (song_sub_item_close === false) {
                    $("#song").triggerHandler("click");
                }

                $("#left_nav").fadeOut(100, function () {
                    $("#left_nav_two").fadeIn(600);
                });
                $("#left_side").css({"width": "5%"});
                $("#right_header").css({"left": "5%"});
                $("#right_content").css({"width": "95%", "left": "5%"});
                one_Nav_IsShow = false;
            } else {
                $("#left_nav_two").fadeOut(200, function () {
                    $("#left_nav").fadeIn(600);
                });
                $("#left_side").css({"width": "15%"});
                $("#right_header").css({"left": "15%"});
                $("#right_content").css({"width": "85%", "left": "15%"});
                one_Nav_IsShow = true;
            }
            return false;
        });
    }
    /**-----------------------END------------------------------------/

     /*******************第二个侧边菜单******************************/
    {
        $("#nav_two_header").click(function () {
            $("#right_pick").triggerHandler("click");
            return false;
        });

        $("#nav_two_label a").click(function () {
            $("#right_pick").triggerHandler("click");
            $("#label").triggerHandler("click");
            return false;
        });

        $("#nav_two_file a").click(function () {
            $("#right_pick").triggerHandler("click");
            $("#file").triggerHandler("click");
            return false;
        });

        $("#nav_two_song a").click(function () {
            $("#right_pick").triggerHandler("click");
            $("#song").triggerHandler("click");
            return false;
        });
    }
    /**-----------------------END-----------------------------------*/


    /************************歌曲验证*********************************/
    {
        $("#verify,#two_verify").click(function () {
            $("#song_verify").css("display","none");
            $("#song_verify").removeClass("fadeOut");
            $("#song_verify").css("background-color", "#D84C31");
            $("#song_verify").html("后台验证中 , 请勿点击");
            $("#song_verify").css("display", "block");

            // 全屏摇起来
            $("#left_side").addClass("wobble");
            $("#right_header").addClass("rubberBand");
            $("#right_content").addClass("tada");

            setTimeout(function () {
                $("#song_verify").addClass("fadeOut");

                $("#left_side").removeClass("wobble");
                $("#right_header").removeClass("rubberBand");
                $("#right_content").removeClass("tada");

                setTimeout(function () {
                    $("#song_verify").css("display", "none");
                }, 1980);
            }, 2000);
        });
    }
    /**------------------------END---------------------------------**/


    /*************************主页**********************************/
    {
        $("#home").click(function () {
            $("#newSong").triggerHandler("click");
            return false;
        });

        $("#nav_two_home").click(function () {
            $("#newSong").triggerHandler("click");
            return false;
        });
    }
    /**------------------------END---------------------------------/


    /***********************歌曲榜单*******************************/
    {
        // 新歌榜点击事件
        $("#newSong").click(function () {
            createTbody($("#table_body"), "NewSong", "酷我新歌榜");
        });

        // 热歌榜点击事件
        $("#hotSong").click(function () {
            createTbody($("#table_body"), "HotSong", "酷我热歌榜");
        });

        // 飙升榜点击事件
        $("#riseSong").click(function () {
            createTbody($("#table_body"), "RiseSong", "酷我飙升榜");
        });

        // 华语榜点击事件
        $("#chineseSong").click(function () {
            createTbody($("#table_body"), "ChineseSong", "酷我华语榜");
        });

        // 潮流热歌榜点击事件
        $("#trendSong").click(function () {
            createTbody($("#table_body"), "TrendSong", "潮流热歌榜");
        });
    }
    /**-----------------------END-----------------------------**/



    /*******************子菜单的点击事件*************************/
    {
        // 标签管理点击弹出子菜单
        $("#label").click(function () {
            if ($(this).parent().css("height") === "56.5px") {
                $(this).parent().animate({height: "148.5px"}, 300);
                $(this).find(".d_arrow").css("transform", "rotate(-90deg)");
                $("#label_img").css({
                    "background": "url(./images/label_hover.png) no-repeat",
                    "background-size": "100% 100%",
                    "background-position-y": "1px"
                });
                $("#label_content div,#label").css({
                    "background-color": "rgb(19,30,38)",
                    "border-left": "4px solid rgb(35,183,229)"
                });
                $("#label").css("color", "white");
                label_sub_item_close = false;

                if (file_sub_item_close === false) {
                    $("#file").triggerHandler("click");
                }
                if (song_sub_item_close === false) {
                    $("#song").triggerHandler("click");
                }
                return false;
            } else {
                $(this).parent().animate({height: "56.5px"}, 300, function () {
                    $(this).find(".d_arrow").css("transform", "rotate(0deg)");
                    $("#label_content div").css({"background-color": "rgba(28,43,54,1)", "border-left": "none"});
                    $("#label").css({
                        "background-color": "rgba(28,43,54,1)",
                        "color": "rgb(134,159,177)",
                        "border-left": "none"
                    });
                    $("#label_img").css({
                        "background": "url(./images/label.png) no-repeat",
                        "background-size": "100% 100%",
                        "background-position-y": "1px"
                    });
                });
                label_sub_item_close = true;
            }
        });

        // 文件管理点击弹出子菜单
        $("#file").click(function () {
            if ($(this).parent().css("height") === "70px") {
                $(this).parent().animate({height: "116px"}, 150);
                $(this).find(".d_arrow").css("transform", "rotate(-90deg)");
                $("#file_sub_menu,#file").css({
                    "background-color": "rgb(19,30,38)",
                    "border-left": "4px solid rgb(35,183,229)"
                });
                $("#file").css("color", "white");
                file_sub_item_close = false;

                $("#file_img").css({
                    "background": "url(./images/file_hover.png) no-repeat",
                    "background-size": "100% 100%",
                    "background-position-y": "1px"
                });

                if (label_sub_item_close === false) {
                    $("#label").triggerHandler("click");
                }
                if (song_sub_item_close === false) {
                    $("#song").triggerHandler("click");
                }
                return false;
            } else {
                $(this).parent().animate({height: "70px"}, 150, function () {
                    $(this).find(".d_arrow").css("transform", "rotate(0deg)");
                    $("#file_sub_menu").css({"background-color": "rgba(28,43,54,1)", "border-left": "none"});
                    $("#file").css({
                        "background-color": "rgba(28,43,54,1)",
                        "color": "rgb(134,159,177)",
                        "border-left": "none"
                    });
                    $("#file_img").css({
                        "background": "url(./images/file.png) no-repeat",
                        "background-size": "100% 100%",
                        "background-position-y": "1px"
                    });
                });
                file_sub_item_close = true;
            }

        });

        // 歌曲管理点击弹出子菜单
        $("#song").click(function () {
            if ($(this).parent().css("height") === "70px") {
                $(this).parent().animate({height: "162px"}, 300);
                $(this).find(".d_arrow").css("transform", "rotate(-90deg)");
                $("#song_sub_one,#song_sub_two,#song").css({
                    "background-color": "rgb(19,30,38)",
                    "border-left": "4px solid rgb(35,183,229)"
                });
                $("#song").css("color", "white");
                song_sub_item_close = false;

                $("#song_img").css({
                    "background": "url(./images/song_hover.png) no-repeat",
                    "background-size": "100% 100%",
                    "background-position-y": "1px"
                });

                if (label_sub_item_close === false) {
                    $("#label").triggerHandler("click");
                }
                if (file_sub_item_close === false) {
                    $("#file").triggerHandler("click");
                }
                return false;
            } else {
                $(this).parent().animate({height: "70px"}, 300, function () {
                    $(this).find(".d_arrow").css("transform", "rotate(0deg)");
                    $("#song_sub_one,#song_sub_two").css({
                        "background-color": "rgba(28,43,54,1)",
                        "border-left": "none"
                    });
                    $("#song").css({
                        "background-color": "rgba(28,43,54,1)",
                        "color": "rgb(134,159,177)",
                        "border-left": "none"
                    })
                    $("#song_img").css({
                        "background": "url(./images/song.png) no-repeat",
                        "background-size": "100% 100%",
                        "background-position-y": "1px"
                    });
                });
                song_sub_item_close = true;
            }
        });
    }
    /**----------------------END---------------------------**/

    var delete_item,isFromBath = false;

    /**********************标签管理******************************/
    {
        $("#label_footer_nav").delegate(".label_nav_li", "mouseover", function () {
            var act_page = $("#label_footer_nav").find(".page_active");
            var thisHtml = $(this).html();
            if (thisHtml === "上一页") {
                if (act_page.html() === "1") {
                    $(this).css("cursor", "not-allowed");
                } else if ($(this).next().html() === "下一页") {
                    $(this).css("cursor", "not-allowed");
                } else {
                    $(this).css("cursor", "pointer");
                    $(this).addClass("mouseover_active");
                }
                return;
            }
            if (thisHtml === "下一页") {
                if (act_page.html() === $(this).prev().html()) {
                    $(this).css("cursor", "not-allowed");
                } else if ($(this).prev().html() === "上一页") {
                    $(this).css("cursor", "not-allowed");
                } else {
                    $(this).css("cursor", "pointer");
                    $(this).addClass("mouseover_active");
                }
                return;
            }
            if (thisHtml === "...") {
                $(this).css("cursor", "not-allowed");
                return;
            }
            if ($(this).hasClass("page_active") === false) {
                $(this).css("cursor", "pointer");
                $(this).addClass("mouseover_active");
            }
        });

        $("#label_footer_nav").delegate(".label_nav_li", "mouseout", function () {
            if ($(this).hasClass("mouseover_active")) {
                $(this).removeClass("mouseover_active");
            }
        });

        $("#label_footer_nav").delegate(".label_nav_li", "click", function () {
            if ($(this).css("cursor") === "not-allowed") {
                return;
            }
            var act_page = $("#label_footer_nav").find(".page_active");
            var thisHtml = $(this).html();
            var keyword = $("#search_list_label").val().trim();
            if(keyword.length !== 0){
                if (thisHtml === "上一页") {
                    searchLabel($("#label_table_body"),keyword,parseInt(act_page.html()) - 1);
                } else if (thisHtml === "下一页") {
                    searchLabel($("#label_table_body"),keyword,parseInt(act_page.html()) + 1);
                } else {
                    searchLabel($("#label_table_body"),keyword,parseInt(thisHtml));
                }
            }else{
                if (thisHtml === "上一页") {
                    createLabelList($("#label_table_body"), parseInt(act_page.html()) - 1);
                } else if (thisHtml === "下一页") {
                    createLabelList($("#label_table_body"), parseInt(act_page.html()) + 1);
                } else {
                    createLabelList($("#label_table_body"), parseInt(thisHtml));
                }
            }
            // if (thisHtml === "上一页") {
            //     var pre_active_li = act_page.prev();
            //     act_page.removeClass("page_active");
            //     pre_active_li.addClass("page_active");
            //     createLabelList($("#label_table_body"), parseInt(pre_active_li.html()));
            //     return;
            // }
            // if (thisHtml === "下一页") {
            //     var next_active_li = act_page.next();
            //     act_page.removeClass("page_active");
            //     next_active_li.addClass("page_active");
            //     createLabelList($("#label_table_body"), parseInt(next_active_li.html()));
            //     return;
            // }
            // act_page.removeClass("page_active");
            // $(this).addClass("page_active");
            // createLabelList($("#label_table_body"), parseInt(thisHtml));
        });

        // 标签列表中行删除按钮的Click事件
        $("body").delegate(".label_delete", "click", function () {
            $("#mask").css("display", "block");
            $("#delete_list").css("display", "block");
            $("#delete_list").addClass("bounceIn_show");
            delete_item = $(this).parents("tr").children(".song_type");
        });

        // 删除标签弹窗取消按钮的Click事件
        $("#delete_list_cancel").click(function () {
            $("#delete_list").addClass("zoomOut");
            $("#delete_list").removeClass("bounceIn_show");
            $("#mask").css("display", "none");
            delete_item = null;
            setTimeout(function () {
                $("#delete_list").css("display", "none");
                $("#delete_list").removeClass("zoomOut");
            }, 700);
        });

        // 点击确定后删除该行
        $("#delete_list_yes").click(function () {
            db.transaction(function (tx) {
                // 判断该删除哪个列表
                if ($("#label_list_container").css("display") === "block") {
                    var type = delete_item.html();
                    tx.executeSql('drop table '+type,[],function (tx) {
                        tx.executeSql('delete from label_table where label_type = ?', [type], function () {
                            // 从列表中删去该行
                            delete_item.parent().remove();
                            // 关闭
                            $("#delete_list_cancel").triggerHandler("click");

                            $("#search_list_label").val("");

                            // 重新加载标签列表
                            createLabelList($("#label_table_body"), parseInt($("#label_footer_nav .page_active").html()));
                            // 显示删除成功的提示
                            showInfo("删除成功",true);
                        }, null);
                    },function (error) {
                        showInfo("删除失败",false);
                        console.log(error);
                    });
                } else if ($("#song_list_container").css("display") === "block") {
                    if(isFromBath){
                        batchDeleteSong();
                    }else{
                        var player = $(delete_item[0]).html();
                        var songName = $(delete_item[1]).html();
                        var song_type = $(delete_item[2]).html();
                        var song_count;
                        // 1.获得该类型歌曲的歌曲总数
                        tx.executeSql('select count from label_table where label_type=?', [song_type], function (tx, res) {
                            song_count = res.rows.item(0).count;
                            // 1.1 从该类型歌曲表中删除这首歌
                            var sql = "delete from " + song_type + " where SongName=? and Player=?";
                            tx.executeSql(sql, [songName, player], function (tx) {
                                // 从歌曲列表中删除该行
                                $(delete_item[0]).parent().remove();
                                // 重新加载歌曲列表
                                createSongList($("#song_table_body"), parseInt($("#song_footer_nav .page_active").html()));
                                // 1.2 修改数据库标签表—label_table中的数据，修改数量
                                var sqlString = "update label_table set count=" + (song_count - 1) + " where label_type=?";
                                tx.executeSql(sqlString, [song_type], function (tx, res) {
                                    // 关闭
                                    $("#delete_list_cancel").triggerHandler("click");
                                    // 显示删除成功的提示
                                    showInfo("删除成功",true);
                                }, function (tx, error) {
                                    showInfo("删除失败",false);
                                    console.log(error);
                                });

                            }, function (tx, error) {
                                showInfo("删除失败",false);
                                console.log(error);
                            });
                        }, function (tx,error) {
                            showInfo("删除失败",false);
                            console.log(error);
                        });
                    }
                }
            });
        });

        // 重新选择显示个数下拉列表，重新刷新标签列表
        $("#page_number").on("change", function () {
            if($("#search_list_label").val().trim().length !== 0){
                searchLabel($("#label_table_body"),$("#search_list_label").val().trim(),1);
            }else{
                createLabelList($("#label_table_body"), 1);
            }
        });

        // 添加标签——点击——弹出窗口
        $("#add_label").click(function () {
            if (label_sub_item_close) {
                return;
            }
            if($("#label_list_container").css("display") === "none"){
                $("#label_list").triggerHandler("click");
            }
            $("#mask").css({"display": "block"});
            $("#add_label_modal").css("display", "block");
            $("#label_body_input").focus();
            $("#add_label_modal").addClass("bounceIn_show");
        });

        // 重置按钮点击后清空输入框的内容
        $("#label_body_reset").click(function () {
            $("#label_body_input").val("");
            $("#label_body_input").css("border", "1px solid rgb(37,183,229)");
            $("#label_body_input").focus();
        });

        // 实时监听输入框的内容变化
        $("#label_body_input").on("propertychange input", function () {
            if ($(this).val().trim().length === 0) {
                $(this).css("border", "1px solid rgb(255,0,0)");
            } else if (isNaN($(this).val().trim()) === false) {
                $(this).css("border", "1px solid rgb(255,0,0)");
            } else {
                $(this).css("border", "1px solid rgb(37,183,229)");
            }
        });

        // 保存标签按钮点击后保存数据、创建数据表
        $("#label_body_save").click(function () {
            var label_type = $("#label_body_input").val().trim();
            if (label_type.length === 0) {
                $("#label_body_input").addClass("bounceIn_show");
                $("#label_body_input").css("border", "1px solid rgb(255,0,0)");
                $("#label_body_input").val("");
                setTimeout(function () {
                    $("#label_body_input").removeClass("bounceIn_show");
                    $("#label_body_input").focus();
                }, 1100);
                return;
            } else {
                if (isNaN(label_type) === false) {
                    $("#label_body_input").addClass("bounceIn_show");
                    $("#label_body_input").css("border", "1px solid rgb(255,0,0)");
                    $("#label_body_input").val("");
                    setTimeout(function () {
                        $("#label_body_input").removeClass("bounceIn_show");
                        $("#label_body_input").focus();
                    }, 1100);
                    return;
                }
                // 对输入进行处理
                var label_arry = label_type.split(" ");
                var i, len, newArray = [], pat = /^\d/;
                for (i = 0, len = label_arry.length; i < len; i++) {
                    if (pat.test(label_arry[i]) === true) {
                        continue;
                    } else {
                        newArray.push(label_arry[i]);
                    }
                }
                if (newArray.length === 0) {
                    $("#label_body_input").val("");
                    $("#label_body_input").focus();
                    return;
                } else {
                    db.transaction(function (tx) {

                        // 隐藏标签添加框(触发关闭按钮)
                        $("#add_label_close").triggerHandler("click");
                        for (var i = 0, len = newArray.length; i < len; i++) {

                            tx.executeSql('insert into label_table values (?,?)', [newArray[i], 0], function () {
                            }, function (tx, err) {
                                console.log(err);
                                showInfo("添加标签失败",false);
                                return;
                            });
                            // 如果当前歌曲列表可见，则更新#song_list_type_select
                            if ($("#song_list_container").css("display") === "block") {
                                var dataString = "<option value=" + newArray[i] + ">" + newArray[i] + "</option>";
                                $("#song_list_type_select").append($(dataString));
                            }
                        }

                        for (var j = 0, len = newArray.length; j < len; j++) {
                            var sql = "create table if not exists " + newArray[j] + "(ID,SongName,Player)";
                            tx.executeSql(sql, [], function () {
                                console.log("建表成功<br>");
                            }, function (tx, error) {
                                console.log(error);
                            });
                        }

                        // 如果标签列表可见，则更新标签列表
                        if ($("#label_list_container").css("display") === "block") {
                            createLabelList($("#label_table_body"), "last");
                        }

                        // 显示添加成功的提示
                        showInfo("添加成功",true);

                    });
                }

            }
        });

        // 保存按钮的键盘事件，按下回车键
        $("#label_body_input").on("keypress", function (e) {
            var ev = e || event;
            if (ev.keyCode === 13) {
                $("#label_body_save").triggerHandler("click");
            }
        });

        // 关闭标签添加窗口
        $("#add_label_close").click(function () {
            $("#add_label_modal").addClass("zoomOut");
            $("#mask").css({"display": "none"});
            $("#label_body_input").css("border", "1px solid rgb(37,183,229)");
            setTimeout(function () {
                $("#label_body_input").val("");
                $("#add_label_modal").css({"display": "none"});
                $("#add_label_modal").removeClass("bounceIn_show zoomOut");
            }, 780);
        });

        // 标签列表——点击——相当于初始化标签列表，应该显示第一页
        $("#label_list").click(function () {
            // 重置下拉列表中的值(每页显示的数量)
            $("#page_number option:first-child").prop("selected", true);
            // 重置容器的的动画类
            $("#label_list_container").removeClass("bounceInRight");
            // #label_list_container已隐藏，正显示其他内容,显示第一页
            if ($("#label_list_container").css("display") === "none") {
                // 隐藏right_content中的所有内容，初始化
                $("#right_content").children().each(function () {
                    $(this).css("display", "none");
                });
                setTimeout(function () {
                    $("#label_list_container").addClass("bounceInRight");
                    $("#label_list_container,#label_list_header,#label_list_body").css("display", "block");
                    createLabelList($("#label_table_body"), 1);
                }, 100);
            } else {
                createLabelList($("#label_table_body"), 1);
            }
        });

        // 标签列表搜索
        $("#search_list_label").on("propertychange input", function () {
            searchLabel($("#label_table_body"), $(this).val().trim(), 1);
        });
    }
    /**----------------------END------------------------------**/


    /**********************歌曲管理*****************************/
    {
        var changeItem;
        // 添加歌曲——子菜单的Click事件
        $("#song_sub_one").click(function () {
            if (song_sub_item_close) {
                return;
            }
            db.transaction(function (tx) {
                tx.executeSql("select label_type from label_table",[],function (tx,res) {
                    $("#add_song_select").html("");
                    for(var i=0,len = res.rows.length;i<len;i++){
                        var dataString = "<option value=" + res.rows.item(i).label_type + ">" + res.rows.item(i).label_type + "</option>";
                        $("#add_song_select").append($(dataString));
                    }
                },function (tx,error) {
                    console.log(error);
                });
            });
            if($("#song_list_container").css("display") === "none"){
                $("#song_sub_two").triggerHandler("click");
            }
            $("#mask").css("display", "block");
            $("#add_song_modal").addClass("bounceIn_show");
            $("#add_song_modal").css("display", "block");
            $("#add_song_input_name").focus();
        });

        $("#add_song_close").click(function () {
            $("#add_song_input_name,#add_song_input_player").val("");
            $("#add_song_modal").addClass("zoomOut");
            $("#mask").css("display", "none");
            setTimeout(function () {
                $("#add_song_modal").removeClass("bounceIn_show zoomOut");
                $("#add_song_modal").css("display", "none");
            }, 700);
        });

        $("#add_song_reset").click(function () {
            $("#add_song_input_name,#add_song_input_player").val("");
            $("#add_song_input_name").focus();
            $("#add_song_select option:first-child").prop("selected",true);
        });

        $("#add_song_save").click(function () {
            var SongName = $("#add_song_input_name").val().trim();
            var Player = $("#add_song_input_player").val().trim();
            if(Player.length === 0 || SongName.length === 0){
                if(Player.length === 0){
                    if($("#add_song_input_player").hasClass("bounceIn_show")){
                        $("#add_song_input_player").removeClass("bounceIn_show");
                    }
                    setTimeout(function () {
                        $("#add_song_input_player").addClass("bounceIn_show");
                        $("#add_song_input_player").val("");
                        $("#add_song_input_player").focus();
                    },200);
                }
                if(SongName.length === 0){
                    if($("#add_song_input_name").hasClass("bounceIn_show")){
                        $("#add_song_input_name").removeClass("bounceIn_show");
                    }
                    setTimeout(function () {
                        $("#add_song_input_name").addClass("bounceIn_show");
                        $("#add_song_input_name").val("");
                        $("#add_song_input_name").focus();
                    },200);
                }
                return;
            }
            var type = $("#add_song_select option:selected").val();
            var sql = "insert into "+type+" values (?,?,?)";
            db.transaction(function (tx) {
                tx.executeSql(sql,[1,SongName,Player],function (tx,res) {
                    upTypeCount(type);
                },function (tx,error) {
                    console.log(error);
                });
            });

            function upTypeCount(type) {
                db.transaction(function (tx) {
                    tx.executeSql("select count from label_table where label_type=?",[type],function (tx,res) {
                        var count = parseInt(res.rows.item(0).count) + 1;
                        tx.executeSql("update label_table set count="+(count)+" where label_type=?",[type],function () {
                            // 显示添加成功的提示
                            showInfo("添加成功",true);

                            $("#add_song_close").triggerHandler("click");
                            $("#song_list_type_select option[value="+type+"]").prop("selected",true);
                            createSongList($("#song_table_body"),"last");
                        },function () {
                            console.log("数量修改失败");
                        });
                    },function (tx,error) {
                        console.log(error);
                    });
                });
            }

        });

        $("#add_song_input_name").on("keypress",function (e) {
            var ev = e || event;
            if (ev.keyCode === 13) {
                $("#add_song_input_player").focus();
            }
        });

        $("#add_song_input_player").on("keypress",function (e) {
            var ev = e || event;
            if (ev.keyCode === 13) {
                $("#add_song_save").triggerHandler("click");
            }
        });

        // 歌曲列表——子菜单的Click事件
        $("#song_sub_two").click(function () {
            // 若内容区显示着其他内容
            if ($("#song_list_container").css("display") === "none") {
                // 清空右侧内容区、初始化
                $("#right_content").children().each(function () {
                    $(this).css("display", "none");
                });
                // 为歌曲类型下拉列表重置数据
                db.transaction(function (tx) {
                    tx.executeSql('select label_type from label_table', [], function (tx, res) {
                        $("#song_list_type_select").html("");
                        for (var i = 0; i < res.rows.length; i++) {
                            // 增加歌曲列表的下拉选项
                            var dataString = "<option value=" + res.rows.item(i).label_type + ">" + res.rows.item(i).label_type + "</option>";
                            $("#song_list_type_select").append($(dataString));
                        }

                        $("#song_list_container").removeClass("bounceInRight");

                        // 显示歌曲数据表
                        setTimeout(function () {
                            // 重置下拉列表(使第一项被选中)
                            $("#song_list_type_select option:first-child").prop("selected", true)
                            $("#song_page_number option:first-child").prop("selected", true);

                            // 使#song_list_container可见
                            $("#song_list_container").css("display", "block");
                            $("#song_list_container").addClass("bounceInRight");

                            // 使#song_list_header可见
                            $("#song_list_header").css("display", "block");

                            // 使#song_list_body可见
                            $("#song_list_body").css("display", "block");

                            // 创建歌曲列表
                            createSongList($("#song_table_body"), 1);
                        }, 100);
                    }, null);
                });
            } else {
                // 重置下拉列表(使第一项被选中)
                $("#song_list_type_select option:first-child").prop("selected", true)
                $("#song_page_number option:first-child").prop("selected", true);
                // 创建歌曲列表
                createSongList($("#song_table_body"), 1);
            }
        });

        // 歌曲页码的mouseOver移出事件
        $("#song_footer_nav").delegate(".song_nav_li", "mouseover", function () {
            var thisHtml = $(this).html();
            var act_page = $("#song_footer_nav").find(".page_active");
            if (thisHtml === "上一页" && ((act_page.html()) === "1" || $(this).next().html() === "下一页")) {
                $(this).css("cursor", "not-allowed");
                return;
            }
            if (thisHtml === "下一页" && (act_page.html() === $(this).prev().html() || $(this).prev().html() === "上一页")) {
                $(this).css("cursor", "not-allowed");
                return;
            }
            if (thisHtml === "...") {
                $(this).css("cursor", "not-allowed");
                return;
            }
            if ($(this).hasClass("page_active") === false) {
                $(this).css("cursor", "pointer");
                $(this).addClass("mouseover_active");
            }
        });

        // 歌曲页码的mouseOut事件
        $("#song_footer_nav").delegate(".song_nav_li", "mouseout", function () {
            if ($(this).hasClass("mouseover_active")) {
                $(this).removeClass("mouseover_active");
            }
        });

        // 歌曲页码的click事件
        $("#song_footer_nav").delegate(".song_nav_li", "click", function () {
            if($(this).css("cursor") === "not-allowed"){
                return;
            }
            var act_page = $("#song_footer_nav").find(".page_active");
            var thisHtml = $(this).html();
            var keyword = $("#search_list_song").val().trim();
            if(keyword.length !== 0){
                if (thisHtml === "上一页") {
                    searchSong($("#song_table_body"),keyword,parseInt(act_page.html()) - 1);
                } else if (thisHtml === "下一页") {
                    searchSong($("#song_table_body"),keyword,parseInt(act_page.html()) + 1);
                } else {
                    searchSong($("#song_table_body"),keyword,parseInt(thisHtml));
                }
            }else{
                if (thisHtml === "上一页") {
                    createSongList($("#song_table_body"), parseInt(act_page.html()) - 1);
                } else if (thisHtml === "下一页") {
                    createSongList($("#song_table_body"), parseInt(act_page.html()) + 1);
                } else {
                    createSongList($("#song_table_body"), parseInt(thisHtml));
                }
            }
        });

        // 歌曲管理界面#song_page_number的点击事件(下拉列表选择单页显示个数)
        $("#song_page_number").on("change", function () {
            if($("#search_list_song").val().trim().length !== 0){
                searchSong($("#song_table_body"),$("#search_list_song").val().trim(),1);
                return;
            }
            createSongList($("#song_table_body"), 1);
        });

        // 歌曲管理界面#song_list_type_select的点击事件(下拉列表选择歌曲类型)
        $("#song_list_type_select").on("change", function () {
            $("#search_list_song").val("");
            createSongList($("#song_table_body"), 1);
        });

        $("#search_list_song").on("propertychange input",function () {
            searchSong($("#song_table_body"),$("#search_list_song").val().trim(),1);
        });

        // 歌曲列表中每行的删除操作
        $("body").delegate(".song_delete", "click", function () {
            $("#mask").css("display", "block");
            $("#delete_list").css("display", "block");
            $("#delete_list").addClass("bounceIn_show");
            $("#delete_list").removeClass("zoomOut");
            isFromBath = false;
            delete_item = $(this).parent().prevAll().slice(0, 3);
        });

        $("#song_list_select_all").on("click",function () {
           $("#song_table_body").find(".song_checkbox").each(function () {
               $(this).prop("checked",true);
           }); 
        });

        $("#song_list_batch_delete").on("click",function () {
            $("#mask").css("display", "block");
            $("#delete_list").css("display", "block");
            $("#delete_list").addClass("bounceIn_show");
            $("#delete_list").removeClass("zoomOut");
            isFromBath = true;
        });

        $("body").delegate(".song_amend","click",function () {
            $("#mask").css("display", "block");
            $("#change_song_info").css("display", "block");
            $("#change_song_info").addClass("bounceIn_show");
            $("#change_song_info").removeClass("zoomOut");

            changeItem = $(this).parent();
            var songName = $(this).parent().prevAll().slice(1,2);
            var player = $(this).parent().prevAll().slice(0,1);
            var type = $(this).parent().prevAll().slice(2,3);
            $("#change_songName_input").val($(songName[0]).html());
            $("#change_Player_input").val($(player[0]).html());
            $("#change_type").val($(type[0]).html());
        });
        
        $("#change_close").on("click",function () {
            $("#change_song_info").addClass("zoomOut");
            $("#mask").css("display", "none");
            setTimeout(function () {
                $("#change_song_info").removeClass("bounceIn_show zoomOut");
                $("#change_song_info").css("display", "none");
            }, 700);
        });
        
        $("#change_submit").on("click",function () {
            db.transaction(function (tx) {
                var pre_songName = changeItem.prevAll().slice(1,2);
                var pre_player = changeItem.prevAll().slice(0,1);
                pre_songName = $(pre_songName[0]).html();
                pre_player = $(pre_player[0]).html();

                var type = $("#change_type").val();
                var songName = $("#change_songName_input").val();
                var player = $("#change_Player_input").val();


                if(pre_songName === songName && pre_player === player){
                    $("#change_close").triggerHandler("click");
                    return;
                }

                if(songName.length === 0 || player.length === 0){
                    if(player.length === 0){
                        if($("#change_Player_input").hasClass("bounceIn_show")){
                            $("#change_Player_input").removeClass("bounceIn_show");
                        }
                        setTimeout(function () {
                            $("#change_Player_input").addClass("bounceIn_show");
                            $("#change_Player_input").val("");
                            $("#change_Player_input").focus();
                        },200);
                    }
                    if(songName.length === 0){
                        if($("#change_songName_input").hasClass("bounceIn_show")){
                            $("#change_songName_input").removeClass("bounceIn_show");
                        }
                        setTimeout(function () {
                            $("#change_songName_input").addClass("bounceIn_show");
                            $("#change_songName_input").val("");
                            $("#change_songName_input").focus();
                        },200);
                    }
                    return;
                }

                tx.executeSql("update "+type+" set SongName = \""+songName+"\",Player = \""+player+"\" where SongName=? and Player=?",[pre_songName,pre_player],function () {
                    showInfo("修改成功",true);
                    $("#change_close").triggerHandler("click");
                    createSongList($("#song_table_body"),parseInt($("#song_footer_nav .page_active").html()));
                },function (tx,error) {
                    showInfo("修改失败",false);
                    console.log(error);
                });
            });
        });

        $("#change_songName_input").on("keypress",function (e) {
            var ev = e || event;
            if (ev.keyCode === 13) {
                $("#change_Player_input").focus();
            }
        });

        $("#change_Player_input").on("keypress",function (e) {
            var ev = e || event;
            if (ev.keyCode === 13) {
                $("#change_submit").triggerHandler("click");
            }
        });
    }
    /**---------------------END------------------------------**/


    /**********************文件管理***************************/
    {
        $("#file_sub_menu").click(function () {
            if (file_sub_item_close) {
                return;
            }
            $("#mask").css("display", "block");
            $("#add_file_modal").css("display", "block");
            $("#select_file_input").val("");
            $("#add_file_modal").addClass("rubberBand");
        });

        $("#add_file_close").click(function () {
            $("#add_file_modal").addClass("zoomOut");
            $("#mask").css("display", "none");
            setTimeout(function () {
                $("#add_file_modal").removeClass("rubberBand zoomOut");
                $("#add_file_modal").css("display", "none");
            }, 780);
        });
    }
    /**----------------------END---------------------------**/
});



