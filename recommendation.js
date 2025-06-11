// Recommendation System Variables
let selectedFilters = {
    sweetness: [],
    difficulty: [],
    category: [],
    texture: [],
    alcohol: [],
    allergens: []
};

let recommendationResults = [];

// Initialize Recommendation System
document.addEventListener('DOMContentLoaded', function() {
    initializeRecommendationSystem();
    loadUserData();
    updateUserInterface();
});

function initializeRecommendationSystem() {
    // Add click listeners to all filter tags
    document.querySelectorAll('.option-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            toggleFilter(this);
        });
    });

    // Initialize forms
    initializeForms();
}

function toggleFilter(element) {
    const filterType = element.dataset.filter;
    const filterValue = element.dataset.value;
    
    // Handle single-select vs multi-select
    if (filterType === 'sweetness' || filterType === 'difficulty' || filterType === 'alcohol') {
        // Single select - clear others in same category
        document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(tag => {
            tag.classList.remove('selected');
        });
        selectedFilters[filterType] = [];
    }
    
    // Toggle selection
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        selectedFilters[filterType] = selectedFilters[filterType].filter(v => v !== filterValue);
    } else {
        element.classList.add('selected');
        if (filterType === 'allergens') {
            // For allergens, we store what to avoid
            if (!selectedFilters[filterType].includes(filterValue)) {
                selectedFilters[filterType].push(filterValue);
            }
        } else {
            if (filterType === 'sweetness' || filterType === 'difficulty' || filterType === 'alcohol') {
                selectedFilters[filterType] = [filterValue];
            } else {
                if (!selectedFilters[filterType].includes(filterValue)) {
                    selectedFilters[filterType].push(filterValue);
                }
            }
        }
    }
    
    updateFilterSummary();
    
    // Show generate button if any filters selected
    const hasFilters = Object.values(selectedFilters).some(arr => arr.length > 0);
    const generateBtn = document.getElementById('generateBtn');
    if (hasFilters) {
        generateBtn.style.display = 'block';
        generateBtn.textContent = '🎯 開始AI智能推薦';
    }
}

function updateFilterSummary() {
    const summaryContainer = document.getElementById('filterSummary');
    const selectedFiltersContainer = document.getElementById('selectedFilters');
    
    let allSelectedFilters = [];
    
    Object.entries(selectedFilters).forEach(([category, values]) => {
        values.forEach(value => {
            let displayText = value;
            let categoryIcon = '';
            
            switch(category) {
                case 'sweetness': categoryIcon = '🍯'; break;
                case 'difficulty': categoryIcon = '⭐'; break;
                case 'category': categoryIcon = '🧁'; break;
                case 'texture': categoryIcon = '😋'; break;
                case 'alcohol': categoryIcon = '🍷'; displayText = value === 'true' ? '含酒精OK' : '無酒精'; break;
                case 'allergens': categoryIcon = '⚠️'; displayText = `避免${value}`; break;
            }
            
            allSelectedFilters.push({
                category,
                value,
                display: `${categoryIcon} ${displayText}`
            });
        });
    });
    
    if (allSelectedFilters.length > 0) {
        summaryContainer.style.display = 'block';
        selectedFiltersContainer.innerHTML = allSelectedFilters.map(filter => 
            `<div class="selected-filter">
                ${filter.display}
                <span class="remove-filter" onclick="removeFilter('${filter.category}', '${filter.value}')">&times;</span>
            </div>`
        ).join('');
    } else {
        summaryContainer.style.display = 'none';
    }
}

function removeFilter(category, value) {
    selectedFilters[category] = selectedFilters[category].filter(v => v !== value);
    
    // Update UI
    document.querySelectorAll(`[data-filter="${category}"][data-value="${value}"]`).forEach(tag => {
        tag.classList.remove('selected');
    });
    
    updateFilterSummary();
}

function resetFilters() {
    selectedFilters = {
        sweetness: [],
        difficulty: [],
        category: [],
        texture: [],
        alcohol: [],
        allergens: []
    };
    
    document.querySelectorAll('.option-tag').forEach(tag => {
        tag.classList.remove('selected');
    });
    
    updateFilterSummary();
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('aiStatus').innerHTML = `
        <h3>🎯 設定你的偏好，開始智能推薦</h3>
        <p>選擇你喜歡的甜度、口感、類型等條件，AI會為你推薦最適合的食譜</p>
    `;
}

