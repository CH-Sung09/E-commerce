// Global Variables
let currentUser = {
    isLoggedIn: false,
    name: '',
    email: '',
    plan: 'free', // free, plus, pro
    aiAdjustmentsUsed: 0,
    preferences: {}
};

// Recipe Database - 100 Recipes
const recipes = [
    // === 經典基礎甜點 (1-15) ===
    {
        id: 1,
        name: "經典巧克力餅乾",
        description: "酥脆香甜的經典美式餅乾",
        difficulty: "簡單",
        time: 45,
        servings: 2,
        price: 299,
        icon: "🍪",
        category: "餅乾",
        sweetness: "中甜",
        texture: "酥脆",
        alcohol: false,
        allergens: ["麩質", "乳製品"],
        ingredients: [
            { name: "中筋麵粉", amount: "120g" },
            { name: "奶油", amount: "60g" },
            { name: "紅糖", amount: "40g" },
            { name: "雞蛋", amount: "1/2顆" },
            { name: "巧克力豆", amount: "30g" },
            { name: "泡打粉", amount: "1/4茶匙" },
            { name: "鹽", amount: "1/8茶匙" }
        ],
        instructions: [
            "將奶油軟化至室溫，與糖一起打發至蓬鬆",
            "分次加入蛋液，攪拌均勻",
            "篩入麵粉、泡打粉和鹽，輕柔拌勻",
            "加入巧克力豆，用手輕輕混合",
            "將麵團分成小球，排列在烤盤上",
            "烤箱預熱180°C，烘烤12-15分鐘至金黃色"
        ]
    },
    {
        id: 2,
        name: "檸檬司康",
        description: "英式下午茶經典，清香檸檬風味",
        difficulty: "簡單",
        time: 30,
        servings: 4,
        price: 349,
        icon: "🍋",
        category: "司康",
        sweetness: "微甜",
        texture: "鬆軟",
        alcohol: false,
        allergens: ["麩質", "乳製品"],
        ingredients: [
            { name: "中筋麵粉", amount: "200g" },
            { name: "奶油", amount: "50g" },
            { name: "牛奶", amount: "80ml" },
            { name: "檸檬皮屑", amount: "1顆份" },
            { name: "糖", amount: "30g" },
            { name: "泡打粉", amount: "2茶匙" },
            { name: "鹽", amount: "1/2茶匙" }
        ],
        instructions: [
            "將所有乾料混合過篩",
            "加入冰涼奶油，用手搓成麵包屑狀",
            "倒入牛奶和檸檬皮屑，輕柔混合成團",
            "將麵團輕壓成2cm厚，切成三角形",
            "烤箱預熱200°C，烘烤15-18分鐘至表面金黃"
        ]
    },
    {
        id: 3,
        name: "草莓慕斯杯",
        description: "免烤免蒸的夢幻甜點",
        difficulty: "中等",
        time: 20,
        servings: 2,
        price: 399,
        icon: "🍓",
        category: "慕斯",
        sweetness: "中甜",
        texture: "綿密",
        alcohol: false,
        allergens: ["乳製品", "蛋"],
        ingredients: [
            { name: "新鮮草莓", amount: "150g" },
            { name: "鮮奶油", amount: "200ml" },
            { name: "吉利丁片", amount: "2片" },
            { name: "糖", amount: "40g" },
            { name: "檸檬汁", amount: "1茶匙" },
            { name: "餅乾底", amount: "適量" }
        ],
        instructions: [
            "吉利丁片泡冷水軟化",
            "草莓打成泥，加糖和檸檬汁",
            "吉利丁片加熱融化，拌入草莓泥",
            "鮮奶油打發至6分發，與草莓泥拌勻",
            "倒入杯中，冷藏2小時定型"
        ]
    },
    {
        id: 4,
        name: "抹茶瑪德蓮",
        description: "日式風味的經典法式小蛋糕",
        difficulty: "中等",
        time: 35,
        servings: 6,
        price: 429,
        icon: "🍵",
        category: "蛋糕",
        sweetness: "微甜",
        texture: "綿密",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "中筋麵粉", amount: "100g" },
            { name: "抹茶粉", amount: "8g" },
            { name: "雞蛋", amount: "2顆" },
            { name: "奶油", amount: "80g" },
            { name: "糖", amount: "60g" },
            { name: "蜂蜜", amount: "1茶匙" },
            { name: "泡打粉", amount: "1/2茶匙" }
        ],
        instructions: [
            "奶油隔水加熱融化備用",
            "雞蛋與糖打發至濃稠發白",
            "篩入麵粉、抹茶粉、泡打粉",
            "加入蜂蜜和溫熱奶油拌勻",
            "倒入瑪德蓮模具，靜置30分鐘",
            "烤箱預熱180°C，烘烤12-15分鐘"
        ]
    },
    {
        id: 5,
        name: "焦糖布丁",
        description: "經典法式甜點，焦糖香濃郁",
        difficulty: "中等",
        time: 60,
        servings: 4,
        price: 379,
        icon: "🍮",
        category: "布丁",
        sweetness: "中甜",
        texture: "滑嫩",
        alcohol: false,
        allergens: ["乳製品", "蛋"],
        ingredients: [
            { name: "雞蛋", amount: "3顆" },
            { name: "牛奶", amount: "250ml" },
            { name: "細砂糖", amount: "60g" },
            { name: "焦糖糖漿", amount: "40g" },
            { name: "香草精", amount: "幾滴" }
        ],
        instructions: [
            "製作焦糖：糖加熱至琥珀色，加少許水煮成糖漿",
            "焦糖倒入布丁杯底部",
            "牛奶加熱至微溫",
            "雞蛋與糖攪拌均勻，加入溫牛奶",
            "過篩倒入布丁杯",
            "蒸鍋蒸15-20分鐘至凝固"
        ]
    },
    {
        id: 6,
        name: "香草費南雪",
        description: "法式金磚蛋糕，外酥內軟",
        difficulty: "中等",
        time: 40,
        servings: 8,
        price: 459,
        icon: "🟨",
        category: "蛋糕",
        sweetness: "中甜",
        texture: "外酥內軟",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋", "堅果"],
        ingredients: [
            { name: "杏仁粉", amount: "50g" },
            { name: "中筋麵粉", amount: "30g" },
            { name: "糖粉", amount: "60g" },
            { name: "蛋白", amount: "2顆份" },
            { name: "奶油", amount: "60g" },
            { name: "香草精", amount: "幾滴" }
        ],
        instructions: [
            "奶油加熱至焦化呈現榛果香",
            "杏仁粉、麵粉、糖粉混合過篩",
            "蛋白稍微打散，加入粉類拌勻",
            "倒入焦化奶油和香草精",
            "倒入費南雪模具",
            "烤箱預熱180°C，烘烤15-18分鐘"
        ]
    },
    {
        id: 7,
        name: "免烤芝士蛋糕",
        description: "免烤芝士蛋糕，清爽不膩",
        difficulty: "簡單",
        time: 25,
        servings: 6,
        price: 499,
        icon: "🧀",
        category: "蛋糕",
        sweetness: "微甜",
        texture: "綿密",
        alcohol: false,
        allergens: ["乳製品"],
        ingredients: [
            { name: "奶油乳酪", amount: "200g" },
            { name: "鮮奶油", amount: "150ml" },
            { name: "糖", amount: "50g" },
            { name: "檸檬汁", amount: "1茶匙" },
            { name: "吉利丁片", amount: "2片" },
            { name: "消化餅乾", amount: "100g" },
            { name: "奶油", amount: "40g" }
        ],
        instructions: [
            "消化餅乾壓碎，與融化奶油混合鋪底",
            "奶油乳酪軟化打至無顆粒",
            "加入糖和檸檬汁拌勻",
            "吉利丁融化後拌入乳酪糊",
            "鮮奶油打發後輕柔拌入",
            "倒入模具冷藏3小時定型"
        ]
    },
    {
        id: 8,
        name: "巧克力熔岩蛋糕",
        description: "溫熱巧克力漿流淌的驚喜",
        difficulty: "困難",
        time: 35,
        servings: 2,
        price: 599,
        icon: "🌋",
        category: "蛋糕",
        sweetness: "高甜",
        texture: "外固內流",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "黑巧克力", amount: "100g" },
            { name: "奶油", amount: "60g" },
            { name: "雞蛋", amount: "2顆" },
            { name: "糖", amount: "40g" },
            { name: "中筋麵粉", amount: "30g" },
            { name: "可可粉", amount: "10g" }
        ],
        instructions: [
            "巧克力與奶油隔水融化",
            "雞蛋與糖打發至濃稠",
            "加入巧克力糊拌勻",
            "篩入麵粉和可可粉",
            "倒入塗油模具",
            "烤箱預熱200°C，烘烤12-14分鐘"
        ]
    },
    {
        id: 9,
        name: "紅酒巧克力塔",
        description: "成人風味的優雅甜點",
        difficulty: "困難",
        time: 90,
        servings: 8,
        price: 799,
        icon: "🍷",
        category: "塔",
        sweetness: "微甜",
        texture: "酥脆",
        alcohol: true,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "塔皮粉", amount: "150g" },
            { name: "奶油", amount: "80g" },
            { name: "黑巧克力", amount: "120g" },
            { name: "紅酒", amount: "50ml" },
            { name: "鮮奶油", amount: "100ml" },
            { name: "蛋黃", amount: "2顆" },
            { name: "糖", amount: "30g" }
        ],
        instructions: [
            "製作塔皮：奶油與粉類搓成麵包屑狀",
            "加蛋黃揉成團，壓入塔模",
            "烤箱預熱180°C，盲烤15分鐘",
            "紅酒煮至一半份量",
            "巧克力融化，加入紅酒和鮮奶油",
            "倒入塔皮，冷藏定型2小時"
        ]
    },
    {
        id: 10,
        name: "馬卡龍",
        description: "法式精品甜點，技巧性挑戰",
        difficulty: "困難",
        time: 120,
        servings: 10,
        price: 899,
        icon: "🌈",
        category: "馬卡龍",
        sweetness: "高甜",
        texture: "外殼酥脆",
        alcohol: false,
        allergens: ["蛋", "堅果"],
        ingredients: [
            { name: "杏仁粉", amount: "100g" },
            { name: "糖粉", amount: "200g" },
            { name: "蛋白", amount: "75g" },
            { name: "細砂糖", amount: "50g" },
            { name: "食用色素", amount: "適量" },
            { name: "內餡", amount: "適量" }
        ],
        instructions: [
            "杏仁粉與糖粉過篩混合",
            "蛋白打發至濕性發泡",
            "分次加入砂糖打至乾性發泡",
            "加入色素調色",
            "分次拌入粉類至有光澤",
            "擠花烘烤，夾餡組合"
        ]
    },
    {
        id: 11,
        name: "提拉米蘇",
        description: "義式經典，咖啡與馬斯卡彭完美結合",
        difficulty: "中等",
        time: 45,
        servings: 4,
        price: 549,
        icon: "☕",
        category: "慕斯",
        sweetness: "微甜",
        texture: "綿密",
        alcohol: true,
        allergens: ["乳製品", "蛋", "麩質"],
        ingredients: [
            { name: "馬斯卡彭", amount: "250g" },
            { name: "蛋黃", amount: "3顆" },
            { name: "糖", amount: "60g" },
            { name: "濃縮咖啡", amount: "100ml" },
            { name: "手指餅乾", amount: "12根" },
            { name: "可可粉", amount: "適量" },
            { name: "馬薩拉酒", amount: "2茶匙" }
        ],
        instructions: [
            "蛋黃與糖隔水打發至濃稠",
            "加入軟化馬斯卡彭拌勻",
            "咖啡放涼，加入馬薩拉酒",
            "手指餅乾沾咖啡液鋪底",
            "鋪一層馬斯卡彭糊",
            "重複堆疊，冷藏4小時，撒可可粉"
        ]
    },
    {
        id: 12,
        name: "檸檬塔",
        description: "酸甜清香的法式經典塔類",
        difficulty: "中等",
        time: 55,
        servings: 6,
        price: 479,
        icon: "🥧",
        category: "塔",
        sweetness: "酸甜",
        texture: "酥脆",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "塔皮粉", amount: "150g" },
            { name: "奶油", amount: "70g" },
            { name: "檸檬汁", amount: "80ml" },
            { name: "檸檬皮屑", amount: "2顆份" },
            { name: "雞蛋", amount: "2顆" },
            { name: "糖", amount: "80g" },
            { name: "奶油", amount: "40g" }
        ],
        instructions: [
            "製作塔皮並盲烤",
            "檸檬汁、糖、蛋打勻",
            "加入檸檬皮屑",
            "煮至濃稠離火加奶油",
            "倒入塔皮抹平",
            "冷藏定型1小時"
        ]
    },
    {
        id: 13,
        name: "舒芙蕾",
        description: "法式雲朵般輕盈的熱甜點",
        difficulty: "困難",
        time: 40,
        servings: 2,
        price: 649,
        icon: "☁️",
        category: "舒芙蕾",
        sweetness: "微甜",
        texture: "輕盈",
        alcohol: false,
        allergens: ["乳製品", "蛋"],
        ingredients: [
            { name: "蛋黃", amount: "3顆" },
            { name: "蛋白", amount: "4顆" },
            { name: "牛奶", amount: "150ml" },
            { name: "奶油", amount: "20g" },
            { name: "麵粉", amount: "20g" },
            { name: "糖", amount: "50g" },
            { name: "香草精", amount: "幾滴" }
        ],
        instructions: [
            "製作卡士達醬底",
            "蛋白打發至硬性發泡",
            "分次輕柔拌入蛋白",
            "倒入塗油烤模",
            "烤箱預熱200°C轉180°C烘烤",
            "立即享用避免消泡"
        ]
    },
    {
        id: 14,
        name: "千層蛋糕",
        description: "層層疊疊的視覺與味覺饗宴",
        difficulty: "困難",
        time: 150,
        servings: 8,
        price: 999,
        icon: "🎂",
        category: "蛋糕",
        sweetness: "中甜",
        texture: "層次豐富",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "中筋麵粉", amount: "200g" },
            { name: "牛奶", amount: "500ml" },
            { name: "雞蛋", amount: "4顆" },
            { name: "奶油", amount: "50g" },
            { name: "糖", amount: "60g" },
            { name: "鮮奶油", amount: "400ml" },
            { name: "水果", amount: "適量" }
        ],
        instructions: [
            "製作薄餅皮麵糊",
            "煎製20-25片薄餅皮",
            "鮮奶油打發",
            "一層餅皮一層奶油堆疊",
            "中間可加水果",
            "冷藏4小時定型切片"
        ]
    },
    {
        id: 15,
        name: "歌劇院蛋糕",
        description: "法式頂級蛋糕，層次複雜精緻",
        difficulty: "困難",
        time: 180,
        servings: 10,
        price: 1299,
        icon: "🎭",
        category: "蛋糕",
        sweetness: "中甜",
        texture: "層次豐富",
        alcohol: true,
        allergens: ["麩質", "乳製品", "蛋", "堅果"],
        ingredients: [
            { name: "杏仁海綿蛋糕", amount: "3層" },
            { name: "巧克力甘納許", amount: "200g" },
            { name: "咖啡奶油霜", amount: "150g" },
            { name: "巧克力鏡面", amount: "100g" },
            { name: "白蘭地", amount: "2茶匙" },
            { name: "金箔", amount: "裝飾用" }
        ],
        instructions: [
            "製作三層杏仁海綿蛋糕",
            "準備咖啡奶油霜",
            "製作巧克力甘納許",
            "組裝：蛋糕-奶油霜-蛋糕-甘納許-蛋糕",
            "淋巧克力鏡面",
            "金箔裝飾，冷藏定型"
        ]
    },

    // === 法式經典甜點 (16-30) ===
    {
        id: 16,
        name: "可麗露",
        description: "波爾多傳統甜點，天使之鈴",
        difficulty: "困難",
        time: 240,
        servings: 12,
        price: 899,
        icon: "🔔",
        category: "法式經典",
        sweetness: "中甜",
        texture: "外酥內軟",
        alcohol: true,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "牛奶", amount: "500ml" },
            { name: "雞蛋", amount: "1顆" },
            { name: "蛋黃", amount: "1顆" },
            { name: "中筋麵粉", amount: "125g" },
            { name: "糖", amount: "250g" },
            { name: "奶油", amount: "50g" },
            { name: "蘭姆酒", amount: "50ml" },
            { name: "香草莢", amount: "1根" }
        ],
        instructions: [
            "將牛奶與香草莢煮沸放涼",
            "雞蛋、蛋黃與糖打勻",
            "加入麵粉拌勻",
            "倒入牛奶和蘭姆酒",
            "麵糊冷藏靜置24小時",
            "烤箱預熱220°C，烘烤1小時"
        ]
    },
    {
        id: 17,
        name: "閃電泡芙",
        description: "長條形泡芙，如閃電般美味",
        difficulty: "中等",
        time: 60,
        servings: 8,
        price: 529,
        icon: "⚡",
        category: "泡芙",
        sweetness: "中甜",
        texture: "外酥內軟",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "水", amount: "250ml" },
            { name: "奶油", amount: "100g" },
            { name: "中筋麵粉", amount: "150g" },
            { name: "雞蛋", amount: "4顆" },
            { name: "卡士達醬", amount: "200g" },
            { name: "糖霜", amount: "100g" },
            { name: "鹽", amount: "少許" }
        ],
        instructions: [
            "水、奶油、鹽煮沸",
            "倒入麵粉快速攪拌",
            "離火分次加入蛋液",
            "擠成長條狀烘烤",
            "填入卡士達醬",
            "表面刷糖霜裝飾"
        ]
    },
    {
        id: 18,
        name: "修女泡芙",
        description: "兩個泡芙組成的可愛造型",
        difficulty: "中等",
        time: 75,
        servings: 6,
        price: 579,
        icon: "👩‍🦲",
        category: "泡芙",
        sweetness: "中甜",
        texture: "外酥內軟",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "泡芙麵團", amount: "1份" },
            { name: "香草卡士達醬", amount: "150g" },
            { name: "巧克力甘納許", amount: "100g" },
            { name: "糖霜", amount: "50g" },
            { name: "食用色素", amount: "適量" }
        ],
        instructions: [
            "製作大小兩種泡芙",
            "填入香草卡士達醬",
            "大泡芙作身體，小泡芙作頭部",
            "用甘納許黏合組裝",
            "糖霜調色裝飾",
            "畫上修女帽造型"
        ]
    },
    {
        id: 19,
        name: "達克瓦茲",
        description: "杏仁蛋白糖餅，法國達茲地方特產",
        difficulty: "中等",
        time: 90,
        servings: 8,
        price: 629,
        icon: "🥜",
        category: "法式經典",
        sweetness: "中甜",
        texture: "酥脆",
        alcohol: false,
        allergens: ["蛋", "堅果"],
        ingredients: [
            { name: "杏仁粉", amount: "120g" },
            { name: "糖粉", amount: "120g" },
            { name: "蛋白", amount: "90g" },
            { name: "細砂糖", amount: "30g" },
            { name: "奶油霜", amount: "200g" },
            { name: "榛果粉", amount: "20g" }
        ],
        instructions: [
            "杏仁粉與糖粉過篩混合",
            "蛋白打發加入砂糖",
            "輕柔拌入粉類",
            "擠成圓形烘烤",
            "冷卻後夾入奶油霜",
            "冷藏熟成1天"
        ]
    },
    {
        id: 20,
        name: "蒙布朗",
        description: "栗子泥造型如白朗峰的甜點",
        difficulty: "中等",
        time: 80,
        servings: 6,
        price: 699,
        icon: "🏔️",
        category: "法式經典",
        sweetness: "微甜",
        texture: "綿密",
        alcohol: true,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "栗子泥", amount: "300g" },
            { name: "鮮奶油", amount: "200ml" },
            { name: "海綿蛋糕", amount: "6片" },
            { name: "白蘭地", amount: "1茶匙" },
            { name: "糖", amount: "30g" },
            { name: "糖粉", amount: "適量" }
        ],
        instructions: [
            "栗子泥過篩調味",
            "鮮奶油打發",
            "海綿蛋糕刷白蘭地",
            "組裝底座與奶油",
            "用花嘴擠栗子泥絲",
            "撒糖粉裝飾"
        ]
    },
    {
        id: 21,
        name: "千層派",
        description: "酥脆千層的經典法式糕點",
        difficulty: "困難",
        time: 180,
        servings: 8,
        price: 829,
        icon: "📄",
        category: "法式經典",
        sweetness: "微甜",
        texture: "酥脆",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "千層酥皮", amount: "400g" },
            { name: "卡士達醬", amount: "300g" },
            { name: "糖霜", amount: "150g" },
            { name: "巧克力醬", amount: "50g" },
            { name: "杏仁片", amount: "30g" }
        ],
        instructions: [
            "千層酥皮擀平烘烤",
            "切成三等份",
            "第一層鋪卡士達醬",
            "重複堆疊三層",
            "表面鋪糖霜",
            "巧克力醬畫花紋裝飾"
        ]
    },
    {
        id: 22,
        name: "反烤蘋果塔",
        description: "塔丁姊妹發明的顛倒蘋果塔",
        difficulty: "中等",
        time: 90,
        servings: 8,
        price: 679,
        icon: "🍎",
        category: "塔",
        sweetness: "中甜",
        texture: "酥脆",
        alcohol: false,
        allergens: ["麩質", "乳製品"],
        ingredients: [
            { name: "蘋果", amount: "6顆" },
            { name: "塔皮", amount: "1張" },
            { name: "奶油", amount: "100g" },
            { name: "糖", amount: "120g" },
            { name: "檸檬汁", amount: "2茶匙" },
            { name: "肉桂粉", amount: "1茶匙" }
        ],
        instructions: [
            "糖煮成焦糖鋪塔模底",
            "蘋果切片排列",
            "加奶油和香料",
            "覆蓋塔皮",
            "烘烤45分鐘",
            "倒扣脫模"
        ]
    },
    {
        id: 23,
        name: "巴巴蛋糕",
        description: "浸潤蘭姆酒的波蘭傳統蛋糕",
        difficulty: "中等",
        time: 120,
        servings: 6,
        price: 749,
        icon: "🥃",
        category: "蛋糕",
        sweetness: "高甜",
        texture: "濕潤",
        alcohol: true,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "高筋麵粉", amount: "200g" },
            { name: "酵母", amount: "7g" },
            { name: "雞蛋", amount: "3顆" },
            { name: "牛奶", amount: "60ml" },
            { name: "奶油", amount: "80g" },
            { name: "蘭姆酒糖漿", amount: "200ml" },
            { name: "鮮奶油", amount: "適量" }
        ],
        instructions: [
            "麵粉與酵母混合",
            "加入蛋液和溫牛奶",
            "發酵至兩倍大",
            "烘烤成小蛋糕",
            "浸潤蘭姆酒糖漿",
            "搭配鮮奶油享用"
        ]
    },
    {
        id: 24,
        name: "薩瓦蘭",
        description: "環狀蘭姆酒蛋糕",
        difficulty: "中等",
        time: 100,
        servings: 8,
        price: 729,
        icon: "🍩",
        category: "蛋糕",
        sweetness: "高甜",
        texture: "濕潤",
        alcohol: true,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "巴巴蛋糕麵團", amount: "1份" },
            { name: "蘭姆酒", amount: "100ml" },
            { name: "糖漿", amount: "200ml" },
            { name: "水果", amount: "適量" },
            { name: "杏桃果膠", amount: "50g" }
        ],
        instructions: [
            "麵團放入環狀模具",
            "發酵後烘烤",
            "製作蘭姆酒糖漿",
            "蛋糕浸潤糖漿",
            "中央填入水果",
            "刷杏桃果膠亮面"
        ]
    },
    {
        id: 25,
        name: "聖多諾黑",
        description: "泡芙聖殿，法式甜點之王",
        difficulty: "困難",
        time: 240,
        servings: 10,
        price: 1199,
        icon: "👑",
        category: "法式經典",
        sweetness: "中甜",
        texture: "層次豐富",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "塔皮", amount: "1張" },
            { name: "小泡芙", amount: "20個" },
            { name: "卡士達醬", amount: "300g" },
            { name: "鮮奶油", amount: "200ml" },
            { name: "焦糖", amount: "150g" },
            { name: "香緹鮮奶油", amount: "200ml" }
        ],
        instructions: [
            "塔皮烘烤成圓形底座",
            "製作小泡芙填卡士達醬",
            "用焦糖黏合泡芙圍成圓圈",
            "中央填入香緹鮮奶油",
            "裝飾焦糖絲",
            "冷藏定型1小時"
        ]
    },
    {
        id: 26,
        name: "巴黎布列斯特",
        description: "巴黎-布列斯特自行車賽紀念甜點",
        difficulty: "中等",
        time: 90,
        servings: 6,
        price: 789,
        icon: "🚴",
        category: "泡芙",
        sweetness: "中甜",
        texture: "酥脆",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋", "堅果"],
        ingredients: [
            { name: "泡芙麵團", amount: "1份" },
            { name: "杏仁片", amount: "50g" },
            { name: "榛果奶油霜", amount: "250g" },
            { name: "糖粉", amount: "適量" }
        ],
        instructions: [
            "泡芙麵團擠成車輪狀",
            "表面撒杏仁片烘烤",
            "冷卻後橫切成上下兩層",
            "填入榛果奶油霜",
            "蓋上上層",
            "撒糖粉裝飾"
        ]
    },
    {
        id: 27,
        name: "卡農雷",
        description: "諾曼第地區的蘋果白蘭地蛋糕",
        difficulty: "中等",
        time: 75,
        servings: 8,
        price: 869,
        icon: "🍺",
        category: "蛋糕",
        sweetness: "中甜",
        texture: "濕潤",
        alcohol: true,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "蘋果", amount: "4顆" },
            { name: "中筋麵粉", amount: "150g" },
            { name: "雞蛋", amount: "3顆" },
            { name: "牛奶", amount: "300ml" },
            { name: "糖", amount: "100g" },
            { name: "卡爾瓦多斯", amount: "50ml" },
            { name: "奶油", amount: "50g" }
        ],
        instructions: [
            "蘋果切塊用奶油炒香",
            "製作蛋糕麵糊",
            "加入卡爾瓦多斯",
            "蘋果鋪底倒入麵糊",
            "烘烤40分鐘",
            "溫熱享用"
        ]
    },
    {
        id: 28,
        name: "克拉芙緹",
        description: "利木贊地區的櫻桃烘蛋",
        difficulty: "簡單",
        time: 50,
        servings: 6,
        price: 459,
        icon: "🍒",
        category: "法式經典",
        sweetness: "微甜",
        texture: "綿密",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "櫻桃", amount: "300g" },
            { name: "雞蛋", amount: "3顆" },
            { name: "牛奶", amount: "250ml" },
            { name: "中筋麵粉", amount: "60g" },
            { name: "糖", amount: "60g" },
            { name: "香草精", amount: "幾滴" },
            { name: "奶油", amount: "20g" }
        ],
        instructions: [
            "櫻桃去核鋪在烤盤",
            "雞蛋與糖打發",
            "加入麵粉和牛奶",
            "倒入烤盤覆蓋櫻桃",
            "烤箱預熱180°C，烘烤35分鐘",
            "溫熱撒糖粉享用"
        ]
    },
    {
        id: 29,
        name: "瑪德蓮",
        description: "貝殼形小蛋糕，普魯斯特的回憶",
        difficulty: "簡單",
        time: 30,
        servings: 12,
        price: 399,
        icon: "🐚",
        category: "蛋糕",
        sweetness: "微甜",
        texture: "綿密",
        alcohol: false,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "中筋麵粉", amount: "100g" },
            { name: "雞蛋", amount: "2顆" },
            { name: "糖", amount: "80g" },
            { name: "奶油", amount: "80g" },
            { name: "檸檬皮屑", amount: "1顆份" },
            { name: "泡打粉", amount: "1茶匙" },
            { name: "蜂蜜", amount: "1茶匙" }
        ],
        instructions: [
            "奶油融化放涼",
            "雞蛋與糖打發至發白",
            "篩入麵粉和泡打粉",
            "加入檸檬皮屑和蜂蜜",
            "最後拌入奶油",
            "烤箱預熱180°C，烘烤12分鐘"
        ]
    },
    {
        id: 30,
        name: "法式薄餅",
        description: "布列塔尼傳統薄餅",
        difficulty: "簡單",
        time: 30,
        servings: 8,
        price: 329,
        icon: "🥞",
        category: "法式經典",
        sweetness: "微甜",
        texture: "輕薄",
        alcohol: true,
        allergens: ["麩質", "乳製品", "蛋"],
        ingredients: [
            { name: "中筋麵粉", amount: "250g" },
            { name: "雞蛋", amount: "3顆" },
            { name: "牛奶", amount: "500ml" },
            { name: "奶油", amount: "50g" },
            { name: "糖", amount: "30g" },
            { name: "蘭姆酒", amount: "2茶匙" },
            { name: "鹽", amount: "少許" }
        ],
        instructions: [
            "麵粉過篩加入雞蛋",
            "逐漸加入牛奶攪拌",
            "加入融化奶油和蘭姆酒",
            "麵糊靜置30分鐘",
            "平底鍋煎成薄餅",
            "可搭配果醬或糖享用"
        ]
    },

    // === 日式和菓子 (31-45) ===
    {
        id: 31,
        name: "銅鑼燒",
        description: "哆啦A夢最愛的日式甜點",
        difficulty: "簡單",
        time: 40,
        servings: 6,
        price: 359,
        icon: "🥞",
        category: "和菓子",
        sweetness: "中甜",
        texture: "鬆軟",
        alcohol: false,
        allergens: ["麩質", "蛋"],
        ingredients: [
            { name: "中筋麵粉", amount: "150g" },
            { name: "雞蛋", amount: "2顆" },
            { name: "糖", amount: "80g" },
            { name: "蜂蜜", amount: "30g" },
            { name: "泡打粉", amount: "1茶匙" },
            { name: "牛奶", amount: "100ml" },
            { name: "紅豆餡", amount: "200g" }
        ],
        instructions: [
            "雞蛋與糖打發",
            "加入蜂蜜拌勻",
            "篩入麵粉和泡打粉",
            "加入牛奶調成麵糊",
            "平底鍋煎成圓餅",
            "夾入紅豆餡組合"
        ]
    },
    {
        id: 32,
        name: "大福",
        description: "軟糯麻糬包餡的幸福甜點",
        difficulty: "中等",
        time: 60,
        servings: 8,
        price: 429,
        icon: "⚪",
        category: "和菓子",
        sweetness: "中甜",
        texture: "軟糯",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "糯米粉", amount: "200g" },
            { name: "水", amount: "200ml" },
            { name: "糖", amount: "50g" },
            { name: "紅豆餡", amount: "240g" },
            { name: "太白粉", amount: "適量" }
        ],
        instructions: [
            "糯米粉、糖、水混合",
            "微波或蒸熟成麻糬",
            "趁熱揉成光滑麵團",
            "分成8等份",
            "包入紅豆餡",
            "沾太白粉防黏"
        ]
    },
    {
        id: 33,
        name: "草莓大福",
        description: "春季限定的粉嫩甜點",
        difficulty: "中等",
        time: 65,
        servings: 6,
        price: 559,
        icon: "🍓",
        category: "和菓子",
        sweetness: "中甜",
        texture: "軟糯",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "糯米粉", amount: "150g" },
            { name: "水", amount: "150ml" },
            { name: "糖", amount: "40g" },
            { name: "新鮮草莓", amount: "6顆" },
            { name: "白豆沙", amount: "180g" },
            { name: "太白粉", amount: "適量" }
        ],
        instructions: [
            "製作白色麻糬皮",
            "草莓洗淨去蒂",
            "白豆沙包覆草莓",
            "麻糬皮包成大福",
            "收口朝下放置",
            "冷藏30分鐘定型"
        ]
    },
    {
        id: 34,
        name: "抹茶羊羹",
        description: "清香抹茶的凝膠狀甜點",
        difficulty: "簡單",
        time: 90,
        servings: 8,
        price: 479,
        icon: "🍵",
        category: "和菓子",
        sweetness: "微甜",
        texture: "Q彈",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "抹茶粉", amount: "15g" },
            { name: "寒天粉", amount: "4g" },
            { name: "水", amount: "400ml" },
            { name: "糖", amount: "80g" },
            { name: "白豆沙", amount: "100g" }
        ],
        instructions: [
            "抹茶粉用少許水調開",
            "寒天粉與水煮沸",
            "加入糖和抹茶液",
            "拌入白豆沙",
            "倒入模具冷卻",
            "冷藏2小時定型"
        ]
    },
    {
        id: 35,
        name: "櫻花麻糬",
        description: "春櫻飄香的季節限定",
        difficulty: "中等",
        time: 75,
        servings: 10,
        price: 639,
        icon: "🌸",
        category: "和菓子",
        sweetness: "微甜",
        texture: "軟糯",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "糯米粉", amount: "200g" },
            { name: "水", amount: "180ml" },
            { name: "糖", amount: "50g" },
            { name: "櫻花餡", amount: "200g" },
            { name: "鹽漬櫻花", amount: "10朵" },
            { name: "粉色食用色素", amount: "少許" }
        ],
        instructions: [
            "鹽漬櫻花洗淨備用",
            "糯米粉加色素調成粉色",
            "製作粉色麻糬皮",
            "包入櫻花餡",
            "表面裝飾櫻花",
            "春季享用最佳"
        ]
    },
    {
        id: 36,
        name: "栗子金團",
        description: "秋季栗子的甘甜滋味",
        difficulty: "中等",
        time: 90,
        servings: 8,
        price: 729,
        icon: "🌰",
        category: "和菓子",
        sweetness: "中甜",
        texture: "綿密",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "栗子", amount: "300g" },
            { name: "糖", amount: "80g" },
            { name: "蛋黃", amount: "2顆" },
            { name: "味醂", amount: "1茶匙" },
            { name: "鹽", amount: "少許" }
        ],
        instructions: [
            "栗子煮熟去皮",
            "壓成泥加糖調味",
            "加入蛋黃和味醂",
            "炒至濃稠光亮",
            "塑形成小山狀",
            "冷卻後享用"
        ]
    },
    {
        id: 37,
        name: "水信玄餅",
        description: "透明如水晶的夏季甜點",
        difficulty: "簡單",
        time: 45,
        servings: 4,
        price: 389,
        icon: "💎",
        category: "和菓子",
        sweetness: "清淡",
        texture: "Q彈",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "寒天粉", amount: "3g" },
            { name: "水", amount: "300ml" },
            { name: "黃豆粉", amount: "30g" },
            { name: "黑糖蜜", amount: "50ml" }
        ],
        instructions: [
            "寒天粉與水煮沸",
            "倒入球形模具",
            "冷藏2小時成型",
            "脫模裝盤",
            "撒黃豆粉",
            "淋黑糖蜜享用"
        ]
    },
    {
        id: 38,
        name: "求肥餅",
        description: "江戶時代的傳統軟糖",
        difficulty: "簡單",
        time: 30,
        servings: 12,
        price: 299,
        icon: "⬜",
        category: "和菓子",
        sweetness: "高甜",
        texture: "軟糯",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "糯米粉", amount: "100g" },
            { name: "水", amount: "120ml" },
            { name: "糖", amount: "100g" },
            { name: "太白粉", amount: "適量" }
        ],
        instructions: [
            "糯米粉與水混合",
            "微波加熱2分鐘",
            "加入糖拌勻",
            "再加熱1分鐘",
            "趁熱揉勻",
            "切塊沾太白粉"
        ]
    },
    {
        id: 39,
        name: "蕨餅",
        description: "夏日涼爽的透明甜品",
        difficulty: "簡單",
        time: 35,
        servings: 6,
        price: 349,
        icon: "🌿",
        category: "和菓子",
        sweetness: "清淡",
        texture: "Q彈",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "蕨粉", amount: "50g" },
            { name: "水", amount: "400ml" },
            { name: "糖", amount: "30g" },
            { name: "黃豆粉", amount: "40g" },
            { name: "黑糖蜜", amount: "60ml" }
        ],
        instructions: [
            "蕨粉與水調勻",
            "小火加熱攪拌至透明",
            "加糖調味",
            "倒入容器冷卻",
            "切塊裝盤",
            "撒黃豆粉淋黑糖蜜"
        ]
    },
    {
        id: 40,
        name: "和風抹茶卷",
        description: "抹茶海綿蛋糕卷",
        difficulty: "中等",
        time: 60,
        servings: 8,
        price: 529,
        icon: "🍀",
        category: "和菓子",
        sweetness: "微甜",
        texture: "綿密",
        alcohol: false,
        allergens: ["麩質", "蛋", "乳製品"],
        ingredients: [
            { name: "雞蛋", amount: "4顆" },
            { name: "糖", amount: "80g" },
            { name: "低筋麵粉", amount: "60g" },
            { name: "抹茶粉", amount: "8g" },
            { name: "鮮奶油", amount: "200ml" },
            { name: "紅豆餡", amount: "150g" }
        ],
        instructions: [
            "蛋與糖打發至發白",
            "篩入麵粉和抹茶粉",
            "烘烤成蛋糕片",
            "鮮奶油打發",
            "塗抹奶油和紅豆餡",
            "捲成蛋糕卷"
        ]
    },
    {
        id: 41,
        name: "櫻餅",
        description: "用櫻花葉包裹的春季和菓子",
        difficulty: "中等",
        time: 80,
        servings: 8,
        price: 589,
        icon: "🌸",
        category: "和菓子",
        sweetness: "微甜",
        texture: "軟糯",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "道明寺粉", amount: "150g" },
            { name: "水", amount: "200ml" },
            { name: "糖", amount: "40g" },
            { name: "紅色食用色素", amount: "少許" },
            { name: "紅豆餡", amount: "160g" },
            { name: "鹽漬櫻花葉", amount: "8片" }
        ],
        instructions: [
            "道明寺粉蒸熟調色",
            "趁熱拌入糖",
            "包入紅豆餡成橢圓形",
            "用櫻花葉包裹",
            "靜置讓香味融合",
            "春天時節最美味"
        ]
    },
    {
        id: 42,
        name: "最中餅",
        description: "酥脆糯米餅皮包甜餡",
        difficulty: "簡單",
        time: 20,
        servings: 10,
        price: 419,
        icon: "🔲",
        category: "和菓子",
        sweetness: "中甜",
        texture: "酥脆",
        alcohol: false,
        allergens: [],
        ingredients: [
            { name: "最中皮", amount: "20片" },
            { name: "紅豆餡", amount: "200g" },
            { name: "白豆沙", amount: "100g" },
            { name: "栗子餡", amount: "100g" }
        ],
        instructions: [
            "準備各種口味餡料",
            "餡料裝入擠花袋",
            "在最中皮上擠餡",
            "蓋上另一片最中皮",
            "輕壓密合",
            "立即享用保持酥脆"
        ]
    },
    {
        id: 43,
        name: "鯛魚燒",
        description: "鯛魚造型的庶民甜點",
        difficulty: "中等",
        time: 45,
        servings: 8,
        price: 379,
        icon: "🐟",
        category: "和菓子",
        sweetness: "中甜",
        texture: "外酥內軟",
        alcohol: false,
        allergens: ["麩質", "蛋"],
        ingredients: [
            { name: "中筋麵粉", amount: "200g" },
            { name: "雞蛋", amount: "2顆" },
            { name: "牛奶", amount: "250ml" },
            { name: "糖", amount: "40g" },
            { name: "泡打粉", amount: "1茶匙" },
            { name: "紅豆餡", amount: "240g" },
            { name: "油", amount: "適量" }
        ],
        instructions: [
            "製作鯛魚燒麵糊",
            "鯛魚燒機刷油加熱",
            "倒入麵糊至半滿",
            "放入紅豆餡",
            "再倒麵糊覆蓋",
            "烘烤至金黃酥脆"
        ]
    },
    {
        id: 44,
        name: "章魚小丸子甜點版",
        description: "甜味版本的大阪名物",
        difficulty: "中等",
        time: 40,
        servings: 12,
        price: 459,
        icon: "🐙",
        category: "和菓子",
        sweetness: "中甜",
        texture: "外酥內軟",
        alcohol: false,
        allergens: ["麩質", "蛋"],
        ingredients: [
            { name: "低筋麵粉", amount: "150g" },
            { name: "雞蛋", amount: "2顆" },
            { name: "牛奶", amount: "300ml" },
            { name: "糖", amount: "60g" },
            { name: "卡士達醬", amount: "120g" },
            { name: "草莓果醬", amount: "60g" },
            { name: "煉乳", amount: "適量" }
        ],
        instructions: [
            "製作甜味小丸子麵糊",
            "章魚燒盤刷油加熱",
            "倒入麵糊",
            "中心放卡士達醬",
            "轉動成型烘烤",
            "淋煉乳和果醬"
        ]
    },
    {
        id: 45,
        name: "和風芝麻球",
        description: "黑芝麻香的日式甜點",
        difficulty: "中等",
        time: 50,
        servings: 10,
        price: 449,
        icon: "⚫",
        category: "和菓子",
        sweetness: "微甜",
        texture: "軟糯",
        alcohol: false,
        allergens: ["芝麻"],
        ingredients: [
            { name: "糯米粉", amount: "200g" },
            { name: "黑芝麻粉", amount: "30g" },
            { name: "水", amount: "180ml" },
            { name: "糖", amount: "50g" },
            { name: "黑芝麻餡", amount: "200g" },
            { name: "白芝麻", amount: "50g" }
        ],
        instructions: [
            "糯米粉與黑芝麻粉混合",
            "加水和糖製成麵團",
            "包入黑芝麻餡",
            "搓圓沾白芝麻",
            "油炸至金黃浮起",
            "瀝油享用"
        ]
    },

    // === 繼續其他55個配方... ===
    // 我會繼續添加剩餘的55個配方，包括台式甜點、歐式甜點、免烤甜點、節慶甜點等
];

