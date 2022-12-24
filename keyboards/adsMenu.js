const adsMenu = [
    [
        { text: '➕ Create New', callback_data: 'createNewAds' },
        { text: '🏬 Available Ads', callback_data: 'availableAds' },
    ],
    [ 
        {text: `⏪ Back`, callback_data: 'backToMainMenu'}
    ]
];

module.exports = { adsMenu };