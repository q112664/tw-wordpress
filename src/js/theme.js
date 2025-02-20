document.addEventListener('DOMContentLoaded', () => {
    const THEME = {
        DARK: 'dark',
        LIGHT: 'light',
        STORAGE_KEY: 'theme'
    };

    const html = document.documentElement;

    // 从localStorage获取主题
    function getStoredTheme() {
        try {
            return localStorage.getItem(THEME.STORAGE_KEY);
        } catch {
            return null;
        }
    }

    // 应用主题
    function applyTheme(theme) {
        try {
            if (theme === THEME.DARK) {
                html.classList.add(THEME.DARK);
            } else {
                html.classList.remove(THEME.DARK);
            }
            localStorage.setItem(THEME.STORAGE_KEY, theme);
        } catch (error) {
            console.error('应用主题时发生错误:', error);
        }
    }

    // 切换主题
    window.toggleTheme = () => {
        const isDark = html.classList.contains(THEME.DARK);
        applyTheme(isDark ? THEME.LIGHT : THEME.DARK);
    };

    // 初始化主题
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        applyTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme(THEME.DARK);
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!getStoredTheme()) {
            applyTheme(e.matches ? THEME.DARK : THEME.LIGHT);
        }
    });
}); 