<script>
import { Solar, LunarYear, I18n, Lunar } from 'lunar-typescript'

I18n.setMessages('chs', {
  'my.shu': '属',
  'my.jieQi': '节气',
  'my.week': '星期',
  'my.xingZuo': '座',
  'my.suiSha': '岁煞',
  'my.zhou': '周',
  'label.gongLi': '公历',
  'label.nongLi': '农历',
  'label.nian': '年',
  'label.yue': '月',
  'label.ri': '日',
  'label.suiSha': '岁煞',
  'label.jiShen': '吉神宜趋',
  'label.xiongSha': '凶煞宜忌',
  'label.caiShen': '财神位',
  'label.yinYang': '阴阳贵神',
  'label.jiuGong': '九宫飞星'
})

I18n.setMessages('en', {
  'my.shu': ' ',
  'my.jieQi': ' ',
  'my.week': ' ',
  'my.xingZuo': ' ',
  'my.suiSha': ' ',
  'my.zhou': ' ',
  'label.gongLi': 'Solar',
  'label.nongLi': 'Lunar',
  'label.nian': 'Year',
  'label.yue': 'Month',
  'label.ri': 'Day'
})

I18n.setMessages('cht', {
  'my.shu': '屬',
  'my.jieQi': '節氣',
  'my.suiSha': '歲煞',
  'label.gongLi': '西歴',
  'label.nongLi': '夏歴',
  'label.suiSha': '歲煞',
  'label.jiShen': '吉神宜趨',
  'label.xiongSha': '兇煞宜忌',
  'label.caiShen': '財神位',
  'label.yinYang': '陰陽貴神',
  'label.jiuGong': '九宮飛星'
})

