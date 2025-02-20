document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const searchButton = document.getElementById('search-button');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const searchModal = document.getElementById('search-modal');
    const searchInput = searchModal?.querySelector('input[type="search"]');
    const modalContent = searchModal?.querySelector('.bg-white');

    // 检查必要元素是否存在
    if (!searchButton || !searchModal || !searchInput || !modalContent) {
        console.error('搜索功能所需的元素未找到');
        return;
    }

    // 打开搜索模态框
    function openSearchModal() {
        try {
            searchModal.classList.remove('hidden');
            searchInput.focus();
            document.body.classList.add('overflow-hidden');
            // 如果移动端菜单是打开的，关闭它
            const mobileMenu = document.getElementById('mobile-menu');
            const overlay = document.getElementById('overlay');
            if (mobileMenu && overlay) {
                mobileMenu.classList.add('-translate-x-full');
                overlay.classList.add('hidden');
            }
        } catch (error) {
            console.error('打开搜索模态框时发生错误:', error);
        }
    }

    // 关闭搜索模态框
    function closeSearchModal() {
        try {
            searchModal.classList.add('hidden');
            searchInput.value = '';
            document.body.classList.remove('overflow-hidden');
        } catch (error) {
            console.error('关闭搜索模态框时发生错误:', error);
        }
    }

    // 执行搜索
    function performSearch(searchTerm) {
        if (!searchTerm.trim()) return;
        console.log('执行搜索:', searchTerm);
        // TODO: 实现实际的搜索逻辑
        closeSearchModal();
    }

    // 事件监听
    searchButton.addEventListener('click', openSearchModal);
    // 移动端搜索按钮
    if (mobileSearchButton) {
        mobileSearchButton.addEventListener('click', openSearchModal);
    }

    // 点击模态框背景关闭
    searchModal.addEventListener('click', (e) => {
        // 如果点击的是模态框本身或背景遮罩，而不是内容区域
        if (!modalContent.contains(e.target)) {
            closeSearchModal();
        }
    });

    // 搜索提交处理
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        } else if (e.key === 'Escape') {
            closeSearchModal();
        }
    });

    // 全局ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchModal.classList.contains('hidden')) {
            closeSearchModal();
        }
    });
}); 