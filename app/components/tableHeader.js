var React = require("react");

module.exports = React.createClass({
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