I18n.setMessages('cht', {
  'tg.jia': '甲',
  'tg.yi': '乙',
  'tg.bing': '丙',
  'tg.ding': '丁',
  'tg.wu': '戊',
  'tg.ji': '己',
  'tg.geng': '庚',
  'tg.xin': '辛',
  'tg.ren': '壬',
  'tg.gui': '癸',
  'dz.zi': '子',
  'dz.chou': '醜',
  'dz.yin': '寅',
  'dz.mao': '卯',
  'dz.chen': '辰',
  'dz.si': '巳',
  'dz.wu': '午',
  'dz.wei': '未',
  'dz.shen': '申',
  'dz.you': '酉',
  'dz.xu': '戌',
  'dz.hai': '亥',
  'zx.jian': '建',
  'zx.chu': '除',
  'zx.man': '滿',
  'zx.ping': '平',
  'zx.ding': '定',
  'zx.zhi': '執',
  'zx.po': '破',
  'zx.wei': '危',
  'zx.cheng': '成',
  'zx.shou': '收',
  'zx.kai': '開',
  'zx.bi': '閉',
  'jz.jiaZi': '甲子',
  'jz.yiChou': '乙醜',
  'jz.bingYin': '丙寅',
  'jz.dingMao': '丁卯',
  'jz.wuChen': '戊辰',
  'jz.jiSi': '己巳',
  'jz.gengWu': '庚午',
  'jz.xinWei': '辛未',
  'jz.renShen': '壬申',
  'jz.guiYou': '癸酉',
  'jz.jiaXu': '甲戌',
  'jz.yiHai': '乙亥',
  'jz.bingZi': '丙子',
  'jz.dingChou': '丁醜',
  'jz.wuYin': '戊寅',
  'jz.jiMao': '己卯',
  'jz.gengChen': '庚辰',
  'jz.xinSi': '辛巳',
  'jz.renWu': '壬午',
  'jz.guiWei': '癸未',
  'jz.jiaShen': '甲申',
  'jz.yiYou': '乙酉',
  'jz.bingXu': '丙戌',
  'jz.dingHai': '丁亥',
  'jz.wuZi': '戊子',
  'jz.jiChou': '己醜',
  'jz.gengYin': '庚寅',
  'jz.xinMao': '辛卯',
  'jz.renChen': '壬辰',
  'jz.guiSi': '癸巳',
  'jz.jiaWu': '甲午',
  'jz.yiWei': '乙未',
  'jz.bingShen': '丙申',
  'jz.dingYou': '丁酉',
  'jz.wuXu': '戊戌',
  'jz.jiHai': '己亥',
  'jz.gengZi': '庚子',
  'jz.xinChou': '辛醜',
  'jz.renYin': '壬寅',
  'jz.guiMao': '癸卯',
  'jz.jiaChen': '甲辰',
  'jz.yiSi': '乙巳',
  'jz.bingWu': '丙午',
  'jz.dingWei': '丁未',
  'jz.wuShen': '戊申',
  'jz.jiYou': '己酉',
  'jz.gengXu': '庚戌',
  'jz.xinHai': '辛亥',
  'jz.renZi': '壬子',
  'jz.guiChou': '癸醜',
  'jz.jiaYin': '甲寅',
  'jz.yiMao': '乙卯',
  'jz.bingChen': '丙辰',
  'jz.dingSi': '丁巳',
  'jz.wuWu': '戊午',
  'jz.jiWei': '己未',
  'jz.gengShen': '庚申',
  'jz.xinYou': '辛酉',
  'jz.renXu': '壬戌',
  'jz.guiHai': '癸亥',
  'sx.rat': '鼠',
  'sx.ox': '牛',
  'sx.tiger': '虎',
  'sx.rabbit': '兔',
  'sx.dragon': '龍',
  'sx.snake': '蛇',
  'sx.horse': '馬',
  'sx.goat': '羊',
  'sx.monkey': '猴',
  'sx.rooster': '雞',
  'sx.dog': '狗',
  'sx.pig': '豬',
  'dw.long': '龍',
  'dw.niu': '牛',
  'dw.gou': '狗',
  'dw.yang': '羊',
  'dw.tu': '兔',
  'dw.shu': '鼠',
  'dw.ji': '雞',
  'dw.ma': '馬',
  'dw.hu': '虎',
  'dw.zhu': '豬',
  'dw.hou': '猴',
  'dw.she': '蛇',
  'dw.huLi': '狐',
  'dw.yan': '燕',
  'dw.bao': '豹',
  'dw.yuan': '猿',
  'dw.yin': '蚓',
  'dw.lu': '鹿',
  'dw.wu': '烏',
  'dw.jiao': '蛟',
  'dw.lang': '狼',
  'dw.fu': '蝠',
  'dw.zhang': '獐',
  'dw.xu': '獝',
  'dw.xie': '獬',
  'dw.han': '犴',
  'dw.he': '貉',
  'dw.zhi': '彘',
  'wx.jin': '金',
  'wx.mu': '木',
  'wx.shui': '水',
  'wx.huo': '火',
  'wx.tu': '土',
  'wx.ri': '日',
  'wx.yue': '月',
  'n.zero': '〇',
  'n.one': '一',
  'n.two': '二',
  'n.three': '三',
  'n.four': '四',
  'n.five': '五',
  'n.six': '六',
  'n.seven': '七',
  'n.eight': '八',
  'n.nine': '九',
  'n.ten': '十',
  'n.eleven': '十一',
  'n.twelve': '十二',
  'd.one': '初一',
  'd.two': '初二',
  'd.three': '初三',
  'd.four': '初四',
  'd.five': '初五',
  'd.six': '初六',
  'd.seven': '初七',
  'd.eight': '初八',
  'd.nine': '初九',
  'd.ten': '初十',
  'd.eleven': '十一',
  'd.twelve': '十二',
  'd.thirteen': '十三',
  'd.fourteen': '十四',
  'd.fifteen': '十五',
  'd.sixteen': '十六',
  'd.seventeen': '十七',
  'd.eighteen': '十八',
  'd.nighteen': '十九',
  'd.twenty': '二十',
  'd.twentyOne': '廿一',
  'd.twentyTwo': '廿二',
  'd.twentyThree': '廿三',
  'd.twentyFour': '廿四',
  'd.twentyFive': '廿五',
  'd.twentySix': '廿六',
  'd.twentySeven': '廿七',
  'd.twentyEight': '廿八',
  'd.twentyNine': '廿九',
  'd.thirty': '三十',
  'm.one': '正',
  'm.two': '二',
  'm.three': '三',
  'm.four': '四',
  'm.five': '五',
  'm.six': '六',
  'm.seven': '七',
  'm.eight': '八',
  'm.nine': '九',
  'm.ten': '十',
  'm.eleven': '冬',
  'm.twelve': '臘',
  'w.sun': '日',
  'w.mon': '一',
  'w.tues': '二',
  'w.wed': '三',
  'w.thur': '四',
  'w.fri': '五',
  'w.sat': '六',
  'xz.aries': '白羊',
  'xz.taurus': '金牛',
  'xz.gemini': '雙子',
  'xz.cancer': '巨蟹',
  'xz.leo': '獅子',
  'xz.virgo': '處女',
  'xz.libra': '天秤',
  'xz.scorpio': '天蠍',
  'xz.sagittarius': '射手',
  'xz.capricornus': '摩羯',
  'xz.aquarius': '水瓶',
  'xz.pisces': '雙魚',
  'bg.qian': '乾',
  'bg.kun': '坤',
  'bg.zhen': '震',
  'bg.xun': '巽',
  'bg.kan': '坎',
  'bg.li': '離',
  'bg.gen': '艮',
  'bg.dui': '兌',
  'ps.center': '中',
  'ps.dong': '東',
  'ps.nan': '南',
  'ps.xi': '西',
  'ps.bei': '北',
  'ps.zhong': '中宮',
  'ps.zhengDong': '正東',
  'ps.zhengNan': '正南',
  'ps.zhengXi': '正西',
  'ps.zhengBei': '正北',
  'ps.dongBei': '東北',
  'ps.dongNan': '東南',
  'ps.xiBei': '西北',
  'ps.xiNan': '西南',
  'ps.wai': '外',
  'ps.fangNei': '房內',
  'jq.dongZhi': '冬至',
  'jq.xiaoHan': '小寒',
  'jq.daHan': '大寒',
  'jq.liChun': '立春',
  'jq.yuShui': '雨水',
  'jq.jingZhe': '驚蟄',
  'jq.chunFen': '春分',
  'jq.qingMing': '清明',
  'jq.guYu': '谷雨',
  'jq.liXia': '立夏',
  'jq.xiaoMan': '小滿',
  'jq.mangZhong': '芒種',
  'jq.xiaZhi': '夏至',
  'jq.xiaoShu': '小暑',
  'jq.daShu': '大暑',
  'jq.liQiu': '立秋',
  'jq.chuShu': '處暑',
  'jq.baiLu': '白露',
  'jq.qiuFen': '秋分',
  'jq.hanLu': '寒露',
  'jq.shuangJiang': '霜降',
  'jq.liDong': '立冬',
  'jq.xiaoXue': '小雪',
  'jq.daXue': '大雪',
  'sn.qingLong': '青龍',
  'sn.baiHu': '白虎',
  'sn.zhuQue': '朱雀',
  'sn.xuanWu': '玄武',
  'sn.mingTang': '明堂',
  'sn.tianXing': '天刑',
  'sn.tianDe': '天德',
  'sn.jinKui': '金匱',
  'sn.yuTang': '玉堂',
  'sn.siMing': '司命',
  'sn.tianLao': '天牢',
  'sn.gouChen': '勾陳',
  'sn.tianEn': '天恩',
  'sn.muCang': '母倉',
  'sn.shiYang': '時陽',
  'sn.shengQi': '生氣',
  'sn.yiHou': '益後',
  'sn.zaiSha': '災煞',
  'sn.tianHuo': '天火',
  'sn.siJi': '四忌',
  'sn.baLong': '八龍',
  'sn.fuRi': '復日',
  'sn.xuShi': '續世',
  'sn.yueSha': '月煞',
  'sn.yueXu': '月虛',
  'sn.xueZhi': '血支',
  'sn.tianZei': '天賊',
  'sn.wuXu': '五虛',
  'sn.tuFu': '土符',
  'sn.guiJi': '歸忌',
  'sn.xueJi': '血忌',
  'sn.yueDe': '月德',
  'sn.yueEn': '月恩',
  'sn.siXiang': '四相',
  'sn.wangRi': '王日',
  'sn.tianCang': '天倉',
  'sn.buJiang': '不將',
  'sn.wuHe': '五合',
  'sn.mingFeiDui': '鳴吠對',
  'sn.yueJian': '月建',
  'sn.xiaoShi': '小時',
  'sn.tuHu': '土府',
  'sn.wangWang': '往亡',
  'sn.yaoAn': '要安',
  'sn.siShen': '死神',
  'sn.tianMa': '天馬',
  'sn.jiuHu': '九虎',
  'sn.qiNiao': '七鳥',
  'sn.liuShe': '六蛇',
  'sn.guanRi': '官日',
  'sn.jiQi': '吉期',
  'sn.yuYu': '玉宇',
  'sn.daShi': '大時',
  'sn.daBai': '大敗',
  'sn.xianChi': '鹹池',
  'sn.shouRi': '守日',
  'sn.tianWu': '天巫',
  'sn.fuDe': '福德',
  'sn.liuYi': '六儀',
  'sn.jinTang': '金堂',
  'sn.yanDui': '厭對',
  'sn.zhaoYao': '招搖',
  'sn.jiuKong': '九空',
  'sn.jiuKan': '九坎',
  'sn.jiuJiao': '九焦',
  'sn.xiangRi': '相日',
  'sn.baoGuang': '寶光',
  'sn.tianGang': '天罡',
  'sn.yueXing': '月刑',
  'sn.yueHai': '月害',
  'sn.youHuo': '遊禍',
  'sn.chongRi': '重日',
  'sn.shiDe': '時德',
  'sn.minRi': '民日',
  'sn.sanHe': '三合',
  'sn.linRi': '臨日',
  'sn.shiYin': '時陰',
  'sn.mingFei': '鳴吠',
  'sn.siQi': '死氣',
  'sn.diNang': '地囊',
  'sn.yueDeHe': '月德合',
  'sn.jingAn': '敬安',
  'sn.puHu': '普護',
  'sn.jieShen': '解神',
  'sn.xiaoHao': '小耗',
  'sn.tianDeHe': '天德合',
  'sn.yueKong': '月空',
  'sn.yiMa': '驛馬',
  'sn.tianHou': '天後',
  'sn.chuShen': '除神',
  'sn.yuePo': '月破',
  'sn.daHao': '大耗',
  'sn.wuLi': '五離',
  'sn.yinDe': '陰德',
  'sn.fuSheng': '福生',
  'sn.tianLi': '天吏',
  'sn.zhiSi': '致死',
  'sn.yuanWu': '元武',
  'sn.yangDe': '陽德',
  'sn.tianXi': '天喜',
  'sn.tianYi': '天醫',
  'sn.yueYan': '月厭',
  'sn.diHuo': '地火',
  'sn.fourHit': '四擊',
  'sn.daSha': '大煞',
  'sn.daHui': '大會',
  'sn.tianYuan': '天願',
  'sn.liuHe': '六合',
  'sn.wuFu': '五富',
  'sn.shengXin': '聖心',
  'sn.heKui': '河魁',
  'sn.jieSha': '劫煞',
  'sn.siQiong': '四窮',
  'sn.chuShuiLong': '觸水龍',
  'sn.baFeng': '八風',
  'sn.tianShe': '天赦',
  'sn.wuMu': '五墓',
  'sn.baZhuan': '八專',
  'sn.yinCuo': '陰錯',
  'sn.siHao': '四耗',
  'sn.yangCuo': '陽錯',
  'sn.siFei': '四廢',
  'sn.sanYin': '三陰',
  'sn.xiaoHui': '小會',
  'sn.yinDaoChongYang': '陰道沖陽',
  'sn.danYin': '單陰',
  'sn.guChen': '孤辰',
  'sn.yinWei': '陰位',
  'sn.xingHen': '行狠',
  'sn.liaoLi': '了戾',
  'sn.jueYin': '絕陰',
  'sn.chunYang': '純陽',
  'sn.suiBo': '歲薄',
  'sn.yinYangJiaoPo': '陰陽交破',
  'sn.yinYangJuCuo': '陰陽俱錯',
  'sn.yinYangJiChong': '陰陽擊沖',
  'sn.zhuZhen': '逐陣',
  'sn.yangCuoYinChong': '陽錯陰沖',
  'sn.qiFu': '七符',
  'sn.tianGou': '天狗',
  'sn.chengRi': '成日',
  'sn.tianFu': '天符',
  'sn.guYang': '孤陽',
  'sn.jueYang': '絕陽',
  'sn.chunYin': '純陰',
  'sn.yinShen': '陰神',
  'sn.jieChu': '解除',
  'sn.yangPoYinChong': '陽破陰沖',
  'ss.biJian': '比肩',
  'ss.jieCai': '劫財',
  'ss.shiShen': '食神',
  'ss.shangGuan': '傷官',
  'ss.pianCai': '偏財',
  'ss.zhengCai': '正財',
  'ss.qiSha': '七殺',
  'ss.zhengGuan': '正官',
  'ss.pianYin': '偏印',
  'ss.zhengYin': '正印',
  's.none': '無',
  's.huangDao': '黃道',
  's.heiDao': '黑道',
  's.goodLuck': '吉',
  's.badLuck': '兇',
  's.yin': '陰',
  's.yang': '陽',
  's.white': '白',
  's.black': '黑',
  's.blue': '碧',
  's.green': '綠',
  's.yellow': '黃',
  's.red': '赤',
  's.purple': '紫',
  'jr.chuXi': '除夕',
  'jr.chunJie': '春節',
  'jr.yuanXiao': '元宵節',
  'jr.longTou': '龍頭節',
  'jr.duanWu': '端午節',
  'jr.qiXi': '七夕節',
  'jr.zhongQiu': '中秋節',
  'jr.chongYang': '重陽節',
  'jr.laBa': '臘八節',
  'jr.yuanDan': '元旦節',
  'jr.qingRen': '情人節',
  'jr.fuNv': '婦女節',
  'jr.zhiShu': '植樹節',
  'jr.xiaoFei': '消費者權益日',
  'jr.wuYi': '勞動節',
  'jr.qingNian': '青年節',
  'jr.erTong': '童子節',
  'jr.yuRen': '愚人節',
  'jr.jianDang': '建黨節',
  'jr.jianJun': '建軍節',
  'jr.jiaoShi': '教師節',
  'jr.guoQing': '國慶節',
  'jr.wanShengYe': '萬聖節前夜',
  'jr.wanSheng': '萬聖節',
  'jr.pingAn': '平安夜',
  'jr.shengDan': '耶誕節',
  'ds.changSheng': '長生',
  'ds.muYu': '沐浴',
  'ds.guanDai': '冠帶',
  'ds.linGuan': '臨官',
  'ds.diWang': '帝旺',
  'ds.shuai': '衰',
  'ds.bing': '病',
  'ds.si': '死',
  'ds.mu': '墓',
  'ds.jue': '絕',
  'ds.tai': '胎',
  'ds.yang': '養',
  'h.first': '初候',
  'h.second': '二候',
  'h.third': '三候',
  'h.qiuYinJie': '蚯蚓結',
  'h.miJiao': '麋角解',
  'h.shuiQuan': '水泉動',
  'h.yanBei': '雁北鄉',
  'h.queShi': '鵲始巢',
  'h.zhiShi': '雉始雊',
  'h.jiShi': '雞始乳',
  'h.zhengNiao': '徵鳥厲疾',
  'h.shuiZe': '水澤腹堅',
  'h.dongFeng': '東風解凍',
  'h.zheChongShiZhen': '蟄蟲始振',
  'h.yuZhi': '魚陟負冰',
  'h.taJi': '獺祭魚',
  'h.houYan': '候雁北',
  'h.caoMuMengDong': '草木萌動',
  'h.taoShi': '桃始華',
  'h.cangGeng': '倉庚鳴',
  'h.yingHua': '鷹化為鳩',
  'h.xuanNiaoZhi': '玄鳥至',
  'h.leiNai': '雷乃發聲',
  'h.shiDian': '始電',
  'h.tongShi': '桐始華',
  'h.tianShu': '田鼠化為鴽',
  'h.hongShi': '虹始見',
  'h.pingShi': '萍始生',
  'h.mingJiu': '鳴鳩拂奇羽',
  'h.daiSheng': '戴勝降於桑',
  'h.louGuo': '螻蟈鳴',
  'h.qiuYinChu': '蚯蚓出',
  'h.wangGua': '王瓜生',
  'h.kuCai': '苦菜秀',
  'h.miCao': '靡草死',
  'h.maiQiu': '麥秋至',
  'h.tangLang': '螳螂生',
  'h.juShi': '鵙始鳴',
  'h.fanShe': '反舌無聲',
  'h.luJia': '鹿角解',
  'h.tiaoShi': '蜩始鳴',
  'h.banXia': '半夏生',
  'h.wenFeng': '溫風至',
  'h.xiShuai': '蟋蟀居壁',
  'h.yingShi': '鷹始摯',
  'h.fuCao': '腐草為螢',
  'h.tuRun': '土潤溽暑',
  'h.daYu': '大雨行時',
  'h.liangFeng': '涼風至',
  'h.baiLu': '白露降',
  'h.hanChan': '寒蟬鳴',
  'h.yingNai': '鷹乃祭鳥',
  'h.tianDi': '天地始肅',
  'h.heNai': '禾乃登',
  'h.hongYanLai': '鴻雁來',
  'h.xuanNiaoGui': '玄鳥歸',
  'h.qunNiao': '群鳥養羞',
  'h.leiShi': '雷始收聲',
  'h.zheChongPiHu': '蟄蟲坯戶',
  'h.shuiShiHe': '水始涸',
  'h.hongYanLaiBin': '鴻雁來賓',
  'h.queRu': '雀入大水為蛤',
  'h.juYou': '菊有黃花',
  'h.caiNai': '豺乃祭獸',
  'h.caoMuHuangLuo': '草木黃落',
  'h.zheChongXianFu': '蟄蟲鹹俯',
  'h.shuiShiBing': '水始冰',
  'h.diShi': '地始凍',
  'h.zhiRu': '雉入大水為蜃',
  'h.hongCang': '虹藏不見',
  'h.tianQi': '天氣上升地氣下降',
  'h.biSe': '閉塞而成冬',
  'h.heDan': '鹖鴠不鳴',
  'h.huShi': '虎始交',
  'h.liTing': '荔挺出',
  'ts.zhan': '佔',
  'ts.hu': '戶',
  'ts.win': '窗',
  'ts.fang': '房',
  'ts.chuang': '床',
  'ts.lu': '爐',
  'ts.zao': '竈',
  'ts.dui': '碓',
  'ts.mo': '磨',
  'ts.xi': '棲',
  'ts.chu': '廚',
  'ts.ce': '廁',
  'ts.cang': '倉',
  'ts.cangKu': '倉庫',
  'ts.daMen': '大門',
  'ts.men': '門',
  'ts.tang': '堂',
  'ly.xianSheng': '先勝',
  'ly.xianFu': '先負',
  'ly.youYin': '友引',
  'ly.foMie': '佛滅',
  'ly.daAn': '大安',
  'ly.chiKou': '赤口',
  'yj.jiSi': '祭祀',
  'yj.qiFu': '祈福',
  'yj.qiuSi': '求嗣',
  'yj.kaiGuang': '開光',
  'yj.suHui': '塑繪',
  'yj.qiJiao': '齊醮',
  'yj.zhaiJiao': '齋醮',
  'yj.muYu': '沐浴',
  'yj.chouShen': '酬神',
  'yj.zaoMiao': '造廟',
  'yj.siZhao': '祀竈',
  'yj.fenXiang': '焚香',
  'yj.xieTu': '謝土',
  'yj.chuHuo': '出火',
  'yj.diaoKe': '雕刻',
  'yj.jiaQu': '嫁娶',
  'yj.DingHun': '訂婚',
  'yj.naCai': '納採',
  'yj.wenMing': '問名',
  'yj.naXu': '納婿',
  'yj.guiNing': '歸寧',
  'yj.anChuang': '安床',
  'yj.heZhang': '合帳',
  'yj.guanJi': '冠笄',
  'yj.dingMeng': '訂盟',
  'yj.jinRenKou': '進人口',
  'yj.caiYi': '裁衣',
  'yj.wanMian': '挽面',
  'yj.kaiRong': '開容',
  'yj.xiuFen': '修墳',
  'yj.qiZuan': '啟鉆',
  'yj.poTu': '破土',
  'yj.anZang': '安葬',
  'yj.liBei': '立碑',
  'yj.chengFu': '成服',
  'yj.chuFu': '除服',
  'yj.kaiShengFen': '開生墳',
  'yj.heShouMu': '合壽木',
  'yj.ruLian': '入殮',
  'yj.yiJiu': '移柩',
  'yj.puDu': '普渡',
  'yj.ruZhai': '入宅',
  'yj.anXiang': '安香',
  'yj.anMen': '安門',
  'yj.xiuZao': '修造',
  'yj.qiJi': '起基',
  'yj.dongTu': '動土',
  'yj.shangLiang': '上梁',
  'yj.shuZhu': '豎柱',
  'yj.kaiJing': '開井開池',
  'yj.zuoBei': '作陂放水',
  'yj.chaiXie': '拆卸',
  'yj.poWu': '破屋',
  'yj.huaiYuan': '壞垣',
  'yj.buYuan': '補垣',
  'yj.faMuZuoLiang': '伐木做梁',
  'yj.zuoZhao': '作竈',
  'yj.jieChu': '解除',
  'yj.kaiZhuYan': '開柱眼',
  'yj.chuanPing': '穿屏扇架',
  'yj.gaiWuHeJi': '蓋屋合脊',
  'yj.kaiCe': '開廁',
  'yj.zaoCang': '造倉',
  'yj.saiXue': '塞穴',
  'yj.pingZhi': '平治道塗',
  'yj.zaoQiao': '造橋',
  'yj.zuoCe': '作廁',
  'yj.zhuDi': '築堤',
  'yj.kaiChi': '開池',
  'yj.faMu': '伐木',
  'yj.kaiQu': '開渠',
  'yj.jueJing': '掘井',
  'yj.saoShe': '掃捨',
  'yj.fangShui': '放水',
  'yj.zaoWu': '造屋',
  'yj.heJi': '合脊',
  'yj.zaoChuChou': '造畜稠',
  'yj.xiuMen': '修門',
  'yj.dingSang': '定磉',
  'yj.zuoLiang': '作梁',
  'yj.xiuShi': '修飾垣墻',
  'yj.jiaMa': '架馬',
  'yj.kaiShi': '開市',
  'yj.guaBian': '掛匾',
  'yj.naChai': '納財',
  'yj.qiuCai': '求財',
  'yj.kaiCang': '開倉',
  'yj.maiChe': '買車',
  'yj.zhiChan': '置產',
  'yj.guYong': '雇庸',
  'yj.chuHuoCai': '出貨財',
  'yj.anJiXie': '安機械',
  'yj.zaoCheQi': '造車器',
  'yj.jingLuo': '經絡',
  'yj.yunNiang': '醞釀',
  'yj.zuoRan': '作染',
  'yj.guZhu': '鼓鑄',
  'yj.zaoChuan': '造船',
  'yj.geMi': '割蜜',
  'yj.zaiZhong': '栽種',
  'yj.quYu': '取漁',
  'yj.jieWang': '結網',
  'yj.muYang': '牧養',
  'yj.anDuiWei': '安碓磑',
  'yj.xiYi': '習藝',
  'yj.ruXue': '入學',
  'yj.liFa': '理發',
  'yj.tanBing': '探病',
  'yj.jianGui': '見貴',
  'yj.chengChuan': '乘船',
  'yj.duShui': '渡水',
  'yj.zhenJiu': '針灸',
  'yj.chuXing': '出行',
  'yj.yiXi': '移徙',
  'yj.fenJu': '分居',
  'yj.TiTou': '剃頭',
  'yj.zhengShou': '整手足甲',
  'yj.naChu': '納畜',
  'yj.buZhuo': '捕捉',
  'yj.tianLie': '畋獵',
  'yj.jiaoNiuMa': '教牛馬',
  'yj.huiQinYou': '會親友',
  'yj.fuRen': '赴任',
  'yj.qiuYi': '求醫',
  'yj.zhiBing': '治病',
  'yj.ciSong': '詞訟',
  'yj.qiJiDongTu': '起基動土',
  'yj.poWuHuaiYuan': '破屋壞垣',
  'yj.gaiWu': '蓋屋',
  'yj.zaoCangKu': '造倉庫',
  'yj.liQuanJiaoYi': '立券交易',
  'yj.jiaoYi': '交易',
  'yj.liQuan': '立券',
  'yj.anJi': '安機',
  'yj.huiYou': '會友',
  'yj.qiuYiLiaoBing': '求醫療病',
  'yj.zhuShi': '諸事不宜',
  'yj.yuShi': '餘事勿取',
  'yj.xingSang': '行喪',
  'yj.duanYi': '斷蟻',
  'yj.guiXiu': '歸岫',
  'xx.bi': '畢',
  'xx.yi': '翼',
  'xx.ji': '箕',
  'xx.kui': '奎',
  'xx.gui': '鬼',
  'xx.di': '氐',
  'xx.xu': '虛',
  'xx.wei': '危',
  'xx.zi': '觜',
  'xx.zhen': '軫',
  'xx.dou': '鬥',
  'xx.lou': '婁',
  'xx.liu': '柳',
  'xx.fang': '房',
  'xx.xin': '心',
  'xx.shi': '室',
  'xx.can': '參',
  'xx.jiao': '角',
  'xx.niu': '牛',
  'xx.vei': '胃',
  'xx.xing': '星',
  'xx.zhang': '張',
  'xx.tail': '尾',
  'xx.qiang': '壁',
  'xx.jing': '井',
  'xx.kang': '亢',
  'xx.nv': '女',
  'xx.mao': '昴',
  'sz.chun': '春',
  'sz.xia': '夏',
  'sz.qiu': '秋',
  'sz.dong': '冬',
  'od.first': '孟',
  'od.second': '仲',
  'od.third': '季',
  'yx.shuo': '朔',
  'yx.jiShuo': '既朔',
  'yx.eMeiXin': '蛾眉新',
  'yx.eMei': '蛾眉',
  'yx.xi': '夕',
  'yx.shangXian': '上弦',
  'yx.jiuYe': '九夜',
  'yx.night': '宵',
  'yx.jianYingTu': '漸盈凸',
  'yx.xiaoWang': '小望',
  'yx.wang': '望',
  'yx.jiWang': '既望',
  'yx.liDai': '立待',
  'yx.juDai': '居待',
  'yx.qinDai': '寢待',
  'yx.gengDai': '更待',
  'yx.jianKuiTu': '漸虧凸',
  'yx.xiaXian': '下弦',
  'yx.youMing': '有明',
  'yx.eMeiCan': '蛾眉殘',
  'yx.can': '殘',
  'yx.xiao': '曉',
  'yx.hui': '晦',
  'ny.sangZhe': '桑柘',
  'ny.baiLa': '白蠟',
  'ny.yangLiu': '楊柳',
  'ny.jinBo': '金箔',
  'ny.haiZhong': '海中',
  'ny.daHai': '大海',
  'ny.shaZhong': '沙中',
  'ny.luZhong': '爐中',
  'ny.shanXia': '山下',
  'ny.daLin': '大林',
  'ny.pingDi': '平地',
  'ny.luPang': '路旁',
  'ny.biShang': '壁上',
  'ny.jianFeng': '劍鋒',
  'ny.shanTou': '山頭',
  'ny.fuDeng': '覆燈',
  'ny.jianXia': '澗下',
  'ny.tianHe': '天河',
  'ny.chengTou': '城頭',
  'ny.daYi': '大驛',
  'ny.chaiChuan': '釵釧',
  'ny.quanZhong': '泉中',
  'ny.daXi': '大溪',
  'ny.wuShang': '屋上',
  'ny.piLi': '霹靂',
  'ny.tianShang': '天上',
  'ny.songBo': '鬆柏',
  'ny.shiLiu': '石榴',
  'ny.changLiu': '長流'
})
const now = new Date()
export default {
  name: "index",
  data() {
    return {
      lang: I18n.getLanguage(),
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      yearGanZhi: '',
      yearShengXiao: '',
      yearNaYin: '',
      lunarYearInChinese: '',
      lunarMonthInChinese: '',
      lunarDayInChinese: '',
      yearZhiShui: '',
      yearGenTian: '',
      yearDeJin: '',
      yearFenBing: '',
      yearKongWang: '',
      monthGanZhi: '',
      monthShengXiao: '',
      monthNaYin: '',
      monthTaiShen: '',
      monthKongWang: '',
      dayGanZhi: '',
      dayShengXiao: '',
      dayNaYin: '',
      dayTaiShen: '',
      dayZhiShen: '',
      dayChong: '',
      dayTianShen: '',
      daySha: '',
      dayLu: '',
      dayJiShen: [],
      dayXiongSha: [],
      dayYi: [],
      dayJi: [],
      dayKongWang: '',
      dayJiuXing: '',
      prevJq: '',
      nextJq: '',
      pengZuGan: '',
      pengZuZhi: '',
      liuYao: '',
      yueXiang: '',
      yueMing: '',
      wuHou: '',
      weekInChinese: '',
      xingZuo: '',
      xiu: '',
      positionFu: '',
      positionCai: '',
      positionXi: '',
      positionYangGui: '',
      positionYinGui: '',
      modelYear: '',
      modelMonth: '',
      modelDay: '',
      timesList: []
    }
  },
  created() {
    console.log("🚀 ~ file:index method:created line:914 -----I18n", I18n.getLanguage())

  },
  computed: {
    model: {
      get() {
        return {
          year: this.modelYear,
          month: this.modelMonth,
          day: this.modelDay
        }
      },
      set(value) {
        this.modelYear = value.year
        this.modelMonth = value.month
        this.modelDay = value.day
      }
    }
  },
  watch: {
    modelYear(val) {
      const year = parseInt(val, 10)
      if (!isNaN(year)) {
        this.year = year
        this.render()
      }
    },
    modelMonth(val) {
      const month = parseInt(val, 10)
      if (!isNaN(month)) {
        this.month = month
        this.render()
      }
    },
    modelDay(val) {
      const day = parseInt(val, 10)
      if (!isNaN(day)) {
        this.day = day
        this.render()
      }
    }
  },
  methods: {
    render() {
      this.model.year = this.year + ''
      this.model.month = this.month + ''
      this.model.day = this.day + ''
      const solar = Solar.fromYmd(this.year, this.month, this.day)

      this.weekInChinese = solar.getWeekInChinese()
      this.xingZuo = solar.getXingZuo()

      const lunar = solar.getLunar()
      this.yearGanZhi = lunar.getYearInGanZhi()
      this.yearShengXiao = lunar.getYearShengXiao()
      this.yearNaYin = lunar.getYearNaYin()
      this.lunarYearInChinese = lunar.getYearInChinese()
      this.yearKongWang = lunar.getYearXunKong()

      this.monthGanZhi = lunar.getMonthInGanZhi()
      this.monthShengXiao = lunar.getMonthShengXiao()
      this.monthNaYin = lunar.getMonthNaYin()
      this.monthTaiShen = lunar.getMonthPositionTai()
      this.lunarMonthInChinese = lunar.getMonthInChinese()
      this.monthKongWang = lunar.getMonthXunKong()

      this.yueXiang = lunar.getYueXiang()
      this.wuHou = lunar.getHou() + ' ' + lunar.getWuHou()
      this.yueMing = lunar.getSeason()

      this.dayGanZhi = lunar.getDayInGanZhi()
      this.dayShengXiao = lunar.getDayShengXiao()
      this.dayNaYin = lunar.getDayNaYin()
      this.dayTaiShen = lunar.getDayPositionTai()
      this.pengZuGan = lunar.getPengZuGan()
      this.pengZuZhi = lunar.getPengZuZhi()
      this.dayZhiShen = lunar.getZhiXing()
      this.dayTianShen = lunar.getDayTianShen() + '(' + lunar.getDayTianShenType() + '日)'
      this.daySha = lunar.getDaySha()
      this.liuYao = lunar.getLiuYao()
      this.dayLu = lunar.getDayLu()
      this.dayJiShen = lunar.getDayJiShen()
      this.dayXiongSha = lunar.getDayXiongSha()
      this.dayYi = lunar.getDayYi()
      this.dayJi = lunar.getDayJi()
      this.lunarDayInChinese = lunar.getDayInChinese()

      const dayNineStar = lunar.getDayNineStar()
      this.dayJiuXing = dayNineStar.toString()

      const prevJq = lunar.getPrevJieQi(true)
      const prevJqSolar = prevJq.getSolar()
      this.prevJq = prevJq.getName() + '：' + prevJqSolar.toYmd() + ' ' + I18n.getMessage('my.zhou') + prevJqSolar.getWeekInChinese()

      const nextJq = lunar.getNextJieQi(true)
      const nextJqSolar = nextJq.getSolar()
      this.nextJq = nextJq.getName() + '：' + nextJqSolar.toYmd() + ' ' + I18n.getMessage('my.zhou') + nextJqSolar.getWeekInChinese()

      this.dayChong = lunar.getDayShengXiao() + '日冲' + lunar.getDayChongDesc()
      this.dayKongWang = lunar.getDayXunKong()

      this.xiu = lunar.getGong() + '方' + lunar.getXiu() + lunar.getZheng() + lunar.getAnimal() + '(' + lunar.getXiuLuck() + ')'

      this.positionXi = lunar.getPositionXiDesc()
      this.positionFu = lunar.getPositionFuDesc()
      this.positionCai = lunar.getPositionCaiDesc()
      this.positionYangGui = lunar.getPositionYangGuiDesc()
      this.positionYinGui = lunar.getPositionYinGuiDesc()

      const lunarYear = LunarYear.fromYear(lunar.getYear())
      this.yearZhiShui = lunarYear.getZhiShui()
      this.yearDeJin = lunarYear.getDeJin()
      this.yearGenTian = lunarYear.getGengTian()
      this.yearFenBing = lunarYear.getFenBing()

      // const testLunar = Lunar.fromYmd(2021, 5, 5)
      // const Times = testLunar.getTimes()
      const Times = lunar.getTimes()
      console.log("🚀 ~ file:index method:render line:1031 -----", Times)
      this.initTimesList(Times)
      console.log("🚀 ~ file:index method:render line:1035 -----this.initTimesList", this.timesList)

    },
    initTimesList(Times) {
      this.timesList = []
      for (const time of Times) {
        const obj = {}
        obj.ganZhi = time.getGanZhi()
        obj.shengXiao = time.getShengXiao()
        obj.positionXiDesc = time.getPositionXiDesc()
        obj.positionYinGuiDesc = time.getPositionYinGuiDesc()
        obj.positionFuDesc = time.getPositionFuDesc()
        obj.positionCaiDesc = time.getPositionCaiDesc()
        obj.chong = time.getChong()
        obj.sha = time.getSha()
        obj.chongShengXiao = time.getChongShengXiao()
        obj.yi = time.getYi()
        obj.ji = time.getJi()
        obj.minHh = time.getMinHm()
        obj.maxHh = time.getMaxHm()
        this.timesList.push(obj)
      }

    },
    nextDay() {
      const solar = Solar.fromYmd(this.year, this.month, this.day).next(1)
      this.year = solar.getYear()
      this.month = solar.getMonth()
      this.day = solar.getDay()
      this.render()
    },
    prevDay() {
      const solar = Solar.fromYmd(this.year, this.month, this.day).next(-1)
      this.year = solar.getYear()
      this.month = solar.getMonth()
      this.day = solar.getDay()
      this.render()
    },
    setLang(lang) {
      this.lang = lang
      I18n.setLanguage(lang)
      this.render()
    }
  },
  mounted() {
    this.render()
  }
}
</script>