function generateRecommendations() {
    const generateBtn = document.getElementById('generateBtn');
    const aiStatus = document.getElementById('aiStatus');
    const resultsSection = document.getElementById('resultsSection');
    
    // Show processing state
    generateBtn.disabled = true;
    generateBtn.textContent = '🤖 AI分析中...';
    
    aiStatus.classList.add('processing');
    aiStatus.innerHTML = `
        <h3>🤖 AI正在分析你的偏好</h3>
        <p>根據你的條件搜尋最適合的食譜...</p>
        <div class="progress-bar">
            <div class="progress-fill" id="progressFill"></div>
        </div>
    `;
    
    // Simulate AI processing with progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        document.getElementById('progressFill').style.width = progress + '%';
    }, 200);
    
    // Process recommendations after delay
    setTimeout(() => {
        const results = processRecommendations();
        displayResults(results);
        
        // Reset UI
        generateBtn.disabled = false;
        generateBtn.textContent = '🔄 重新推薦';
        aiStatus.classList.remove('processing');
        aiStatus.innerHTML = `
            <h3>✅ AI推薦完成！</h3>
            <p>找到 ${results.length} 個符合你偏好的食譜</p>
        `;
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
    }, 2500);
}

function processRecommendations() {
    let filteredRecipes = [...recipes];
    
    // Apply filters
    Object.entries(selectedFilters).forEach(([filterType, values]) => {
        if (values.length === 0) return;
        
        filteredRecipes = filteredRecipes.filter(recipe => {
            switch(filterType) {
                case 'sweetness':
                    return values.includes(recipe.sweetness);
                    
                case 'difficulty':
                    return values.includes(recipe.difficulty);
                    
                case 'category':
                    return values.includes(recipe.category);
                    
                case 'texture':
                    return values.includes(recipe.texture);
                    
                case 'alcohol':
                    const wantsAlcohol = values.includes('true');
                    const noAlcohol = values.includes('false');
                    if (wantsAlcohol && !noAlcohol) {
                        return recipe.alcohol === true;
                    } else if (noAlcohol && !wantsAlcohol) {
                        return recipe.alcohol === false;
                    }
                    return true;
                    
                case 'allergens':
                    // Exclude recipes that contain selected allergens
                    return !values.some(allergen => recipe.allergens.includes(allergen));
                    
                default:
                    return true;
            }
        });
    });
    
    // AI-style scoring and sorting
    filteredRecipes = filteredRecipes.map(recipe => {
        let score = 0;
        
        // Bonus points for exact matches
        if (selectedFilters.difficulty.length > 0 && selectedFilters.difficulty.includes(recipe.difficulty)) {
            score += 10;
        }
        
        if (selectedFilters.sweetness.length > 0 && selectedFilters.sweetness.includes(recipe.sweetness)) {
            score += 8;
        }
        
        if (selectedFilters.texture.length > 0 && selectedFilters.texture.includes(recipe.texture)) {
            score += 6;
        }
        
        // Popularity bonus (simulate based on ID - lower ID = more popular)
        score += (20 - recipe.id) / 2;
        
        // Random factor for diversity
        score += Math.random() * 5;
        
        return { ...recipe, aiScore: score };
    });
    
    // Sort by AI score
    filteredRecipes.sort((a, b) => b.aiScore - a.aiScore);
    
    recommendationResults = filteredRecipes;
    return filteredRecipes;
}

