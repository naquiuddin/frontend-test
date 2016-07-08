var React = require('react');
var ReactDOM = require('react-dom');
var _ = require("lodash");

//components
var SearchFilter = React.createClass({
	render: function(){
		return (
				<input type="text" ref="searchString" onChange={this.filter}/>
			);
	},
	filter: function(){
		this.props.filterData(this.refs.searchString.value);
	}
});

var TableCell = React.createClass({
	render : function(){
		return (
			<td>{this.props.val}</td>
		)
	}
});
var TableHeaderCell = React.createClass({
	render : function(){
		return (
				<td><a href="#" ref="sortField" onClick={this.sort}>{this.props.val}</a></td>
			)
	},
	sort: function(field) {
		this.props.sortData(this.refs.sortField.innerText);
	}
});
var TableHeader = React.createClass({
	render: function(){
		var sortData = this.props.sortData;
		var i=0;
		var cells = _.map(this.props.fields, function(field){
						return <TableHeaderCell sortData={sortData} key={++i} val={field}/>
					});
		return (
			<thead>
			<tr>
				{cells}
			</tr>
			</thead>
		)
	}
});
var TableRow = React.createClass({
	render: function(){
		var cells = [];
		var fields = this.props.fields;
		var data = this.props.data;
		var i=0;
		cells = _.map(fields, function(field){
			return <TableCell key={++i} val={data[field]}/>
		})
		return (
			<tr>
				{cells}
			</tr>
		);
	}
});

var data = [
	{
		id: 1,
		name: "Khaja Naquiuddin",
		location: "Karimnagar",
		designation: "Developer",
		timeZone: "+5:30"
	},
	{
		id: 2,
		name: "Wei Li",
		location: "Taiwan",
		designation: "DevOps Engineer",
		timeZone: "+8:00"
	},
	{
		id: 3,
		name: "Brock Freeman",
		location: "Seattle",
		designation: "CEO",
		timeZone: "-5:00"

	},
	{
		id: 4,
		name: "Jeffrey Hulten",
		location: "Seattle",
		designation: "Technical Advisor",
		timeZone: "-5:00"
	}
]


var Table = React.createClass({
	getInitialState: function(){
		return {
			sortField: "id",
			searchString: "",
			data: this.props.data,
			oriData: this.props.data
		}
	},
	filterData: function(searchString){
		var newData;
		if(!searchString) {
			newData = this.state.oriData;
		}
		else {
			var data = this.state.data;
			var newData = _.filter(data, function(obj){
				var bool = false;
				for(var key in obj) {
					console.log(key);
					console.log(obj[key]);
					bool = bool || (obj[key].toString().indexOf(searchString))!=-1
				}
				return bool;
			});
		}
		var newState = this.state;
		newState.data = newData;
		this.setState(newState);
	},
	sortData: function(sortField){
		var newData;
		if(!sortField) {
			sortField = "id";
		}
		data = this.state.data;
		newData = _.sortBy(data, function(obj){
			return obj[sortField];
		});
		var newState = this.state;
		newState.data = newData;
		this.setState(newState);
	},
	render: function(){
		var fields = this.getHeadingfields(this.state.data);
		var rows = _.map(this.state.data, function(obj){
						return <TableRow key={obj.id} fields={fields} data={obj}/>
				});
		return (
			<div>
				<SearchFilter filterData={this.filterData} data/>
				<table>
					<TableHeader sortData={this.sortData} fields={fields}/>
					<tbody>
						{rows}
					</tbody>
				</table>	
			</div>
		)
	},
	getHeadingfields: function(data){
		var fields = _.reduce(data, function(fieldsArr, obj){
						return _.union(fieldsArr, Object.keys(obj));
					}, []);
		return fields;
	}
});

ReactDOM.render(<Table data={data}/>, document.querySelector('#main'));
