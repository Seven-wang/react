var AllPages = React.createClass({displayName: "AllPages",
	getInitialState: function() {
        return {
            thisclass: 'tab-item start-sort'
        };
    },
	handleUserInput: function(thisclass) {
        this.setState({
            thisclass: thisclass
        });
    },
    render: function() {
        return (
    	    React.createElement("div", {className: "pages"}, 
		        React.createElement("div", {className: "page page-on-center"}, 
			        React.createElement(AllHeader, null), 
			        React.createElement(AllBar, {
			        	onUserInput: this.handleUserInput, 
                    	thisclass: this.state.thisclass}
			        ), 
			        React.createElement(PageContent, {
			        	huochelist: this.props.huochelist, 
                    	thisclass: this.state.thisclass}
			        )
				)
			)
        );
    }
});
//为每个 产品（ product ） 展示一列
var AllHeader = React.createClass({displayName: "AllHeader",
    render: function() {
        return (
            React.createElement("header", {className: "bar bar-nav "}, 
		        React.createElement("a", {className: "icon icon-left-nav pull-left", "data-rel": "back", href: "/huoche"}), 
		        React.createElement("h1", {className: "title"}, "火车列表"), 
				React.createElement("a", {className: "icon icon-home pull-right", href: "http://m.elong.com"})
			)
        );
    }
});

var AllBar = React.createClass({displayName: "AllBar",
	handleChange: function() {
		var select , content, thisclass = this.refs.filterTextInput.getDOMNode().className
			if (thisclass.indexOf("up") < 0) {
			content = "up"
		}else{
			content = "down"
		}
		if(thisclass.indexOf("selected") < 0){
			select = "selected"
		}else{
			select = "selected"
		}
		thisclass = 'tab-item start-sort ' + select  + " " + content

       	this.props.onUserInput(
            thisclass
        );
        this.refs.filterTextInput.getDOMNode().className = thisclass;
    },
    render: function() {
        return (
            React.createElement("nav", {className: "bar bar-tab"}, 
                React.createElement("a", {className: this.props.thisclass, ref: "filterTextInput", onClick: this.handleChange}, "出发", React.createElement("span", {className: "arrow"})), 
                React.createElement("a", {className: "tab-item during-sort"}, "历时", React.createElement("span", {className: "arrow"})), 
                React.createElement("a", {className: "tab-item price-sort"}, "价格", React.createElement("span", {className: "arrow"})), 
                React.createElement("a", {className: "tab-item coach-filter"}, "筛选", React.createElement("span", {className: "filter"}))
            )
        );
    }
});



//为每个 产品（ product ） 展示一列
var CycleList = React.createClass({displayName: "CycleList",
    render: function() {
    	var listnav = this.props.listnav
    	var color = "start-time"
    	if(this.props.listnav.key == "1"){
    		color = "start-time select"
    	}
        return (
            React.createElement("div", {className: "container", "data-num": listnav.number, "data-flag": "0"}, 
                React.createElement("div", {className: "clearfix"}, 
                    React.createElement("div", {className: "number"}, listnav.number), 
                    React.createElement("div", {className: "time"}, 
                        React.createElement("div", {className: color}, listnav.starttime), 
                        React.createElement("div", {className: "end-time"}, listnav.endtime)
                    ), 
                    React.createElement("div", {className: "station"}, 
                        React.createElement("div", {className: "start-station"}, listnav.startstation), 
                        React.createElement("div", {className: "end-station"}, listnav.endstation)
                    ), 
                    React.createElement("div", {className: "info"}, 
                        React.createElement("div", {className: "during"}, listnav.during), 
                        React.createElement("div", {className: "price"}, 
                            React.createElement("em", null, "¥", React.createElement("b", null, listnav.price)), "起")
                    )
                ), 
                React.createElement("div", {className: "ticket clearfix"}, 
                    React.createElement("span", {className: "item"}, "二等座 ", listnav.item1, React.createElement("span", {className: "line"})), 
                    React.createElement("span", {className: "item"}, "一等座 ", listnav.item2, React.createElement("span", {className: "line"})), 
                    React.createElement("span", {className: "item"}, "商务座 ", listnav.item3, React.createElement("span", {className: "line"}))
                )
            )
        );
    }
});



