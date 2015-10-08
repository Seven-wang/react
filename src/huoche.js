var AllPages = React.createClass({
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
    	    <div className="pages">
		        <div className="page page-on-center">
			        <AllHeader />
			        <AllBar 
			        	onUserInput={this.handleUserInput} 
                    	thisclass={this.state.thisclass}
			        />
			        <PageContent 
			        	huochelist={this.props.huochelist}
                    	thisclass={this.state.thisclass}
			        />
				</div>
			</div>
        );
    }
});
//为每个 产品（ product ） 展示一列
var AllHeader = React.createClass({
    render: function() {
        return (
            <header className="bar bar-nav ">
		        <a className="icon icon-left-nav pull-left"  data-rel="back" href="/huoche"></a>
		        <h1 className="title">火车列表</h1>
				<a className="icon icon-home pull-right" href="http://m.elong.com"></a>    
			</header>
        );
    }
});

var AllBar = React.createClass({
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
            <nav className="bar bar-tab">
                <a className={this.props.thisclass} ref="filterTextInput" onClick={this.handleChange} >出发<span className="arrow"></span></a> 
                <a className="tab-item during-sort">历时<span className="arrow"></span></a> 
                <a className="tab-item price-sort">价格<span className="arrow"></span></a>
                <a className="tab-item coach-filter">筛选<span className="filter"></span></a>
            </nav>
        );
    }
});


//为每个 产品（ product ） 展示一列
var CycleList = React.createClass({
    render: function() {
    	var listnav = this.props.listnav
    	var color = "start-time"
    	if(this.props.listnav.key == "1"){
    		color = "start-time select"
    	}
        return (
            <div className="container" data-num={listnav.number} data-flag="0">
                <div className="clearfix">
                    <div className="number">{listnav.number}</div>
                    <div className="time">
                        <div className={color}>{listnav.starttime}</div>
                        <div className="end-time">{listnav.endtime}</div>
                    </div>
                    <div className="station">
                        <div className="start-station">{listnav.startstation}</div>
                        <div className="end-station">{listnav.endstation}</div>
                    </div>
                    <div className="info">
                        <div className="during">{listnav.during}</div>
                        <div className="price">
                            <em>&yen;<b>{listnav.price}</b></em>起</div>
                    </div>
                </div>
                <div className="ticket clearfix">
                    <span className="item">二等座 {listnav.item1}<span className="line"></span></span>
                    <span className="item">一等座 {listnav.item2}<span className="line"></span></span>
                    <span className="item">商务座 {listnav.item3}<span className="line"></span></span>
                </div>
            </div>
        );
    }
});



var PageContent = React.createClass({
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

	    		rows.push(<CycleList listnav={listnav}   />);
        }.bind(this));
        return (
            <div className="page-content">
                <article className="train-list">
                    <section>
                        <ul className="list">
                            <li>
                                {rows}
                            </li>
                        </ul>
                    </section>
                </article>
            </div>
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

React.render(<AllPages huochelist={huochelist}/>, document.body);