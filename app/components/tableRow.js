var React = require("react");

module.exports = React.createClass({
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