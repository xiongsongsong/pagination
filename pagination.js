KISSY.add('gallery/pagination', function(S, Base, EVENT, NODE, DOM){

	"use strict";

	function Pagination(selector, cfg) {
		if (this instanceof Pagination) {
			
			if(S.isObject(selector)){
				this.con = selector;
			}else if(/^#/i.test(selector)){
				this.con = S.one(selector);
			}else if(S.one("#"+selector)){
				this.con = S.one("#"+selector);
			}else if(S.one(selector)){
				this.con = S.one(selector);
			}else {
				throw new Error('Pagination Container Hooker not found');
			}

			Pagination.superclass.constructor.call(this, cfg);
			
			if (this.get('totalPage') <= 0 || this.get('currentPage') <= 0) {
				throw new Error('Page must be larger than 0');
			}

			if (this.get('currentPage') > this.get('totalPage')) {
				throw new Error('CurrentPage cannot be larger than totalPage');
			}

			this.init();
		
		} else {
			return new Pagination(selector, cfg);
		}
	}

	Pagination.ATTRS = {
		totalPage: {
			value: 10    // 必须大于0
		},
		currentPage: {
			value: 1     // 必须大于0,且小于等于totalPage
		}
	};

	S.extend(Pagination, S.Base);

	S.augment(Pagination, S.Event.Target, {
		init: function() {
			this.render();
		},
		render: function() {
			this._renderUI();
			this._bindUI();
			this._syncUI();
		},
		_renderUI: function() {
			this._resetPagination();	
		},
		_resetPagination: function() {
			var paginationInner = '',
				currPage = this.get('currentPage'),
				totalPage = this.get('totalPage');

			if (currPage === 1) {
				paginationInner += '<span>上一页</span>';
			} else {
				paginationInner += '<a class="pagination-prev">上一页</a>';
			}

			// currPage前的页码展示
			if (currPage <= 5) {
				var offset = 1;
				while (offset < currPage) {
					paginationInner += '<a class="pagination-spec" data-page="' + offset + '">' + offset + '</a>';
					offset++;
				}
			} else {
				paginationInner += '<a class="pagination-spec" data-page="1">1</a>';
				paginationInner += '<a class="pagination-spec" data-page="2">2</a>';
				paginationInner += '<span>...</span>';
				paginationInner += '<a class="pagination-spec" data-page="' + (currPage - 2) + '">' + (currPage - 2) + '</a>';
				paginationInner += '<a class="pagination-spec" data-page="' + (currPage - 1) + '">' + (currPage - 1) + '</a>';
			}

			// currPage的页码展示
			paginationInner += '<span class="pagination-curr">' + currPage + '</span>';

			// currPage后的页码展示
			if (currPage !== totalPage) {
				paginationInner += '<a class="pagination-spec" data-page="' + (currPage + 1) + '">' + (currPage + 1) + '</a>';
				paginationInner += '<span>...</span>';
				paginationInner += '<a class="pagination-next">下一页</a>';
			} else {
				paginationInner += '<span>下一页</span>';
			}

			DOM.html(this.con, paginationInner);

		},
		_bindUI: function() {
			var self = this;
			
			EVENT.delegate(self.con, 'click', '.pagination-spec', function(e) {
				var currTarget = e.currentTarget,
					toPage = parseInt(DOM.attr(currTarget, 'data-page'));
				self._switchToPage(toPage);
			});
			EVENT.delegate(self.con, 'click', '.pagination-prev', function(e) {
				var toPage = self.get('currentPage') - 1;
				self._switchToPage(toPage);
			});
			EVENT.delegate(self.con, 'click', '.pagination-next', function(e) {
				var toPage = self.get('currentPage') + 1;
				self._switchToPage(toPage);
			});
		},
		_switchToPage: function(page) {
			this.set('currentPage', page);
			this._resetPagination();
			this.fire('switch', {
				toPage: this.get('currentPage')
			});
		},
		_syncUI: function() {}
	});

	return Pagination;

},{
	requires:['base', 'event', 'node', 'dom']
});
