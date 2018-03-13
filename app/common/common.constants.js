(function () {
    'use strict';

    angular
        .module('Common')
        .factory('constants', constants);

    function constants () {
        var apiURLs = {
            dashboard: 'http://localhost:3020/dashboard/',

            news: 'http://localhost:3020/news_list/',
            newsItem: 'http://localhost:3020/news/',
            postNews: 'http://localhost:3020/news/',

            users: 'http://localhost:3020/users/',
            user: '/api/users/',
            usersChange: '/api/users/switch.json',

            categories: 'http://localhost:3020/categories',
            categoriesItem: '/api/categories/',

            fileUpload: '/api/upload/file/',
            fileList: '/ckfinder/list',

            events: 'http://localhost:3020/eventgroup/',
            eventsPage: 'http://localhost:3020/eventgroup?events?p=',
            eventsCity: 'http://localhost:3020/eventgroup',

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
