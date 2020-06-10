
(function () {

    function Page(options, wrap) {
        this.wrap = wrap || $('body');
        this.nowPage = options.nowPage || 1;
        this.allPage = options.allPage || 1;
        // 当切换页码的时候触发的回调函数  该回调函数用于将切换后的页码暴露出去
        this.changePage = options.changePage || function() {};
    }
    Page.prototype.init = function () {
        this.fillHTML()
        this.bindEvent()
    }

    Page.prototype.fillHTML = function () {
        var pageWrapper = $('<ul class="page-wrapper"></ul>');
        if (this.nowPage > 1) {
            $('<li class="prev">上一页</li>').appendTo(pageWrapper)
        }
        $('<li class="num">1</li>').appendTo(pageWrapper).addClass(this.nowPage == 1 ? 'active' : '');
        if (this.nowPage - 2 > 2) {
            $('<span>...</span>').appendTo(pageWrapper)
        }
        for (var i = this.nowPage - 2; i <= this.nowPage + 2; i++) {
            if (i > 1 && i < this.allPage) {
                $('<li class="num"></li>').text(i).appendTo(pageWrapper).addClass(this.nowPage == i ? 'active' : '');
            }
        }
        if (this.nowPage + 2 < this.allPage - 1) {
            $('<span>...</span>').appendTo(pageWrapper)
        }
        if (this.allPage > 1) {
            $('<li class="num"></li>').text(this.allPage).appendTo(pageWrapper).addClass(this.nowPage == this.allPage ? 'active' : '');
        }
        if (this.nowPage < this.allPage) {
            $('<li class="next">下一页</li>').appendTo(pageWrapper)
        }
        $(this.wrap).empty().append(pageWrapper)
    }

    Page.prototype.bindEvent = function () {
        var self = this;
        // $(this.wrap).on('click', '.prev', function () {
        //     self.nowPage --;
        //     self.fillHTML();
        //     self.changePage(self.nowPage)
        // }).on('click', '.next', function () {
        //     self.nowPage ++;
        //     self.fillHTML();
        //     self.changePage(self.nowPage)
        // }).on('click', '.num', function () {
        //     self.nowPage = parseInt($(this).text());
        //     self.fillHTML();
        //     self.changePage(self.nowPage);
        // })

        $('.prev', this.wrap).click(function () {
            self.nowPage --;
            self.init();
            self.changePage(self.nowPage)
        });
        $('.next', this.wrap).click(function () {
            self.nowPage ++;
            self.init();
            self.changePage(self.nowPage)
        });
        $('.num', this.wrap).click(function () {
            self.nowPage = parseInt($(this).text());
            self.init();
            self.changePage(self.nowPage);
        })
    }


    // prototype
    $.fn.extend({
        page: function (options) {
            var page = new Page(options, this);
            page.init()
        }
    })
} ())