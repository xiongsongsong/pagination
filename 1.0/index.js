/**
 * @fileoverview 分页组件，可以定制分页展示的数量 
 * @author aloysious.ld@taobao.com
 * @version 1.0
 *
 */
KISSY.add('gallery/pagination/1.0/index', function(S, Base, EVENT, NODE, DOM){

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
			this.init();
		
		} else {
			return new Pagination(selector, cfg);
		}
	}

	Pagination.ATTRS = {
		// 总页数
		totalPage: {
			value: 10    // 必须大于0
		},
		// 默认选中的页数
		currentPage: {
			value: 1     // 必须大于0,且小于等于totalPage
		},
		// 当前页的最大紧邻前置页数（不包括最前面的显示页数）
		preposePagesCount: {
			value: 2
		},
		// 当前页的最大紧邻后置页数
		postposePagesCount: {
			value: 2
		},
		// 第一个"..."前显示的页数
		firstPagesCount: {
			value: 2
		},
		// 第二个"..."后显示的页数
		lastPagesCount: {
			value: 1
		},
		render: {
			value: true
		}
	};

	S.extend(Pagination, S.Base, {
		init: function() {
			if (this.get('render')) {
				this.render();
			}
		},
		render: function() {
			this.renderUI();
			this.bindUI();
			this.syncUI();
		},
		renderUI: function() {
			this._resetPagination();	
		},
		bindUI: function() {
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
		/**
		 * @brief 刷新分页组件
		 */
		_resetPagination: function() {
			var paginationInner = '',
				currPage = this.get('currentPage'),
				totalPage = this.get('totalPage'),
				preposePagesCount = this.get('preposePagesCount'),
				postposePagesCount = this.get('postposePagesCount'),
				firstPagesCount = this.get('firstPagesCount'),
				lastPagesCount = this.get('lastPagesCount'),
				offset;

			// currPage前的页码展示
			paginationInner += currPage === 1 ? '<span>上一页</span>' : '<a class="pagination-prev">上一页</a>';

			if (currPage <= firstPagesCount + preposePagesCount + 1) {
				for(var i=1; i<currPage; i++) {
					paginationInner += this._renderActivePage(i);
				}

			} else {
				for(var i=1; i<=firstPagesCount; i++) {
					paginationInner += this._renderActivePage(i);
				}
				paginationInner += '<span>...</span>';
				for(var i=currPage-preposePagesCount; i<=currPage-1; i++) {
					paginationInner += this._renderActivePage(i);
				}
			}

			// currPage的页码展示
			paginationInner += '<span class="pagination-curr">' + currPage + '</span>';

			// currPage后的页码展示
			if (currPage >= totalPage - lastPagesCount - postposePagesCount) {
				offset = currPage + 1;
				for(var i=currPage+1; i<=totalPage; i++) {
					paginationInner += this._renderActivePage(i);
				}

			} else {
				for(var i=currPage+1; i<=currPage+postposePagesCount; i++) {
					paginationInner += this._renderActivePage(i);
				}
				paginationInner += '<span>...</span>';
				for(var i=totalPage-lastPagesCount+1; i<=totalPage; i++) {
					paginationInner += this._renderActivePage(i);
				}
			}

			paginationInner += currPage === totalPage ? '<span>下一页</span>' : '<a class="pagination-next">下一页</a>';

			DOM.html(this.con, paginationInner);

		},
	  	/**
	   	 * @brief 渲染可点击的页码
	     * @param index {Number} 页码索引
	     *
	     */
		_renderActivePage: function(index) {
			return '<a class="pagination-spec" data-page="' + index + '">' + index + '</a>';	
		},
		_switchToPage: function(page) {
			this.set('currentPage', page);
			this._resetPagination();
			this.fire('switch', {
				toPage: this.get('currentPage')
			});
		},
		syncUI: function() {}
	});

	return Pagination;

},{
	requires:['base', 'event', 'node', 'dom']
});
