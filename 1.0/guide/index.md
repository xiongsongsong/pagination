* author 首作

## 简介
这是一个简单的分页组件，使用者可以方便地自定义页码的展现形式和展现数量，可以监听页码的切换函数

## 快速使用

    S.use('gallery/pagination/1.0/index', function (S, Pagination) {
    	
		// 初始化组件实例
		var pagination = new Pagination('pagination-wrap', {
			currentPage: 1,    // 默认选中的页码
			totalPage: 12      // 总页数
		});

		// 监听页码切换
		pagination.on('switch', function(e) {
			// 打印切换至的页码
			console.log(e.toPage);	
		});
    });

## 配置参数

