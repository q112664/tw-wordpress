// 移动端菜单控制
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('overlay');

    // 检查必要元素是否存在
    if (!mobileMenuButton || !mobileMenu || !overlay) {
        console.error('移动端菜单所需的元素未找到');
        return;
    }

    // 移动端菜单切换
    function toggleMobileMenu() {
        try {
            mobileMenu.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        } catch (error) {
            console.error('切换移动端菜单时发生错误:', error);
        }
    }

    // 关闭移动端菜单
    function closeMobileMenu() {
        try {
            mobileMenu.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        } catch (error) {
            console.error('关闭移动端菜单时发生错误:', error);
        }
    }

    // 事件监听
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // 用户下拉菜单控制
    function handleUserDropdown(event) {
        try {
            const button = event.currentTarget;
            const dropdownMenu = button.nextElementSibling;
            
            if (!dropdownMenu) {
                console.error('下拉菜单元素未找到');
                return;
            }

            const allDropdowns = document.querySelectorAll('.dropdown-menu');
            
            // 关闭其他下拉菜单
            allDropdowns.forEach(menu => {
                if (menu !== dropdownMenu) {
                    menu.classList.add('hidden');
                }
            });

            // 切换当前下拉菜单
            dropdownMenu.classList.toggle('hidden');

            // 点击其他地方关闭下拉菜单
            function closeDropdown(e) {
                // 保存对按钮和下拉菜单的引用
                if (!button.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.add('hidden');
                    document.removeEventListener('click', closeDropdown);
                }
            }

            // 移除可能存在的旧事件监听器
            document.removeEventListener('click', closeDropdown);

            // 添加新的事件监听器
            requestAnimationFrame(() => {
                document.addEventListener('click', closeDropdown);
            });
        } catch (error) {
            console.error('处理用户下拉菜单时发生错误:', error);
        }
    }

    // 为所有用户下拉按钮添加事件监听
    const userDropdownButtons = document.querySelectorAll('.user-dropdown-button');
    userDropdownButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', handleUserDropdown);
        }
    });

    // ESC键关闭所有菜单
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            try {
                closeMobileMenu();
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu?.classList.add('hidden');
                });
            } catch (error) {
                console.error('ESC键关闭菜单时发生错误:', error);
            }
        }
    });
}); 