<template>

  <div style="padding: 36px">
    <el-row :gutter="22">
      <el-col :span="16">
        <div class="col-left">
          <div class="calendar">
            <div class="border-right">
              <div class="row col border-bottom">
                <div class="label">{{ yearGanZhi }}年</div>
                <div>属{{ yearShengXiao }}</div>
                <div>{{ yearNaYin }}</div>
              </div>
              <div class="row col border-bottom">
                <div class="label">{{ monthGanZhi }}月</div>
                <div>属{{ monthShengXiao }}</div>
                <div>{{ monthNaYin }}</div>
              </div>
              <div class="row col border-bottom">
                <div class="label">{{ dayGanZhi }}日</div>
                <div>属{{ dayShengXiao }}</div>
                <div>{{ dayNaYin }}</div>
              </div>
              <div class="row col bg border-bottom">
                <div>节气{{ prevJq }}</div>
              </div>
              <div class="yj-container border-bottom">
                <div class="yj yi">宜</div>
                <ul>
                  <li v-for="o in dayYi">{{ o }}</li>
                </ul>
              </div>
              <div class="border-bottom js">
                <div>
                  <div class="label">吉神宜趋</div>
                  <ul>
                    <li v-for="o in dayJiShen">{{ o }}</li>
                  </ul>
                </div>
              </div>
              <div class="row col bg">
                <div class="label">彭祖</div>
                <div>{{ pengZuGan }}</div>
              </div>
              <div class="row col bg border-bottom">
                <div class="label">百忌</div>
                <div>{{ pengZuZhi }}</div>
              </div>
              <div class="row col">
                <div class="label">月名</div>
                <div>{{ yueMing }}</div>
              </div>
              <div class="row col">
                <div class="label">月相</div>
                <div>{{ yueXiang }}月</div>
              </div>
              <div class="row col">
                <div class="label">物候</div>
                <div>{{ wuHou }}</div>
              </div>
            </div>
            <div class="center border-right bg">
              <div class="border-bottom">
                <div class="inputs">
                  <div>
                    <input v-model="model.year">年
                  </div>
                  <div>
                    <select v-model="model.month">
                      <option :value="i" v-for="i in 12">{{ i }}</option>
                    </select>月
                  </div>
                  <div>
                    <input v-model="model.day">日
                  </div>
                </div>
                <div>
                  <div>农历{{ year }}年 {{ month }}月 {{ day }}日 星期{{ weekInChinese }} {{ xingZuo }}座
                  </div>
                  <div class="today">
                    <a href="javascript:void(0);" class="prev" @click="prevDay"></a>
                    {{ day }}
                    <a href="javascript:void(0);" class="next" @click="nextDay"></a>
                  </div>
                  <div class="lunar">农历 {{ lunarYearInChinese }}年 {{ lunarMonthInChinese }}月{{
                      lunarDayInChinese
                    }}
                  </div>
                </div>
              </div>
              <div class="grid border-bottom">
                <div class="col2 border-right">
                  <div class="bar">财神位</div>
                  <div>
                    <div class="row col">
                      <div class="label">喜神</div>
                      <div>{{ positionXi }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">福神</div>
                      <div>{{ positionFu }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">财神</div>
                      <div>{{ positionCai }}</div>
                    </div>
                  </div>
                </div>
                <div class="col2">
                  <div class="bar">阴阳贵神</div>
                  <div>
                    <div class="row col">
                      <div class="label">阳贵神</div>
                      <div>{{ positionYangGui }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">阴贵神</div>
                      <div>{{ positionYinGui }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid">
                <div class="col2 border-right">
                  <div class="bar">空亡所值</div>
                  <div>
                    <div class="row col">
                      <div class="label">年</div>
                      <div>{{ yearKongWang }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">月</div>
                      <div>{{ monthKongWang }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">日</div>
                      <div>{{ dayKongWang }}</div>
                    </div>
                  </div>
                </div>
                <div class="col2">
                  <div class="bar">九宫飞星</div>
                  <div>
                    <div class="row col">
                      <div class="label">九星</div>
                      <div>{{ dayJiuXing }}</div>
                    </div>
                    <div class="row col">
                      <div class="label">二十八宿</div>
                      <div>{{ xiu }}</div>
                    </div>
                    <div class="row col">
                      <div>{{ yearZhiShui }}</div>
                      <div>{{ yearDeJin }}</div>
                    </div>
                    <div class="row col">
                      <div>{{ yearFenBing }}</div>
                      <div>{{ yearGenTian }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="row col border-bottom">
                <div class="label">相冲</div>
                <div> {{ dayChong }}</div>
              </div>
              <div class="row col border-bottom">
                <div class="label">值神</div>
                <div> {{ dayZhiShen }}</div>
              </div>
              <div class="row col border-bottom">
                <div class="label">十二神</div>
                <div> {{ dayTianShen }}</div>
              </div>
              <div class="row col bg border-bottom">
                <div>节气</div>
              </div>
              <div class="yj-container border-bottom">
                <div class="yj ji">忌</div>
                <ul>
                  <li v-for="o in dayJi">{{ o }}</li>
                </ul>
              </div>
              <div class="border-bottom js">
                <div>
                  <div class="label">凶煞宜忌</div>
                  <ul>
                    <li v-for="o in dayXiongSha">{{ o }}</li>
                  </ul>
                </div>
              </div>
              <div class="row col bg">
                <div class="label">本月胎神</div>
                <div>{{ monthTaiShen }}</div>
              </div>
              <div class="row col bg border-bottom">
                <div class="label">今日胎神</div>
                <div>{{ dayTaiShen }}</div>
              </div>

              <div class="row col">
                <div class="label">岁煞</div>
                <div>岁煞{{ daySha }}</div>
              </div>
              <div class="row col">
                <div class="label">六曜</div>
                <div>{{ liuYao }}</div>
              </div>
              <div class="row col">
                <div class="label">日禄</div>
                <div>{{ dayLu }}</div>
              </div>

            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-card class="box-card" v-for="(time, timeIdx) in timesList" :key="timeIdx">
            <div class="lunar-time">
              <span data-v-739fc6a6="" class="red">{{ time.ganZhi }}时</span>
              <span data-v-739fc6a6="" class="red">冲{{ time.shengXiao }} 煞{{ time.sha }}</span>
              <span data-v-739fc6a6="" class="red">{{ time.minHh }} - {{ time.maxHh }}</span>
            </div>
            <div class="caixi">喜神{{ time.positionXiDesc }} 财神{{ time.positionCaiDesc }} 福神{{ time.positionFuDesc }}</div>
            <div class="yiJi">
              <div class="yj yi">
                <img  src="../../../assets/images/yi.f13b8ef.png" alt="">
                <div><span v-for="(yi, yiIdx) in time.yi" :key="yiIdx">{{ yi }}</span></div>
              </div>
              <div class="yj ji">
                <img  src="../../../assets/images/ji.bc4ebad.png" alt="">
                <div><span v-for="(ji, jiIdx) in time.ji" :key="jiIdx">{{ ji }}</span></div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.main {

  justify-content: center;
}
.col-left {
  display: flex;
  justify-content: flex-end
}
.calendar * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.calendar {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  color: #222222;
  width: 1000px;
  border: 2px solid #F6D07B;
  display: flex;
  flex-direction: row;

  > div {
    flex: 1;
    overflow: hidden;
  }

  div.lang {
    position: absolute;
    right: 20px;
    top: 20px;
    border: 1px solid #646cff;
    border-radius: 6px;

    a {
      padding: 5px;
      cursor: pointer;
    }

    a.active {
      background: #646cff;
      color: #ffffff;
    }
  }

  .center {
    flex: 2;
  }

  .border-bottom {
    border-bottom: 1px solid #F4C493;
  }

  .border-right {
    border-right: 1px solid #F4C493;
  }

  .bg {
    background-color: #FCF8EF;
  }

  .lunar {
    height: 60px;
    line-height: 60px;
  }

  .row {
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    > div {
      flex: 1;
    }
  }

  .col {
    flex-direction: row;
  }

  div.label {
    font-size: 16px;
    font-weight: bold;
    color: #BC2F3F;
    width: 80px;
    text-align: left;
    flex: none;
    text-indent: 10px;
  }

  .grid {
    height: 182px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .col2 {
      flex: 1;
      width: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      > div {
        flex: auto;
      }

      > div.bar {
        flex: none;
        width: 30px;
        margin-left: 20px;
      }

      div.label {
        color: #000000;
      }
    }
  }

  .yj-container {
    height: 180px;
    overflow: hidden;

    .yj {
      margin: 20px auto;
      position: relative;
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border-radius: 50%;
      color: #FFFFFF;
    }

    .yj::before, .yj::after {
      position: absolute;
      content: '';
      left: -2px;
      top: -2px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      z-index: -1;
    }

    .yj::after {
      width: 44px;
      height: 44px;
      z-index: -2;
      img {
        width: 36px;
      }
    }

    .yi {
      background: #5CB85C;
    }

    .ji {
      background: #D9534F;
    }

    .yi::before, .ji::before {
      background: #FFFFFF;
    }

    .yi::after, .ji::after {
      left: -4px;
      top: -4px;
    }

    .yi::after {
      background: #5CB85C;
    }

    .ji::after {
      background: #D9534F;
    }
  }

  .js {
    height: 165px;
    overflow: hidden;

    .label {
      margin-top: 10px;
    }
  }

  .yj-container, .js {
    ul {
      li {
        list-style: none;
        float: left;
        width: 25%;
        height: 32px;
        line-height: 32px;
        white-space: nowrap;
      }
    }
  }

  .today {
    margin: 0 auto;
    width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 120px;
    font-weight: bold;
    color: #BC2F3F;
    line-height: 177px;
    align-items: center;

    a {
      width: 0;
      height: 0;
      border: 30px solid transparent;
      font-size: 0;
      line-height: 0;
    }

    a.prev {
      border-right-color: #BC2F3F;
    }

    a.next {
      border-left-color: #BC2F3F;
    }
  }

  .bar {
    position: relative;
    width: 30px;
    height: 120px;
    color: #FFFFFF;
    text-align: center;
    background: #BC2F3F;
    display: flex;
    align-items: center;
    border-radius: 6px;
  }

  .bar::before, .bar::after {
    content: '';
    position: absolute;
    left: 50%;
    top: -6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #BC2F3F;
    margin-left: -8px;
  }

  .bar::after {
    top: auto;
    bottom: -6px;
  }

  .inputs {
    position: relative;
    display: flex;
    padding: 20px;

    div {
      position: relative;
      flex: 1;
    }

    input, select {
      border: 1px solid #D7D9E0;
      box-sizing: border-box;
      padding: 7px;
      border-radius: 6px;
      line-height: 1;
      position: relative;
      background: #FFFFFF;
      width: 80px;
      margin-right: 6px;
      text-align: center;
      font-size: 20px;
      outline: none;
    }

    select {
      appearance: none;
    }

  }

}
.box-card {
  margin-bottom: 22px;
  span {
    margin-right: 8px;
  }
  .lunar-time {
    margin-bottom: 14px;
    font-size: 16px;


  }

  .caixi {
    margin-bottom: 28px;
  }
  .yj {
    display: flex;
    margin-bottom: 8px;
    img {
      width: 36px;
      margin-right: 14px;
    }
  }
  .yi {
    justify-content: flex-start;
    align-items: flex-start;
  }
}

</style>
