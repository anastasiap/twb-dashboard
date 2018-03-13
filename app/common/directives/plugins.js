(function () {
    'use strict';

    angular
        .module('mcDirectives')
        .directive('ckEditor', function () {
            return {
                require: '?ngModel',
                restrict: 'C',
                link: function (scope, elm, attr, model) {
                    var isReady = false;
                    var data = [];
                    var ck = CKEDITOR.replace(elm[0], {
                        extraPlugins: 'uploadimage,image2,embed,autoembed',
                        height: 200,
                        // Upload images to a CKFinder connector (note that the response type is set to JSON).
                        uploadUrl: '/ckfinder/list',//core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',

                        // Configure your file manager integration. This example uses CKFinder 3 for PHP.
                        filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
                        filebrowserImageBrowseUrl: '/ckfinder/ckfinder.html?type=Images',
                        filebrowserUploadUrl: '/ckfinder/list',
                        filebrowserImageUploadUrl: '/api/upload/ckeditor',

                        // The following options are not necessary and are used here for presentation purposes only.
                        // They configure the Styles drop-down list and widgets to use classes.

                        stylesSet: [
                            {
                                name: 'Narrow image',
                                type: 'widget',
                                widget: 'image',
                                attributes: {'class': 'image-narrow'}
                            },
                            {name: 'Wide image', type: 'widget', widget: 'image', attributes: {'class': 'image-wide'}}
                        ],
                        // Load the default contents.css file plus customizations for this sample.
                        contentsCss: [CKEDITOR.basePath + 'contents.css', 'http://sdk.ckeditor.com/samples/assets/css/widgetstyles.css'],

                        // Configure the Enhanced Image plugin to use classes instead of styles and to disable the
                        // resizer (because image size is controlled by widget styles or the image takes maximum
                        // 100% of the editor width).
                        image2_alignClasses: ['image-align-left', 'image-align-center', 'image-align-right'],
                        image2_disableResizer: true
                    });

                    function setData() {
                        if (!data.length) {
                            return;
                        }

                        var d = data.splice(0, 1);
                        ck.setData(d[0] || '<span></span>', function () {
                            setData();
                            isReady = true;
                        });
                    }

                    ck.on('instanceReady', function (e) {
                        if (model) {
                            setData();
                        }
                    });

                    elm.bind('$destroy', function () {
                        ck.destroy(false);
                    });

                    if (model) {
                        ck.on('change', function () {
                            scope.$apply(function () {
                                var data = ck.getData();
                                if (data == '<span></span>') {
                                    data = null;
                                }
                                model.$setViewValue(data);
                            });
                        });

                        model.$render = function (value) {
                            if (model.$viewValue === undefined) {
                                model.$setViewValue(null);
                                model.$viewValue = null;
                            }

                            data.push(model.$viewValue);

                            if (isReady) {
                                isReady = false;
                                setData();
                            }
                        };
                    }

                }
            };
        })
})();
