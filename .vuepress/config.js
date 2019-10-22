module.exports = {
    title: 'Makerspace Journal',
    theme: '@vuepress/theme-default',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
            { text: 'External', link: 'https://google.com' }
        ],
        sidebar: [
            '/',
            '/page-a',
            ['/page-b', 'Explicit link text']
        ],
        displayAllHeaders: true
    }
}