function displayResults(results) {
    const resultsContainer = document.getElementById('recommendationResults');
    const noResultsContainer = document.getElementById('noResults');
    const totalResults = document.getElementById('totalResults');
    const avgTime = document.getElementById('avgTime');
    const avgPrice = document.getElementById('avgPrice');
    
    if (results.length === 0) {
        resultsContainer.style.display = 'none';
        noResultsContainer.style.display = 'block';
        totalResults.textContent = '0';
        avgTime.textContent = '0';
        avgPrice.textContent = '0';
        return;
    }
    
    noResultsContainer.style.display = 'none';
    resultsContainer.style.display = 'grid';
    
    // Update stats
    totalResults.textContent = results.length;
    avgTime.textContent = Math.round(results.reduce((sum, r) => sum + r.time, 0) / results.length);
    avgPrice.textContent = Math.round(results.reduce((sum, r) => sum + r.price, 0) / results.length);
    
    // 圖片路徑映射
    const imageMap = {
        1: "巧克力餅乾.jpg",
        2: "檸檬司康.jpg", 
        3: "草莓慕斯杯.jpg",
        4: "抹茶瑪德蓮.jpg",
        5: "焦糖布丁.jpg",
        6: "香草費南雪.jpg"
    };
    
    // Display recipes
    resultsContainer.innerHTML = results.map((recipe, index) => {
        const isLocked = !currentUser.isLoggedIn;
        const aiMatchBadge = index < 3 ? `<div class="ai-match">🎯 AI推薦 #${index + 1}</div>` : '';
        
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
                    ${aiMatchBadge}
                </div>
                <div class="recipe-content">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>⏱️ ${recipe.time}分鐘</span>
                        <span>👥 ${recipe.servings}人份</span>
                        <span>🎯 ${Math.round(recipe.aiScore)}分</span>
                    </div>
                    <div class="recipe-tags">
                        <span class="recipe-tag">${recipe.category}</span>
                        <span class="recipe-tag">${recipe.sweetness}</span>
                        <span class="recipe-tag">${recipe.texture}</span>
                        ${recipe.alcohol ? '<span class="recipe-tag">含酒精</span>' : ''}
                    </div>
                    <div class="recipe-price">NT${recipe.price}</div>
                    ${isLocked ? '<div class="login-required">🔒 登入查看完整食譜</div>' : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Enhanced recipe detail function for recommendation page
function showRecipeDetail(recipeId) {
    if (!currentUser.isLoggedIn) {
        alert(`請先登入查看完整食譜內容

🎁 登入即享：
• 查看詳細食譜
• 1次免費AI配方調整
• 智能推薦系統
• 會員專屬優惠`);
        openModal('loginModal');
        return;
    }

    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const recipeContent = document.getElementById('recipeContent');
    const canAdjust = currentUser.plan === 'plus' || currentUser.plan === 'pro' || 
                     (currentUser.plan === 'free' && currentUser.aiAdjustmentsUsed < 1);

    // Check if this recipe was in recommendations
    const recipeInResults = recommendationResults.find(r => r.id === recipeId);
    const aiScore = recipeInResults ? Math.round(recipeInResults.aiScore) : null;

    recipeContent.innerHTML = `
        <div class="recipe-detail">
            <div class="recipe-detail-image">
                ${recipe.icon}
                ${aiScore ? `<div style="position: absolute; top: 10px; left: 10px; background: #ff6b6b; color: white; padding: 0.5rem 1rem; border-radius: 15px; font-size: 0.9rem;">🎯 AI匹配度: ${aiScore}分</div>` : ''}
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
                    <span class="recipe-tag">${recipe.category}</span>
                    <span class="recipe-tag">${recipe.sweetness}</span>
                    <span class="recipe-tag">${recipe.texture}</span>
                    ${recipe.alcohol ? '<span class="recipe-tag alcohol">含酒精</span>' : '<span class="recipe-tag">無酒精</span>'}
                    ${recipe.allergens.map(allergen => 
                        `<span class="recipe-tag allergen">⚠️ ${allergen}</span>`
                    ).join('')}
                </div>
                <div class="recipe-price">材料包價格：NT$${recipe.price}</div>
            </div>
        </div>

        ${aiScore ? `
        <div style="background: linear-gradient(145deg, #e8f5e8, #f0fff0); padding: 1.5rem; border-radius: 15px; margin: 2rem 0; border-left: 4px solid #28a745;">
            <h4 style="color: #155724; margin-bottom: 1rem;">🎯 AI推薦理由</h4>
            <p style="color: #155724;">根據你選擇的偏好條件，這個食譜在甜度、難度、口感等方面都很符合你的需求，AI匹配度高達 ${aiScore} 分！</p>
        </div>
        ` : ''}

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
                <div class="adjustment-item">
                    <label>難度調整</label>
                    <select onchange="updateAdjustment('difficulty', this.value)" style="width: 100%; padding: 0.5rem; border-radius: 8px; border: 1px solid #ddd;">
                        <option value="maintain">維持原本</option>
                        <option value="simplify">簡化版本</option>
                        <option value="enhance">進階版本</option>
                    </select>
                </div>
            </div>
            <button class="cta-button" onclick="applyAIAdjustment(${recipe.id})">
                🎯 套用AI調整 ${currentUser.plan === 'free' ? `(剩餘${1-currentUser.aiAdjustmentsUsed}次)` : '(無限制)'}
            </button>
            ${currentUser.plan === 'free' && currentUser.aiAdjustmentsUsed >= 1 ? 
                '<div class="usage-limit">⚠️ 免費會員每月只能使用1次AI調整。<a href="#pricing" onclick="closeModal(\'recipeModal\')">升級Plus</a>享無限次調整！</div>' : ''
            }
        </div>
        ` : `
        <div class="usage-limit">
            ${!currentUser.isLoggedIn ? 
                '🔒 AI配方調整功能需要登入會員使用' : 
                `✨ AI配方調整功能 - 免費會員每月可使用1次，已使用 ${currentUser.aiAdjustmentsUsed}/1 次`
            }
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

        <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #f0f0f0;">
            <div style="margin-bottom: 1rem;">
                <button class="cta-button" onclick="addToCart(${recipe.id})">
                    🛒 加入購物車 - NT$${recipe.price}
                </button>
                <button class="cta-button secondary" onclick="shareRecipe(${recipe.id})" style="margin-left: 1rem;">
                    📤 分享食譜
                </button>
            </div>
            <p style="color: #666; font-size: 0.9rem;">
                💡 想要更多類似的推薦？<a href="#" onclick="closeModal('recipeModal'); generateSimilarRecommendations(${recipe.id})">找尋相似食譜</a>
            </p>
        </div>
    `;

    openModal('recipeModal');
}

function shareRecipe(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    const shareText = `我在SweetCraft AI發現了「${recipe.name}」，${recipe.description}！

快來試試這個${recipe.difficulty}難度的甜點，只要${recipe.time}分鐘就能完成 ${recipe.icon}

#SweetCraftAI #烘焙 #甜點DIY`;
    
    if (navigator.share) {
        navigator.share({
            title: `${recipe.name} - SweetCraft AI`,
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert(`食譜分享內容已複製到剪貼簿！
快分享給朋友一起來做甜點吧 🎉`);
        });
    }
}

function generateSimilarRecommendations(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    
    // Reset and set filters based on current recipe
    resetFilters();
    
    // Auto-select filters based on the recipe
    selectedFilters.category = [recipe.category];
    selectedFilters.difficulty = [recipe.difficulty];
    selectedFilters.sweetness = [recipe.sweetness];
    
    // Update UI to reflect new filters
    document.querySelectorAll('.option-tag').forEach(tag => {
        const filterType = tag.dataset.filter;
        const filterValue = tag.dataset.value;
        
        if (selectedFilters[filterType] && selectedFilters[filterType].includes(filterValue)) {
            tag.classList.add('selected');
        }
    });
    
    updateFilterSummary();
    
    // Scroll to filters
    document.querySelector('.filter-section').scrollIntoView({ behavior: 'smooth' });
    
    // Auto-generate recommendations
    setTimeout(() => {
        generateRecommendations();
    }, 1000);
}

function initializeForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (login(email, password)) {
                alert(`登入成功！歡迎回到SweetCraft AI 🎉

現在可以查看完整食譜和使用AI配方調整功能了！`);
                closeModal('loginModal');
                
                // Refresh results if they exist
                if (recommendationResults.length > 0) {
                    displayResults(recommendationResults);
                }
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
                alert(`註冊成功！歡迎加入SweetCraft AI大家庭 🎉

🎁 新會員禮遇：
• 免費AI配方調整1次
• 智能推薦系統
• 專屬會員社群
• 新會員專享優惠`);
                closeModal('registerModal');
                
                // Auto-set some preferences based on experience
                if (experience === 'beginner') {
                    autoSelectFilters(['簡單'], 'difficulty');
                } else if (experience === 'advanced') {
                    autoSelectFilters(['困難'], 'difficulty');
                }
                
                // Refresh results if they exist
                if (recommendationResults.length > 0) {
                    displayResults(recommendationResults);
                }
            }
        });
    }
}

function autoSelectFilters(values, filterType) {
    values.forEach(value => {
        const tag = document.querySelector(`[data-filter="${filterType}"][data-value="${value}"]`);
        if (tag && !tag.classList.contains('selected')) {
            tag.click();
        }
    });
}

// Add some CSS for AI match badges
const style = document.createElement('style');
style.textContent = `
    .ai-match {
        position: absolute;
        top: 10px;
        left: 10px;
        background: linear-gradient(45deg, #8b4513, #a0845c);
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(139, 69, 19, 0.3);
    }
    
    .recipe-card .recipe-meta span:last-child {
        color: #8b4513;
        font-weight: 600;
    }
    
    .cta-button.secondary {
        background: transparent;
        border: 2px solid #8b4513;
        color: #8b4513;
    }
    
    .cta-button.secondary:hover {
        background: #8b4513;
        color: white;
    }
`;
document.head.appendChild(style);