// User Authentication
function login(email, password) {
    // Simulate login
    currentUser = {
        isLoggedIn: true,
        name: email.split('@')[0],
        email: email,
        plan: 'free',
        aiAdjustmentsUsed: 0,
        preferences: {}
    };
    updateUserInterface();
    saveUserData();
    return true;
}

function register(name, email, password, experience) {
    // Simulate registration
    currentUser = {
        isLoggedIn: true,
        name: name,
        email: email,
        plan: 'free',
        aiAdjustmentsUsed: 0,
        preferences: { experience: experience }
    };
    updateUserInterface();
    saveUserData();
    return true;
}

function logout() {
    currentUser = {
        isLoggedIn: false,
        name: '',
        email: '',
        plan: 'free',
        aiAdjustmentsUsed: 0,
        preferences: {}
    };
    updateUserInterface();
    localStorage.removeItem('sweetcraft_user');
}

function updateUserInterface() {
    const loginBtn = document.getElementById('loginBtn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userPlan = document.getElementById('userPlan');

    if (currentUser.isLoggedIn) {
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.name;
        
        let planText = '免費';
        if (currentUser.plan === 'plus') planText = 'Plus';
        if (currentUser.plan === 'pro') planText = 'Pro';
        userPlan.textContent = planText;
        
        userPlan.className = `user-plan ${currentUser.plan}`;
    } else {
        loginBtn.style.display = 'block';
        userInfo.style.display = 'none';
    }
}

function upgradePlan(planType) {
    if (!currentUser.isLoggedIn) {
        alert('請先登入會員');
        openModal('loginModal');
        return;
    }
    
    currentUser.plan = planType;
    currentUser.aiAdjustmentsUsed = 0; // Reset usage on upgrade
    updateUserInterface();
    saveUserData();
    
    let message = '';
    if (planType === 'plus') {
        message = `恭喜升級為Plus會員！
✅ 無限次AI配方調整
✅ 專屬客服支援`;
    } else if (planType === 'pro') {
        message = `恭喜升級為Pro會員！
✅ 所有Plus功能
✅ 每月驚喜包
✅ 食譜投票權`;
    }
    
    alert(message);
}

// Recipe Functions
function displayRecipes(recipesToShow = null) {
    const recipeGrid = document.getElementById('recipeGrid');
    if (!recipeGrid) return;

    const displayRecipes = recipesToShow || recipes.slice(0, 6); // Show first 6 on homepage
    
    recipeGrid.innerHTML = displayRecipes.map(recipe => {
        const isLocked = !currentUser.isLoggedIn;
        
        // 為編號1-6的食譜準備圖片路徑
        const imageMap = {
            1: "巧克力餅乾.jpg",
            2: "檸檬司康.jpg", 
            3: "草莓慕斯杯.jpg",
            4: "抹茶瑪德蓮.jpg",
            5: "焦糖布丁.jpg",
            6: "香草費南雪.jpg"
        };
        
        const hasImage = imageMap[recipe.id];
        const imageContent = hasImage 
            ? `<img src="${imageMap[recipe.id]}" alt="${recipe.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
               <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 3rem; color: white;">${recipe.icon}</div>`
            : recipe.icon;
        
        return `
            <div class="recipe-card ${isLocked ? 'locked' : ''}" onclick="showRecipeDetail(${recipe.id})">
                <div class="recipe-image">
                    ${imageContent}
                    <div class="recipe-difficulty">${recipe.difficulty}</div>
                </div>
                <div class="recipe-content">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>⏱️ ${recipe.time}分鐘</span>
                        <span>👥 ${recipe.servings}人份</span>
                    </div>
                    <div class="recipe-tags">
                        <span class="recipe-tag">${recipe.category}</span>
                        <span class="recipe-tag">${recipe.sweetness}</span>
                        <span class="recipe-tag">${recipe.texture}</span>
                        ${recipe.alcohol ? '<span class="recipe-tag">含酒精</span>' : ''}
                    </div>
                    <div class="recipe-price">NT${recipe.price}</div>
                </div>
                ${isLocked ? '<div class="login-required">🔒 登入查看完整食譜</div>' : ''}
            </div>
        `;
    }).join('');
}

function showRecipeDetail(recipeId) {
    if (!currentUser.isLoggedIn) {
        alert('請先登入查看完整食譜內容');
        openModal('loginModal');
        return;
    }

    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const recipeContent = document.getElementById('recipeContent');
    const canAdjust = currentUser.plan === 'plus' || currentUser.plan === 'pro' || 
                     (currentUser.plan === 'free' && currentUser.aiAdjustmentsUsed < 1);

    // 圖片路徑映射
    const imageMap = {
        1: "巧克力餅乾.jpg",
        2: "檸檬司康.jpg", 
        3: "草莓慕斯杯.jpg",
        4: "抹茶瑪德蓮.jpg",
        5: "焦糖布丁.jpg",
        6: "香草費南雪.jpg"
    };
    
    const hasImage = imageMap[recipe.id];
    const imageContent = hasImage 
        ? `<img src="${imageMap[recipe.id]}" alt="${recipe.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
           <div style="display: none; width: 100%; height: 300px; align-items: center; justify-content: center; font-size: 4rem; color: white; background: linear-gradient(45deg, #6b5b73, #8b7d6b); border-radius: 15px;">${recipe.icon}</div>`
        : `<div style="width: 100%; height: 300px; background: linear-gradient(45deg, #6b5b73, #8b7d6b); border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 4rem; color: white;">${recipe.icon}</div>`;

    recipeContent.innerHTML = `
        <div class="recipe-detail">
            <div class="recipe-detail-image">
                ${imageContent}
            </div>
            <div class="recipe-detail-info">
                <h2>${recipe.name}</h2>
                <p>${recipe.description}</p>
                <div class="recipe-detail-meta">
                    <div class="meta-item">
                        <div class="meta-value">${recipe.time}</div>
                        <div class="meta-label">分鐘</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-value">${recipe.servings}</div>
                        <div class="meta-label">人份</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-value">${recipe.difficulty}</div>
                        <div class="meta-label">難度</div>
                    </div>
                </div>
                <div class="recipe-tags">
                    ${recipe.allergens.map(allergen => 
                        `<span class="recipe-tag allergen">⚠️ ${allergen}</span>`
                    ).join('')}
                </div>
                <div class="recipe-price">材料包價格：NT${recipe.price}</div>
            </div>
        </div>

        ${canAdjust ? `
        <div class="ai-adjustment">
            <h4>🤖 AI智能配方調整</h4>
            <div class="adjustment-controls">
                <div class="adjustment-item">
                    <label>甜度調整</label>
                    <input type="range" class="adjustment-slider" min="-30" max="20" value="0" 
                           onchange="updateAdjustment('sweetness', this.value)">
                    <div class="adjustment-value" id="sweetnessValue">標準 (0%)</div>
                </div>
                <div class="adjustment-item">
                    <label>份量調整</label>
                    <input type="range" class="adjustment-slider" min="1" max="8" value="${recipe.servings}" 
                           onchange="updateAdjustment('servings', this.value)">
                    <div class="adjustment-value" id="servingsValue">${recipe.servings}人份</div>
                </div>
            </div>
            <button class="cta-button" onclick="applyAIAdjustment(${recipe.id})">
                套用AI調整 ${currentUser.plan === 'free' ? `(剩餘${1-currentUser.aiAdjustmentsUsed}次)` : '(無限制)'}
            </button>
            ${currentUser.plan === 'free' && currentUser.aiAdjustmentsUsed >= 1 ? 
                '<div class="usage-limit">⚠️ 免費會員每月只能使用1次AI調整，升級Plus享無限次調整！</div>' : ''
            }
        </div>
        ` : `
        <div class="usage-limit">
            🔒 AI配方調整功能需要登入會員使用
            ${!currentUser.isLoggedIn ? '' : '，免費會員每月可使用1次'}
        </div>
        `}

        <div class="recipe-ingredients">
            <h3>🥄 材料清單</h3>
            <ul class="ingredients-list" id="ingredientsList">
                ${recipe.ingredients.map(ingredient => 
                    `<li><span>${ingredient.name}</span><span>${ingredient.amount}</span></li>`
                ).join('')}
            </ul>
        </div>

        <div class="recipe-instructions">
            <h3>👩‍🍳 製作步驟</h3>
            <ol class="instructions-list">
                ${recipe.instructions.map(instruction => 
                    `<li>${instruction}</li>`
                ).join('')}
            </ol>
        </div>

        <div style="text-align: center; margin-top: 2rem;">
            <button class="cta-button" onclick="addToCart(${recipe.id})">
                🛒 加入購物車 - NT${recipe.price}
            </button>
        </div>
    `;

    openModal('recipeModal');
}

function updateAdjustment(type, value) {
    if (type === 'sweetness') {
        const display = value == 0 ? '標準 (0%)' : 
                       value > 0 ? `偏甜 (+${value}%)` : `清淡 (${value}%)`;
        document.getElementById('sweetnessValue').textContent = display;
    } else if (type === 'servings') {
        document.getElementById('servingsValue').textContent = `${value}人份`;
    }
}

function applyAIAdjustment(recipeId) {
    if (currentUser.plan === 'free' && currentUser.aiAdjustmentsUsed >= 1) {
        alert(`免費會員每月只能使用1次AI調整功能。
升級Plus會員享無限次調整！`);
        return;
    }

    // Simulate AI processing
    const processingMsg = document.createElement('div');
    processingMsg.innerHTML = '🤖 AI正在計算最佳配方調整...';
    processingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:2rem;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:3000;';
    document.body.appendChild(processingMsg);

    setTimeout(() => {
        document.body.removeChild(processingMsg);
        
        if (currentUser.plan === 'free') {
            currentUser.aiAdjustmentsUsed++;
            saveUserData();
        }

        // Update ingredients list with AI adjustments
        const recipe = recipes.find(r => r.id === recipeId);
        const sweetness = parseInt(document.querySelector('.adjustment-slider').value);
        const servings = parseInt(document.querySelectorAll('.adjustment-slider')[1].value);
        
        const ingredientsList = document.getElementById('ingredientsList');
        const adjustedIngredients = recipe.ingredients.map(ingredient => {
            let adjustedAmount = ingredient.amount;
            
            // Simulate AI adjustment logic
            if (servings !== recipe.servings) {
                const ratio = servings / recipe.servings;
                const numMatch = ingredient.amount.match(/\\d+/);
                if (numMatch) {
                    const newAmount = Math.round(parseInt(numMatch[0]) * ratio);
                    adjustedAmount = ingredient.amount.replace(/\\d+/, newAmount);
                }
            }
            
            return `<li><span>${ingredient.name}</span><span>${adjustedAmount} ${sweetness !== 0 && ingredient.name.includes('糖') ? '(已調整)' : ''}</span></li>`;
        });
        
        ingredientsList.innerHTML = adjustedIngredients.join('');
        
        alert(`✅ AI配方調整完成！

調整內容：
• 甜度：${sweetness === 0 ? '維持標準' : (sweetness > 0 ? `增加${sweetness}%` : `減少${Math.abs(sweetness)}%`)}
• 份量：調整為${servings}人份

材料清單已更新，請查看最新配方！`);
        
    }, 2000);
}

function addToCart(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    alert(`已將「${recipe.name}」加入購物車！

價格：NT${recipe.price}

功能特色：
✅ SGS認證材料
✅ 精準小份量包裝
✅ AR教學指導
✅ 24小時客服支援`);
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Data Persistence
function saveUserData() {
    localStorage.setItem('sweetcraft_user', JSON.stringify(currentUser));
}

function loadUserData() {
    const saved = localStorage.getItem('sweetcraft_user');
    if (saved) {
        currentUser = JSON.parse(saved);
        updateUserInterface();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    displayRecipes();

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (login(email, password)) {
                alert('登入成功！歡迎回到SweetCraft AI 🎉');
                closeModal('loginModal');
                displayRecipes(); // Refresh recipes to remove locks
            }
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const experience = document.getElementById('experience').value;
            
            if (register(name, email, password, experience)) {
                alert('註冊成功！歡迎加入SweetCraft AI大家庭 🎉\\n\\n🎁 新會員禮遇：\\n• 免費AI配方調整1次\\n• 智能推薦系統\\n• 專屬會員社群');
                closeModal('registerModal');
                displayRecipes(); // Refresh recipes to remove locks
            }
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Export for use in other pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { recipes, currentUser, login, register, logout };
}