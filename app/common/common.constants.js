(function () {
    'use strict';

    angular
        .module('Common')
        .factory('constants', constants);

    function constants () {
        var apiURLs = {
            dashboard: 'http://localhost:3020/news/',

            news: '/api/news.json?p=',
            newsItem: 'http://localhost:3020/news_list/',
            postNews: '/api/news.json',

            users: '/api/users.json',
            user: '/api/users/',
            usersChange: '/api/users/switch.json',

            categories: '/api/categories.json',
            categoriesItem: '/api/categories/',

            fileUpload: '/api/upload/file/',
            fileList: '/ckfinder/list',

            events: 'http://localhost:3020/events/',
            eventsPage: '/api/events/?p=',
            eventsCity: '/api/events/?city=',

            video: '/api/video/',
            videoPage: '/api/video/?p=',
            videoType: '/api/video/?type=',
            postVideo: '/api/video',

            playlists: '/api/playlist/?p=',
            playlist: '/api/playlist/',
            postPlaylist: '/api/playlist',

            bands: '/api/bands.json',
            band: '/api/bands/',

            clubs: '/api/clubs.json',
            club: '/api/clubs/'
        };

        var paths = {
            news: '#!/news/',
            events: '#!/events/',
            video: '#!/video/',
            audio: '#!/audio/',
            categories: '#!/categories/',
            bands: '#!/bands/',
            clubs: '#!/clubs/'
        };

        var constants = {
            apiURLs: apiURLs,
            paths: paths
        };

        return constants;
    }
})();