var PageContent = React.createClass({displayName: "PageContent",
    render: function() {
        var rows = [];
        
    	if(this.props.thisclass.indexOf("select") > 0){
    		for (var i = 0; i < this.props.huochelist.length; i++) {
				time = this.props.huochelist[i].starttime;
				time = Number(time.replace(":", "."));
				list = this.props.huochelist[i];
				list.time = time
				this.props.huochelist[i] = list;
			}
			if (this.props.thisclass.indexOf("up") > 0) {
				this.props.huochelist.sort(function(a, b) {
					return a.time - b.time;
				});
			} else {
				this.props.huochelist.sort(function(a, b) {
					return b.time - a.time;
				});
			};

    	}
    	this.props.huochelist.forEach(function(listnav) {
    			if(this.props.thisclass.indexOf("selected") > 0){
    				listnav.key = "1"
    			}

	    		rows.push(React.createElement(CycleList, {listnav: listnav}));
        }.bind(this));
        return (
            React.createElement("div", {className: "page-content"}, 
                React.createElement("article", {className: "train-list"}, 
                    React.createElement("section", null, 
                        React.createElement("ul", {className: "list"}, 
                            React.createElement("li", null, 
                                rows
                            )
                        )
                    )
                )
            )
        );
    }
});


var huochelist = [
  {number: 'G101',starttime: '07:00',endtime: '12:37',startstation: '北京南',endstation: '上海虹桥',during: '5时37分',price: '553',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G113',starttime: '09:05',endtime: '18:37',startstation: '北京南',endstation: '上海虹桥',during: '5时37分',price: '753',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G41',starttime: '09:15',endtime: '19:37',startstation: '北京南',endstation: '上海虹桥',during: '7时37分',price: '653',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G115',starttime: '09:33',endtime: '20:37',startstation: '北京南',endstation: '上海虹桥',during: '8时37分',price: '253',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G117',starttime: '09:44',endtime: '21:37',startstation: '北京南',endstation: '上海虹桥',during: '9时37分',price: '53',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G13',starttime: '10:05',endtime: '22:37',startstation: '北京南',endstation: '上海虹桥',during: '10时37分',price: '153',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G105',starttime: '07:36',endtime: '13:37',startstation: '北京南',endstation: '上海虹桥',during: '5时27分',price: '253',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G11',starttime: '08:00',endtime: '14:37',startstation: '北京南',endstation: '上海虹桥',during: '5时47分',price: '353',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G107',starttime: '08:06',endtime: '15:37',startstation: '北京南',endstation: '上海虹桥',during: '5时17分',price: '453',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G111',starttime: '08:40',endtime: '16:37',startstation: '北京南',endstation: '上海虹桥',during: '5时57分',price: '553',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G1',starttime: '09:00',endtime: '17:37',startstation: '北京南',endstation: '上海虹桥',during: '6时37分',price: '853',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G119',starttime: '10:10',endtime: '22:47',startstation: '北京南',endstation: '上海虹桥',during: '8时37分',price: '253',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G121',starttime: '10:15',endtime: '21:37',startstation: '北京南',endstation: '上海虹桥',during: '7时55分',price: '353',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G15',starttime: '10:20',endtime: '22:27',startstation: '北京南',endstation: '上海虹桥',during: '7时47分',price: '555',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G125',starttime: '10:25',endtime: '22:17',startstation: '北京南',endstation: '上海虹桥',during: '7时37分',price: '566',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: 'G411',starttime: '10:30',endtime: '22:37',startstation: '北京南',endstation: '上海虹桥',during: '7时27分',price: '577',item1: '200',item2: '0',item3: '0',key: '0'},
  {number: '1461',starttime: '10:35',endtime: '22:57',startstation: '北京南',endstation: '上海虹桥',during: '7时17分',price: '555',item1: '200',item2: '0',item3: '0',key: '0'}
];

React.render(React.createElement(AllPages, {huochelist: huochelist}), document.body);