document.addEventListener('DOMContentLoaded', () => {
    const listViewButton = document.querySelector('button[data-view="list"]');
    const gridViewButton = document.querySelector('button[data-view="grid"]');
    const listView = document.querySelector('.list-view');
    const gridView = document.querySelector('.grid-view');

    // 从localStorage获取上次使用的布局
    const currentView = localStorage.getItem('preferred-view') || 'grid';
    
    // 设置初始布局
    setView(currentView);

    // 切换到列表视图
    listViewButton?.addEventListener('click', () => {
        setView('list');
    });

    // 切换到网格视图
    gridViewButton?.addEventListener('click', () => {
        setView('grid');
    });

    // 设置视图
    function setView(view) {
        if (!listView || !gridView || !listViewButton || !gridViewButton) return;

        // 保存偏好
        localStorage.setItem('preferred-view', view);

        if (view === 'list') {
            // 显示列表视图
            listView.classList.remove('hidden');
            listView.classList.add('space-y-4');
            gridView.classList.add('hidden');
            
            // 更新按钮状态
            listViewButton.classList.add('text-indigo-600', 'dark:text-indigo-400');
            listViewButton.classList.remove('text-gray-400');
            gridViewButton.classList.remove('text-indigo-600', 'dark:text-indigo-400');
            gridViewButton.classList.add('text-gray-400');
        } else {
            // 显示网格视图
            gridView.classList.remove('hidden');
            listView.classList.remove('space-y-4');
            listView.classList.add('hidden');
            
            // 更新按钮状态
            gridViewButton.classList.add('text-indigo-600', 'dark:text-indigo-400');
            gridViewButton.classList.remove('text-gray-400');
            listViewButton.classList.remove('text-indigo-600', 'dark:text-indigo-400');
            listViewButton.classList.add('text-gray-400');
        }
    }
}); 