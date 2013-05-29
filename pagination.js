KISSY.add(function(S, Base, Event){

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
			
			if (this.get('totalPage') <= 0) {
				throw new Error('TotalPage must be larger than 0');
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
				
		},
		_bindUI: function() {},
		_syncUI: function() {}
	});

},{
	requires:['base', 'event']
});
